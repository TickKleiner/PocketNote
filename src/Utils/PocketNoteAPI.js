import publicIP from 'react-native-public-ip'
import moment from 'moment'
import googleApi from './GoogleAPI.js'
import { virgilCrypto } from 'react-native-virgil-crypto'
import { getUniqueId, getManufacturer } from 'react-native-device-info';
import { Buffer } from 'buffer';

var RNFS = require('react-native-fs');

const apiLink = "https://pocketnoteapi20210828003719.azurewebsites.net";
const apiPath = "/api/PocketNoteAPIItems";

class PocketNoteAPI {

  authToken = null;
  publicKey = null;
  privateKey = null;

  userExist = async (userId) => {
    let exist = false;
    let url = apiLink + apiPath + "/UserExist?GoogleUserId=" + userId;
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
    const encryptionKeypair = virgilCrypto.generateKeys();
    const exportPublicKey = virgilCrypto.exportPublicKey(encryptionKeypair.publicKey).toString('base64');
    const exportPrivateKey = virgilCrypto.exportPrivateKey(encryptionKeypair.privateKey).toString('base64');

    let data = {
      "GoogleUserId" : userId,
      "PublicKey" : exportPublicKey,
      "PrivateKey" : exportPrivateKey,
      "Pin" : 0,
    }
    let url = apiLink + apiPath + "/SignUp";
    const response = await this.postFetchAPI(url, "POST", data);
    if (response.status == 500) {
      alert("Response error code: " + response.status + " " + await response.json());
    }
  }

  getAppData = async (userId) => {
    let url = apiLink + apiPath + "/" + userId + "/AppData?AuthToken=" + this.authToken;
    const response = await this.getFetchAPI(url, "GET");
    if (response.status == 200)
    {
      let responseData = await response.json();
      this.publicKey = virgilCrypto.importPublicKey(responseData.publicKey.toString('base64'));
    } else {
      alert("Oops: getAppData failed");
      console.log("Oops: Auth failed + " + response.status == 200 + " | resp = " + await response.json());
    }
  }
  
  signIn = async (userId) => {
    let exist = await this.userExist(userId);
    if (exist != true) {
      await this.signUp(userId);
    }

    const ip = await publicIP();
    let data = {
      "DeviceId" : getUniqueId(),
      "AuthDate" : moment().format('MMMM Do YYYY, h:mm:ss a'),
      "Ip" : ip,
    }
    let url = apiLink + apiPath + "/Auth?GoogleUserId=" + userId;
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
    let url = apiLink + apiPath + "/" + userId.toString() + "/SignOut?AuthToken=" + this.authToken;
    await this.postFetchAPI(url, "PATCH", {});
    this.authToken = null;
    this.publicKey = null;
  }

  uploadFiles = async (userId, filesData, isImgPicker) => {
    let files = new Array();
    for (let file of filesData) {
      const fileName = isImgPicker ?  file?.fileName : file?.name;
      const fileSize = isImgPicker ?  file?.fileSize : file?.size;

      if (fileSize > 4194304) {
        alert("file: " + fileName + " larger than 4Mb");
        continue;
      }

      let data = {
        "FileId" : "",
        "EncryptedName" : "",
        "Type" : file.type,
        "Signature" : "",
        "UploadDate" : ""
      }
      data.EncryptedName = virgilCrypto.encrypt(fileName, this.publicKey).toString('base64');
      data.UploadDate = moment().format('MMMM Do YYYY, h:mm:ss a');

      await virgilCrypto.encryptFile({
          inputPath: file.uri,
          outputPath: undefined,
          publicKeys: this.publicKey,
      }).then(async encryptedFilePath => {
          const fileContent = await RNFS.readFile("file://" + encryptedFilePath, 'base64');
          //Сгенирировать рандомную строку
          data.FileId = await googleApi.uploadFile(data.EncryptedName, fileContent, data.Type);
      });
      files.push(data);
    }

    let data = {
      "Files": files
    }
    let url = apiLink + apiPath + "/FileStorage/" + userId.toString() + "/PostFiles?AuthToken=" + this.authToken;
    const response = await this.postFetchAPI(url, "POST", data);
  }

  getDownloadData = async (userId) => {
    let url = apiLink + apiPath + "/FileStorage/" + userId.toString() + "/DownloadData?AuthToken=" + this.authToken;
    const responce = await this.getAppData(url, "GET");

    if (responce.status != 200){
      return null;
    }
    const responseData = await responce.json();
    this.privateKey = virgilCrypto.importPrivateKey(responseData.privateKey.toString('base64'));
    
    let files = new Array();
    for(let file of responseData.Files) {
      let usefulData = {
        "FileName" : "",
        "FileType" : "",
        "FileId" : "",
      };
      usefulData.FileName = virgilCrypto.decrypt(file.EncryptedName);
      usefulData.FileType = file.Type;
      usefulData.FileId = file.FileId;
      files.push(usefulData);
    }
    return (files);
  }

  downloadFile = async (fileId, fileName) => {
    let encodedFileContent = await googleApi.downloadFile(fileId);
    let fileContent = Buffer.from(encodedFileContent).toString('utf8');
    let folderExists = await RNFS.exists(RNFS.DocumentDirectoryPath);
    if (!folderExists) {
      await RNFS.mkdir(RNFS.DocumentDirectoryPath);
    }
    await RNFS.writeFile(RNFS.DocumentDirectoryPath + "/" + fileName, fileContent, 'base64');
    await virgilCrypto.decryptFile({
      inputPath: RNFS.DocumentDirectoryPath + "/" + fileName,
      outputPath: RNFS.DownloadDirectoryPath + '/' + fileName,
      privateKey: privateKey
    })
    await RNFS.unlink(RNFS.DocumentDirectoryPath + "/" + fileName);
  }

  postStorage = (files) => {
    this.privateKey = null;
    //Смотрю на файлы которые остались
    //Отправляю их на сервер
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