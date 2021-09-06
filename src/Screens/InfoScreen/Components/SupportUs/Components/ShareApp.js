import React, { useMemo } from 'react'
import { View, Share } from 'react-native'
import Ionicons  from 'react-native-vector-icons/Ionicons'
import { TextIconButton } from '../../../../../Components/TextIconButton.js'

const onShare = async (share_message) => {
  try {
    const result = await Share.share({
      message:
        share_message,
    });
  } catch (error) {
    alert(error.message);
  }
}

export function ShareApp(){
  const image = useMemo(() => {
		let image = Ionicons.getImageSourceSync('arrow-redo', 40, '#4285F4');
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
        text="SHARE"
        onPress={() => onShare("My git hub - https://github.com/Enderdroid")}
      />
    </View>
  );
}

export default ShareApp;