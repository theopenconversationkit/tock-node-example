import React, { useState } from 'react';
import styled from '@emotion/styled';

const InputContainer = styled.form`
  height: 5em;
  width: 100%;
  max-width: 500px;
`;

const Input = styled.input`
  height: 3em;
  width: 100%;
  border-radius: 2em;
  padding: 1em;
  border: none;
  outline: none;
`;

export default function ChatInput({ onSendMessage }) {
  const [value, setValue] = useState('');

  const submit = e => {
    e.preventDefault();
    setValue('');
    onSendMessage(value);
  };

  const change = ({ target: { value } }) => setValue(value);

  return (
    <InputContainer onSubmit={submit}>
      <Input type="text" placeholder="Type a message ..." value={value} onChange={change} />
    </InputContainer>
  );
}
