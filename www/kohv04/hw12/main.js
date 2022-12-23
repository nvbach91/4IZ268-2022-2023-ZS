const CLIENT_ID = '0e52d47a1ef857058c37'; // you get the client_id after OAuth account registration
const CLIENT_SECRET = 'a2eb0405fd99fcbe47653bf7c89c19ef0d8f227a'; // you get the client_secret after OAuth account registration
const baseApiUrl = 'https://api.github.com';
const userProfileContainer = $('#user-profile')
const userReposContainer = $('#user-repos')

const renderUser = (user) => {
    const { login, bio, location, followers } = user;
    const date = new Date(user.created_at).toLocaleDateString();

    const html = `
        <img src="${user.avatar_url}" alt="${login}" />
        <h2>${login}</h2>
        <p>${bio}</p>
        <p><strong>Location:</strong> ${location}</p>
        <p><strong>Followers:</strong> ${followers}</p>
        <p><strong>Since:</strong> ${date}</p>
    `;
    userProfileContainer.empty().append(html);
};

const renderRepos = (repos) => {
    const html = repos.map(repo => {
        const { name, html_url } = repo;
        return `
            <li>
                <a href="${html_url}">${name}</a>
            </li>
        `;
    });
    userReposContainer.empty().append(html);
};

const fetchRepositories = (userLogin) => {
    const reposUrl = `${baseApiUrl}/users/${userLogin}/repos`;
    $.getJSON(reposUrl).done(repos => {
        renderRepos(repos);
    });
};

$('form').submit(e => {
    e.preventDefault();
    const searchValue = $('#search-input').val();

    const url = `${baseApiUrl}/users/${searchValue}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;

    $.getJSON(url).done((user) => {
        renderUser(user);
        fetchRepositories(user.login);
    }).fail(() => {
        userProfileContainer.empty().append('<p>User not found</p>');
    });
});
