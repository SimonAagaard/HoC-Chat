import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TouchableOpacity, FlatList, StatusBar, Button, ImageBackground } from 'react-native';
import firebaseApp from '../Components/firebaseConfig';
import { LoginManager } from 'react-native-fbsdk';

import Icon from 'react-native-vector-icons/Ionicons';

//View to see the available chat rooms
export default class ChatRooms extends Component {
  constructor(props) {
    super(props);
    var firebaseDB = firebaseApp.database();
    this.roomsRef = firebaseDB.ref('rooms');
    this.state = {
      rooms: [],
    }
  }

  //whenever this component mounts, the function "listenForRooms" gets called right away
  componentDidMount() {
    this.listenForRooms(this.roomsRef);
  }

  //Uses the variable "roomsRef" from the constructor to check the realtime database for changes and update accordingly
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

  //logout functionality, proceeds to navigate to "Login"
  handleLogout = () => {
    firebaseApp.auth().signOut()
      .then(() => LoginManager.getInstance().logout())
      .then(() => this.props.navigation.navigate('Login'))
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  //Navigation to the correct chat room based on which room is selected in the flatlist
  openRoom(room) {
    this.props.navigation.navigate('Chat', { roomKey: room.key, roomName: room.name });
  }

  //Used by the flatlist to format the array of data received
  renderRow(room) {
    return (
      <TouchableOpacity style={styles.roomLi}
        underlayColor="#f8f8ff"
        onPress={() => this.openRoom(room)}
      >
        <Icon name='ios-people' style={styles.roomLiIconL} />
        <Text style={styles.roomLiText}>{room.name}</Text>
        <Icon name='ios-arrow-forward' style={styles.roomLiIconR} />
      </TouchableOpacity>
    )
  }


  render() {
    return (
      <ImageBackground source={require('../Images/team.jpg')} style={{ width: undefined, height: undefined, flex: 1, alignSelf: 'stretch', resizeMode: 'cover', opacity: 0.8 }} >
        <View style={styles.roomsContainer}>
          <StatusBar barStyle="light-content" />
          <View style={styles.roomsHeader}>
            <Text style={styles.roomsHeaderText}>Rooms</Text>
            <View style={styles.roomsHeaderIcon}>
              <TouchableHighlight onPress={() => this.handleLogout()}>
                <Icon name='ios-log-out' color='#d7734a' size={40} />
              </TouchableHighlight>
            </View>
          </View>

          <View style={styles.roomsListContainer}>
            <FlatList
              data={this.state.rooms}
              renderItem={({ item }) => (this.renderRow(item)
              )}
            />
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  roomsContainer: {
    flex: 1,
    backgroundColor: '#eee',
  },

  roomsHeader: {
    color: '#d7734a',
    flexDirection: 'row',
    marginBottom: 40,
    marginLeft: 16,
  },

  roomsHeaderText: {
    color: '#d7734a',
    fontSize: 28,
    fontWeight: 'bold',
  },

  roomsHeaderIcon: {
    marginTop: 5,
    marginLeft: '50%',
  },

  roomsListContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30,
  },

  roomLi: {
    flex: 1,
    borderColor: '#fff',
    borderWidth: 1,
    paddingTop: 14,
    paddingBottom: 16,
    flexDirection: 'row'
  },

  roomLiIconL: {
    flex: 1,
    color: '#d7734a',
    fontSize: 25,
    textAlign: 'left',
  },

  roomLiText: {
    flex: 1,
    color: '#d7734a',
    fontSize: 20,
  },

  roomLiIconR: {
    flex: 1,
    color: '#d7734a',
    fontSize: 20,
    textAlign: 'right',
    marginRight: 20
  },
})
