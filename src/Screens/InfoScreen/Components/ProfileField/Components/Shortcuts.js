import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ShadowStyles } from '../../../../../Styles/ShadowStyles.js'
import { TextStyles } from '../../../../../Styles/TextStyles.js'

function Shortcut (props){
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={[props.disabled ?
              ShortcutsStyles.disabledShortcut :
              ShortcutsStyles.shortcut,
              ShadowStyles.baseShadow
            ]}
      onPress={() => navigation.navigate(props.screenName)}
      disabled={props.disabled}
    >
		  <Text style={[TextStyles.darkBlueLabel, ShortcutsStyles.labelText]}>
				{props.label}
			</Text>
			<Text style={[TextStyles.largeInfo, ShortcutsStyles.valueText]}>
				{props.value}
			</Text>
		</TouchableOpacity>
  );
}

export function Shortcuts(){
  return (
    <View style={ShortcutsStyles.containerStyle}>
      <Shortcut label="Notes" value={0} disabled={false} screenName="Note"/>
      <Shortcut label="Tasks" value={0} disabled={false} screenName="Task"/>
      <Shortcut label="Devices" value={0} disabled={true} screenName="Devices"/>
      <Shortcut label="Donated" value={0} disabled={true} screenName="Donated"/>
    </View>
  );
}

const ShortcutsStyles = StyleSheet.create({
  containerStyle: {
		alignSelf: 'center',
		height: "25%",
		width: "94%",
    marginTop: "3%",
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	shortcut: {
		height: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    aspectRatio: 1,
	},
  disabledShortcut: {
    height: "100%",
    backgroundColor: "#888888",
    borderRadius: 5,
    aspectRatio: 1,
  },
	labelText: {
		marginLeft: "8%",
		marginTop: "5%",
	},
	valueText: {
		marginLeft: "8%",
	},
})

export default Shortcuts;