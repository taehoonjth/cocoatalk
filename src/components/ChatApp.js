require('../styles/ChatApp.css');

import React from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import config from '../config';

import Messages from './Messages';
import ChatInput from './ChatInput';

class ChatApp extends React.Component {
  socket = {};
  constructor(props) {
    super(props);
    this.state = { messages: [], username: props.username};
    this.sendHandler = this.sendHandler.bind(this);
    
    // Connect to the server
    // 'http://localhost:4008'
    this.socket = io('http://localhost:4008', { query: `username=${props.username}` }).connect();

    // Listen for messages from the server
    this.socket.on('server:message', message => {
      this.addMessage(message);
    });
  }


  componentDidMount() {
    axios.get('http://localhost:4008/messages').then((response)=>{
      let messages = response.data;
      messages = messages.map(message => {
        if(message.username === this.state.username) {
          message.fromMe = true;
        }
        return message;
      })
      this.setState({ messages });
    })
  }

  sendHandler(message) {
    const messageObject = {
      username: this.props.username,
      message
    };

    // Emit the message to the server
    this.socket.emit('client:message', messageObject);

    messageObject.fromMe = true;
    this.addMessage(messageObject);
    // console.log(this.state)
  }

  addMessage(message) {
    // 컴포넌트의 state에 메시지를 추가합니다.
    const messages = this.state.messages;
    messages.push(message);
    // console.log('addMessage', messages)
    this.setState({ messages });
  }

  render() {

    return (
      <div className="container">
        <h3>{this.state.username}의 대화방</h3>
        <Messages messages={this.state.messages} />
        <ChatInput onSend={this.sendHandler} />
      </div>
    );
  }

}
ChatApp.defaultProps = {
  username: 'Anonymous'
};

export default ChatApp;
