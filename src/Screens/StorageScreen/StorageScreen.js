import React from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { setLastScreenName } from '../../Redux/rootSlice.js';
import pocketNoteAPI from	'../../Utils/PocketNoteAPI.js'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CommonStyles } from '../../Styles/CommonStyles.js';
import { Header } from '../../Components/Header.js';
import { TopBar } from './Components/TobBar/TopBar.js'
import { UploadButtons } from './Components/UploadButtons/UploadButtons.js'
import { SyncButton } from './Components/SyncButton/SyncButton.js'
import { DownloadButton } from './Components/DownloadButton/DownloadButton.js'
import { SubScreen } from './Components/DownloadButton/SubScreen/SubScreen.js'
import { useFocusEffect } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

function StorageScreenComponent({ navigation }) {
	const dispatch = useDispatch();
	const { lastScreenName } = useSelector((state) => state.root);
	const { filesData, currentUser } = useSelector((state) => state.user);


	useFocusEffect(() => {
		try {
			console.log(lastScreenName);
			if (lastScreenName == "SubScreen") {
				pocketNoteAPI.postStorage(filesData, currentUser.user.id);
			}
			dispatch(setLastScreenName("StorageScreen"));
		} catch(err) {
			console.log("Unknown error: " + err);
		}
  });

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
				<DownloadButton
					navigation={navigation}
				/>
		</View>
	);
}

export function StorageScreen(){
	return (
		<Stack.Navigator>
			<Stack.Screen
        name="StorageScreenComponent"
        component={StorageScreenComponent}
				options={{ headerShown: false }}
      />
      <Stack.Screen
				name="SubScreen"
				component={SubScreen}
				options={{ headerShown: true }}
			/>
		</Stack.Navigator>
	);
}

export default StorageScreen;