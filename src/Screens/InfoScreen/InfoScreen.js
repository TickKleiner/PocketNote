import React, {useState, useEffect} from 'react';
import { View } from 'react-native';
import Ionicons  from 'react-native-vector-icons/Ionicons';
import {CommonStyles} from '../../Styles/CommonStyles.js';
import {TopBar} from './Components/TopBar/TopBar.js'
import {ProfileField} from './Components/ProfileField/ProfileField.js'
import { Header } from '../../Components/Header.js';
import {SupportUs} from './Components/SupportUs/SupportUs.js'

export function InfoScreen(){
	const [icon, setIcon] = useState(null);
  useEffect(() => {
    setIcon(Ionicons.getImageSourceSync('pizza-outline', 40, '#3f414e'))
  });

	return (
		<View style={CommonStyles.ScreenView}>
			<TopBar flex={1}/>
			<ProfileField flex={1}/>
			<Header
        marginTop="3%"
        text="Support Us"
      />
			<SupportUs flex={1}/>
		</View>
	);
}

export default InfoScreen;