import React, { useMemo } from 'react'
import { View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { IconButton } from '../../../../Components/IconButton.js'
import Ionicons from 'react-native-vector-icons/Ionicons'
import controller from '../../../../Utils/Controller.js'
import LocalAuthentication from 'rn-local-authentication';

export function DownloadButton(props) {
  const dispatch = useDispatch();
  const { currentUser, isSigned } = useSelector((state) => state.user);
  const { busy, online } = useSelector((state) => state.root);
  const icon = useMemo(() => {
    let icon = Ionicons.getImageSourceSync('cloud-download', 80, '#AAAAAA');
    return (icon);
  }, []);
  const disabled = !(isSigned && !busy && online);
  return (
    <View
      width="100%"
      marginTop="3%"
    >
      <IconButton
        disabled={disabled}
        backgroundWidth={"100%"}
        aspectRatio={2}
        backgroundColor={"#FFFFFF"}
        disabledBackgroundColor={"#EEEEEE"}
        icon={icon}
        AsyncOnPress={async () => {
          const isBioSuported = await LocalAuthentication.isSupportedAsync();
          const isBioAvalible = await LocalAuthentication.isAvailableAsync();
          let authStatus = false;
          if (isBioAvalible && isBioSuported) {
            const authResp = await LocalAuthentication.authenticateAsync({
              reason: "Enter Storage"
            });
            authStatus = authResp.success;
          } else {
            authStatus = true;
            alert("Biometry is not avalible/supported\nYou can turn it on to protect storage");
          }
          if (authStatus == true) {
            let filesList = await controller.getFilesList(dispatch, currentUser);
            props.navigation.navigate({
              name: "SubScreen",
              params: { "files": filesList },
            });
          }
        }}
      />
    </View>
  );
}

export default DownloadButton;