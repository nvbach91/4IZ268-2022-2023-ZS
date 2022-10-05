const CLIENT_ID = '984e09b7fed33f91c7dd';
const CLIENT_SECRET = '40dda0f1edcb4cf69370c18b7c82d78259ce8213';
const BASE_URL = 'https://api.github.com';

const getBasicAuthHeader = () => 'Basic ' + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);

const repository = {
  async getUser(username) {
    return $.ajax({
      type: 'GET',
      url: `${BASE_URL}/users/${username}`,
      dataType: 'json',
      headers: {
        'Authorization': getBasicAuthHeader()
      }
    });
  },
  async getRepositories(username) {
    return $.ajax({
      type: 'GET',
      url: `${BASE_URL}/users/${username}/repos`,
      dataType: 'json',
      headers: {
        'Authorization': getBasicAuthHeader()
      }
    });
  }
}

$('#search-form').on('submit', async e => {
  e.preventDefault();

  const value = $('#search-input').val();

  const userDetail = await repository.getUser(value);
  const userRepos = await repository.getRepositories(userDetail.login);

  console.log(userDetail, userRepos);
})