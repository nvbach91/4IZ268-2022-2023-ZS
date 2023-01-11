(() => {

    // declare global variables
    const webStorage = window.localStorage;

    $(document).ready(function () {
        const mainElement = $('main');
        const buttonElement = $('#search');

        const appSettings = JSON.parse(webStorage.getItem('appSettings'));

        // parse tweet and make username clickable
        const parseUsername = (tweet) => {
            const username = tweet.match(/@[a-zA-Z0-9_]+/g);
            if (username !== null) {
                username.forEach((item) => {
                    if (item === undefined) return;
                    tweet = tweet.replace(item, `<a href="https://twitter.com/${item.replace(/[@]/, '')}" target="_blank">${item}</a>`);
                });
            }
            return tweet;
        }

        // parse tweet and make hashtags clickable
        const parseHashtags = (tweet) => {
            const hashtags = tweet.match(/#[a-zA-Z0-9_]+/g);
            if (hashtags !== null) {
                hashtags.forEach((item) => {
                    if (item === undefined) return;
                    tweet = tweet.replace(item, `<a href="https://twitter.com/hashtag/${item.replace(/[@]/, '')}" target="_blank">${item}</a>`);
                });
            }
            return tweet;
        }

        // parse tweet and make links clickable
        const parseLinks = (tweet) => {
            const links = tweet.match(/https?:\/\/[a-zA-Z0-9_\.\/]+/g);
            if (links !== null) {
                links.forEach((item) => {
                    if (item === undefined) return;
                    tweet = tweet.replace(item, `<a href="${item}" target="_blank">${item}</a>`);
                });
            }
            return tweet;
        }

        const parseTweet = (tweet) => {
            // order is important
            tweet = parseLinks(tweet);
            tweet = parseUsername(tweet);
            tweet = parseHashtags(tweet);
            return tweet;
        }

        const checkEmptyTweets = () => {
            const tweetsElement = $('#tweets');
            if (tweetsElement.children().length === 0) {
                $('.main-panel').remove();
                $('.note').removeClass('hidden');
            }
        }

        const addToList = (e) => {
            const tweet = $(e.target).parent().parent().find('.tweet_id').text();
            const savedItems = webStorage.getItem('savedTweets');
            const removeTweet = $(`#${tweet}`);
            removeTweet.remove();
            checkEmptyTweets();
            if (savedItems !== null) {
                if (savedItems.includes(tweet)) return;
            }
            if (savedItems === null) return webStorage.setItem('savedTweets', tweet);
            if (savedItems === '') return webStorage.setItem('savedTweets', tweet);
            if (savedItems === ',') return webStorage.setItem('savedTweets', tweet);
            return webStorage.setItem('savedTweets', `${savedItems},${tweet}`);
        }

        const removeTweet = (e) => {
            const tweet = $(e.target).parent().parent().find('.tweet_id').text();
            const removeTweet = $(`#${tweet}`);
            removeTweet.remove();
            checkEmptyTweets();
            console.log(webStorage.getItem('removedTweets'))
            const removedItems = webStorage.getItem('removedTweets');
            if (removedItems === null) return webStorage.setItem('removedTweets', tweet);
            if (removedItems === '') return webStorage.setItem('removedTweets', tweet);
            if (removedItems === ',') return webStorage.setItem('removedTweets', tweet);
            return webStorage.setItem('removedTweets', `${removedItems},${tweet}`);
        }

        // add button to tweet to save the tweet in TODO list
        const toggleTweet = (e, id, user_id) => {
            const tweet = $(`#${id}`);
            const hidden = tweet.find('.tweet-buttons');
            if (hidden.hasClass('hidden')) {
                hidden.removeClass('hidden');
                const buttonAdd = tweet.find('#button_add');
                buttonAdd.click((e) => { addToList(e) });
                const buttonRemove = tweet.find('#button_remove');
                buttonRemove.click((e) => { removeTweet(e) });
                const buttonUser = tweet.find('#button_user');
                buttonUser.attr('href', `https://twitter.com/intent/user?user_id=${user_id}`);
                buttonUser.attr('target', '_blank');
            } else {
                hidden.addClass('hidden');
            }
        }

        // Fetch tweets based on entered keyword
        const handleClick = async (e) => {
            e.preventDefault();

            const errorElement = $('.error');
            if (!errorElement.hasClass('hidden')) errorElement.addClass('hidden');

            const keywordElement = $('#keywords');
            if (keywordElement.val() === null) return;
            if (keywordElement.val() === '') return;

            const trimmedKeyValue = keywordElement.val().trim();

            mainElement.empty();

            const spinnerElement = $('.spinner');
            spinnerElement.removeClass('hidden');

            const tweetNoteElement = $('.tweets-note');
            const noteElement = $('.note');
            noteElement.addClass('hidden');

            keywordElement.attr('placeholder', trimmedKeyValue);
            keywordElement.val('');

            const tweets = await fetch(`https://twitter.asitanc.cz/api/twitter`, {
                method: 'POST',
                body: JSON.stringify({
                    method: 'GET',
                    apiUrl: '/2/tweets/search/recent',
                    type: 'query',
                    query: `${encodeURIComponent(trimmedKeyValue)}`,
                    expansions: 'author_id',
                    tweetFields: 'created_at,public_metrics',
                    maxResults: 25, //must be within 10-100
                }),
            })
                .then(res => res.json())
                .then(res => res.data);

            spinnerElement.addClass('hidden');

            const resultElement = $(`<div>
                <div>
                    <div class="panel-header">
                        <h2>Tweets</h2>
                    </div>
                    <div class="tweets" id="tweets">
                    </div>
                </div>
            </div>`);
            resultElement.addClass('main-panel');
            mainElement.append(resultElement);

            // if there are more element in tweets
            if (tweets === undefined) {
                errorElement.text('No tweets found for the query.');
                errorElement.removeClass('hidden');
                if (!tweetNoteElement.hasClass('hidden')) {
                    tweetNoteElement.addClass('hidden');
                }
                mainElement.empty();
                return;
            }

            const tweetsElement = $('#tweets');
            resultElement.append(tweetsElement);

            // sort tweets by likes
            tweets.sort((a, b) => { return b.public_metrics.like_count - a.public_metrics.like_count; })
                .forEach((item) => {
                    const removedTweets = webStorage.getItem('removedTweets');
                    if (removedTweets !== null) {
                        if (removedTweets.includes(item.id)) return;
                    }
                    // if tweet is already saved
                    const savedTweets = webStorage.getItem('savedTweets');
                    if (savedTweets !== null) {
                        if (savedTweets.includes(item.id)) return;
                    }
                    const tweet = parseTweet(item.text);
                    const tweetElement = $(`<div id="${item.id}">
                        <div class="tweet_id">${item.id}</div>
                        <hr>
                        <div class="tweet_text">${tweet}</div>
                        <div class="tweet_author">User ID: <a href="https://twitter.com/intent/user?user_id=${item.author_id}" target="_blank">${item.author_id}</a></div>
                        <hr>
                        <div class="public_metrics">
                            <ul class="public_metrics_list">
                                <li>Like: ${item.public_metrics.like_count}</li>
                                <li>Reply: ${item.public_metrics.reply_count}</li>
                                <li>Retweet: ${item.public_metrics.retweet_count}</li>
                                <li>Quote: ${item.public_metrics.quote_count}</li>
                            </ul>
                        </div>
                        <div class="hidden tweet-buttons">
                            <button id="button_add">Add</button>
                            <button id="button_remove">Remove</button>
                        </div>
                    </div>`);
                    tweetElement.addClass('tweet');
                    tweetElement.click((e) => { toggleTweet(e, item.id, item.author_id) });
                    tweetsElement.append(tweetElement);
                })

            //if tweetselement has no children
            if (tweetsElement.children().length === 0) {
                errorElement.text('No recent tweets found for the query.');
                if (errorElement.hasClass('hidden')) {
                    errorElement.removeClass('hidden');
                }
                if (!tweetNoteElement.hasClass('hidden')) {
                    tweetNoteElement.addClass('hidden');
                }
                mainElement.empty();
                return;
            }

            tweetNoteElement.removeClass('hidden');
        }

        buttonElement.click((e) => handleClick(e));

    });
})();