import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ShadowStyle from '../../Styles/ShadowStyle.js';
import TextStyle from '../../Styles/TextStyle.js';
import CommonStyle from '../../Styles/CommonStyle.js';

export function NoteScreen(){
	return (
    <View flex={1} alignItems='center'>
		  <View style={CommonStyle.ScreenView} justifyContent='center'>
			  <View style={[NoteScreenStyle.main_box, ShadowStyle.BaseShadow]}>
				  <Text style={TextStyle.HeaderStyle}>NOTE SCREEN</Text>
				  <Text style={TextStyle.LabelStyle}>Coming soon...</Text>
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