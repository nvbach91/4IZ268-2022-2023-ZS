(() => {

    const webStorage = window.localStorage;

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

    const toggleTweet = (e, id) => {
        const tweet = $(`#${id}`);
        const hidden = tweet.find('.tweet-buttons');
        if (hidden.hasClass('hidden')) {
            hidden.removeClass('hidden');
            const buttonRemove = tweet.find('#button_remove');
            buttonRemove.click((e) => { removeFromList(e) });
        } else {
            hidden.addClass('hidden');
        }
    }

    const removeFromList = (e) => {
        const tweet = $(e.target).parent().parent().find('.tweet_id').text();
        const savedItems = webStorage.getItem('savedTweets');
        const items = savedItems.split(',');
        const index = items.indexOf(tweet);
        if (index > -1) {
            items.splice(index, 1);
        }
        webStorage.setItem('savedTweets', items.join(','));
        const tweetElement = $(`#${tweet}`);
        tweetElement.remove();
        const tweetsElement = $('#tweets');
        if (tweetsElement.children().length === 0) {
            const error = $('.error');
            error.text('No saved tweets found');
            error.removeClass('hidden');
            $('.main-panel').remove();
        }
    }

    $(document).ready(async () => {

        $('.spinner').removeClass('hidden');

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

        $('.spinner').addClass('hidden');

        const mainElement = $('main');
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

        const tweetsElement = $('#tweets');
        const items = await fetchTweets(savedTweets);

        if (items !== undefined) {
            items.forEach((item) => {
                const tweetElement = $(`<div id="${item.id}">
                    <div class="tweet_id">${item.id}</div>
                    <div class="tweet_text">${item.text}</div>
                    <div class="hidden tweet-buttons">
                        <button id="button_user">User</button>
                        <button id="button_report">Report</button>
                        <button id="button_remove">Remove</button>
                    </div>
                </div>`);
                tweetElement.addClass('tweet');
                tweetElement.click((e) => { toggleTweet(e, item.id) });
                tweetsElement.append(tweetElement);
            })
        } else {
            const error = $('.error');
            error.text('No saved tweets available');
            error.removeClass('hidden');
            $('.main-panel').remove();
            // sometimes there is tweet ID, however tweet is not available from API
            // so we can clear the storage as well to remove it/them
            webStorage.setItem('savedTweets', '');
        }

    });

})();