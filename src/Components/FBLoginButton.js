import React, { Component } from 'react';
import { View } from 'react-native';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import firebase from 'react-native-firebase'


//Component for the facebook loginbutton i might use at Login.js
export default class FBLoginButton extends Component {
  render() {
    return (
      <View>
        <LoginButton
          onLoginFinished={
            LoginManager.logInWithReadPermissions(['public_profile', 'email'])
              .then(function (result) {
                if (result.isCancelled) {
                  alert('Login blev afbrudt');
                }
                else {
                  AccessToken.getCurrentAccessToken().then((accesTokenData) => {
                    const credential = firebase.auth.FacebookAuthProvider.credential(accesTokenData.accessToken)
                    firebase.auth().signInWithCredential(credential).then((result) => {
                      //Promise was succesful

                    }, (error) => {
                      //promise was rejected
                      console.log(error)
                    })
                  },
                    (error) => {
                      console.log('En fejl opstod' + error)
                    })
                }
              })
          }></LoginButton>
      </View>
    );
  }
};

module.exports = FBLoginButton;