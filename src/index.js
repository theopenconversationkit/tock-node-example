const { WebBotInterface, Bot } = require('tock-js');

const bot = new Bot('<APP_ID>', '<TOCK_END_POINT>', 443);

bot.addInterface(WebBotInterface());

bot.addStory('greetings', function(botInterface) {
  botInterface.send('Hello!');
});

bot.addStory('insult', function(botInterface) {
  botInterface.send('That is not nice :(');
});

bot.addStory('gratitude', function(botInterface) {
  botInterface.send('Thank you :)');
});
