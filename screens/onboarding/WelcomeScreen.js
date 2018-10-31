import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';
import { commonStyles, textStyles, marginStyles } from '../../styles/CommonStyles'

import { Button } from '../../components/interactive/Button'

export default class WelcomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: 'Welcome',
  };

  onCreateAccountPress = () => {
    // TODO
    const { navigate } = this.props.navigation;
    navigate('UserTypeChooser');
  }

  onSignInPress = () => {
    // TODO
  }

  render() {
    return (
      <View style={commonStyles.container}>
        <ScrollView>
          <View style={marginStyles.topVeryThick}>
            <Text style={[textStyles.large, textStyles.bold]}>
              Welcome to CakesAhoy™!
            </Text>
            <Text style={[textStyles.medium, marginStyles.topThick]}>
              Set up your account to get started.
            </Text>
            <Button title="Create your account" onPress={this.onCreateAccountPress}/>
            <Text style={[textStyles.small, marginStyles.topThick]}>
              Or if you already have one, just sign in.
            </Text>
            <Button title="Sign in now" onPress={this.onSignInPresss} small={true}/>
          </View>
        </ScrollView>
      </View>
    )
  }
}