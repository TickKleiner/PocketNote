import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import {TextStyles} from '../../../../../Styles/TextStyles.js'
import { useSelector } from 'react-redux'

export function ProfileInfo(){
  const { isSigned, currentUser, isSignedGoogle } = useSelector((state) => state.user);

  return (
    <View style={ProfileInfoStyles.profileInfo}>
      <View style={ProfileInfoStyles.profilePicContainer}>
        <Image
          source={isSigned ? {uri: currentUser.user.photo} : require("../Assets/anonymous-profile-pic.jpg")}
          style={ProfileInfoStyles.profilePic}
        />
      </View>
      <View style={ProfileInfoStyles.labelStyle}>
        <Text style={TextStyles.largeInfo}>
          {isSigned ? currentUser.user.name : "Anon user"}
        </Text>
        <Text style={TextStyles.label}>
          {isSignedGoogle ? "connected drive: google drive" : "connected drive: no drive"}
        </Text>
      </View>
    </View>
  );
}

const ProfileInfoStyles = StyleSheet.create({
	profileInfo: {
		height: "20%",
    marginTop: "3%",
    flexDirection: 'row',
		borderRadius: 15,
	},
  profilePicContainer: {
    marginLeft: '3%',
    alignItems: 'flex-start',
    aspectRatio: 1,
    height: "100%",
    borderRadius: 5,
    justifyContent: 'center',
    resizeMode: 'contain',
    overflow: 'hidden',
  },
  profilePic: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 5,
    resizeMode: 'contain'
  },
  labelStyle: {
    marginLeft: '3%',
  },
  profileLabel: {
    
  },
})

export default ProfileInfo;