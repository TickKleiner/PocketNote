import React, { useMemo } from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import { IconButton } from '../../../../Components/IconButton.js'
import Ionicons  from 'react-native-vector-icons/Ionicons'

export function DownloadButton() {
  const { isSigned } = useSelector((state) => state.user);
  const { busy, online } = useSelector((state) => state.root);
  const icon = useMemo(() => {
		let icon = Ionicons.getImageSourceSync('cloud-download', 80, '#AAAAAA');
    return (icon);
  }, []);
  const disabled = !(isSigned && !busy && online);
  console.log(disabled + " = " + isSigned + " && " + !busy + " && " + online);
  const backgroundColor = "#FFFFFF";
  const disabledBackgroundColor = "#EEEEEE";
  const backgroundWidth = "100%";
  const aspectRatio = 2;
  return(
    <View
      width="100%"
      marginTop="3%"
    >
      <IconButton
        disabled={disabled}
        backgroundWidth={backgroundWidth}
        aspectRatio={aspectRatio}
        backgroundColor={backgroundColor}
        disabledBackgroundColor={disabledBackgroundColor}
        icon={icon}
        AsyncOnPress={() => {}}
      />
    </View>
  );
}

export default DownloadButton;