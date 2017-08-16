var FEEDSUB = require('feedsub');
var IRC = require('irc');
var moment = require('moment');


// Set up your little spambot
var server = 'chat.freenode.net';
var bot = 'suse_cn_forum';
var channel = '#opensuse-cn';
var feed = 'https://forum.suse.org.cn/feed.php';
var interval = 1 // how often to poll the feed, in minutes?


console.log('start irc client');

var client = new IRC.Client(server, bot,
  {
    channels: [channel],
    realName: 'nodejs IRC bot',
    autoRejoin: true,
    autoConnect: true,
  });

console.log('start feed client');

var reader = new FEEDSUB(feed, {
  interval: interval,
  autoStart: true,

});

reader.on('item', function (item) {
  console.log(item.title);
  if (moment(item.updated || item.published) > moment().subtract(interval, 'minutes')) {
    client.say(channel, item.title + ' ' + item.link.href);
  }
});
