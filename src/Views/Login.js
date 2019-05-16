import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, Button} from 'react-native';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import firebase from 'react-native-firebase'
// import FBLoginButton from './FBLoginButton';


export default class Login extends Component {

    //Function handeling the integration of Facebook login with firebase
fbAuth() {
LoginManager.logInWithReadPermissions(['public_profile', 'email'])
.then(function(result){
    if(result.isCancelled) {
        alert('Login blev afbrudt');
    } else {
        AccessToken.getCurrentAccessToken().then((accesTokenData) => {
            const credential =  firebase.auth.FacebookAuthProvider.credential(accesTokenData.accessToken)
            firebase.auth().signInWithCredential(credential).then((result) => {
                //Promise was succesful

            }, (error) => {
                //promise was rejected
                console.log(error)
            })
        }, (error) => {
            console.log('En fejl opstod' + error)
        })
    }
})
}

    render() {
        return (
            <View style={styles.container}>
                <Image 
                style={styles.image}
                source={require('../Components/images/Logo.png')} />
                <Text style={styles.welcome}>Velkommen til login skærmen!</Text>
    
              {/* <FBLoginButton /> */}

            <Button
            onPress={this.fbAuth}
            title="Log ind med facebook"
            color="#3c50e8"
            />
              
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
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
        marginBottom: '10%',
        marginTop: '10%',
        fontSize: 24
    }
})

