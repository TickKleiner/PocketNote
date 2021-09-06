import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
<<<<<<< HEAD
import {ShadowStyles} from '../../Styles/ShadowStyles.js';
import {TextStyles} from '../../Styles/TextStyles.js';
import {CommonStyles} from '../../Styles/CommonStyles.js';

export function StorageScreen(){
	return (
    <View flex={1} alignItems='center'>
		  <View style={CommonStyles.ScreenView} justifyContent='center'>
			  <View style={[StorageScreenStyle.main_box, ShadowStyles.baseShadow]}>
				  <Text style={TextStyles.HeaderStyle}>STORAGE SCREEN</Text>
				  <Text style={TextStyles.LabelStyle}>Coming soon...</Text>
			  </View>
      </View>
    </View>
=======
import { CommonStyles } from '../../Styles/CommonStyles.js';
import { Header } from '../../Components/Header.js';
import { TopBar } from './Components/TobBar/TopBar.js'
import { UploadButtons } from './Components/UploadButtons/UploadButtons.js'
import { SyncButton } from './Components/SyncButton/SyncButton.js'
import { DownloadButton } from './Components/DownloadButton/DownloadButton.js'

export function StorageScreen(){
	return (
		<View style={CommonStyles.ScreenView}>
				<TopBar/>
				<Header
        	marginTop="3%"
        	text="Upload"
      	/>
				<UploadButtons/>
				<SyncButton/>
				<Header
        	marginTop="3%"
        	text="Download"
      	/>
				<DownloadButton/>
		</View>
>>>>>>> StorageScreen
	);
}

export default StorageScreen;