import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableHighlight, TouchableOpacity, FlatList, StatusBar, Button} from 'react-native';
import firebaseApp from '../Components/firebaseConfig';
import Chat from './Chat';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker';



//View to see the available chat rooms
export default class ChatRooms extends Component {
  constructor(props) {
    super(props);
    var firebaseDB = firebaseApp.database();
    this.roomsRef = firebaseDB.ref('rooms');
    this.state = {
      rooms: [],
      // newRoom: ''
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

  handleLogout = () => {
    firebaseApp.auth().signOut()
    .then(() => this.props.navigation.navigate('Login'))
    .catch(error => this.setState({ errorMessage: error.message }))
  }

    //Navigation to the correct chat room based on which room is selected in the flatlist
    openRoom(room) {
      this.props.navigation.navigate('Chat', {roomKey: room.key, roomName: room.name});
    }

  //Checks if input field is blank, else it pushes the input to create a newroom with that name. 
  // addRoom() {
  //   if (this.state.newRoom === '') {
  //     return;
  //   }
  //   this.roomsRef.push({ name: this.state.newRoom });
  //   this.setState({ newRoom: '' });
  // }
    

//Used by the flatlist to format the array of data received
      renderRow(room) {
        return (
          <TouchableOpacity style={styles.roomLi}
          underlayColor="#f8f8ff"
          onPress={() => this.openRoom(room)}
          >
              <Icon name='ios-people' style={styles.roomLiIconL}/>
            <Text style={styles.roomLiText}>{room.name}</Text> 
            <Icon name='ios-arrow-forward' style={styles.roomLiIconR}/>
          </TouchableOpacity>
        )
      }
    

    render() {
        return (
          <View style={styles.roomsContainer}>
          <StatusBar barStyle="light-content"/>
          <View style={styles.roomsHeader}>
          <Text style={styles.roomsHeaderText}>Rooms</Text>
          <View style={styles.roomsHeaderIcon}>
          <TouchableHighlight
          onPress={() => this.handleLogout()}
          >
          <Icon name='ios-log-out' color='#d7734a' size={40} />
          </TouchableHighlight>
          </View>
          </View>
          
          {/* Section to add new rooms directly in the app */}

          {/* <View style={styles.roomsInputContainer}>
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
          </View> */}
           
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

  roomsHeaderIcon:{
   marginTop: 5,
   marginLeft: '50%', 
  },

  roomsListContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30,
    backgroundColor: '#fff'
  },

  roomLi: {
    flex: 1,
    backgroundColor: '#eee',
    borderColor: '#fff',
    borderWidth: 1,
    paddingTop: 14,
    paddingBottom: 16,
    flexDirection:'row'
  },
  
  roomLiIconL: {
   flex:1,
   color: '#d7734a',
   fontSize: 25,
   textAlign: 'left',
  },

  roomLiText: {
   flex:1,
   color: '#d7734a',
   fontSize: 20,
  },

  roomLiIconR: {
   flex:1,
   color: '#d7734a',
   fontSize: 20,
   textAlign: 'right',
   marginRight: 20
  },
   
  //Styling for the "add Room" functionality

//   roomsInputContainer: {
//     alignItems: 'center',
//     flexDirection: 'row',
//     backgroundColor: '#fff',
//     borderBottomColor: '#f9f9f9',
//     borderBottomWidth: 2,
//     top: 30
//     },

//  roomsNewButton: {
//   alignItems: 'center',
//   marginRight: 20
//   },

//  roomsNewButtonText: {
//     color: '#1E90FF',
//     fontSize: 18
//     }
})

//BottomTab navigation bar
// export default createMaterialBottomTabNavigator({
//     ChatRooms: {screen:ChatRooms, 
//     navigationOptions: {
//       labeled: false,
//       tabBarIcon: (
//         <Icon name='ios-chatbubbles' color='#d7734a' size={24}/>
//       )
//     }
//   },
//     Chat: {screen:Chat,
//       navigationOptions: {
//         labeled: false,
//         tabBarIcon: (
//           <Icon name='ios-chatboxes' color='#d7734a' size={24}/>
//         )
//       }
//     },
//   },{
//     order:['ChatRooms', 'Chat'],
//     barStyle: {backgroundColor:'#ffffff'}
//   })
