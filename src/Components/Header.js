import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export function Header(props){
  return (
    <View
      style={HeaderStyles.viewComponent}
      marginTop={props.marginTop}
    >
        <Text style={HeaderStyles.text}>{props.text}</Text>
    </View>
  );
}

const HeaderStyles = StyleSheet.create({
	viewComponent: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'flex-start',
	},
	text: {
		color: '#3f414e',
		fontFamily: 'Inter, sans-serif',
		fontSize: 28,
		fontWeight: '700',
		lineHeight: 34,
	},
  iconFrame: {
		marginLeft: "15%",
	},
})

export default Header;