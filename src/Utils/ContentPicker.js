import React from 'react'
import DocumentPicker from 'react-native-document-picker'
import { launchImageLibrary } from 'react-native-image-picker'

class ContentPicker {
  pickDocuments = async () => {
		let results = null;
    try {
			results = await DocumentPicker.pickMultiple({
				type: [DocumentPicker.types.allFiles],
			});      
		} catch (err) {
			if (!DocumentPicker.isCancel(err)) {
				alert('Unknown Error: ' + JSON.stringify(err));
			}
		}
    return results;
	}

  pickImage = async () => {
		let results = null;
    
    let options = {
			mediaType: 'photo',
			selectionLimit: 0,
			storageOptions: {
				skipBackup: true,
				path: 'images',
			},
		};
		launchImageLibrary(options, async (response) => {
			if (response.didCancel) {
				console.log('User cancelled image picker');
			} else if (response.error) {
				console.log('ImagePicker Error: ', response.error);
			} else if (response.customButton) {
				console.log('User tapped custom button: ', response.customButton);
				alert(response.customButton);
			} else {
        results = response.assets;
			}
		});
    return results;
	}

  pickVideo = async () => {
    let results = null;
    
    let options = {
			mediaType: 'video',
			selectionLimit: 0,
			storageOptions: {
				skipBackup: true,
				path: 'videos',
			},
		};
		launchImageLibrary(options, async (response) => {
			if (response.didCancel) {
				console.log('User cancelled image picker');
			} else if (response.error) {
				console.log('ImagePicker Error: ', response.error);
			} else if (response.customButton) {
				console.log('User tapped custom button: ', response.customButton);
				alert(response.customButton);
			} else {
        results = response.assets;
			}
		});
    return results;
  }
}

const contnetPicker = new ContentPicker();
export default ContentPicker;