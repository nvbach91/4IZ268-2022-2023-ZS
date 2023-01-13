(() => {

    // declare global variables
    const webStorage = window.localStorage;

    /** FETCH IDs */

    const fetchTweets = async (tweetIds) => {
        const tweets = await fetch(`https://twitter.asitanc.cz/api/twitter`, {
            method: 'POST',
            body: JSON.stringify({
                method: 'GET',
                apiUrl: '/2/tweets',
                type: 'ids',
                query: `${encodeURIComponent(tweetIds)}`,
                expansions: 'author_id',
                tweetFields: 'created_at,public_metrics'
            })
        })
            .then(res => res.json())
            .then(res => res.data);
        return tweets;
    }

    const fetchUserInfo = async (userId) => {
        const user = await fetch(`https://twitter.asitanc.cz/api/twitter`, {
            method: 'POST',
            body: JSON.stringify({
                method: 'GET',
                apiUrl: '/2/users',
                type: 'ids',
                query: `${encodeURIComponent(userId)}`,
                userFields: 'profile_image_url,username,name'
            })
        })
            .then(res => res.json())
            .then(res => res.data);
        return user;
    }


    /** ============== ============== */


    $(document).ready(function () {
        const mainElement = $('main');
        const buttonElement = $('#search');
        const searchForm = $('#search-form');

        /** ============== PARSE Tweets ============== */

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

        /** ============== ============== */

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
            const removedItems = webStorage.getItem('removedTweets');
            if (removedItems === null) return webStorage.setItem('removedTweets', tweet);
            if (removedItems === '') return webStorage.setItem('removedTweets', tweet);
            if (removedItems === ',') return webStorage.setItem('removedTweets', tweet);
            return webStorage.setItem('removedTweets', `${removedItems},${tweet}`);
        }

        /** ============== CLICK EVENT ============== */

        /** TODO CLICK */

        const todoButton = $('#todo-button');
        todoButton.click((e) => {
            e.preventDefault();
            handleTodoClick(e);
        });

        const handleTodoClick = async (e) => {

            $('.spinner').removeClass('hidden');

            const mainElement = '';

            searchForm.addClass('hidden');

            const sortElement = $('.sort');
            sortElement.addClass('hidden');

            mainElement.empty();

            const savedItems = webStorage.getItem('savedTweets');

            if (savedItems === null || savedItems === '') {
                const error = $('.error');
                error.text('No saved tweets found');
                error.removeClass('hidden');
                $('.spinner').addClass('hidden');
                return;
            }

            if (savedItems.charAt(0) === ',') {
                webStorage.setItem('savedTweets', savedItems.substring(1, savedItems.length - 1));
            }

            const savedTweets = webStorage.getItem('savedTweets');

            const resultElement = $(`<div class="main-panel">
                <div>
                    <div class="panel-header">
                        <h2>Saved Tweets</h2>
                    </div>
                    <div class="tweets" id="tweets">
                    </div>
                </div>
            </div>`);
            mainElement.append(resultElement);
            mainElement.addClass('hidden');

            const tweetsElement = $('#tweets');
            const items = await fetchTweets(savedTweets);

            if (items !== undefined) {
                items.forEach((item) => {

                    const tweetDate = new Date(item.created_at);
                    const tweetDateFormatted = tweetDate.toLocaleString('cs-CZ', { timeZone: 'Europe/Prague' });

                    const tweetText = parseTweet(item.text)
                    const tweetElement = $(`<div id="${item.id}">
                        <div class="tweet_id">${item.id}</div>
                        <div class="tweet_date">${tweetDateFormatted}</div>
                        <hr />
                        <div class="tweet_text">${tweetText}</div>
                        <hr />
                        <div class="public_metrics">
                            <ul class="public_metrics_list">
                                <li>Like: ${item.public_metrics.like_count}</li>
                                <li>Reply: ${item.public_metrics.reply_count}</li>
                                <li>Retweet: ${item.public_metrics.retweet_count}</li>
                                <li>Quote: ${item.public_metrics.quote_count}</li>
                            </ul>
                        </div>
                        <div class="hidden tweet-buttons">
                            <button class="button_remove">Remove</button>
                        </div>
                    </div>`);
                    tweetElement.addClass('tweet');
                    tweetElement.find('.button_remove').click((e) => { removeTweet(e) });
                    tweetElement.click((e) => {
                        e.preventDefault();
                        if (tweetElement.find('.tweet-buttons').hasClass('hidden')) {
                            tweetElement.find('.tweet-buttons').removeClass('hidden');
                        } else {
                            tweetElement.find('.tweet-buttons').addClass('hidden');
                        }
                    });

                    tweetsElement.append(tweetElement);
                })
            } else {
                const error = $('.error');
                $('.spinner').addClass('hidden');
                error.text('No saved tweets available');
                error.removeClass('hidden');
                $('.main-panel').remove();
                // sometimes there is tweet ID, however tweet is not available from API
                // so we can clear the storage as well to remove it/them
                webStorage.setItem('savedTweets', '');
            }

            $('.spinner').addClass('hidden');
            mainElement.removeClass('hidden');
            mainElement.append(tweetsElement);
            const main = $('main');
            main.append(mainElement);
        }

        /** SEARCH CLICK */

        // Fetch tweets based on entered keyword
        const handleClick = async (e) => {
            e.preventDefault();

            const sortElement = $('#select-sort');
            const sort = sortElement.val() ?? 'likes';

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

            let tweets = await fetch(`https://twitter.asitanc.cz/api/twitter`, {
                method: 'POST',
                body: JSON.stringify({
                    method: 'GET',
                    apiUrl: '/2/tweets/search/recent',
                    type: 'query',
                    query: `${encodeURIComponent(trimmedKeyValue)}`,
                    expansions: 'author_id',
                    tweetFields: 'created_at,public_metrics',
                    maxResults: 10, //must be within 10-100
                }),
            })
                .then(res => res.json())
                .then(res => res.data);

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
            mainElement.addClass('hidden');
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

            // sort tweets by likes

            const sortTweets = (tweets) => {
                if (sort === 'likes') {
                    tweets = tweets.sort((a, b) => {
                        return b.public_metrics.like_count - a.public_metrics.like_count;
                    })
                }
                if (sort === 'retweets') {
                    tweets = tweets.sort((a, b) => {
                        return b.public_metrics.retweet_count - a.public_metrics.retweet_count;
                    })
                }
                if (sort === 'date') {
                    tweets = tweets.sort((a, b) => {
                        return new Date(b.created_at) - new Date(a.created_at);
                    })
                }
                return tweets;
            }

            tweets = sortTweets(tweets);

            for (const item of tweets) {
                    const removedTweets = webStorage.getItem('removedTweets');
                    if (removedTweets !== null) {
                        if (removedTweets.includes(item.id)) return;
                    }
                    // if tweet is already saved
                    const savedTweets = webStorage.getItem('savedTweets');
                    if (savedTweets !== null) {
                        if (savedTweets.includes(item.id)) return;
                    }

                    const tweetDate = new Date(item.created_at);
                    const tweetDateFormatted = tweetDate.toLocaleString('cs-CZ', { timeZone: 'Europe/Prague' });

                    const tweet = parseTweet(item.text);
                    const tweetElement = $(`<div id="${item.id}">
                        <div class="tweet_id">${item.id}</div>
                        <div class="tweet_date">${tweetDateFormatted}</div>
                        <hr>
                        <div class="tweet_text">${tweet}</div>
                        <div class="tweet_author" id="${item.author_id}">User: <a href="https://twitter.com/intent/user?user_id=${item.author_id}" target="_blank">${item.author_id}</a></div>
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
                            <button class="button_add">Add</button>
                            <button class="button_remove">Remove</button>
                        </div>
                    </div>`);
                    tweetElement.addClass('tweet');

                    tweetElement.find('.button_add').click((e) => { addToList(e) });
                    tweetElement.find('.button_remove').click((e) => { removeTweet(e) });
                    tweetElement.find('.tweet_text').click((e) => {
                        e.preventDefault();
                        if (tweetElement.find('.tweet-buttons').hasClass('hidden')) {
                            tweetElement.find('.tweet-buttons').removeClass('hidden');
                        } else {
                            tweetElement.find('.tweet-buttons').addClass('hidden');
                        }
                    });

                    tweetsElement.append(tweetElement);
                    
                }

            resultElement.append(tweetsElement);
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

            $('.spinner').addClass('hidden');
            tweetNoteElement.removeClass('hidden');
            mainElement.removeClass('hidden');

            const mainTweets = $('.tweets');
            for (const i of mainTweets.children()) {
                const user = $(i).find('.tweet_author');
                const userID = user.attr('id');
                const userData = await fetchUserInfo(userID);
                user.html(`User: <a href="https://twitter.com/intent/user?user_id=${userData[0].id}" target="_blank">${userData[0].name}</a>`);
            }

        }


        /** SEARCH BUTTON CLICK */

        const handleSearchButtonClick = (e) => {
            e.preventDefault();
            const sortElement = $('.sort');
            if (sortElement.hasClass('hidden')) {
                sortElement.removeClass('hidden');
            }
            if (searchForm.hasClass('hidden')) {
                searchForm.removeClass('hidden');
            }
            mainElement.empty();
        }
        
        const searchButtonElement = $('#search-button');
        searchButtonElement.click((e) => handleSearchButtonClick(e));

        buttonElement.click((e) => handleClick(e));

    });
})();