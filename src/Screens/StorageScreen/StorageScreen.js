import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ShadowStyle from '../../Styles/ShadowStyle.js';
import TextStyle from '../../Styles/TextStyle.js';
import CommonStyle from '../../Styles/CommonStyle.js';

export function StorageScreen(){
	return (
    <View flex={1} alignItems='center'>
		  <View style={CommonStyle.ScreenView} justifyContent='center'>
			  <View style={[StorageScreenStyle.main_box, ShadowStyle.BaseShadow]}>
				  <Text style={TextStyle.HeaderStyle}>STORAGE SCREEN</Text>
				  <Text style={TextStyle.LabelStyle}>Coming soon...</Text>
			  </View>
      </View>
    </View>
	);
}

const StorageScreenStyle = StyleSheet.create({
	main_box: {
		backgroundColor: "#FFFFFF",
		borderRadius: 15,
		height: "25%",
		width: "100%",
		justifyContent: 'center',
		alignItems: 'center',
	},
})

export default StorageScreen;