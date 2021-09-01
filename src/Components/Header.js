import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export function Header(props){
  return (
    <View
      style={HeaderStyles.view_component}
      marginTop={props.marginTop}
    >
        <Text style={HeaderStyles.text}>{props.text}</Text>
        <View style={HeaderStyles.iconFrame}>
		      {props.icon}
		    </View>
    </View>
  );
}

const HeaderStyles = StyleSheet.create({
	view_component: {
		flex: 0,
		marginTop: "5%",
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