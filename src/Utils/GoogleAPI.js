import {
	GoogleSignin
} from '@react-native-google-signin/google-signin'
import {
  GDrive,
  ListQueryBuilder
} from "@robinbobin/react-native-google-drive-api-wrapper"

class GoogleApi {
  isSignedInGoogle = false;
  currentUser = null;
  folderPrefixName = "pocket_note_folder_";
  fullFolderName = "";
	folderId = "";
	gdrive = null;

  init = async () => {
		GoogleSignin.configure({
			scopes: ["https://www.googleapis.com/auth/drive"],
			offlineAccess: true,
			androidClientId: '993474243220-2eic5mfnpv5eqv9eq5pu57bb8ltdh5cq.apps.googleusercontent.com',
			webClientId: '993474243220-3tcbu38i6e0a974maf8qjk030rnf0ec7.apps.googleusercontent.com'
		});
    this.gdrive = new GDrive();
		this.isSignedInGoogle = await this.isSignedIn();
		return (this.isSignedInGoogle);
	}

  signIn = async () => {
		try {
			await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
			await GoogleSignin.signIn();
		} catch (error) {
			alert('Error: ' + error);
		}
	}

	signOut = async () => {
		try {
			await GoogleSignin.signOut();
		} catch (error) {
			alert('error is '+ error);
		}
	};

	isSignedIn = async () => {
		this.isSignedInGoogle = false;
		try{
			this.isSignedInGoogle = await GoogleSignin.isSignedIn();
		} catch (error) {
      alert("Error: " + error);
			this.isSignedInGoogle = false;
		}
    return (this.isSignedInGoogle);
	}

	getCurrentUser = async () => {
    this.currentUser = null;
    try{
		  this.currentUser = await GoogleSignin.getCurrentUser();
      this.fullFolderName = this.folderPrefixName + this.currentUser.user.name;
    } catch (error) {
      alert("Error: " + error);
      this.currentUser = null;
    }
    return (this.currentUser);
	}

	createFolder = async () => {
    if (!this.isSignedInGoogle) {
      alert("Please sign in with google");
      return;
    }

		const response = await this.gdrive.files.createIfNotExists({
			q: new ListQueryBuilder()
				.e("name", this.fullFolderName)
				.and()
				.e("mimeType", "application/vnd.google-apps.folder")
				.and()
				.in("root", "parents")
		  },
			this.gdrive.files.newMetadataOnlyUploader()
				.setRequestBody({
					name: this.fullFolderName,
					mimeType: "application/vnd.google-apps.folder",
					parents: ["root"]
				})
		)
		this.folderId = response.result.id;
	}

	uploadFile = async (fileName, fileContent, fileType) => {
		if (!this.isSignedInGoogle) {
      alert("Please sign in with google");
      return;
    }
    let id = null;
		try {
			this.gdrive.accessToken = (await GoogleSignin.getTokens()).accessToken;
			await this.createFolder();
			const gdFolder = await this.gdrive.files.list({
				q: new ListQueryBuilder()
				  .e("name", this.fullFolderName)
				  .and()
				  .in("root", "parents")
			});
			id = (await this.gdrive.files.newMultipartUploader()
				.setData(fileContent, fileType)
				.setRequestBody({
					parents: [gdFolder.files[0].id],
					name: fileName
				})
				.execute()
			).id;
		} catch (error) {
      id = null;
			alert('Error: ' + error);
		}
		return (id);
	}

	downloadFile = async (fileId) => {
    if (!this.isSignedInGoogle) {
      alert("Please sign in with google");
      return;
    }

    let fileContent = undefined;
		try{
			this.gdrive.accessToken = (await GoogleSignin.getTokens()).accessToken;
			fileContent = await this.gdrive.files.getBinary(fileId);
		} catch (error) {
      fileContent = null;
			alert('Error: ' + error);
		}
		return fileContent;
	}

	deleteFile = async (fileId) => {
		if (!this.isSignedInGoogle) {
      alert("Please sign in with google");
      return;
    }
		let response = null;
		try{
			this.gdrive.accessToken = (await GoogleSignin.getTokens()).accessToken;
			response = await this.gdrive.files.delete(fileId);
		} catch (error) {
			alert('Error: ' + error);
		}
		return (response);
	}

	getFilesList = async () => {
    if (!this.isSignedInGoogle) {
      alert("Please sign in with google");
      return;
    }

    let filesList = null;
		try{
			this.gdrive.accessToken = (await GoogleSignin.getTokens()).accessToken;
			await this.createFolder();
			filesList = await this.gdrive.files.list({
				q: new ListQueryBuilder()
				.in(this.folderId, "parents")
			});
		} catch (error) {
      filesList = null;
			alert('Error: ' + error);
		}
    return filesList;
	}
	
	convertBytes = function(bytes) {
		const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
	
		if (bytes == 0) {
			return "n/a"
		}
	
		const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
	
		if (i == 0) {
			return bytes + " " + sizes[i]
		}
	
		return (bytes / Math.pow(1024, i)).toFixed(1) + " " + sizes[i]
	}
	
	getStorageInfo = async () => {
		if (!this.isSignedInGoogle) {
      return;
    }
		this.gdrive.accessToken = (await GoogleSignin.getTokens()).accessToken;
		let storageInfo = await this.gdrive.about.get(fields="storageQuota");
		let limit = this.convertBytes(storageInfo.storageQuota.limit);
		let used = this.convertBytes(storageInfo.storageQuota.usage);
		let percent = (parseFloat(used) / parseFloat(limit) * 100).toFixed(1).toString() + "%";
		let usage = {
			"limit": limit,
			"used": used,
			"percent": percent
		}
		return (usage);
	}
}

const googleApi = new GoogleApi();
export default googleApi;