import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { AccessToken, LoginManager, LoginButton } from 'react-native-fbsdk';
import firebase from 'react-native-firebase'
import { GoogleSigninButton, GoogleSignin } from 'react-native-google-signin';
import firebaseApp from '../Components/firebaseConfig';
// import FBLoginButton from './FBLoginButton';


export default class Login extends Component {

    componentDidMount() {
        //Need to be called here when the component mounts, for the google signin to work
        GoogleSignin.configure({
            scopes: [
                'https://www.googleapis.com/auth/drive',
                'https://www.googleapis.com/auth/drive.appdata',
                'https://www.googleapis.com/auth/drive.file',
                'https://www.googleapis.com/auth/drive.metadata',
                'https://www.googleapis.com/auth/drive.metadata.readonly',
                'https://www.googleapis.com/auth/drive.photos.readonly',
                'openid', 'email', 'profile'],
            webClientId: '213027420366-prcnlkcm5la35mrdcuc54rjanp5o2u74.apps.googleusercontent.com',
            forceConsentPrompt: true,
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
    }
    //Function handeling the integration of Google login with firebase
    googleAuth = () => {
        GoogleSignin.signIn()
            .then((data) => {
                // Create a new Firebase credential with the token
                const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
                // Login with the credential
                return firebase.auth().signInWithCredential(credential);
            })
            .then((user) => {
                //If we need to retrieve any additional data from the user, it can be done here

            })
            .catch((error) => {
                const { code, message } = error;
                console.log(error)
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={require('../images/Logo.png')} />
                <View style={styles.welcome}>
                    <Text style={{ color: '#d8a55a', fontSize: 24 }}>Welcome </Text>
                    <Text style={{ color: '#aa81ac', fontSize: 24 }}>to </Text>
                    <Text style={{ color: '#6998ad', fontSize: 24, marginBottom: '5%' }}>HoC-Chat!</Text>
                    <Text style={{ color: '#d7734a', fontSize: 24 }}> &#123; </Text>

                </View>

                {/* <LoginButton>
                    onPress=
                </LoginButton> */}
                <Button
                    onPress={this.fbAuth}
                    title="Sign in with Facebook"
                    color="#39569c"
                />
                <GoogleSigninButton
                    style={{ width: 192, height: 48, marginTop: '5%' }}
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

