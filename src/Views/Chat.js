import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';
import firebaseApp from 'react-native-firebase'


class Chat extends Component {
    
   
    render() {
        return (
           <View style={styles.Container}>
               <Text>Hi all, welcome to chat</Text>
          
           </View>
        );
    }
}

const styles = StyleSheet.create({
    Container: {
        flex:1,
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
})

export default Chat;