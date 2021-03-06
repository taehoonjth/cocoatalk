import React from 'react';

import Message from './Message';

class Messages extends React.Component {
  componentDidUpdate() {
    // 새로운 메시지가 들어오면 맨 아래로 스크롤 합니다.
    const objDiv = document.getElementById('messageList');
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  render() {
    // props로 받은 모든 메시지를 순서대로 불러 Message 컴포넌트를 만드세요
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
