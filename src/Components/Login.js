import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import FBLoginButton from './FBLoginButton'

class Login extends Component {
    render() {
        return (
            <View style={styles.container}>
            <Text style={styles.label}>Velkommen til login skærmen!</Text>
              <FBLoginButton />
           
          
            </View>
        );
    }
}

export default Login;