import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import ShadowStyles from '../Styles/ShadowStyles.js';

export function TextIconButton(props){
	const backgroundColor=
		props.disabled ?
		props.disabledBackgroundColor :
		props.backgroundColor;
	const color = props.disabled ? props.disabledTextColor : props.textColor;
	return (
		<TouchableOpacity
      style={[
				{backgroundColor: backgroundColor},
				TextIconButtonStyles.backgroundStyle,
				ShadowStyles.baseShadow
			]}
      marginTop={props.marginTop}
      onPress={() => props.onPress()}
      disabled={props.disabled}
    >
			<View style={TextIconButtonStyles.iconFrame}>
				<Image
					style={TextIconButtonStyles.iconStyle}
					source={props.icon}
				/>
			</View>
			<View style={TextIconButtonStyles.textViewStyle}>
				<Text
          style={[{color: color}, TextIconButtonStyles.textStyle]}
        >
          {props.text}
        </Text>
			</View>
		</TouchableOpacity>
	);
}

const TextIconButtonStyles = StyleSheet.create({
	backgroundStyle: {
		height: "100%",
		width: "100%",
		flexDirection: 'row',
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
  textViewStyle: {
		position: 'absolute',
		width: "100%",
		alignItems: 'center',
		justifyContent: 'center',
	},
	textStyle: {
		fontFamily: 'Inter, sans-serif',
		fontSize: 18,
	},
	iconFrame: {
		height: "70%",
		aspectRatio: 1,
		marginLeft: "2%",
		alignContent: 'center',
		justifyContent: 'center',
		overflow: 'hidden',
	},
	iconStyle: {
		flex: 1,
    aspectRatio: 1,
    resizeMode: 'contain'
	}
})

export default TextIconButton;