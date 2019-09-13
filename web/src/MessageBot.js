import styled from '@emotion/styled';
import React, { useRef, useEffect } from 'react';
import { TweenLite } from 'gsap/all';

const MessageBotContainer = styled.div`
  width: 100%;
  margin: 0.5em 0;
`;

const Message = styled.div`
  display: inline-block;
  background: black;
  color: white;
  padding: 0.5em 1em;
  border-radius: 0.75em 0.75em 0.75em 0em;
`;

export default function MessageBot({ children }) {
  const message = useRef();

  useEffect(() => {
    if (message.current) {
      TweenLite.from(message.current, 0.2, { opacity: 0, height: 0, width: 0 });
    }
  }, [message]);

  return (
    <MessageBotContainer>
      <Message ref={message}>{children}</Message>
    </MessageBotContainer>
  );
}
