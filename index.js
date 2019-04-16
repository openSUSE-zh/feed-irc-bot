const FeedSub = require('feedsub');
const IRC = require('irc');
const config = require('./config.js');

const client = new IRC.Client(config.irc.server, config.irc.nickname, {
  channels: [config.irc.channel],
  autoRejoin: true,
  autoConnect: true,
  password: config.irc.password
});

// Debug output
client.addListener('message', function (from, to, message) {
    console.log(from + ' => ' + to + ': ' + message);
});
client.addListener('error', function(message) {
    console.log('error: ', message);
});

console.log('feeds');
config.feeds.map(function (feed) {
    let reader = new FeedSub(feed.url, {
        interval: feed.interval,
        forceInterval: true,
        maxHistory: 100
    });

    reader.on('item', function (item) {
        console.log(item.title);
        client.say(config.irc.channel, '[' + feed.name + '] ' + item.title + ' (' + item['dc:creator'] + ') ' + item.link);
    });

    reader.start();
});
