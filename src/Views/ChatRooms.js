import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, TouchableHighlight, Button, FlatList, StatusBar, TextInput} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import firebaseApp from '../Components/firebaseConfig';
import DevChat from './DevChat';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';


//View to see the available chat rooms
class ChatRooms extends Component {
  constructor(props) {
    super(props);
    var firebaseDB = firebaseApp.database();
    this.roomsRef = firebaseDB.ref('rooms');
    this.state = {
      rooms: [],
      newRoom: ''
    }
  }

  componentDidMount() {
    this.listenForRooms(this.roomsRef);
  }

  listenForRooms(roomsRef) {
    roomsRef.on('value', (dataSnapshot) => {
      var roomsFB = [];
      dataSnapshot.forEach((child) => {
        roomsFB.push({
          name: child.val().name,
          key: child.key
        });
      });
      this.setState({ rooms: roomsFB });
    });
  }

  //Checks if input field is blank, else it pushes the input to create a newroom with that name. 
  addRoom() {
    if (this.state.newRoom === '') {
      return;
    }
    this.roomsRef.push({ name: this.state.newRoom });
    this.setState({ newRoom: '' });
  }
    

//Used by the flatlist to format the array of data received
      renderRow(item) {
        return (
          <TouchableHighlight style={styles.roomLi}
          underlayColor="#fff"
          >
            <Text style={styles.roomLiText}>{item.name}</Text>
          </TouchableHighlight>
        )
      }
    

    render() {
        return (
          <View style={styles.roomsContainer}>
          <StatusBar barStyle="light-content"/>
          <Text style={styles.roomsHeader}>House of Code</Text>
          <View style={styles.roomsInputContainer}>
            <TextInput
              style={styles.roomsInput}
              placeholder={"New Room Name"}
              onChangeText={(text) => this.setState({newRoom: text})}
              value={this.state.newRoom}
            />
            <TouchableHighlight style={styles.roomsNewButton}
              underlayColor="#fff"
              onPress={this.addRoom()}
            >
              <Text style={styles.roomsNewButtonText}>Create</Text>
            </TouchableHighlight>
          </View>
           
           <View style={styles.roomsListContainer}>
         
            <FlatList
            data={this.state.rooms}
            renderItem={({item}) => (this.renderRow(item)
            )}
            />
              </View>
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
    roomLi: {
      flex: 1,
      backgroundColor: '#fff',
      borderBottomColor: '#eee',
      borderColor: 'transparent',
      borderWidth: 1,
      paddingLeft: 16,
      paddingTop: 14,
      paddingBottom: 16,
    },
    roomLiText: {
      color: '#1E90FF',
    fontSize: 22,
    },
    roomsNewButton: {
      alignItems: 'center',
    marginRight: 20
    },
    roomsContainer: {
      flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#1E90FF',
    },
    roomsHeader: {
      color: '#fff',
    fontSize: 28,
    top: 20
    },
    roomsInputContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomColor: '#f9f9f9',
    borderBottomWidth: 2,
    top: 30
    },
    roomsInput: {
      flex: 1,
      height: 40,
      textAlign: 'center',
      fontSize: 18,
      color: '#1E90FF',
      borderColor: '#f9f9f9',
      borderWidth: 2,
      borderRadius: 4,
      margin: 10
    },
    roomsNewButton: {
      alignItems: 'center',
    marginRight: 20
    },
    roomsNewButtonText: {
      color: '#1E90FF',
    fontSize: 18
    }
})

//BottomTab navigation bar
export default createMaterialBottomTabNavigator({
    ChatRooms: {screen:ChatRooms, 
    navigationOptions: {
      labeled: false,
      tabBarIcon: (
        <Icon name='ios-chatbubbles' color='#d7734a' size={24}/>
      )
    }
  },
    DevChat: {screen:DevChat,
      navigationOptions: {
        labeled: false,
        barStyle:{backgroundColor:'#d8a55a'},
        tabBarIcon: (
          <Icon name='ios-chatboxes' color='#d7734a' size={24}/>
        )
      }},
  },{
    order:['ChatRooms', 'DevChat'],
    barStyle: {backgroundColor:'#6998ad'}
  })
