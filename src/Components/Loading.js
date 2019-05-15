import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import SplashScreen from 'react-native-splash-screen';
import {StyleSheet, ActivityIndicator, Text, View} from 'react-native';


class Loading extends Component {
   
    componentDidMount() {
    SplashScreen.hide();
    firebase.auth().onIdTokenChanged(user =>{this.props.navigation.navigate(user ? 'ChatRooms' : 'Login')
  })
   }
    render() {
        return (
            <View>
      <ActivityIndicator size="large" />
      </View>
        );
    }
}

export default Loading;