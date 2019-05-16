import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import firebase from 'react-native-firebase'
import DevChat from './DevChat';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';



class ChatRooms extends Component {
    
    handleLogout = () => {
        firebase.auth().signOut()
        .then(() => this.props.navigation.navigate('Login'))
        .catch(error => this.setState({ errorMessage: error.message }))
      }

    render() {
        return (
            <View style={styles.Container}>
                <Text>Her er dine chatrooms glhf</Text>
               
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

export default createMaterialBottomTabNavigator({
    ChatRooms: {screen:ChatRooms, 
    navigationOptions: {
      labeled: false,
      tabBarIcon: (
        <Icon name='ios-home' color='#FF6C12' size={24}/>
      )
    }
  },
    DevChat: {screen:DevChat,
      navigationOptions: {
        labeled: false,
        barStyle:{backgroundColor:'#d8a55a'},
        tabBarIcon: (
          <Icon name='ios-chatboxes' color='#FF6C12' size={24}/>
        )
      }},
  },{
    order:['ChatRooms', 'DevChat'],
    barStyle: {backgroundColor:'#6998ad'}
  })
