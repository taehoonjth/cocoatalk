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

describe('<Message /> 테스트', () => {
  let component = null;

  it('제대로 랜더링이 되는지 확인', () => {
    component = shallow(<Message />);
  });

  describe('???', () => {
    it('`.username`을 랜더링 하는지 확인', () => {
      expect(component.find('.username').exists()).toBe(true);
    })
    it('`.message-body`을 랜더링 하는지 확인', () => {
      expect(component.find('.message-body').exists()).toBe(true);
    })
  })

  describe('내가 쓴 메시지를 제대로 표시하는지 확인', () => {
    component = shallow((
      <Message
        key={0}
        username={'철수'}
        message={'안녕 애들아'}
        fromMe={true} />
    ));
    it('내가 쓴 메시지일 경우 `fromMe`', () => {
      expect(component.find('.username').exists()).toBe(true);
    })
    it('`.username`을 랜더링 하는지 확인', () => {
      expect(component.find('.username').exists()).toBe(true);
    })
    it('`.message-body`을 랜더링 하는지 확인', () => {
      expect(component.find('.message-body').exists()).toBe(true);
    })
  })
  
});

describe('<Messages /> 테스트', () => {
  let component = null;

  it('제대로 랜더링이 되는지 확인', () => {
    component = shallow(<Messages />);
  });

  describe('???', () => {
    it('has a messages', () => {
      expect(component.find('.messages').exists()).toBe(true);
    })
  })

  
});