import React, { Component } from 'react'
import { TextIconButton } from '../../../../../Components/TextIconButton.js'
import { View } from 'react-native';

export class  YandexButton extends Component{
  googleLogo = null;
  
  constructor(){
		super();
		this.state =  {
                    "isBisy": false,
                    "icon": require('../../../../../Icons/yandex_logo.png'),
                  };
  }

  render() {
    const buttonText = this.state.isBisy ? "LOADING" : "SIGN IN WITH YANDEX";
		return (
      <View height="20%" width="94%" marginTop="1.5%" alignSelf="center">
        <TextIconButton
          disabled={true}
          backgroundColor="#FFCC00"
          disabledBackgroundColor="#EEBB00"
          icon={this.state.icon}
          textColor="#3F414E"
          disabledTextColor="#888888"
          text={buttonText}
          onPress={() => alert("Pressed")}
        />
      </View>
	);}
}

export default YandexButton;