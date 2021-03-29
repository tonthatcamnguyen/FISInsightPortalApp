import React from 'react';
import {Button, Image, View, Text} from 'react-native';
import {createAppContainer} from 'react-navigation'; // 1.0.0-beta.27
import {createStackNavigator} from 'react-navigation-stack';

import {createBottomTabNavigator} from 'react-navigation-tabs';

import Login from '../components/login/Login';

import WelcomeScreen from '../components/welcomeScreen/WelcomeScreen';

import Home from '../components/home/Home';
import Home2 from '../components/home/Home';





const TabNavigator = createBottomTabNavigator({
  Home: Home,
  Home2: Home2


});

const TAB = createAppContainer(TabNavigator);

const RootStack = createStackNavigator(
  {
    Init: {
      screen: WelcomeScreen,
    },
    Login: {
      screen: Login,
    },

    MyModal: {
      screen: TAB,
    },


  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);

export default createAppContainer(RootStack);
