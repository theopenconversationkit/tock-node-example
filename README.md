# tock-node-example

Chatbot sample using [Tock](https://doc.tock.ai/) and stories written 
in Typescript running on Nodejs (`tock-node`).

## Bot setup

- Create a _bot application_ on a Tock platform (_Bot API_ mode), 
such as the [Tock demo](https://demo.tock.ai/) public instance.

- Configure a _Web connector_ and copy the API key.

## Tock-Node setup

- In `index.j (L11)` place your API key and the Tock platform hostname 
(`demo-bot.tock.ai` for the demo, `localhost` for local platform, etc.).

```
const bot = new Bot('<YOUR_API_KEY_HERE>', 'demo-bot.tock.ai');
```

Don't prefix the host with `http://` or `https://`. Don't suffix it with a relative path or the Web connector path.

- Run the `tock-node-example` from root folder:

```
yarn install
yarn start

or

npm install
npm start
```

- When `Connection established`, Tock Node stories are ready to test.
