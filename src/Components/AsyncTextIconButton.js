import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Vibration } from 'react-native';
import ShadowStyles from '../Styles/ShadowStyles.js';

export function AsyncTextIconButton(props){
	const ONE_STAGE = 50;

  const PATTERN = [
    0.2 * ONE_STAGE,
    0.6 * ONE_STAGE,
    0.2 * ONE_STAGE
  ];

	const backgroundColor=
		props.disabled ?
		props.disabledBackgroundColor :
		props.backgroundColor;

	const color = props.disabled ? props.disabledTextColor : props.textColor;
	return (
		<TouchableOpacity
      style={[
				{
					backgroundColor: backgroundColor,
					marginBottom: props.marginBottom,
					marginTop: props.marginTop
				},
				AsyncTextIconButtonStyles.backgroundStyle,
				ShadowStyles.baseShadow
			]}
      onPress={async () => await props.asyncOnPress()}
			onLongPress={async () => {
				Vibration.vibrate(PATTERN);
				await props.asyncOnLongPress();
			}}
      disabled={props.disabled}
    >
			<View style={AsyncTextIconButtonStyles.iconFrame}>
				<Image
					style={AsyncTextIconButtonStyles.iconStyle}
					source={props.icon}
				/>
			</View>
			<View style={AsyncTextIconButtonStyles.textViewStyle}>
				<Text
					numberOfLines={1}
          style={[{color: color}, AsyncTextIconButtonStyles.textStyle]}
        >
          {props.text}
        </Text>
			</View>
		</TouchableOpacity>
	);
}

const AsyncTextIconButtonStyles = StyleSheet.create({
	backgroundStyle: {
		width: "84%",
		alignSelf: 'center',
		flexDirection: 'row',
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
  textViewStyle: {
		width: "70%",
		marginLeft: "2%",
		justifyContent: 'center',
	},
	textStyle: {
		fontFamily: 'Inter, sans-serif',
		fontWeight: "bold",
		fontSize: 16,
	},
	iconFrame: {
		width: "20%",
		aspectRatio: 1,
		alignContent: 'center',
		justifyContent: 'center',
	},
	iconStyle: {
		alignSelf: 'center',
		width: "90%",
    aspectRatio: 1,
    resizeMode: 'contain'
	}
})

export default AsyncTextIconButton;