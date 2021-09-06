import React from 'react'
import { View } from 'react-native'
import {AboutUs} from './Components/AboutUs/AboutUs.js'
import {Donate} from './Components/Donate/Donate.js'
import {RateApp} from './Components/RateApp.js'
import {ShareApp} from './Components/ShareApp.js'


export function SupportUs(){
	return (
		<View posititon="absolute" height="100%" width="100%">
      <AboutUs/>
      <Donate/>
      <RateApp/>
      <ShareApp/>
		</View>
	);
}

export default SupportUs;