/**
 * Git The Hub
 */
// It is best practice to create variables and functions under one object to avoid global polution
const App = {};
// INSERT CLIENT ID FROM GITHUB
App.client_id = 'a52a5a009eeb3d6a52b0';
// INSERT CLIENT SECRET FROM GITHUB
App.client_secret = '6a4dbaa287bc6b6b6c67d4f00cff85e363e26b0e';
App.baseApiUrl = 'https://api.github.com';

// render the user's information
App.renderUser = (user) => {
  $('#loader').hide();
  $('#user-info').show();
  $('#avatar').attr('src', user.avatar_url);
  $('#username').text(user.login);
  $('#bio').text(user.bio);
  $('#location').text(`location: ${user.location}`);
  $('#description').text(`description: ${user.description}`);
  $('#email').text(`email: ${user.email} `);
  $('#followers').text(`followers: ${user.followers} `);
  $('#registered').text(`member since: ${user.created_at} `);
};

// a function that fetches repositories of users based on their username
App.fetchRepositories = (username) => {
  $.ajax({
    url: `${App.baseApiUrl}/users/${username}/repos?client_id=${App.client_id}&client_secret=${App.client_secret}`,
    type: 'GET',
    success: (data) => {
      let repositories = data.map((repo) => {
        return `<li><a href="${repo.html_url}">${repo.name}</a></li>`;
      });  
      $('#repositories').html(repositories);
    }
  })
};
App.init = () => {
  $('#user-info');
  
  $('#search-form').on('submit', (e) => {
    e.preventDefault();
    
    let username = $('input[name="username"]').val();
    $('input[name="username"]').val('');
    $('#user-profile');
    
    $.ajax({
      url: `${App.baseApiUrl}/users/${username}?client_id=${App.client_id}&client_secret=${App.client_secret}`,
      type: 'GET',
      success: (data) => {
        App.renderUser(data);
        App.fetchRepositories(username);
      },
      error: (data) => {
        console.log('User not found!');
      }
    })
  });
};

// wait for the page to load, then execute the main processes
$(document).ready(() => {
  App.init();
});