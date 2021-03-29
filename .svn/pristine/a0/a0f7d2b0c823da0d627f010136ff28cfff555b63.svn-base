

import React from 'react';
import { Button, Image, View, Text } from 'react-native';
import { SafeAreaView } from 'react-navigation';

export default class WelcomeScreen extends React.Component {
  render() {
    return (
      <SafeAreaView>
        <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor:"#eee"}}>
          <Text  >WelcomeScreen!</Text>
          <Button
            title="Go to Login"
            onPress={() => {
              this.props.navigation.navigate('Login');
            }}
          />
        </View>

      </SafeAreaView>
    );
  }
}