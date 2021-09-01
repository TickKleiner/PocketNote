import React, { Component, useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import {ShadowStyles} from '../../../../Styles/ShadowStyles.js'
import {GetDateTime} from './Components/GetDateTime.js'
import {GetLocation} from './Components/GetLocation.js'

export function TopBar(){
  return (
    <View style={[InfoScreenStyles.backgroundStyle, ShadowStyles.baseShadow]}>
      <View style={InfoScreenStyles.informationStyle}>
        <GetLocation/>
        <GetDateTime/>
      </View>
    </View>
  );
}

const InfoScreenStyles = StyleSheet.create({
	backgroundStyle: {
    width: '100%',
		height: '12%',
		backgroundColor: '#FAFAFA',
		borderRadius: 15,
	},
	informationStyle: {
		justifyContent: 'center',
		position: 'absolute',
		flex: 1,
		marginLeft: "3%",
	},
})


export default TopBar;