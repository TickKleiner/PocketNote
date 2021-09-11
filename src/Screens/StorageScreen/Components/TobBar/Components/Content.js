import googleApi from "../../../../../Utils/GoogleAPI";
import React, {useEffect, useState}  from "react";
import { View, Image, StyleSheet, Text } from "react-native";

export function Content(props) {
  const [usage, setUsage] = useState(null);
  let driveName = "no drive connected"
	let percent = "0%";
	let limit = "0 gb";
	let used = "0 gb";
  useEffect(() => {
		(async function() {
      if (!props.isSigned)
        setUsage(null);
      else if (props.isSignedGoogle)
        setUsage(await googleApi.getStorageInfo());
		})();
  }, [props.isSigned]);
  if (usage != null)
  {
    driveName = "Google drive"
	  percent = usage.percent;
	  limit = usage.limit;
	  used = usage.used;
  }
  return (
		<>
			<View
        width={percent}
        borderBottomEndRadius={percent >= "96%" ? 15 : 0}
        borderTopEndRadius={percent >= "96%" ? 15 : 0}
				style={TopBarStyles.usageBarStyle}
			/>
			<View style={TopBarStyles.iconFrame}>
				<Image
					source={props.icon}
					style={TopBarStyles.icon}
				/>
			</View>
			<View style={TopBarStyles.informationStyle}>
				<Text style={TopBarStyles.driveName}>
					{driveName}
				</Text>
				<Text style={TopBarStyles.percentStyle}>
					{percent}
				</Text>
				<Text style={TopBarStyles.usage}>
					{limit + ' of ' + used}
				</Text>
			</View>
		</>
	);
}

const TopBarStyles = StyleSheet.create({
	usageBarStyle: {
    position: "absolute",
		height: "100%",
		backgroundColor: '#8E97FD',
		borderBottomLeftRadius: 15,
		borderTopLeftRadius: 15,
	},
	informationStyle: {
		justifyContent: 'center',
		position: 'absolute',
		flex: 1,
		marginLeft: "3%",
	},
	driveName: {
		textAlignVertical: "center",
		color: '#22215b',
		fontStyle: 'italic',
		fontFamily: 'Inter, sans-serif',
		fontSize: 16,
	},
	percentStyle: {
		textAlignVertical: "center",
		color: '#22215b',
		fontWeight: "bold",
		fontFamily: 'Inter, sans-serif',
		fontSize: 24,
	},
	usage: {
		textAlignVertical: "center",
		color: '#22215b',
		fontStyle: 'italic',
		fontFamily: 'Inter, sans-serif',
		fontSize: 18,
	},
	iconFrame: {
		alignSelf: "flex-end",
		justifyContent: "center",
		marginRight: "3%",
		width: "10%",
		height: "100%",
		overflow: 'hidden',
	},
	icon: {
		width: "100%",
		aspectRatio: 1,
  },
})