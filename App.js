import * as React from 'react';
import InternetConnectionAlert from "react-native-internet-connection-alert";

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons  from 'react-native-vector-icons/Ionicons';

import { useDispatch, useSelector } from 'react-redux';
import { toggleOnline } from './src/Redux/rootSlice.js';

import {NoteScreen} from './src/Screens/NoteScreen/NoteScreen.js'
import {InfoScreen} from './src/Screens/InfoScreen/InfoScreen.js'
import {TaskScreen} from './src/Screens/TaskScreen/TaskScreen.js'
import {StorageScreen} from './src/Screens/StorageScreen/StorageScreen.js'

import { TextStyles } from './src/Styles/TextStyles.js';
import Spinner from 'react-native-loading-spinner-overlay';
import { Text } from 'react-native';

const Tab = createMaterialTopTabNavigator();

function App() {
	const dispatch = useDispatch();
	const { busy } = useSelector((state) => state.root);
	return (
		<InternetConnectionAlert
			onChange={(connectionState) => {
				dispatch(toggleOnline(connectionState.isConnected));
				console.log("Connection State: ", connectionState);
			}}
		>
			<Spinner
        visible={busy}
        textContent={'Loading...'}
        textStyle={TextStyles.spinnerTextStyle}
      />
			<NavigationContainer>
				<Tab.Navigator
					initialRouteName="Note"
					tabBarPosition = 'bottom'
					screenOptions={({ route }) => ({
						tabBarShowIcon: true,
						tabBarShowLabel: false,
						tabBarIcon: ({ focused, color, size }) => {
						let iconName;
						if (route.name === 'Note') {
							iconName = focused ? 'create-outline' : 'create';
						} else if (route.name === 'Task') {
							iconName = focused ? 'clipboard-outline' : 'clipboard';
						} else if (route.name === 'Storage') {
							iconName = focused ? 'cube-outline' : 'cube';
						} else if (route.name === 'Info') {
							iconName = focused ? 'grid-outline' : 'grid';
						}
					
						return <Ionicons  name={iconName} size={40} style={{marginTop: -10, alignSelf: 'center', height: 40, aspectRatio: 1 }} color={color}/>;
						},
						tabBarActiveTintColor: 'gray',
						tabBarInactiveTintColor: 'gray',
						tabBarIndicatorStyle: {
							backgroundColor: "gray"
						}
					})}
				>
					<Tab.Screen
						name="Note"
						component={NoteScreen}
					/>
					<Tab.Screen
						name="Task"
						component={TaskScreen}
					/>
					<Tab.Screen
						name="Storage"
						component={StorageScreen}
					/>
					<Tab.Screen
						name="Info"
						component={InfoScreen}
					/>
				</Tab.Navigator>
			</NavigationContainer>
		</InternetConnectionAlert>
	);
}

export default App;
