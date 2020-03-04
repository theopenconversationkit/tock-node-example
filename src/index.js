const { Bot, imageCard, i18nText } = require('tock-node');
const Unsplash = require('unsplash-js').default;
const toJson = require('unsplash-js').toJson;
require('isomorphic-fetch');

const unsplash = new Unsplash({
  applicationId: '<UNSPLASH_APP_ID>',
  secret: '<UNSPLASH_SECRET>',
});

// Tock public demo example (host: demo-bot.tock.ai, port: 443, protocol: wss):
const bot = new Bot('<TOCK_API_KEY>');

// Tock local instance example:
//const bot = new Bot('<TOCK_API_KEY>', 'localhost', 8080, 'ws');

const itemHandler = ({ send, userData }) => {
  if (Array.isArray(userData.wishlist) && userData.wishlist.length > 0) {
    send(
      `You have ${userData.wishlist.length} item${
        userData.wishlist.length > 1 ? 's' : ''
      } in your wishlist!`,
      {
        title: i18nText('View my list'),
      }
    );
  }
};

bot.addStory(
  'greetings',
  ({ send }) => {
    send(
      "Hello!<br>I'm a bot made in Tock. Create a wish list of anything with me!<br>Try: <i>I want an iPhone 11</i>"
    );
  },
  itemHandler
);

bot.addStory('insult', ({ send }) => {
  send('That is not nice 😥');
});

bot.addStory('gratitude', ({ send }) => {
  send('Thank you 😊');
});

bot.addStory('how_are_you', ({ send }) => {
  send("I'm doing great! How about you?");
});

bot.addStory(
  'add_wish',
  ({ send, userData, dispatchUserData }, request) => {
    if (request.entities.length > 0) {
      const userItems = Array.isArray(userData.wishlist) ? userData.wishlist : [];
      const items = request.entities
        .filter(entity => entity.type === 'phurytw:item')
        .map(entity => entity.content);
      const itemsToAdd = items.reduce(
        (prev, cur) => (!userItems.includes(cur) ? [...prev, cur] : prev),
        []
      );
      if (itemsToAdd.length > 0) {
        const wishlist = [...userItems, ...items];
        send(
          `You have added: ${itemsToAdd.join(', ')} to your wishlist. Your wishlist now has ${
            wishlist.length
          } item${wishlist.length > 1 ? 's' : ''}`
        );
        dispatchUserData({ wishlist });
      } else {
        send(`You already have ${items.length > 1 ? 'these' : 'this'} item in your wishlist.`);
      }
    } else {
      send("I don't understand 😕 What were you trying to add?");
    }
  },
  itemHandler
);

bot.addStory(
  'clear_wishlist',
  ({ send, userData, dispatchUserData }) => {
    if (!userData.wishlist || userData.wishlist.length === 0) {
      send('Your wishlist is already empty!');
    } else {
      dispatchUserData({ wishlist: [] });
      send(
        `Your wishlist has been emptied. (${userData.wishlist.length} item${
          userData.wishlist.length > 1 ? 's' : ''
        } removed)`
      );
    }
  },
  itemHandler
);

bot.addStory('request_wishlist', async ({ send, userData }) => {
  if (Array.isArray(userData.wishlist) && userData.wishlist.length > 0) {
    const wishlistLength = userData.wishlist.length;
    if (wishlistLength > 1) {
      send(`Here are your ${wishlistLength} items in your wishlist:`);
    } else {
      send(`You have only one item in your wishlist:`);
    }
    const cards = await Promise.all(
      userData.wishlist.map(item =>
        unsplash.search
          .photos(item, 1, 1)
          .then(toJson)
          .then(data => {
            if (data.results && data.results[0]) {
              return imageCard(item, data.results[0].urls.thumb);
            }
            return undefined;
          })
      )
    ).then(results => results.filter(v => v));
    send({
      cards,
      type: 'carousel',
    });
  } else {
    send('You have 0 item in your wishlist. Add something! 😄');
  }
});

bot.addStory(
  'remove_wish',
  ({ send, userData, dispatchUserData }, request) => {
    if (!Array.isArray(userData.wishlist) || userData.wishlist.length === 0) {
      send('You have no item to remove. Try adding one!');
    } else if (request.entities.filter(entity => entity.type === 'phurytw:item').length === 0) {
      send("I don't understand 😕 What were you trying to remove?");
    } else {
      const userItems = Array.isArray(userData.wishlist) ? userData.wishlist : [];
      const items = request.entities
        .filter(entity => entity.type === 'phurytw:item')
        .map(entity => entity.content.toLowerCase());
      const itemsToRemove = userItems.reduce(
        (prev, cur) => (items.includes(cur.toLowerCase()) ? [...prev, cur] : prev),
        []
      );
      if (itemsToRemove.length > 0) {
        const wishlist = userData.wishlist.filter(item => !items.includes(item));
        dispatchUserData({ wishlist });
        send(
          `${itemsToRemove.length} item${
            itemsToRemove.length > 1 ? 's' : ''
          } has been removed from your wishlist.`
        );
      } else {
        send('These items are not in your list.');
      }
    }
  },
  itemHandler
);
