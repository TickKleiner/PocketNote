'use strict';
import {StyleSheet} from 'react-native';

export const TextStyles = StyleSheet.create({
  largeHeader: {
    color: '#3f414e',
    fontFamily: 'Inter, sans-serif',
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 34,
  },
  label: {
    textAlignVertical: "center",
	  color: '#AAAAAA',
	  fontStyle: 'italic',
	  fontFamily: 'Inter, sans-serif',
	  fontSize: 16,
  },
  darkBlueLabel: {
    textAlignVertical: "center",
		color: '#22215b',
		fontStyle: 'italic',
		fontFamily: 'Inter, sans-serif',
		fontSize: 16,
  },
  buttonText: {
    fontFamily: 'Inter, sans-serif',
		fontSize: 18,
  },
  largeInfo: {
    textAlignVertical: "center",
	  color: '#22215b',
	  fontWeight: "bold",
	  fontFamily: 'Inter, sans-serif',
	  fontSize: 24,
  },
  Header: {
    color: '#3f414e',
		fontFamily: 'Inter, sans-serif',
		fontSize: 28,
		fontWeight: '700',
		lineHeight: 34,
  }
});

export default TextStyles;