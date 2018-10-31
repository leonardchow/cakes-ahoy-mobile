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
import { SelectableButton } from '../../components/interactive/SelectableButton'

const INITIAL_STATE = {
  tabSelected: -1,
}

export default class UserTypeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {...INITIAL_STATE}
  }

  static navigationOptions = {
    title: 'Create Account',
  };

  onTabSelected = (tabIndex) => {
    // TODO
    this.setState({
      tabSelected: tabIndex,
    })
  }

  onContinuePressed = () => {
    const { navigate } = this.props.navigation;
    navigate('CreateAccount');
  }

  render() {
    return (
      <View style={commonStyles.container}>
        <ScrollView>
          <View style={marginStyles.topVeryThick}>
            <Text style={[textStyles.large, textStyles.bold]}>
              Let's set you up
            </Text>
            <Text style={[textStyles.medium, marginStyles.topThick]}>
              First, are you a baker or a family?
            </Text>
            <Row>
              <SelectableButton title="Baker" onPress={() => this.onTabSelected(0)} small={true} selected={this.state.tabSelected === 0}/>
              <SelectableButton title="Family" onPress={() => this.onTabSelected(1)} small={true} selected={this.state.tabSelected === 1}/>
            </Row>
            <ExplainerBox selectedIndex={this.state.tabSelected}/>
            {this.state.tabSelected >= 0 ?
              <Button title="Continue" onPress={this.onContinuePressed}/>
             : null}
          </View>
        </ScrollView>
      </View>
    )
  }
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