import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ShadowStyle from '../../Styles/ShadowStyle.js';
import TextStyle from '../../Styles/TextStyle.js';
import CommonStyle from '../../Styles/CommonStyle.js';

export function TaskScreen(){
	return (
    <View flex={1} alignItems='center'>
<<<<<<< Updated upstream
		  <View style={CommonStyle.ScreenView} justifyContent='center'>
		    <View style={[TaskScreenStyle.main_box, ShadowStyle.BaseShadow]}>
			    <Text style={TextStyle.HeaderStyle}>TASK SCREEN</Text>
			    <Text style={TextStyle.LabelStyle}>Coming soon...</Text>
=======
		  <View style={CommonStyles.ScreenView} justifyContent='center'>
		    <View style={[TaskScreenStyles.main_box, ShadowStyles.baseShadow]}>
			    <Text style={TextStyles.largeHeader}>TASK SCREEN</Text>
			    <Text style={TextStyles.label}>Coming soon...</Text>
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
		    </View>
		  </View>
    </View>
	);
}

const TaskScreenStyle = StyleSheet.create({
	main_box: {
		backgroundColor: "#FFFFFF",
		borderRadius: 15,
		height: "25%",
		width: "100%",
		justifyContent: 'center',
		alignItems: 'center',
	},
})

export default TaskScreen;