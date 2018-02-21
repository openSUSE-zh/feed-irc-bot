var FEEDSUB = require('feedsub');
var IRC = require('irc');

// Set up your little spambot
var server = 'chat.freenode.net';
var bot = 'suse_cn_forum';
var channel = '#opensuse-cn';
var feed = 'https://forum.suse.org.cn/latest.rss';
var interval = 1 // how often to poll the feed, in minutes?


console.log('start irc client');

var client = new IRC.Client(server, bot, {
  channels: [channel],
  realName: 'nodejs IRC bot',
  autoRejoin: true,
  autoConnect: true,
});

console.log('start feed client');

var reader = new FEEDSUB(feed, {
  interval: interval,
  autoStart: true,
  maxHistory: 100,
});

reader.on('item', function (item) {
  console.log(item.title);
  client.say(channel, item.title + ' ' + item.link.href);
});
