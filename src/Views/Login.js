import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { AccessToken, LoginManager, LoginButton } from 'react-native-fbsdk';
import firebase from 'react-native-firebase'
import { GoogleSigninButton, GoogleSignin } from 'react-native-google-signin';
// import FBLoginButton from './FBLoginButton';


export default class Login extends Component {

    componentDidMount() {
        GoogleSignin.configure({
            clientID: '213027420366-prcnlkcm5la35mrdcuc54rjanp5o2u74.apps.googleusercontent.com',
            scopes: [
                'https://www.googleapis.com/auth/drive',
                'https://www.googleapis.com/auth/drive.appdata',
                'https://www.googleapis.com/auth/drive.file',
                'https://www.googleapis.com/auth/drive.metadata',
                'https://www.googleapis.com/auth/drive.metadata.readonly',
                'https://www.googleapis.com/auth/drive.photos.readonly',
                'openid', 'email', 'profile'
            ],
            forceCodeForRefreshToken: false
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
    //Not working at the moment, and becoming too much of a timesink, might get back to it later
    // googleAuth = async() => {
    //         try {


    //           const user = await GoogleSignin.signIn();

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
                {/* <Text style={styles.welcome}>Velkommen til login skærmen!</Text> */}

                {/* <LoginButton>
                    onPress=
                </LoginButton> */}
                <Button
                    onPress={this.fbAuth}
                    title="Log ind med facebook"
                    color="#39569c"
                />
                {/* <GoogleSigninButton
                 style={{ width: 192, height: 48 }}
                 size={GoogleSigninButton.Size.Wide}
                 color={GoogleSigninButton.Color.Dark}
                 onPress={this.googleAuth}
                /> */}
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

