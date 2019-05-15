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



export default class App extends Component{
 
  componentDidMount() {
    SplashScreen.hide();
    firebase.auth().onIdTokenChanged(user =>{this.props.navigation.navigate(user ? 'ChatRooms' : 'Login')
  })
  }
  
  // fbAuth() {
  //   LoginManager.logInWithReadPermissions(['public_profile']).then(function(result) {
  //     if (result.isCancelled) {
  //       console.log('Login blev stoppet');
  //     }
  //     else {
  //       console.log('Login lykkedes' + result.grantedPermissions.toString());
  //     }
  //   },
  //   function(error) {
  //     console.log('Der opstod en fejl: ' + error);
  //   })
  // }
 
  render() {
    return (
      <View>
      <ActivityIndicator size="large" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: 'normal',
    marginBottom: 48,
  },
});

