$(document).ready(() => {
  // API variables
  const CLIENT_ID = '8b32a67fbd7cca436d60';
  const CLIENT_SECRET = '26647f6892d7042d9daeabf77bc29f2b0064d5c9';
  const BASE_API_URL = 'https://api.github.com';

  // DOM variables
  const form = $('#search-form');
  const userProfileContainer = $('.user-profile');
  const repositoriesContainer = $('.repositories');
  const contentPanel = $('#content');
  const spinner = $('<div class="spinner">');

  /** Show user spinner */
  const showUserSpinner = () => {
    spinner.appendTo(userProfileContainer);
  }

  /** Hide user spinner */
  const hideUserSpinner = () => {
    spinner.remove();
  }

  /** Show repositories spinner */
  const showRepositoriesSpinner = () => {
    spinner.appendTo(repositoriesContainer);
  }

  /** Show repositories spinner */
  const hideRepositoriesSpinner = () => {
    spinner.remove();
  }

  /** Renders user's profile container  */
  const renderUser = (user) => {
    // null values check
    if (user.email === null) {
      user.email = '';
    }
    if (user.company === null) {
      user.company = '';
    }
    if (user.bio === null) {
      user.bio = '';
    }
    if (user.location === null) {
      user.location = '';
    }
    if (user.name === null) {
      user.name = '';
    }

    // registration date conversion to match dd/mm/yyyy format
    const userRegistrationDate = new Date(user.created_at).toLocaleString([], {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });

    // element preparation
    const nameElement = $(`<div class="user-name">${user.name}</div>`);

    const userInfoBoxElement = $('<div class="user-info-box"></div>');
    const userInfoBoxLeftElement = $('<div class="col"></div>');
    userInfoBoxLeftElement.html(`
      <ul>
        <li>Login: <strong>${user.login}</strong></li>
        <li>Company: <strong>${user.company}</strong></li>
        <li>Description: <strong>${user.bio}</strong></li>
        <li>Location: <strong>${user.location}</strong></li>
        <li>Email: <strong>${user.email}</strong></li>
        <li>Followers: <strong>${user.followers}</strong></li>
        <li>Registered: <strong>${userRegistrationDate}</strong></li>
        <li><a href=${user.html_url}>${user.html_url}</a></li>
      </ul>
    `);

    const userInfoBoxRightElement = $('<div class="col"></div>');
    userInfoBoxRightElement.html(`
    <div class="user-image-wrapper">
      <img src=${user.avatar_url}>
    </div>
    <a class="user-view-profile" href=${user.html_url}>View profile</a>
    `);

    userInfoBoxElement.append(userInfoBoxLeftElement, userInfoBoxRightElement);

    // update user profile container
    userProfileContainer.empty();
    userProfileContainer.append(nameElement, userInfoBoxElement);
  };

  /** Renders user's repository listing */
  const renderRepositories = (repositories) => {
    repositoriesContainer.empty()

    // user has no repositories
    if (repositories.length === 0) {
      repositoriesContainer.append('<p>This user has 0 repositories</p>');
      return;
    }

    const repositoriesListElement = $('<ul>');
    let repositoryItems = [];

    repositories.forEach((repository) => {
      const repositoryElement = $(`<li><p>${repository.name}</p><a href="${repository.html_url}">${repository.html_url}</a></li>`);
      repositoryItems.push(repositoryElement);
    });

    repositoriesListElement.append(repositoryItems);
    repositoriesContainer.append(repositoriesListElement);
  }

  /** Fetch data about user's repositories */
  const fetchRepositories = (REPOS_URL) => {
    const url = `${REPOS_URL}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;

    axios.get(url).then((response) => {
      // repositories data loaded - hide repositories spinner
      hideRepositoriesSpinner();

      // render repositories data
      renderRepositories(response.data);

    }).catch((err) => {
      // hide spinner
      hideRepositoriesSpinner();

      // show error
      repositoriesContainer.empty();
      repositoriesContainer.append('<p>No repositories found</p>');
    });
  };

  /** Fetch data about user */
  const fetchUser = (username) => {
    const url = `${BASE_API_URL}/users/${username}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;

    // show spinners to indicate data loading
    showUserSpinner();
    showRepositoriesSpinner();

    axios.get(url).then((response) => {
      //  user data is loaded - hide user spinner
      hideUserSpinner();

      // render user data and fetch repositories data
      renderUser(response.data);
      fetchRepositories(response.data.repos_url);
    }).catch((err) => {
      // user doesn't exist - hide both spinners
      hideUserSpinner();
      hideRepositoriesSpinner();

      // show error
      userProfileContainer.empty();
      userProfileContainer.append('<p>User not found</p>');
    });
  }

  /** Search form submit event - finds user by inserted name */
  form.submit((e) => {
    e.preventDefault();

    contentPanel.removeClass('hidden');
    const username = $('input[name=username]').val();
    fetchUser(username);
  });
});


