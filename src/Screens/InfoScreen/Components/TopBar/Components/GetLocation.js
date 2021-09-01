import React, {Component, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import publicIP from 'react-native-public-ip';

export class GetLocation extends Component{
	constructor() {
    super();
    this.state = {
      city: 'Undefined'
    }
		this.getCity();
  }

  getCity(){
		publicIP().then(ip => {
			fetch('http://ip-api.com/json/' + ip)
			.then(response => response.json())
			.then(data =>
				this.setState({
					city: data.city
				})
			)
			.catch(error => {
				console.log(error);
			});
		}).catch(error => {
			console.log(error);
		});
	}

	render() {
  	return(
    	<View>
    	  <Text style={GetLocationStyles.cityStyle}>
			  	{this.state.city}
			  </Text>
    	</View>
  );}
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