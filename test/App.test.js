import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount } from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });

import Message from '../src/components/Message';
import Messages from '../src/components/Messages';

describe('<Message /> 테스트', () => {
  it('문제없이 초기 랜더링이 돼야 합니다', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Message />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  describe('내가 보낸 메시지를 제대로 랜더링해야합니다', () => {
    const component = shallow(
      <Message
        key={0}
        username={'영희'}
        message={'안녕 철수야'}
        fromMe={true}
      />
    );
    it('내가 보낸 메시지일 때 제대로된 class name을 갖고 있어야 합니다', () => {
      expect(component.props().className).toEqual('message from-me');
    })
    describe('사용자의 이름을 제대로 보여줘야합니다', () => {
      it('username이란 클래스를 갖고 있는 div앨리먼트가 있어야 합니다', () => {
        expect(component.find('.username').type()).toEqual('div');
        expect(component.find('.username').length).toBe(1);
      })
      it('사용자의 이름을 제대로 랜더링해야합니다', () => {
        expect(component.find('.username').text()).toEqual('영희');
      })
    });

    describe('사용자의 메시지를 제대로 보여줘야합니다', () => {
      it('message-body란 클래스를 갖고 있는 div앨리먼트가 있어야 합니다', () => {
        expect(component.find('.message-body').type()).toEqual('div');
        expect(component.find('.message-body').length).toBe(1);
      })
      it('사용자의 이름을 제대로 랜더해야합니다', () => {
        expect(component.find('.message-body').text()).toEqual('안녕 철수야');
      })
    });
  })

  describe('상대방이 보낸 메시지를 제대로 랜더링해야합니다', () => {
    const component = shallow(
      <Message
        key={1}
        username={'철수'}
        message={'안녕 얘들아'}
        fromMe={false}
      />
    );
    it('상대방이 보낸 메시지일 때 제대로된 class name을 갖고 있어야 합니다', () => {
      expect(component.props().className).toEqual('message');
    })
    it('두개의 children div엘리먼트를 갖고 있어야 합니다.', () => {
      expect(component.props().children.length).toBe(2);
    })

    describe('사용자의 이름을 제대로 보여줘야합니다', () => {
      it('username이란 클래스를 갖고 있는 div앨리먼트가 있어야 합니다', () => {
        expect(component.find('.username').type()).toEqual('div');
        expect(component.find('.username').length).toBe(1);
      })
      it('사용자의 이름을 제대로 랜더해야합니다', () => {
        expect(component.find('.username').text()).toEqual('철수');
      })
    });

    describe('사용자의 메시지를 제대로 보여줘야합니다', () => {
      it('message-body란 클래스를 갖고 있는 div앨리먼트가 있어야 합니다', () => {
        expect(component.find('.message-body').type()).toEqual('div');
        expect(component.find('.message-body').length).toBe(1);
      })
      it('사용자의 이름을 제대로 랜더해야합니다', () => {
        expect(component.find('.message-body').text()).toEqual('안녕 얘들아');
      })
    });
  })
});

describe('<Messages /> 테스트', () => {
  const messages = [
    {username: "철수", message: "나는 철수야", fromMe: true},
    {username: "영희", message: "나는 영희야 반가워!"},
    {username: "민수", message: "나는 민수야 나도 반가워!"}
  ];
  
  const component = shallow(
    <Messages
      messages={messages}
    />
  );
  it('문제없이 초기 랜더링이 돼야 합니다', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Messages />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('메시지를 모두 랜더링해야합니다', () => {
    expect(component.props().children.length).toEqual(3);
  });
  describe('props로 받은 모든 메시지를 제대로 랜더링해야 합니다', () => {
    describe('Message 컴포넌트에 데이터를 제대로 전달해야합니다', () => {
      it('사용자의 이름을 제대로 전달해야합니다', () => {
        expect(component.childAt(0).props().username).toEqual("철수");
        expect(component.childAt(1).props().username).toEqual("영희");
        expect(component.childAt(2).props().username).toEqual("민수");
      })
      it('메시지를 제대로 전달해야합니다', () => {
        expect(component.childAt(0).props().message).toEqual("나는 철수야");
        expect(component.childAt(1).props().message).toEqual("나는 영희야 반가워!");
        expect(component.childAt(2).props().message).toEqual("나는 민수야 나도 반가워!");
      })
      it('내가 보낸 메시지인지 제대로 전달해야합니다', () => {
        expect(component.childAt(0).props().fromMe).toBe(true);
      })
    });
  })
});
