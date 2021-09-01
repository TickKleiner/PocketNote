'use strict';
import {StyleSheet} from 'react-native';

export const ShadowStyles = StyleSheet.create({
  baseShadow: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 15,
    elevation: 8,
  },
});

export default ShadowStyles;