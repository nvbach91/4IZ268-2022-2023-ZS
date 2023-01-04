(() => {

    const handleElement = $('.handle');
    const tweetElement = $('.latest-tweet');

    const missingTweetElement = $('.missing-tweet');
    const missingUserElement = $('.missing-user');

    let userId = '';

    // Have '@' as the first symbol in '#handle' input
    handleElement.on('keydown', (e) => {
        const key = e.key;
        const len = handleElement.val().length;
        if ((key === 'Backspace' || key === 'Delete')) {
            if (len == 1) {
                e.preventDefault();
            }
        }
    });

    // Setup DOM before search
    function setup() {
        // Reset
        $('.hidden-user').addClass('hidden');
        $('.hidden-data').addClass('hidden');
        tweetElement.empty();
        missingUserElement.empty();
        missingTweetElement.empty();
    }

    function showError(el, txt) {
        el.append($('<p>').text(txt));
        el.removeClass('hidden');
    }

    // On form submit
    $('.input').submit((e) => {
        // Prevent reload
        e.preventDefault();
        setup();
        // Get user 
        const user = handleElement.val().substring(1);
        let end = false;
        // Try to fill user
        request(createUserUrl(user), fillUser).catch((r) => {
            end = true;
            if (r.status == 429) {
                showError(missingUserElement, 'Poslali jste požadavků. Zkuste to prosím znovu za hodinu.');
            } else if (r.status == 403) {
                showError(missingUserElement, 'Je nutné aktivovat cors-anywhere. Klikněte prosím na odkaz v zápatí stránky.');
            } else if (r.status == 400) {
                showError(missingUserElement, 'Jméno nesplňuje požadavky twitteru.');
            } else {
                console.log(r.responseText);
            }
        }).then(() => {
            // Exit if error has been thrown
            if (end) return;
            // Show user
            $('.hidden-data').removeClass('hidden');
            // Get tweet
            request(createLatestTweetUrl(userId), fillLatestTweet);
        });

    });

    // Create URL for user request
    function createUserUrl(user) {
        const cors = 'https://cors-anywhere.herokuapp.com/';
        const front = 'https://api.twitter.com/2/users/by?usernames=';
        const back = '&user.fields=profile_image_url%2Cpublic_metrics%2Cdescription%2Clocation%2Ccreated_at%2Cverified%2Cid%2Cname%2Cusername';
        return (cors + front + user + back);
    }

    // Create URL for latest tweet request
    function createLatestTweetUrl(userId) {
        const cors = 'https://cors-anywhere.herokuapp.com/';
        const front = 'https://api.twitter.com/2/users/';
        const back = '/tweets?tweet.fields=created_at%2Cpublic_metrics';
        return (cors + front + userId + back);
    }

    // Create request
    async function request(url, callback) {
        await $.ajax({
            dataType: 'json',
            type: 'GET',
            url: url,
            crossDomain: true,
            headers: {
                'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAAMabkwEAAAAAt5JAqqCv89bBuMV7hhdjgmPLIy0%3DZb5WLArdIYEPw9rEAUIgiVp4RNVkZxQ7ZWVj1gh2HIx8xtTg3p',
            }
        }).done((resp) => {
            if (!resp.hasOwnProperty('data')) callback('');
            else callback(resp.data[0]);
        });
    }

    // Fill user
    async function fillUser(user) {
        // Profile
        $('.profile-image').attr('src', user.profile_image_url.replace('normal', '400x400'));
        $('.name').text(user.name);
        $('.username').text(user.username);
        $('.location').text(user.location);
        $('.verified').text(user.verified ? 'je' : 'není');
        const cd = new Date(user.created_at);
        $('.creation-date').text(cd.toLocaleDateString('cs-CZ') + ' v ' + cd.toLocaleTimeString('cs-CZ'));
        // Description
        $('.profile-desc').text(user.description);
        // Stats
        $('.stat-1 .stat-value').text(user.public_metrics.followers_count);
        $('.stat-2 .stat-value').text(user.public_metrics.following_count);
        $('.stat-3 .stat-value').text(user.public_metrics.tweet_count);
        $('.stat-4 .stat-value').text(user.public_metrics.listed_count);
        // Save user ID
        userId = user.id;
    }

    // Fill tweet
    function fillLatestTweet(tweet) {
        if (tweet == '') {
            showError(missingTweetElement, 'Uživatel ještě nikdy netweetnul:(.');
        } else {
            twttr.widgets.createTweet(
                tweet.id,
                tweetElement[0]
            );
        }
    }
})();