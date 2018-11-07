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
import { ConditionalRender } from '../../components/ConditionalRender'

import { auth } from '../../firebase';

import { NavigationActions } from 'react-navigation';

const VIEW_STATES = {
  FORM: 0,
  CREATING_ACCOUNT: 1,
  COMPLETED_CREATION: 2,
  ERROR: -1,
}

const INITIAL_STATE = {
  name: '',
  email: '',
  password: '',
  passwordAgain: '',
  showPasswordError: false,
  viewState: VIEW_STATES.FORM,
}

export default class CreateAccountScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {...INITIAL_STATE}
  }

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    if (params && params.disableBack === true) {
      return {
        title: 'Account Details',
        headerLeft: null,
        gesturesEnabled: false,
      }
    } else {
      return {
        title: 'Account Details',
      }
    }
  }

  onTextUpdate = (key, newText) => {
    this.setState({
      [key]: newText,
    })
  }

  onCreatePressed = () => {
    this.props.navigation.setParams({
      disableBack: true,
    })
    this.setState({
      viewState: VIEW_STATES.CREATING_ACCOUNT,
    })

    const {
      email,
      password,
      passwordAgain,
    } = this.state;

    if (password !== passwordAgain) {
      this.setState({
        showPasswordError: true,
      })
      return;
    }
    // TODO MOCK INTERACTION
    // TODO GET USER TYPE FROM PREVIOUS SCREEN
    setTimeout(()=>{
      this.setState({
        viewState: VIEW_STATES.COMPLETED_CREATION,
      })
    },2000)

    // Interact with firebase

    // auth.doCreateUserWithEmailAndPassword(email, password)
    //   .then(user => {
    //     this.setState({
    //       viewState: VIEW_STATES.COMPLETED_CREATION,
    //     })
    //   })
  }

  onContinuePressed = () => {
    const { navigate, reset } = this.props.navigation;
    reset([NavigationActions.navigate({ routeName: 'HomeScreen' })], 0)
  }

  render() {
    const {
      name,
      email,
      password,
      passwordAgain,
      showPasswordError,
      viewState,
    } = this.state;
    const isFormValid = (() => {
      if (name.length === 0) return false
      if (email.length === 0) return false
      if (password.length === 0) return false
      if (password !== passwordAgain) return false
      return true;
    })()
    return (
      <View style={commonStyles.container}>
        <ConditionalRender show={viewState === VIEW_STATES.FORM}>
          <ScrollView>
            <View style={marginStyles.topVeryThick}>
              <InputWithLabel
                label="Name"
                onChangeText={(text) => this.onTextUpdate('name', text)}
                value={name}
                placeholder="Your full name"
                textContentType="name"
                returnKeyType="next"
                onSubmitEditing={() => {
                  // Trim name
                  this.setState({
                    name: name.trim(),
                  })
                  this.fieldEmail.focus()
                }}
                doRef={(input) => { this.fieldName = input }}
                autoFocus={true}
              />
              <InputWithLabel
                label="Email"
                onChangeText={(text) => this.onTextUpdate('email', text)}
                value={email}
                placeholder="simonpegg@hotfuzz.com"
                returnKeyType="next"
                keyboardType="email-address"
                textContentType="emailAddress"
                onSubmitEditing={() => {
                  // Trim name
                  this.setState({
                    email: email.trim(),
                  })
                  this.fieldPassword.focus()
                }}
                doRef={(input) => { this.fieldEmail = input }}
              />
              <InputWithLabel
                label="Password"
                onChangeText={(text) => this.onTextUpdate('password', text)}
                value={password}
                password={true}
                returnKeyType="next"
                onSubmitEditing={() => { this.fieldPasswordAgain.focus() }}
                autoCorrect={false}
                doRef={(input) => { this.fieldPassword = input }}
              />
              <InputWithLabel
                label="Password again"
                onChangeText={(text) => this.onTextUpdate('passwordAgain', text)}
                value={passwordAgain}
                password={true}
                returnKeyType="go"
                doRef={(input) => { this.fieldPasswordAgain = input }}
                autoCorrect={false}
                onSubmitEditing={this.onCreatePressed}
                onBlur={() => {
                  if (password.length > 0 && password !== passwordAgain) {
                    console.log("PASSWORD DONT MATCH");
                    this.setState({
                      showPasswordError: true,
                    })
                  }
                }}
              />
              <ConditionalRender show={showPasswordError}>
                <Text style={[errorStyle.text]}>
                  Passwords do not match
                </Text>
              </ConditionalRender>
              <Button title="Create account" onPress={this.onCreatePressed} enabled={isFormValid}
              />
            </View>
          </ScrollView>
        </ConditionalRender>
        <ConditionalRender show={viewState === VIEW_STATES.CREATING_ACCOUNT}>
          <Text style={[textStyles.large, textStyles.bold]}>
            Getting you set up...
          </Text>
        </ConditionalRender>
        <ConditionalRender show={viewState === VIEW_STATES.COMPLETED_CREATION}>
          <Text style={[textStyles.large, textStyles.bold]}>
            DONE!!!
          </Text>
          <Button title="Continue" onPress={this.onContinuePressed}/>
        </ConditionalRender>
      </View>
    )
  }
}

const InputWithLabel = ({ label, onChangeText, value, password, placeholder, doRef, ...props }) => {
  return (
    <View>
      <Text>{label}</Text>
      <TextInput
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#888"
        secureTextEntry={password === true}
        ref={doRef}
        {...props}
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

const errorStyle = StyleSheet.create({
  text: {
    textAlign: 'center',
    color: '#F00',
  }
})