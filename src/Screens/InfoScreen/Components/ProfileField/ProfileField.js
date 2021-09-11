import React from 'react';
import { View, StyleSheet } from 'react-native'

import { ShadowStyles } from '../../../../Styles/ShadowStyles.js'
import { ProfileInfo } from './Components/ProfileInfo.js'
import { Shortcuts } from './Components/Shortcuts.js'
import { GoogleButton } from './Components/GoogleButton.js'
import { YandexButton } from './Components/YandexButton.js'

export function ProfileField(){
  return (
    <View style={[ProfileFieldStyles.profileBackground, ShadowStyles.baseShadow]}>
      <ProfileInfo/>
      <Shortcuts/>
      <YandexButton/>
      <GoogleButton/>
    </View>
  );
}

const ProfileFieldStyles = StyleSheet.create({
	profileBackground: {
    width: "100%",
		height: "40%",
    marginTop: "1.5%",
		backgroundColor: '#FAFAFA',
		borderRadius: 15,
	},
})

export default ProfileField;