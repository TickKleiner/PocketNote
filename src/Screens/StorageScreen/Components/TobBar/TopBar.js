import React, { useMemo }  from "react";
import { View, StyleSheet } from "react-native";
import Ionicons  from 'react-native-vector-icons/Ionicons'
import { useSelector } from 'react-redux'
import ShadowStyles from "../../../../Styles/ShadowStyles";
import { Content } from "./Components/Content.js"

export function TopBar() {
	
	const { isSigned, isSignedGoogle } = useSelector((state) => state.user);

	const icons = useMemo(() => {
		let icons = {
      "alertIcon": Ionicons.getImageSourceSync('remove-circle', 60, '#AAAAAA'),
      "googleIcon": Ionicons.getImageSourceSync('logo-google', 60, '#4285F4'),
      "yandexIcon": require("../../../../Icons/yandex_logo.png"),
    }
    return (icons);
  }, []);

	let icon = icons.alertIcon;

	if (isSigned)
	{
		if (isSignedGoogle)
			icon = icons.googleIcon;
		else
			icon = icons.yandexIcon;
	}

  return (
    <View style={[TopBarStyles.backgroundStyle, ShadowStyles.baseShadow]}>
			<Content
				isSigned={isSigned}
				isSignedGoogle={isSignedGoogle}
				icon={icon}
			/>
    </View>
  );
}

const TopBarStyles = StyleSheet.create({
	backgroundStyle: {
    width: '100%',
		height: '12%',
		backgroundColor: '#FAFAFA',
		borderRadius: 15,
	},
})

export default TopBarStyles;