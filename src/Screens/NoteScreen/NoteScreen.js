import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {ShadowStyles} from '../../Styles/ShadowStyles.js';
import {TextStyles} from '../../Styles/TextStyles.js';
import {CommonStyles} from '../../Styles/CommonStyles.js';

export function NoteScreen(){
	return (
    <View flex={1} alignItems='center'>
<<<<<<< HEAD
		  <View style={CommonStyles.ScreenView} justifyContent='center'>
			  <View style={[NoteScreenStyle.main_box, ShadowStyles.baseShadow]}>
				  <Text style={TextStyles.HeaderStyle}>NOTE SCREEN</Text>
				  <Text style={TextStyles.LabelStyle}>Coming soon...</Text>
=======
<<<<<<< Updated upstream
		  <View style={CommonStyle.ScreenView} justifyContent='center'>
			  <View style={[NoteScreenStyle.main_box, ShadowStyle.BaseShadow]}>
				  <Text style={TextStyle.HeaderStyle}>NOTE SCREEN</Text>
				  <Text style={TextStyle.LabelStyle}>Coming soon...</Text>
=======
		  <View style={CommonStyles.ScreenView} justifyContent='center'>
			  <View style={[NoteScreenStyle.main_box, ShadowStyles.baseShadow]}>
				  <Text style={TextStyles.largeHeader}>NOTE SCREEN</Text>
				  <Text style={TextStyles.label}>Coming soon...</Text>
>>>>>>> Stashed changes
>>>>>>> StorageScreen
        </View>
		  </View>
    </View>
	);
}

const NoteScreenStyle = StyleSheet.create({
	main_box: {
		backgroundColor: "#FFFFFF",
		borderRadius: 15,
		height: "25%",
		width: "100%",
		justifyContent: 'center',
		alignItems: 'center',
	},
})

export default NoteScreen;