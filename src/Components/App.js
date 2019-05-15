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
import {createSwitchNavigator, createAppContainer} from 'react-navigation';

//Import screens for navigation
import Loading from './Loading';
import Login from './Login';
import ChatRooms from './ChatRooms';

const rootSwitch = createSwitchNavigator(
  {
  Loading: {screen: Loading},
  Login: {screen: Login},
  ChatRooms: {screen: ChatRooms}
},
{
  initialRouteName: 'Loading'
}
)
const App =createAppContainer(rootSwitch)


export default App;

