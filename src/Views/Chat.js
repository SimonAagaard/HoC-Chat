import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';
import firebaseApp from 'react-native-firebase'


class Chat extends Component {
    handleLogout = () => {
        firebaseApp.auth().signOut()
        .then(() => this.props.navigation.navigate('Login'))
        .catch(error => this.setState({ errorMessage: error.message }))
      }
   
    render() {
        return (
           <View style={styles.Container}>
               <Text>Hi all, welcome to DevChat(indian accent)</Text>
               <Button
            onPress={this.handleLogout}
            title="Log ud"
            color="#3c50e8"
            />  
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