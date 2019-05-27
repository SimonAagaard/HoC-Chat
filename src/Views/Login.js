import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { AccessToken, LoginManager, LoginButton } from 'react-native-fbsdk';
import firebase from 'react-native-firebase'
import { GoogleSigninButton, GoogleSignin } from 'react-native-google-signin';
import firebaseApp from '../Components/firebaseConfig';
// import FBLoginButton from './FBLoginButton';


export default class Login extends Component {

    componentDidMount() {
        GoogleSignin.configure({
            scopes: [
                'https://www.googleapis.com/auth/drive',
                'https://www.googleapis.com/auth/drive.appdata',
                'https://www.googleapis.com/auth/drive.file',
                'https://www.googleapis.com/auth/drive.metadata',
                'https://www.googleapis.com/auth/drive.metadata.readonly',
                'https://www.googleapis.com/auth/drive.photos.readonly',
               'openid', 'email', 'profile'], 
            webClientId: '213027420366-prcnlkcm5la35mrdcuc54rjanp5o2u74.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
            forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
        });
    }

    //Function handeling the integration of Facebook login with firebase
    fbAuth() {
        LoginManager.logInWithReadPermissions(['public_profile', 'email'])
            .then(function (result) {
                if (result.isCancelled) {
                    alert('Login blev afbrudt');
                }
                else {
                    AccessToken.getCurrentAccessToken().then((accesTokenData) => {
                        const credential = firebase.auth.FacebookAuthProvider.credential(accesTokenData.accessToken)
                        firebase.auth().signInWithCredential(credential).then((userId, name, email, pushToken) => {
                            //Promise was succesful
                            firebase.database().ref(`users/userId`).set({
                                username: name,
                                email: email,
                                pushToken: pushToken
                            })

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
    }
    writeUserData(userId, name, email, pushToken) {
        firebase.database().ref('users/' + userId).set({
            username: name,
            email: email,
            pushToken: pushToken
        });
    }


    // Not working at the moment, and becoming too much of a timesink, might get back to it later
   googleAuth = () => {
    GoogleSignin.signIn()
    .then((data) => {
      // Create a new Firebase credential with the token
      const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
      // Login with the credential
      return firebase.auth().signInWithCredential(credential);
    })
    .then((user) => {
      // If you need to do anything with the user, do it here
      // The user will be logged in automatically by the
      // `onAuthStateChanged` listener we set up in App.js earlier
    })
    .catch((error) => {
      const { code, message } = error;
      // For details of error codes, see the docs
      // The message contains the default Firebase string
      // representation of the error
    });
   }
   
    // googleAuth = async() => {
    //         try {

    //           const user = await GoogleSignin.signIn();
    //           this.setState({user})

    //           // create a new firebase credential with the token
    //           const googleCredential = firebase.auth.GoogleAuthProvider.credential(user.idToken, user.accessToken)
    //           // login with credential
    //           const firebaseUserCredential = await firebase.auth().signInWithCredential(googleCredential);

    //           console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()));
    //         } catch (e) {
    //           console.error(e);
    //         }
    //       }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={require('../Components/images/Logo.png')} />
                <View style={styles.welcome}>
                    <Text style={{ color: '#d8a55a', fontSize: 24 }}>Velkommen </Text>
                    <Text style={{ color: '#aa81ac', fontSize: 24 }}>til </Text>
                    <Text style={{ color: '#6998ad', fontSize: 24, marginBottom: '5%' }}>HoC-Chat!</Text>
                    <Text style={{ color: '#d7734a', fontSize: 24 }}> &#123; </Text>

                </View>

                {/* <LoginButton>
                    onPress=
                </LoginButton> */}
                <Button
                    onPress={this.fbAuth}
                    title="Log ind med facebook"
                    color="#39569c"
                />
                <GoogleSigninButton
                 style={{ width: 192, height: 48 }}
                 size={GoogleSigninButton.Size.Wide}
                 color={GoogleSigninButton.Color.Dark}
                 onPress={this.googleAuth}
                />
                <Text style={{ color: '#d7734a', fontSize: 24, textAlign: 'left', marginTop: '5%', marginLeft: '10%', alignSelf: 'stretch' }}> &#125; </Text>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ffffff'

    },
    image: {
        width: 200,
        height: 200,
        marginTop: '10%',
        resizeMode: 'stretch'
    },
    welcome: {
        flexDirection: 'row'
    }
})

