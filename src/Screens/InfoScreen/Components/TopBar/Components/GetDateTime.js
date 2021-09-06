import React, { useState, useEffect, Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import moment from 'moment';
import {TextStyles} from '../../../../../Styles/TextStyles.js'

export class GetDateTime extends Component{
  constructor() {
    super();
    this.state = ({
      curMoment: new Date()
    })
  }

  componentDidMount() {
    this.intervalID = setInterval(
      () => this.tick(), 1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  tick() {
    this.setState({
      curMoment: new Date()
    });
  }

  render() {

    return(
      <View>
        <Text style={TextStyles.largeInfo}>
          {moment(this.state.curMoment).format('h:mm a')}
        </Text>
        <Text style={TextStyles.darkBlueLabel}>
          {moment(this.state.curMoment).format('MMMM Do YYYY[ | ]dddd')}
        </Text>
      </View>
    );
  }
}

export default GetDateTime;