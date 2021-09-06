import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
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
	);
}

export default StorageScreen;