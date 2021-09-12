import pocketNoteAPI from './PocketNoteAPI.js'
import googleApi from './GoogleAPI.js'
import { ToastAndroid } from "react-native";
import moment from 'moment';
import { toggleBusy } from '../Redux/rootSlice.js'
import { setCurentUser, signedWithGoogle, signedOutGoogle } from '../Redux/userSlice'
import virgilCryptoWrapper from './VirgilCrypto.js'

var Buffer = require('buffer/').Buffer;
var RNFS = require('react-native-fs');

class Controller {
  init = async (dispatch) => {
    dispatch(toggleBusy(true));
    let isSignedIn = await googleApi.init();
    let currentUser = null;
    if (isSignedIn) {
      currentUser = await googleApi.getCurrentUser();
      dispatch(setCurentUser(currentUser));
      await pocketNoteAPI.signIn(currentUser.user.id);
      dispatch(signedWithGoogle());
    }
    dispatch(toggleBusy(false));
    return currentUser;
  }

  signIn = async (dispatch) => {
    dispatch(toggleBusy(true));
    await googleApi.signIn();
    let isSignedIn = await googleApi.isSignedIn();
    let currentUser = null;
    if (isSignedIn) {
      currentUser = await googleApi.getCurrentUser();
      dispatch(setCurentUser(currentUser));
      await pocketNoteAPI.signIn(currentUser.user.id);
      dispatch(signedWithGoogle());
    }
    dispatch(toggleBusy(false));
    return currentUser;
  }

  signOut = async (dispatch, currentUser) => {
    dispatch(toggleBusy(true));
    await googleApi.signOut();
    let isSignedIn = await googleApi.isSignedIn();
    if (!isSignedIn) {
      await pocketNoteAPI.signOut(currentUser.user.id);
      dispatch(signedOutGoogle());
    }
    dispatch(toggleBusy(false));
  }

  uploadFiles = async (dispatch, currentUser, files) => {
    dispatch(toggleBusy(true));
    const filesToUpload = new Array();
    for (let file of files) {
      if (file.size > 4194304) {
        alert("file: " + file.name + "larger than 4Mb");
        continue;
      }
      let data = {
        "FileId" : "",
        "EncryptedName" : "",
        "Type" : file.type,
        "Signature" : "",
        "UploadDate" : ""
      }
      data.EncryptedName = virgilCryptoWrapper.encryptString(file.name);
      data.UploadDate = moment().format('MMMM Do YYYY, h:mm:ss a');
      const newUri = await virgilCryptoWrapper.encryptFile(file.uri);
      const fileContent = await RNFS.readFile("file://" + newUri, 'base64');
      await RNFS.unlink(newUri);
      data.FileId = await googleApi.uploadFile(data.EncryptedName, fileContent, data.Type);
      if (data.FileId != null || data.FileId != undefined) {
        ToastAndroid.show(file.name + "\nuploaded!", ToastAndroid.LONG, ToastAndroid.BOTTOM);
      } else {
        ToastAndroid.show(file.name + "\nsomething went wrong!", ToastAndroid.LONG, ToastAndroid.BOTTOM);
      }
      filesToUpload.push(data);
    }
    const data = {
      "Files": filesToUpload
    }
    const respose = await pocketNoteAPI.uploadFiles(currentUser.user.id, data);
    if (respose.status != 200) {
      alert("Something went wrong\nStatus: " + respose.status);
    }
    dispatch(toggleBusy(false));
  }

  getFilesList = async (dispatch, currentUser) => {
    dispatch(toggleBusy(true));
    const googleFilesList = await  googleApi.getFilesList();
    const apiFilesList = await pocketNoteAPI.getDownloadData(currentUser.user.id);
    const filesList = new Array();
    for (let googleFile of googleFilesList.files) {
      for (let apiFile of apiFilesList) {
        if (googleFile.id == apiFile.FileId) {
          let file = {
            "FileName" : apiFile.FileName,
            "Type" : apiFile.FileType,
            "UploadDate" : apiFile.UploadDate,
            "FileId" : apiFile.FileId,
          }
          filesList.push(file);
        }
      }
    }
    dispatch(toggleBusy(false));
    return (filesList);
  }

  downloadFile = async (dispatch, fileId, fileName) => {
    dispatch(toggleBusy(true));
    let fileData = Array.from(await googleApi.downloadFile(fileId));
    var fileContent = Buffer.from(fileData).toString('utf8');
    let _folderExists = await RNFS.exists(RNFS.DocumentDirectoryPath);
    if (!_folderExists) {
      await RNFS.mkdir(RNFS.DocumentDirectoryPath);
    }
    await RNFS.writeFile(RNFS.DocumentDirectoryPath + "/" + fileName, fileContent, 'base64');
    _folderExists = await RNFS.exists(RNFS.DownloadDirectoryPath + '/PocketNoteDownloads');
    if (!_folderExists) {
      await RNFS.mkdir(RNFS.DownloadDirectoryPath + '/PocketNoteDownloads');
    }
    await virgilCryptoWrapper.decryptFile(
      RNFS.DocumentDirectoryPath + "/" + fileName,
      RNFS.DownloadDirectoryPath + '/PocketNoteDownloads' + '/' + fileName
    );
    let _fileExist = await RNFS.exists(RNFS.DownloadDirectoryPath + '/PocketNoteDownloads' + '/' + fileName);
    if (_fileExist) {
      ToastAndroid.show(fileName + "\ndownloaded!", ToastAndroid.LONG, ToastAndroid.BOTTOM);      
    } else {
      ToastAndroid.show(fileName + "\nsomething went wrong!", ToastAndroid.LONG, ToastAndroid.BOTTOM);
    }
    dispatch(toggleBusy(false));
  }

  deleteFile = async (dispatch, fileId, fileName) => {
    dispatch(toggleBusy(true));
    await googleApi.deleteFile(fileId);
    ToastAndroid.show(fileName + "\ndeleted!", ToastAndroid.LONG, ToastAndroid.BOTTOM);
    dispatch(toggleBusy(false));
  }
}

const controller = new Controller();
export default controller;