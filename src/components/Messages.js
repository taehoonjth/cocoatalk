import React from 'react';

import Message from './Message';

class Messages extends React.Component {
  componentDidUpdate() {
    // 새로운 메시지가 들어오면 맨 아래로 스크롤 합니다.
    const objDiv = document.getElementById('messageList');
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  render() {
    // Loop through all the messages in the state and create a Message component
    return (
      <div className='messages' id='messageList'>
        {this.props.messages.map((message, i) => {
          return (
            <Message
              key={i}
              username={message.username}
              message={message.message}
              fromMe={message.fromMe} />
          );
        })}
      </div>
    );
  }
}

Messages.defaultProps = {
  messages: []
};

export default Messages;
