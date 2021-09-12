import React, { useMemo, useEffect } from 'react';
import { View, FlatList, StyleSheet, PermissionsAndroid, Alert } from 'react-native'
import controller from '../../../../../Utils/Controller';
import { AsyncTextIconButton } from '../../../../../Components/AsyncTextIconButton.js'
import { useDispatch, useSelector } from 'react-redux'
import { setFilesData } from '../../../../../Redux/userSlice.js';
import { setLastScreenName } from '../../../../../Redux/rootSlice';
import Ionicons  from 'react-native-vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';

async function checkAndroidPermission() {
  try {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
    await PermissionsAndroid.request(permission);
    Promise.resolve();
  } catch (error) {
    Promise.reject(error);
  }
}

const OnButtonPress = async (dispatch, fileId, fileName) => {
  await checkAndroidPermission();
  await controller.downloadFile(dispatch, fileId, fileName);
}

const deleteItemById = ( dispatch, data, fileId) => {
  const filteredData = data.filter(item => item.FileId !== fileId);
  dispatch(setFilesData(filteredData));
}

const OnButtonLongPress = async (dispatch, fileId, fileName, data) => {
  Alert.alert(
    "Delete",
    "Delete \"" + fileName + "\" permanently?",
    [
      {
        text: "Cancel",
        style: "cancel"
      },
      {
        text: "OK",
        onPress: async () =>
        {
          await deleteItemById(dispatch, data, fileId);
          await controller.deleteFile(dispatch, fileId, fileName);
        }
      }
    ]
  );
}

const GetAllButtons = (props) => {
  const imageSubstr = "image";
  const videoSubstr = "video";
  const renderItem = ({ item }) => (
    <AsyncTextIconButton
      disabled={props.disabled}
      marginBottom="3%"
      marginTop="0.5%"
      backgroundColor={"#FFFFFF"}
      disabledBackgroundColor={"#EEEEEE"}
      icon={
        item.Type.includes(imageSubstr) ?
        props.icons.image           :
        item.Type.includes(videoSubstr) ?
        props.icons.video           :
        props.icons.document
      }
      textColor={"#3F414E"}
      disabledTextColor={"#888888"}
      text={item.FileName}
      asyncOnPress={async () => await OnButtonPress(props.dispatch, item.FileId, item.FileName)}
      asyncOnLongPress={async () => await OnButtonLongPress(props.dispatch, item.FileId, item.FileName, props.data)}
    />
  );
  return (
    <View width="100%" height="100%">
      <FlatList
        flexDirection='column'
        data={props.data}
        keyExtractor={(item) => item.FileId}
        renderItem={renderItem}
      />
    </View>
  );
}

export function SubScreen({ navigation, route }){
  const dispatch = useDispatch();
  const { isSigned } = useSelector((state) => state.user);
  const { busy, online, lastScreenName } = useSelector((state) => state.root);
  const { filesData } = useSelector((state) => state.user);
  const disabled = !(isSigned && !busy && online);

  useFocusEffect(() => {
    try {
      console.log(lastScreenName);
      if (lastScreenName == "StorageScreen"){
        dispatch(setFilesData(route.params.files));
      }
      dispatch(setLastScreenName("SubScreen"));
    } catch(err) {
      console.log("Unknown error: " + err);
    }
  });

  useEffect(() => {
    if(!isSigned)
      navigation.goBack();
  }, [isSigned]);

  const icons = useMemo(() => {
		const icons = {
      "image" : Ionicons.getImageSourceSync('image', 80, '#AAAAAA'),
      "video" : Ionicons.getImageSourceSync('play', 80, '#AAAAAA'),
      "document" : Ionicons.getImageSourceSync('document-text', 80, '#AAAAAA')
    };
    return (icons);
  }, []);
  
	return (
		<View style={ SubScreenStyles.ScreenView }>
      <GetAllButtons
        data={filesData}
        disabled={disabled}
        icons={icons}
        dispatch={dispatch}
      />
		</View>
	);
}

const SubScreenStyles = StyleSheet.create({
  ScreenView: {
    flex: 1,
    marginTop: "3%",
    alignItems: 'center',
    flexDirection: 'column',
	  height: "100%",
	  width: "100%",
    alignSelf: 'center',
  },
});

export default SubScreen;