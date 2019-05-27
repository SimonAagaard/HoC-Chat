import React, { Component } from 'react';
import { StatusBar, View, StyleSheet, Image, Button, TouchableHighlight } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import firebaseApp from '../Components/firebaseConfig';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons';
import propTypes from 'prop-types';

class Chat extends Component {
  //Header for the chat screen, featuring a "go back" arrow along with the name of the room currently open
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.roomName,
      headerStyle: {
        backgroundColor: '#d7734a'
      },
      headerTitleStyle: {
        color: '#ffffff',
        fontSize: 24,
        fontWeight: '300'
      },
      headerBackTitleStyle: {
        color: '#d7734a'
      },
    }
  };

  constructor(props) {
    super(props);
    var FirebaseDB = firebaseApp.database();
    var roomKey = this.props.navigation.state.params.roomKey;
    this.messagesRef = FirebaseDB.ref(`messages/${roomKey}`);

    this.state = {
      user: '',
      messages: [],
    }
  }

  componentDidMount() {
    this.setState({ user: firebaseApp.auth().currentUser });
    this.listenForMessages(this.messagesRef);
  }


  //Function being called by componentDidMount, loads messages from the database, and loads the messages in the correct order.
  listenForMessages(messagesRef) {
    messagesRef.on('value', (dataSnapshot) => {
      var messagesFB = [];
      dataSnapshot.forEach((child) => {
        messagesFB = [({
          _id: child.key,
          text: child.val().text,
          createdAt: child.val().createdAt,
          room: child.val().room,
          imagePicked: child.val().imagePicked,
          user: {
            _id: child.val().user._id,
            name: child.val().user.name
          }
        }), ...messagesFB];
      });
      this.setState({ messages: messagesFB });
    });
  }


  //Functionality for sending image, causing trouble, commented out for now
  //   selectImage = (messages=[]) => {
  //   ImagePicker.showImagePicker((response) => {
  //     console.log('Response = ', response);

  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (response.error) {
  //       console.log('ImagePicker Error: ', response.error);
  //     } else if (response.customButton) {
  //       console.log('User tapped custom button: ', response.customButton);
  //     } else {
  //       const source = { uri: response.uri };

  //       this.setState({
  //         imagePicked: source,
  //       });

  //     }
  //   });
  // }



  //Function being called by the onSend button, to add a message to the database
  addMessage(messages = []) {
    var message = messages[0]
    this.messagesRef.push({
      text: message.text,
      room: message.room,
      createdAt: Date.now(),
      user: {
        _id: message.user._id,
        name: message.user.name
      },
    })
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        {/* <Button title='Send picture' onPress={this.selectImage} color='#d7734a' /> */}
        <GiftedChat
          messages={this.state.messages}
          onSend={this.addMessage.bind(this)}
          user={{
            _id: this.state.user.uid,
            name: this.state.user.email,
          }}
        />
      </View>
    );
  }
}


export default Chat;