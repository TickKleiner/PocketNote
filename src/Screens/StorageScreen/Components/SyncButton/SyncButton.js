import React from 'react'
import { View, StyleSheet } from 'react-native'
import Button from './Components/Button.js'
import CheckBox from './Components/CheckBox.js'

export function SyncButton() {
	return (
		<View style={StorageScreenStyles.viewBoxStyle}>
			<Button/>
      <CheckBox/>
		</View>
	);
}

const StorageScreenStyles = StyleSheet.create({
	viewBoxStyle: {
		width: "100%",
		height: "14%",
		flexDirection: 'column',
		marginTop: "3%",
	},
})

export default SyncButton;