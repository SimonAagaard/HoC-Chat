import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';


class DevChat extends Component {
    render() {
        return (
           <View style={styles.Container}>
               <Text>Hi all, welcome to DevChat(indian accent)</Text>
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

export default DevChat;