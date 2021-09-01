import React, { useState, useEffect, Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import moment from 'moment';

export class GetDateTime extends Component{
  constructor() {
    super();
    this.state = {
      curMoment: new Date()
    }
  }
  tick() {
    this.setState({
      time: new Date()
    });
  }

  componentDidMount() {
    intervalID = setInterval(
      () => this.tick(), 1000
    );
  }

  componentWillUnmount() {
    clearInterval(intervalID);
  }

  render() {
    return(
      <View>
        <Text style={GetDateTimeStyles.timeStyle}>
          {moment(this.state.curMoment).format('h:mm a')}
        </Text>
        <Text style={GetDateTimeStyles.dateStyle}>
          {moment(this.state.curMoment).format('MMMM Do YYYY[ | ]dddd')}
        </Text>
      </View>
    );
  }
}

const GetDateTimeStyles = StyleSheet.create({	
	timeStyle: {
		textAlignVertical: "center",
		color: '#22215b',
		fontWeight: "bold",
		fontFamily: 'Inter, sans-serif',
		fontSize: 24,
	},
	dateStyle: {
		textAlignVertical: "center",
		color: '#22215b',
		fontStyle: 'italic',
		fontFamily: 'Inter, sans-serif',
		fontSize: 18,
	},
})

export default GetDateTime;