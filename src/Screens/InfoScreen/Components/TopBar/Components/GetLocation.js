import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet, Text } from 'react-native';
import publicIP from 'react-native-public-ip';

const getCity = async (setCity) => {
	publicIP().then(ip => {
		fetch('http://ip-api.com/json/' + ip)
		.then(response => response.json())
		.then(data =>
			setCity(data.city)
		)
		.catch(error => {
			console.log(error);
		});
	}).catch(error => {
		console.log(error);
	});
}


export function GetLocation() {
	const [city, setCity] = useState('Undefined');
  const { online } = useSelector((state) => state.root);

	useEffect(() => {
    if (online){
      getCity(setCity);
    }
  }, [online]);

  return(
    <View>
      <Text style={GetLocationStyles.cityStyle}>
		  	{city}
		  </Text>
    </View>
  );
}

const GetLocationStyles = StyleSheet.create({
	cityStyle: {
		textAlignVertical: "center",
		color: '#22215b',
		fontStyle: 'italic',
		fontFamily: 'Inter, sans-serif',
		fontSize: 16,
	},
})

export default GetLocation;