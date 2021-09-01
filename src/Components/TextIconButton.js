import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ShadowStyle from '../Styles/ShadowStyle';

export function TextIconButton(props){
	return (
		<TouchableOpacity
      style={[TextIconButtonStyles.backgroundStyle, ShadowStyle.baseShadow]}
      backgroundColor={
                        props.disabled ?
                        props.backgroundColor :
                        props.disabledBackgroundColor
                      }
      marginTop={props.marginTop}
      onPress={() => props.onPress()}
      disabled={props.disabled}
    >
      <View style={TextIconButtonStyles.iconFrame}>
			  {props.icon}
		  </View>
			<View style={TextIconButtonStyles.textViewStyle}>
				<Text
          style={TextIconButtonStyles.textStyle}
          color={props.disabled ? props.textColor : props.disabledTextColor}
        >
          {props.Text}
        </Text>
			</View>
		</TouchableOpacity>
	);
}

const TextIconButtonStyles = StyleSheet.create({
	backgroundStyle: {
    height: '8%',
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
		marginLeft: "5%",
		justifyContent: 'center',
		alignItems: 'center',
	},
})

export default TextIconButton;