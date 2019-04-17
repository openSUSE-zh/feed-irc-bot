const fetch = require('node-fetch');

module.exports = function (send, name, url, interval) {
    let timestamp;
    setInterval(function () {
        console.log("fetch discourse site " + name);
        fetch(url + 'posts.json')
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                if (timestamp) {
                    data.latest_posts.filter(function (post) {
                        return post.created_at > timestamp;
                    })
                    .reverse()
                    .map(function (post) {
                        let message = '[' + name + '] ✉️ ';
                        if (post.post_number > 1) {
                            message += 'Re:'
                        }
                        message += post.topic_title + ' (' + post.name + ') ';
                        message += `${url}t/topic/${post.topic_id}/${post.post_number}`;
                        send(message);
                    });
                }

                timestamp = data.latest_posts[0].created_at;
            }).catch(function (e) {
                console.error(e);
            });
    }, 1000 * interval);
};
