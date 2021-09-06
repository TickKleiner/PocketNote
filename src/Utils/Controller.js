import pocketNoteAPI from './PocketNoteAPI.js'
import googleApi from './GoogleAPI.js'
import { toggleBusy } from '../Redux/rootSlice.js'
import { setCurentUser, signedWithGoogle, signedOutGoogle } from '../Redux/userSlice'

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
      console.log("Signed In");
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
}

const controller = new Controller();

export default controller;