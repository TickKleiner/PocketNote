import DocumentPicker from 'react-native-document-picker'

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
				return(null);
			}
		}
    return results;
	}

  pickImage = async () => {
		let results = null;
		try {
			results = await DocumentPicker.pickMultiple({
				type: [DocumentPicker.types.images],
			});      
		} catch (err) {
			if (!DocumentPicker.isCancel(err)) {
				alert('Unknown Error: ' + JSON.stringify(err));
				return(null);
			}
		}
		return results;
	}

  pickVideo = async () => {
    let results = null;
		try {
			results = await DocumentPicker.pickMultiple({
				type: [DocumentPicker.types.video],
			});      
		} catch (err) {
			if (!DocumentPicker.isCancel(err)) {
				alert('Unknown Error: ' + JSON.stringify(err));
				return(null);
			}
		}
		return results;
  }
}

const contnetPicker = new ContentPicker();
export default contnetPicker;