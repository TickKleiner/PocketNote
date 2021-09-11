import React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import ShadowStyle from '../Styles/ShadowStyles.js';

export function IconButton(props) {
  const backgroundColor = 
    props.disabled ?
    props.disabledBackgroundColor :
    props.backgroundColor;
  return (
    <TouchableOpacity
      style={[
        {
          width: props.backgroundWidth,
          aspectRatio: props.aspectRatio,
          backgroundColor: backgroundColor
        },
      IconButtonStyles.background,
      ShadowStyle.baseShadow
    ]}
      onPress={async () => {await props.AsyncOnPress()}}
      disabled={props.disabled}
    >
      <Image
        source={props.icon}
        style={IconButtonStyles.icon}
      />
    </TouchableOpacity>
  );
}

const IconButtonStyles = StyleSheet.create({
	background: {
    borderRadius: 10,
    alignItems: 'center',
		justifyContent: 'center',
	},
  icon: {
		height: "75%",
    aspectRatio: 1
	},
})

export default IconButton;