import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';
import { commonStyles, textStyles, marginStyles } from '../../styles/CommonStyles'

import { Button } from '../../components/interactive/Button'
import { SelectableButton } from '../../components/interactive/SelectableButton'

const INITIAL_STATE = {
  name: '',
  email: '',
  password: '',
  passwordAgain: '',
}

export default class CreateAccountScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {...INITIAL_STATE}
  }

  static navigationOptions = {
    title: 'Account Details',
  };

  onTextUpdate = (key, newText) => {
    this.setState({
      [key]: newText,
    })
  }

  render() {
    const {
      name,
      email,
      password,
      passwordAgain,
    } = this.state;
    return (
      <View style={commonStyles.container}>
        <ScrollView>
          <View style={marginStyles.topVeryThick}>
            <InputWithLabel
              label="Name"
              onChangeText={(text) => this.onTextUpdate('name', text)}
              value={name}
              placeholder="Your full name"
            />
          </View>
        </ScrollView>
      </View>
    )
  }
}

const InputWithLabel = ({ label, onChangeText, value, placeholder, ...props }) => {
  return (
    <View>
      <Text>{label}</Text>
      <TextInput
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#888"
      />
    </View>
  )
}

const details = [
  "You have a big heart and want to give back to the community. We'll match you up with families who could use some cakes.",
  "You've got children. Children have birthdays. We'll match you up with bakers who are happy to bake you a cake.",
]

const ExplainerBox = ({ selectedIndex, ...props }) => {
  if (selectedIndex < 0) {
    return null;
  }
  return (
    <View style={explainerBoxStyles.box}>
      <Text style={explainerBoxStyles.text}>
        {details[selectedIndex]}
      </Text>
    </View>
  )
}

const Row = (props) => {
  return (
    <View style={rowStyles.row}>
      {props.children}
    </View>
  )
}

const rowStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignSelf: 'center',
  }
})

const explainerBoxStyles = StyleSheet.create({
  box: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#999',
    alignItems: 'center',
    margin: 16,
  },
  text: {
    textAlign: 'center',
    padding: 16,
  }
})