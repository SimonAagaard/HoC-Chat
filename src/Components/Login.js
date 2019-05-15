import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import FBLoginButton from './FBLoginButton'

class Login extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image 
                style={styles.image}
                source={require('../Components/images/Logo.png')} />
            <Text style={styles.welcome}>Velkommen til login skærmen!</Text>
             
              <FBLoginButton />
           
          
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

export default Login;