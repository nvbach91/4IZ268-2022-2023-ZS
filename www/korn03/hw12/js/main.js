
const App = {};
App.client_id = '2da7058f33c451125969';
App.client_secret = 'fdcd28eac6890619effd5a5b8860b17622cc4401';
App.baseApiUrl = 'https://api.github.com/users/';

const appMainDiv = $('#app main');


const searchField = $('#search-form');

// render the user's information
App.renderUser = (user) => {

    const userCard = $('<div id="user-profile"></div>');

    const userStats = $('<div class="userStats"></div>');
    const userLogin = $(`<div class='userLogin'>Login: ${user.login}</div>`);
    const userAvatar = $(`<div class='userAvatar' style="background-image: url(${user.avatar_url})"></div>`);
    const userName = $(`<h2>${user.name}</h2>`);
    const userLocation = $(`<div class='userLocation'>Location:${user.location}<div>`);
    const userDesc = $(`<div class='userDesc'>Description: ${user.bio}<div>`);
    const userMail = $(`<div class='userEmail'>Email: ${user.email}<div>`);
    const userFollowers = $(`<div class='userFollowers'>Followers: ${user.followers}<div>`);
    const userRegistration = $(`<div class='userRegistration'>Registration: ${user.created_at}<div>`);
    const userLink = $(`<a class='userLink' href='${user.html_url}'>Find on GitHub</a>`);

    appMainDiv.append(userCard);

    userCard.append(userAvatar);

    userStats.append(userName);
    userStats.append(userLogin);
    userStats.append(userLocation);
    userStats.append(userDesc);
    userStats.append(userMail);
    userStats.append(userFollowers);
    userStats.append(userRegistration);
    userStats.append(userLink);
    userCard.append(userStats);

};

// a function that fetches repositories of users based on their username
App.fetchRepositories = (username) => {


    $.ajax({
        url: App.baseApiUrl + username + "/repos",
        data: {
            client_id: App.client_id,
            client_secret: App.client_secret,
        },
    }).done(function (repos) {
        console.log('Repos done');
        console.log(repos);


        const reposDiv = $('<ul id="repositories"></ul>');



        const reposTitle = $(`<h2>${username}'s repositories</h2>`)
        appMainDiv.append(reposDiv);
        reposDiv.append(reposTitle);


        repos.forEach(repo => {
            console.log(repo);


            const repoLi = $('<li class="repoLi"></li>')

            const repoName = $(`<div class='repoName'>${repo.name}</div>`);
            const repoUrl = $(`<a class='repoUrl' href="${repo.url}">Link</a>`);
            const repoLangs = $(`<div class='repoLangs'>${repo.language}</div>`)

            repoLi.append(repoName);
            repoLi.append(repoUrl);
            repoLi.append(repoLangs);

            reposDiv.append(repoLi);
        });

    }).fail(function () {
        console.log('failed to fetch repos');
    });

};
App.init = () => {



    $("#search-form").submit(function (event) {

        event.preventDefault();

        $('#user-profile').remove();
        $('#repositories').remove();
        $('#errMsg').remove();
        const inputVal = $('input').val();

        $.ajax({
            url: App.baseApiUrl + inputVal,
            data: {
                client_id: App.client_id,
                client_secret: App.client_secret,
            },
        }).done(function (user) {
            console.log('done');
            console.log(user);
            App.renderUser(user);
            App.fetchRepositories(user.login);
        }).fail(function () {
            console.log('User fetch failed');
            //App.jUserProfile.html('<p>User not found</p>');
            const errMsg = $(`<h2 id="errMsg">${inputVal} not found!</h2>`)
            appMainDiv.append(errMsg);
        });
    });

};





// wait for the page to load, then execute the main processes
$(document).ready(() => {
    App.init();


});