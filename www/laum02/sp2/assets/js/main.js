$(document).ready(function () {

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
    // Saved users select
    const usersSelectElement = $('.saved-users');
    const userSaveElement = $('.user-save');
    // User ID
    let userId = '';
    // Indicates whether the app should end
    let endSearch = false;
    // handle regex
    const userRegex = /^[a-zA-Z0-9]{2,16}$/;
    // Tweets
    let userTweets = [];
    let userTweetSelected = 0;
    const prevTweetElement = $('.prev-tweet');
    const nextTweetElement = $('.next-tweet');
    const tweetButtonsElement = $('.tweet-buttons');
    const tweetTextElement = $('.tweet-count');

    function hideShowFollowed() {
        usersSelectElement.empty();
        const followed = localStorage.getItem('followedUsers') ?? "";
        if (followed == "") {
            usersSelectElement.css("display", "none");
        } else {
            const options = $.map(followed.split(","), (f) => {
                return $('<option>', {
                    text: f
                });
            });
            usersSelectElement.append(options);
            usersSelectElement.css("display", "block");
        }
    }

    function setupLastSearch() {
        const last = localStorage.getItem('lastSearch');
        if (last == null) lastSearchElement.empty();
        else lastSearchElement.text('Poslední vyhledávání: ' + last);
    }

    usersSelectElement.click(() => {
        const selected = usersSelectElement.find(":selected").text();
        if (selected != '') {
            handleElement.val(selected);
            $('.handle-form').submit();
        }
    });

    // Setup DOM before search
    function setup() {
        // Hide all data
        missingUserElement.addClass('hidden');
        hiddenDataElement.addClass('hidden');
        tweetButtonsElement.addClass('hidden');
        tweetTextElement.empty();
        // User has never tweeted, by default
        tweetElement.empty();
        tweetElement.append($('<p>').text('Uživatel ještě nikdy netweetnul:(.'));
        // Clear error message
        missingUserElement.empty();
        // Reset
        endSearch = false;
    }

    // Display error message in a given element
    function showError(el, txt) {
        el.append($('<p>').text(txt));
        el.removeClass('hidden');
    }

    function setFollowButton(user) {
        const follows = localStorage.getItem("followedUsers") ?? "";
        userSaveElement.unbind("click");
        if (follows.split(",").includes(user)) {
            userSaveElement.text("SMAZAT uživatele z rychlého vyhledávání.");
            userSaveElement.click(removeUserFromFollowed);
        } else {
            userSaveElement.text("ULOŽIT uživatele do rychlého vyhledávání");
            userSaveElement.click(addUserToFollowed);
        }

    }

    // On form submit
    $('.input').submit((e) => {
        // Prevent reload and prepare
        e.preventDefault();
        setup();
        // Get user and validate
        const user = handleElement.val().trim();
        if (!userRegex.test(user)) {
            console.log("aa");
            showError(missingUserElement, 'Jméno uživatele nesplňuje požadavky.');
            return;
        }
        setFollowButton(user);
        // Show spinner
        spinnerElement.css('display', 'block');
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
                spinnerElement.css('display', 'none');
                return;
            }
            // Get tweet
            request(createLatestTweetUrl(userId), fillLatestTweet).then(() => {
                spinnerElement.css('display', 'none');
                // Show user
                hiddenDataElement.removeClass('hidden');
            });
        });
    });

    // Save user to quick search
    function addUserToFollowed() {
        const currUser = localStorage.getItem('lastSearch');
        // Save to localStorage
        let followed = localStorage.getItem("followedUsers") ?? "";
        if (followed.length == 0) {
            localStorage.setItem("followedUsers", currUser);
        } else {
            followed = followed.split(",");
            followed.push(currUser);
            followed = followed.sort(function (a, b) {
                return a.toLowerCase().localeCompare(b.toLowerCase());
            }).join(",");
            localStorage.setItem("followedUsers", followed);
        }
        // Show if first follow
        setFollowButton(currUser);
        hideShowFollowed();
    }

    function removeUserFromFollowed() {
        const currUser = localStorage.getItem('lastSearch');
        let followed = localStorage.getItem("followedUsers").split(",");
        followed = followed.filter((e) => {
            return e != currUser;
        });
        localStorage.setItem("followedUsers", followed.join(","));
        setFollowButton(currUser);
        hideShowFollowed();
    }

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
        console.log(url);
        await $.ajax({
            dataType: 'json',
            type: 'GET',
            url: url,
            crossDomain: true,
            headers: {
                'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAAMabkwEAAAAAt5JAqqCv89bBuMV7hhdjgmPLIy0%3DZb5WLArdIYEPw9rEAUIgiVp4RNVkZxQ7ZWVj1gh2HIx8xtTg3p',
            }
        }).done((resp) => {
            callback(resp.hasOwnProperty('data') ? resp.data : []);
        });
    }

    // Fill user
    async function fillUser(user) {
        user = user[0];
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
    function fillLatestTweet(tweets) {
        if (tweets.length != 0) {
            userTweets = tweets
            $('.tweet-buttons').removeClass('hidden');
            displayTweet(0);
        }
    }

    function displayTweet(id) {
        const tweet = userTweets[id];
        tweetTextElement.text(`(${id + 1}/${userTweets.length})`);
        tweetElement.empty();
        twttr.widgets.createTweet(
            tweet.id,
            tweetElement[0]
        ).then(() => {
            const tweetJSON = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(tweet));
            const downloadElement = $("<a>").text("Stáhnout tweet jako JSON");
            downloadElement.attr("href", tweetJSON);
            downloadElement.attr("download", "latest-tweet.json");
            downloadElement.attr("class", "tweet-download");
            tweetElement.append(downloadElement); 
        });
        if (id === 0) prevTweetElement.prop("disabled", true);
        else prevTweetElement.prop("disabled", false);
        if (id === userTweets.length - 1) nextTweetElement.prop("disabled", true);
        else nextTweetElement.prop("disabled", false);
    }

    prevTweetElement.click(() => {
        userTweetSelected -= 1;
        displayTweet(userTweetSelected);
    });

    nextTweetElement.click(() => {
        userTweetSelected += 1;
        displayTweet(userTweetSelected);
    });

    setupLastSearch();
    // Assign regex to input
    handleElement.attr("pattern", userRegex.toString().replace(/^\/|\/$/g, ''));
    // Hide followed users if empty
    hideShowFollowed();
});