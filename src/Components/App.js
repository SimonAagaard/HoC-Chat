/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, ActivityIndicator, Text, View} from 'react-native';
import FBSDK, {LoginManager} from 'react-native-fbsdk';
import FBLoginButton from './FBLoginButton';
import SplashScreen from 'react-native-splash-screen';
import firebase from 'react-native-firebase';
import {createSwitchNavigator, createAppContainer, createStackNavigator} from 'react-navigation';

//Import screens for navigation
import Loading from './Loading';
import Login from '../Views/Login';
import ChatRooms from '../Views/ChatRooms';
import Chat from '../Views/Chat';

//Setting up a SwitchNavigator to handle the navigation in the app, easily scaleable if more screens are needed
const rootStack = createStackNavigator(
  {
  Loading: {name: 'Loading', screen: Loading,
navigationOptions: {
    header:null
  }},
  Login: {name: 'Login', screen: Login,
  navigationOptions: {
    header:null
  }},
  ChatRooms: {name:'ChatRooms', screen: ChatRooms, 
  navigationOptions: {
    header:null
  }},
  Chat:{name:'Chat', screen:Chat}
},
{
  initialRouteName: 'Loading',
}
)
const App = createAppContainer(rootStack)


export default App;

