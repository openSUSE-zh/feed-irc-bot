const IRC = require('irc');
const config = require('./config');
const discourse = require('./discourse');

const client = new IRC.Client(config.irc.server, config.irc.nickname, {
  channels: [config.irc.channel],
  autoRejoin: true,
  autoConnect: true,
  password: config.irc.password
});

// Debug output
// client.addListener('message', function (from, to, message) {
//     console.log(from + ' => ' + to + ': ' + message);
// });
// client.addListener('error', function(message) {
//     console.log('error: ', message);
// });

function send(message) {
    client.say(config.irc.channel, message);
}

config.feeds.map(function (feed) {
    switch (feed.type) {
        case 'discourse':
            discourse(send, feed.name, feed.url, feed.interval, feed.postNumber);
            break;
    }
});
