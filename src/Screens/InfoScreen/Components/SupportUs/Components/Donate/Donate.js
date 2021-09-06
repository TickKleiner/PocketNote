import React, { useMemo } from 'react'
import { View } from 'react-native'
import Ionicons  from 'react-native-vector-icons/Ionicons'
import { TextIconButton } from '../../../../../../Components/TextIconButton.js'

export function Donate(){
  const image = useMemo(() => {
		let image = Ionicons.getImageSourceSync('ice-cream', 40, '#4285F4');
    return (image);
  }, []);

  const backgroundColor = "#FFFFFF";
  const disabledBackgroundColor = "#EEEEEE";
  const textColor = "#3F414E";
  const disabledTextColor = "#888888";

  return (
    <View height="8%" width="100%" marginTop="1.5%">
      <TextIconButton
        disabled={true}
        backgroundColor={backgroundColor}
        disabledBackgroundColor={disabledBackgroundColor}
        icon={image}
        textColor={textColor}
        disabledTextColor={disabledTextColor}
        text="DONATE"
        onPress={() => alert("Pressed")}
      />
    </View>
  );
}

export default Donate;