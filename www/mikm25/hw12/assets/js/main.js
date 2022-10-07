const CLIENT_ID = '984e09b7fed33f91c7dd';
const CLIENT_SECRET = '40dda0f1edcb4cf69370c18b7c82d78259ce8213';
const BASE_URL = 'https://api.github.com';

const getBasicAuthHeader = () => 'Basic ' + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);

const GITHUB_REPOSITORY = {
  async getUser(username) {
    return $.ajax({
      type: 'GET',
      url: `${BASE_URL}/users/${normalizeUsername(username)}`,
      dataType: 'json',
      headers: {
        'Authorization': getBasicAuthHeader()
      }
    });
  },
  async getRepositories(username) {
    return $.ajax({
      type: 'GET',
      url: `${BASE_URL}/users/${normalizeUsername(username)}/repos`,
      dataType: 'json',
      headers: {
        'Authorization': getBasicAuthHeader()
      }
    });
  }
};

const normalizeUsername = username => username.replace(' ', '-').toLowerCase();

const setLoading = state => {
  $('#search-form button[type="submit"]').toggleClass('loading', state);
};

const clearResult = () => {
  const result = $('#result');

  // hide result
  result.addClass('d-none');

  const fieldIds = [
    'user-image',
    'user-name',
    'user-username',
    'user-email',
    'user-bio',
    'user-location',
    'user-url',
    'user-repositories',
  ];

  fieldIds.forEach(fieldId => {
    const element = $(`#${fieldId}`);
    const tagName = element.prop('tagName').toUpperCase();

    if (tagName === 'IMG') {
      element.attr('src', '#')
      return;
    }

    if (tagName === 'A') {
      element.attr('href', '#')
      return;
    }

    if (tagName === 'TABLE') {
      element.find('tbody').empty();
      return;
    }

    element.text('-');
  });
}

const setResult = (detail, repos) => {
  const result = $('#result');

  const fields = [
    {
      id: 'user-image',
      attribute: 'avatar_url'
    },
    {
      id: 'user-name',
      attribute: 'name'
    },
    {
      id: 'user-username',
      attribute: 'login'
    },
    {
      id: 'user-email',
      attribute: 'email'
    },
    {
      id: 'user-bio',
      attribute: 'bio'
    },
    {
      id: 'user-location',
      attribute: 'location'
    },
    {
      id: 'user-url',
      attribute: 'html_url'
    }
  ];

  // fill user detail fields
  fields.forEach(field => {
    const value = detail[field.attribute];

    if (!value) {
      return;
    }

    const element = $(`#${field.id}`);
    const tagName = element.prop('tagName').toUpperCase();

    if (tagName === 'IMG') {
      element.attr('src', value)
      return;
    }

    if (tagName === 'A') {
      element.attr('href', value)
      return;
    }

    element.text(value)
  })

  const reposContainer = $('#user-repositories tbody');
  let i = 1;

  // fill user repos
  repos.forEach(repo => {
    const row = $('<tr></tr>');

    row.append($('<td></td>', { text: i }));
    row.append($('<td></td>', { text: repo.name }));

    const button = $('<a></a>', {
      text: 'Detail',
      class: 'btn btn-sm btn-primary',
      href: repo.html_url,
      target: '_blank'
    });

    row.append($('<td></td>', { html: button }));

    // append row to the table
    reposContainer.append(row);

    i++;
  })

  result.removeClass('d-none');
}

$('#search-form').on('submit', async e => {
  e.preventDefault();

  setLoading(true);
  clearResult();

  const value = $('#search-input').val();

  try {
    const userDetail = await GITHUB_REPOSITORY.getUser(value);
    const userRepos = await GITHUB_REPOSITORY.getRepositories(userDetail.login);

    setResult(userDetail, userRepos);
  } catch (error) {
    window.alert(`Request failed with an error: ${error.responseJSON.message} (status ${error.status}).`);
  } finally {
    setLoading(false);
  }
})