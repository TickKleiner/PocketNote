import React, { useEffect, useState, setState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import ShadowStyles from '../../../../../Styles/ShadowStyles';

export function CheckBox() {
  const [autoUpload, setAutoUpload] = useState(false);
  const setData = async (value) => {
		try {
			setAutoUpload(value);
			await AsyncStorage.setItem("autoUpload", JSON.stringify(value));
		} catch (error) {
			alert('Error: '+ error);
		}
	}
  useEffect(() => {
    try {
			AsyncStorage.getItem("autoUpload").then((value) => {
				if(value !== null)
          setAutoUpload(JSON.parse(value));
			}).done();
		} catch (error) {
			alert('Error: '+ error);
		}
  }, []);

  let backgroundColor = autoUpload ? '#8E97FD' : '#FFFFFF';
	return (
		<View style={[StorageScreenStyles.backgroundStyle, ShadowStyles.baseShadow]}>
			<View style={StorageScreenStyles.textViewStyle}>
				<Text style={StorageScreenStyles.textStyle}>Auto upload</Text>
			</View>
			<TouchableOpacity
        style={[{backgroundColor: backgroundColor}, StorageScreenStyles.CheckboxStyle]}
        backgroundColor={backgroundColor}
        onPress={async () => await setData(!autoUpload)}
      />
		</View>
	);
}

const StorageScreenStyles = StyleSheet.create({
	backgroundStyle: {
		flexDirection: 'row',
		width: "50%",
		flex: 1,
		backgroundColor: '#FFFFFF',
		borderRadius: 15,
		alignItems: 'center',
		alignSelf: 'flex-end',
		justifyContent: 'flex-end',
		marginTop: "1.5%",
	},
	textStyle: {
		color: '#3f414e',
		fontFamily: 'Inter, sans-serif',
		fontSize: 18,
	},
	textViewStyle: {
		position: 'absolute',
		width: "100%",
		alignItems: 'flex-start',
		marginRight: '20%',
		justifyContent: 'center',
	},
	CheckboxStyle: {
		height: "75%",
		aspectRatio: 1,
		marginRight: "3%",
		borderRadius: 10,
		borderWidth: 3,
		borderColor: "#A1A4B2",
	},
})


export default CheckBox;