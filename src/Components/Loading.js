import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import SplashScreen from 'react-native-splash-screen';
import { StyleSheet, ActivityIndicator, Text, View } from 'react-native';

//Component responsible for taking the user to the correct screen upon loading the app and proceeding from the splash screen
export default class Loading extends React.Component {

    componentDidMount() {
        SplashScreen.hide();
        //Specific line for the purpose of this component
        firebase.auth().onIdTokenChanged(user => {
            this.props.navigation.navigate(user ? 'ChatRooms' : 'Login')
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
