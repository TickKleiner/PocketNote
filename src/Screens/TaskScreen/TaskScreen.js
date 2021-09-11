import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ShadowStyles from '../../Styles/ShadowStyles.js';
import TextStyles from '../../Styles/TextStyles.js';
import CommonStyles from '../../Styles/CommonStyles.js';

export function TaskScreen(){
	return (
    <View flex={1} alignItems='center'>
		  <View style={CommonStyles.ScreenView} justifyContent='center'>
			  <View style={[TaskScreenStyle.main_box, ShadowStyles.baseShadow]}>
				  <Text style={TextStyles.largeHeader}>TASK SCREEN</Text>
				  <Text style={TextStyles.label}>Coming soon...</Text>
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