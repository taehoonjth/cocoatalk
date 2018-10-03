import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });

import Message from '../src/components/Message';
import Messages from '../src/components/Messages';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Message />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('<Message /> tests', () => {
  describe('should have username and message body', () => {
    const baseComponent = shallow(
      <Message
        key={0}
        username={'철수'}
        message={'안녕 얘들아'}
        fromMe={false}
      />
    );
    it('should have username', () => {
      expect(baseComponent.find('.username').length).toBe(1);
    })
    it('should have message body', () => {
      expect(baseComponent.find('.message-body').length).toBe(1);
    })
  })

  describe('should render a new message with correct username and contents', () => {
    const fromMeComponent = shallow(
      <Message
        key={1}
        username={'영희'}
        message={'안녕 철수야'}
        fromMe={true}
      />
    );
    it('should have both username and message', () => {
      expect(fromMeComponent.props().children.length).toBe(2);
    })
    it('should have a correct class name when the message is from myself', () => {
      expect(fromMeComponent.props().className).toEqual('message from-me');
    })
    it('should render correct user name', () => {
      expect(fromMeComponent.props().children[0].props.children).toEqual('영희');
    })
    it('should render correct message body', () => {
      expect(fromMeComponent.props().children[1].props.children).toEqual('안녕 철수야');
    })
  })
});

describe('<Messages /> tests', () => {
  const firstMessage = shallow(
    <Message
      key={0}
      username={'a'}
      message={'안녕 얘들아'}
      fromMe={false}
    />
  );
  const secondMessage = shallow(
    <Message
      key={1}
      username={'b'}
      message={'안녕 철수야'}
      fromMe={true}
    />
  );
  const messages = shallow(
    <Messages
      messages={[firstMessage, secondMessage]}
    />
  );

  describe('should have correct messages rendered', () => {
    it('should have correct class name', () => {
      expect(messages.props().className).toEqual('messages');
    });

    it('should render a list of messages', () => {
      expect(messages.props().children.length).toEqual(2);
    });
  })
});
