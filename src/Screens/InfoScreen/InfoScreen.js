import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {ShadowStyles} from '../../Styles/ShadowStyles.js';
import {TextStyles} from '../../Styles/TextStyles.js';
import {CommonStyles} from '../../Styles/CommonStyles.js';
import {TopBar} from './Components/TopBar/TopBar.js'

export function InfoScreen(){
	return (
		<View style={CommonStyles.ScreenView}>
			<TopBar flex={1}/>
		</View>
	);
}

const InfoScreenStyles = StyleSheet.create({
})

export default InfoScreen;