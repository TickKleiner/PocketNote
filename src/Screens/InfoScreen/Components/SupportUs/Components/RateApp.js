import React, { useMemo } from 'react'
import { View, Linking } from 'react-native'
import Ionicons  from 'react-native-vector-icons/Ionicons'
import { TextIconButton } from '../../../../../Components/TextIconButton.js'

export function RateApp(){
  const image = useMemo(() => {
		let image = Ionicons.getImageSourceSync('thumbs-up-sharp', 40, '#4285F4');
    return (image);
  }, []);

  const backgroundColor = "#FFFFFF";
  const disabledBackgroundColor = "#EEEEEE";
  const textColor = "#3F414E";
  const disabledTextColor = "#888888";

  return (
    <View height="8%" width="100%" marginTop="1.5%">
      <TextIconButton
        disabled={false}
        backgroundColor={backgroundColor}
        disabledBackgroundColor={disabledBackgroundColor}
        icon={image}
        textColor={textColor}
        disabledTextColor={disabledTextColor}
        text="RATE"
        onPress={() => {
          Linking.openURL("https://github.com/Enderdroid")
            .catch(err => {
              console.error("Failed opening page because: ", err)
              alert('Failed to open page')
            })
        }}
      />
    </View>
  );
}

export default RateApp;