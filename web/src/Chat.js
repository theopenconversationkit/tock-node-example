import styled from '@emotion/styled';
import { darken } from 'polished';
import React, { useState } from 'react';
import MessageBot from './MessageBot';
import MessageUser from './MessageUser';
import ChatInput from './ChatInput';
import Tock from './Tock';

const ChatContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${darken(0.1)('white')};
`;

const ConversationContainer = styled.div`
  flex-grow: 1;
  width: 100%;
  max-width: 500px;
`;

export function Chat() {
  const [messages, setMessages] = useState([]);

  const submit = message =>
    fetch('<TOCK_END_POINT>', {
      body: JSON.stringify({
        query: message,
        userId: '123',
      }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(({ responses }) =>
        setMessages(prevMessages => [
          ...prevMessages,
          { from: 'user', value: message },
          ...responses.map(({ text }) => ({ from: 'bot', value: text })),
        ])
      );

  return (
    <ChatContainer>
      <Tock fullScreen={messages.length === 0} />
      <ConversationContainer>
        {messages.map(({ from, value }, i) => {
          if (from === 'user') {
            return <MessageUser>{value}</MessageUser>;
          }
          if (from === 'bot') {
            return <MessageBot>{value}</MessageBot>;
          }
          return null;
        })}
      </ConversationContainer>
      <ChatInput onSendMessage={submit} />
    </ChatContainer>
  );
}
