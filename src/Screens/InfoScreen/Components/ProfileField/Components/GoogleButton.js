import React, { Component, useEffect, useMemo } from 'react'
import { TextIconButton } from '../../../../../Components/TextIconButton'
import Ionicons  from 'react-native-vector-icons/Ionicons'
import { View } from 'react-native'
import controller from '../../../../../Utils/Controller.js'
import { useDispatch, useSelector } from 'react-redux'

async function init(dispatch) {
  await controller.init(dispatch);
}

async function signIn(dispatch) {
  await controller.signIn(dispatch);
}

async function signOut(dispatch, currentUser) {
  await controller.signOut(dispatch, currentUser);
}

export function GoogleButton() {
  const dispatch = useDispatch();
  const { currentUser, isSignedGoogle } = useSelector((state) => state.user);
  const googleIcon = useMemo(() => {
		let image = Ionicons.getImageSourceSync('logo-google', 40, '#4285F4');
    return (image);
  }, []);
  useEffect(() => {
    init(dispatch);
  }, []);

  const { busy } = useSelector((state) => state.root);
  const buttonText = busy ? "LOADING" : isSignedGoogle ? "SIGN OUT" : "SIGN IN WITH GOOGLE";
	return (
    <View height="20%" width="94%" marginTop="1.5%" alignSelf="center">
      <TextIconButton
        disabled={busy ? true : false}
        backgroundColor="#FFFFFF"
        disabledBackgroundColor="#EEEEEE"
        icon={googleIcon}
        textColor="#3F414E"
        disabledTextColor="#888888"
        text={buttonText}
        onPress={async () => isSignedGoogle ? await signOut(dispatch, currentUser) : await signIn(dispatch)}
      />
    </View>
	);
}

export default GoogleButton;