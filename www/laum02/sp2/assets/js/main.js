(() => {

    // Handle input
    const handleElement = $('.handle');
    // Latest tweet
    const tweetElement = $('.latest-tweet');
    // Error element for not found user
    const missingUserElement = $('.missing-user');
    // Hidden elements
    const hiddenDataElement = $('.hidden-data');
    const lastSearchElement = $('.last-search');
    // Spinner
    const spinnerElement = $('.spinner');
    // User ID
    let userId = '';
    // Indicates whether the app should end
    let endSearch = false;
    // On load
    $(document).ready(function () {
        setupLastSearch();
    });

    function setupLastSearch() {
        const last = localStorage.getItem('lastSearch');
        if (last == null) lastSearchElement.empty();
        else lastSearchElement.text('Poslední vyhledávání: ' + last);
    }

    // Setup DOM before search
    function setup() {
        // Hide all data
        missingUserElement.addClass('hidden');
        hiddenDataElement.addClass('hidden');
        // User has never tweeted, by default
        tweetElement.empty();
        tweetElement.append($('<p>').text('Uživatel ještě nikdy netweetnul:(.'));
        // Clear error message
        missingUserElement.empty();
        // Reset
        endSearch = false
    }

    // Display error message in a given element
    function showError(el, txt) {
        el.append($('<p>').text(txt));
        el.removeClass('hidden');
    }

    // On form submit
    $('.input').submit((e) => {
        spinnerElement.css("display", "block");
        // Prevent reload
        e.preventDefault();
        setup();
        // Get user 
        const user = handleElement.val();
        // Update last search
        localStorage.setItem('lastSearch', user);
        setupLastSearch();
        // Try to fill user
        request(createUserUrl(user), fillUser).catch((r) => {
            endSearch = true;
            console.log(r.responseText);
            if (r.status == 429) {
                showError(missingUserElement, 'Poslali jste požadavků. Zkuste to prosím znovu za hodinu.');
            } else if (r.status == 403) {
                showError(missingUserElement, 'Je nutné aktivovat cors-anywhere. Klikněte prosím na odkaz v zápatí stránky.');
            } else if (r.status == 400) {
                showError(missingUserElement, 'Jméno nesplňuje požadavky twitteru.');
            }

        }).then(() => {
            // Exit if error has been thrown
            if (endSearch) {
                spinnerElement.css("display", "none");
                return
            }
            // Get tweet
            request(createLatestTweetUrl(userId), fillLatestTweet).then(() => {
                spinnerElement.css("display", "none");
                // Show user
                hiddenDataElement.removeClass('hidden');
            });
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
            callback(resp.hasOwnProperty('data') ? resp.data[0] : '');
        });
    }

    // Fill user
    async function fillUser(user) {
        if (user == '') {
            showError(missingUserElement, 'Uživatel nebyl nalezen.');
            endSearch = true;
            return;
        }
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
        if (tweet != '') {
            tweetElement.empty();
            twttr.widgets.createTweet(
                tweet.id,
                tweetElement[0]
            );
        }
    }
})();