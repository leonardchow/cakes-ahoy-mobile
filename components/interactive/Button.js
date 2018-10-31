import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { buttonStyles } from './defaultStyles'

export const Button = ({ onPress, title, style, small, ...props }) => {
  if (!style) {
    style = {
      ...buttonStyles
    }
  }
  const buttonTextStyles = [style.buttonText]
  if (small) {
    buttonTextStyles.push(buttonStyles.buttonTextSmall)
  }
  return (
    <View style={style.buttonContainer}>
      <TouchableOpacity style={style.button} onPress={onPress} activeOpacity={0.5}>
        <Text style={buttonTextStyles}>{title}</Text>
      </TouchableOpacity>
    </View>
  )
}
