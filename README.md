# tock-node-example

Chatbot sample using [Tock](https://doc.tock.ai/) and stories written 
in Javascript running on Nodejs (see [`tock-node`](https://github.com/theopenconversationkit/tock-node)).

## Bot setup

- Create a _bot application_ on a Tock platform (_Bot API_ mode), 
such as the [Tock demo](https://demo.tock.ai/) public instance.

- Add a _Web connector_ to the bot and copy the API key.

## Node setup

- In `index.js (L11)` replace the API key.

- If necessary, declare the Tock platform host, port and WebSocket protocol to use.
Default values are `demo-bot.tock.ai` (the public demo), `443` and `wss` (secured port/protocol).

Tock demo example:
```
const bot = new Bot('<YOUR_API_KEY_HERE>');
```

Local instance example:
```
const bot = new Bot('<YOUR_API_KEY_HERE>', 'localhost', '8080', 'ws');
```

NOTE: Don't prefix the host with `http://` or `https://`. Don't suffix it with a relative path or the Web connector path.

## Run

- Run `tock-node-example` from root folder:

Using YARN:
```
yarn install
yarn start
```

NPM alternative:
```
npm install
npm start
```

- When `Connection established`, Tock Nodejs stories are ready to test.
