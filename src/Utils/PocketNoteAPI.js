import publicIP from 'react-native-public-ip'
import moment from 'moment'
import { getUniqueId } from 'react-native-device-info';
import virgilCryptoWrapper from './VirgilCrypto.js'

const apiLink = "https://pocketnoteapi20210828003719.azurewebsites.net";
const apiPath = "/api/PocketNoteAPIItems";

class PocketNoteAPI {

  authToken = null;

  userExist = async (userId) => {
    let exist = false;
    const url = apiLink + apiPath + "/UserExist?GoogleUserId=" + userId;
    const response = await this.getFetchAPI(url, "HEAD");
    if (response.status == 200){
      exist = true;
    }else if (response.status == 404) {
      exist = false;
    }else {
      exist = false;
      alert("Response error code: " + response.status);
    }
    return exist;
  }

  signUp = async (userId) => {
    const exportKeys = virgilCryptoWrapper.postKeys();

    const data = {
      "GoogleUserId" : userId,
      "PublicKey" : exportKeys.publicKey,
      "PrivateKey" : exportKeys.privateKey,
      "Pin" : 0,
    }
    const url = apiLink + apiPath + "/SignUp";
    const response = await this.postFetchAPI(url, "POST", data);
    if (response.status == 500) {
      alert("Response error code: " + response.status + " " + await response.json());
    }
  }

  getAppData = async (userId) => {
    const url = apiLink + apiPath + "/" + userId + "/AppData?AuthToken=" + this.authToken;
    const response = await this.getFetchAPI(url, "GET");
    if (response.status == 200)
    {
      const responseData = await response.json();
      virgilCryptoWrapper.getPublicKey(responseData.publicKey.toString("base64"));
    } else {
      alert("Oops: getAppData failed");
      console.log("Oops: Auth failed + " + response.status == 200 + " | resp = " + await response.json());
    }
  }
  
  signIn = async (userId) => {
    const exist = await this.userExist(userId);
    if (exist != true) {
      await this.signUp(userId);
    }

    const ip = await publicIP();
    const data = {
      "DeviceId" : getUniqueId(),
      "AuthDate" : moment().format('MMMM Do YYYY, h:mm:ss a'),
      "Ip" : ip,
    }
    const url = apiLink + apiPath + "/Auth?GoogleUserId=" + userId;
    const response = await this.postFetchAPI(url, "PATCH", data);
    if (response.status == 200) {
      let resposeData = await response.json();
      this.authToken = encodeURIComponent(resposeData.authToken);
    } else {
      alert("Oops: Auth failed");
      console.log("Oops: Auth failed + " + response.status + " | resp = ");
    }
    await this.getAppData(userId);
  }

  signOut = async (userId) => {
    if (this.authToken == null)
      alert("Oops: you are not signed in");
      const url = apiLink + apiPath + "/" + userId.toString() + "/SignOut?AuthToken=" + this.authToken;
    const response = await this.postFetchAPI(url, "PATCH", {});
    virgilCryptoWrapper.signOut();
    this.authToken = null;
  }

  uploadFiles = async (userId, data) => {
    const url = apiLink + apiPath + "/FileStorage/" + userId + "/PostFiles?AuthToken=" + this.authToken;
    const response = await this.postFetchAPI(url, "POST", data);
    return (response);
  }

  getDownloadData = async (userId) => {
    const url = apiLink + apiPath + "/FileStorage/" + userId + "/DownloadData?AuthToken=" + this.authToken;
    const response = await this.getFetchAPI(url, "GET");
    if (response.status != 200) {
      alert("Something went wrong\nStatus: " + response.status);
      return null;
    }
    const responseData = await response.json();
    virgilCryptoWrapper.getPrivateKey(responseData.privateKey.toString('base64'));
    let files = new Array();
    for(let file of responseData.files) {
      let usefulData = {
        "FileName" : "",
        "FileType" : "",
        "FileId" : "",
        "UploadDate" : "",
      };
      usefulData.FileName = virgilCryptoWrapper.decryptString(file.encryptedName);
      usefulData.FileType = file.type;
      usefulData.FileId = file.fileId;
      usefulData.UploadDate = file.uploadDate;
      files.push(usefulData);
    }
    return (files);
  }

  postStorage = async (files, userId) => {
    virgilCryptoWrapper.signOut();
    let FileIDs = new Array();
    for (let file of files) {
      FileIDs.push(file.FileId);
    }
    const data = {
      "FileIDs" : FileIDs
    }
    const url = apiLink + apiPath + "/FileStorage/" + userId + "/PatchFiles?AuthToken=" + this.authToken;
    const response = await this.postFetchAPI(url, "PATCH", data);
  }

  getFetchAPI = async (url = "", requestMethod = "") => {
    const response = await fetch(url, {
        method: requestMethod,
    });
    return response;
  }

  postFetchAPI = async (url = '', requestMethod = '', data = {}) => {
    const response = await fetch(url, {
        method: requestMethod,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response;
  }
}

const pocketNoteAPI = new PocketNoteAPI();
export default pocketNoteAPI;