import { css, Global } from '@emotion/core';
import React from 'react';
import { Chat } from './Chat';

function App() {
  return (
    <>
      <Global
        styles={css`
          html {
            font-size: 16px;
            font-family: Segoe UI;
          }

          html,
          body,
          div#root {
            margin: 0;
            height: 100%;
          }

          * {
            box-sizing: border-box;
          }
        `}
      />
      <Chat />
    </>
  );
}

export default App;
