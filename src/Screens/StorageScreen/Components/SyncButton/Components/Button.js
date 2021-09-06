import React, { useMemo } from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import Ionicons  from 'react-native-vector-icons/Ionicons'
import { TextIconButton } from '../../../../../Components/TextIconButton.js'

export function ShareApp() {
  const { isSigned, isSignedGoogle } = useSelector((state) => state.user);
  /* COMING SOON
  * const { busy, online } = useSelector((state) => state.root);
  * const disabled = !(isSigned && !busy && online);
  */
  const icons = useMemo(() => {
		let icons = {
      "alertIcon": Ionicons.getImageSourceSync('remove-circle', 120, '#AAAAAA'),
      "googleIcon": Ionicons.getImageSourceSync('logo-google', 120, '#4285F4'),
      "yandexIcon": require("../../../../../Icons/yandex_logo.png"),
    }
    return (icons);
  }, []);

  let icon;
  if (isSigned)
  {
    if (isSignedGoogle)
      icon = icons.googleIcon;
    else
      icon = icons.yandexIcon;
  } else {
    icon = icons.alertIcon;
  }
  

  const backgroundColor = "#FFFFFF";
  const disabledBackgroundColor = "#EEEEEE";
  const textColor = "#3F414E";
  const disabledTextColor = "#888888";

  return (
    <View width="100%" flex={2}>
      <TextIconButton
        disabled={true}
        backgroundColor={backgroundColor}
        disabledBackgroundColor={disabledBackgroundColor}
        icon={icon}
        textColor={textColor}
        disabledTextColor={disabledTextColor}
        text="UPLOAD APP DATA"
        onPress={() => {}}
      />
    </View>
  );
}

export default ShareApp;