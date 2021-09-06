import React, { useMemo } from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import contentPicker from '../../../../Utils/ContentPicker.js'
import { IconButton } from '../../../../Components/IconButton.js'
import Ionicons  from 'react-native-vector-icons/Ionicons'

export function UploadButtons() {
  const { isSigned } = useSelector((state) => state.user);
  const { busy, online } = useSelector((state) => state.root);
  const icons = useMemo(() => {
		let icons = {
      "imageIcon": Ionicons.getImageSourceSync('image', 80, '#AAAAAA'),
      "documentIcon": Ionicons.getImageSourceSync('document-text', 80, '#AAAAAA'),
      "videoIcon": Ionicons.getImageSourceSync('play', 80, '#AAAAAA'),
    }
    return (icons);
  }, []);
  const disabled = !(isSigned && !busy && online);
  console.log(disabled + " = " + isSigned + " && " + !busy + " && " + online);
  const backgroundColor = "#FFFFFF";
  const disabledBackgroundColor = "#EEEEEE";
  const backgroundWidth = "32%";
  const aspectRatio = 1;

  return(
    <View
      width="100%"
      marginTop="3%"
		  flexDirection='row'
		  justifyContent='space-around'
    >
      <IconButton
        disabled={disabled}
        backgroundWidth={backgroundWidth}
        aspectRatio={aspectRatio}
        backgroundColor={backgroundColor}
        disabledBackgroundColor={disabledBackgroundColor}
        icon={icons.imageIcon}
        AsyncOnPress={async () => {alert("Pressed")}}
      />
      <IconButton
        disabled={disabled}
        backgroundWidth={backgroundWidth}
        aspectRatio={aspectRatio}
        backgroundColor={backgroundColor}
        disabledBackgroundColor={disabledBackgroundColor}
        icon={icons.documentIcon}
        AsyncOnPress={() => {}}
      />
      <IconButton
        disabled={disabled}
        backgroundWidth={backgroundWidth}
        aspectRatio={aspectRatio}
        backgroundColor={backgroundColor}
        disabledBackgroundColor={disabledBackgroundColor}
        icon={icons.videoIcon}
        AsyncOnPress={() => {}}
      />
    </View>
  );
}

export default UploadButtons;