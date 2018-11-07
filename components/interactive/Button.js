import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { buttonStyles } from './defaultStyles'

export const Button = ({ onPress, title, style, small, enabled, ...props }) => {
  if (!style) {
    style = {
      ...buttonStyles
    }
  }
  const buttonTextStyles = [style.buttonText]
  if (small) {
    buttonTextStyles.push(buttonStyles.buttonTextSmall)
  }
  const disabled = enabled === false;
  return (
    <View style={style.buttonContainer}>
      <TouchableOpacity style={disabled ? style.disabledButton : style.button} onPress={onPress} activeOpacity={0.5} disabled={disabled} props>
        <Text style={buttonTextStyles}>{title}</Text>
      </TouchableOpacity>
    </View>
  )
}
