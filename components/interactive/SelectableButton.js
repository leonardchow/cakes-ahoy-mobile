import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { buttonStyles } from './defaultStyles'

export const SelectableButton = ({ onPress, title, small, selected, ...props }) => {
  const style = {
    ...buttonStyles
  }
  const buttonTextStyles = [style.buttonText]
  if (small) {
    buttonTextStyles.push(buttonStyles.buttonTextSmall)
  }

  const buttonStyling = [style.button]
  if (selected) {
    buttonStyling.push(buttonStyles.buttonSelected)
  }

  return (
    <View style={style.buttonContainer}>
      <TouchableOpacity style={buttonStyling} onPress={onPress} activeOpacity={0.5}>
        <Text style={buttonTextStyles}>{title}</Text>
      </TouchableOpacity>
    </View>
  )
}
