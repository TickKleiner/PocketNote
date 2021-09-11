import { virgilCrypto } from 'react-native-virgil-crypto';

export class VirgilCryptoWrapper {
  publicKey = null;
  privateKey = null;
  postKeys = () => {
    const encryptionKeypair = virgilCrypto.generateKeys();
    const exportKeys = {
      "publicKey" : virgilCrypto.exportPublicKey(encryptionKeypair.publicKey).toString('base64'),
      "privateKey" : virgilCrypto.exportPrivateKey(encryptionKeypair.privateKey).toString('base64'),
    }
    return (exportKeys);
  }

  getPublicKey = (rawPublicKey) => {
    this.publicKey = virgilCrypto.importPublicKey(rawPublicKey);
    console.log("PK = " + JSON.stringify(this.publicKey));
  }

  getPrivateKey = (rawPrivateKey) => {
    this.privateKey = virgilCrypto.importPrivateKey(rawPrivateKey);
  }

  encryptString = (string) => {
    console.log("PK = " + JSON.stringify(this.publicKey));
    const encryptedString = virgilCrypto.encrypt(string, this.publicKey).toString('base64');
    return (encryptedString);
  }

  decryptString = (string) => {
    const decryptedString = virgilCrypto.decrypt(string, this.privateKey).toString("utf-8");
    return (decryptedString);
  }

  encryptFile = async (uri, ) => {
    console.log("PK = " + JSON.stringify(this.publicKey));
    const encryptedFilePath = await virgilCrypto.encryptFile({
      inputPath: uri,
      outputPath: undefined,
      publicKeys: this.publicKey,
    })
    return (encryptedFilePath);
  }

  decryptFile = async (inputPath, outputPath) => {
    await virgilCrypto.decryptFile({
      inputPath: inputPath,
      outputPath: outputPath,
      privateKey: this.privateKey
    })
  }

  signOut = () => {
    this.privateKey = null;
  }
}

const virgilCryptoWrapper = new VirgilCryptoWrapper();
export default virgilCryptoWrapper;