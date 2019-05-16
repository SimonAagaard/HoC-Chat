import React, { Component } from 'react';
import { View } from 'react-native';
import { LoginButton, AccessToken } from 'react-native-fbsdk';


//Component for the facebook loginbutton i might use at Login.js
export default class FBLoginButton extends Component {
  render() {
    return (
      <View>

        <LoginButton
          onLoginFinished={
            (error, result) => {
              if (error) {
                console.log("Der opstod følgende fejl ved login: " + result.error);
              } else if (result.isCancelled) {
                console.log("Login blev afbrudt");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    console.log(data.accessToken.toString())
                  }
                )
              }
            }
          }
          onLogoutFinished={() => console.log("logout.")}/>
      </View>
    );
  }
};

module.exports = FBLoginButton;