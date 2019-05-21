import React, { Component } from 'react';
import {StatusBar, View, StyleSheet} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import firebaseApp from '../Components/firebaseConfig';

class Chat extends Component {
  

//   static navigationOptions = ({ navigation }) => ({
//     title: navigation.state.params.roomName,
//     headerStyle: styles.messagesHeader,
//     headerTitleStyle: styles.messagesTitle,
//     headerBackTitleStyle: styles.messagesBackTitle
//   });

  constructor(props) {
    super(props);
    var FirebaseDB = firebaseApp.database();
    var roomKey = this.props.navigation.state.params.roomKey;
    this.messagesRef = FirebaseDB.ref(`messages/${roomKey}`);
    this.state = {
      user: '',
      messages: []
    }
  }

  componentDidMount() {
    this.setState({ user: firebaseApp.auth().currentUser });
    this.listenForMessages(this.messagesRef);
  }

  listenForMessages(messagesRef) {
    messagesRef.on('value', (dataSnapshot) => {
      var messagesFB = [];
      dataSnapshot.forEach((child) => {
        messagesFB = [({
          _id: child.key,
          text: child.val().text,
          createdAt: child.val().createdAt,
          user: {
            _id: child.val().user._id,
            name: child.val().user.name
          }
        }), ...messagesFB];
      });
      this.setState({ messages: messagesFB });
    });
  }

  addMessage(messages = []) {
    var message = messages[0]
    this.messagesRef.push({
      text: message.text,
      createdAt: Date.now(),
      user: {
        _id: message.user._id,
        name: message.user.name
      }
    })
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle="light-content"/>
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
const styles = StyleSheet.create({
    messagesHeader: {
        backgroundColor: '#1E90FF'
      },
      messagesTitle: {
        color: '#fff',
        fontSize: 28,
        fontWeight: '400'
      },
      messagesBackTitle: {
        color: '#fff'
      }
    });

export default Chat;