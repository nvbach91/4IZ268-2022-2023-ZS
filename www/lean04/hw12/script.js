const CLIENT_ID = '744a51ca93d67d89785a';
const CLIENT_SECRET = '86792c4dbe97d95aa474af8969c32d7add43f21b';
const CLIENT_QUERY_PARAMETER = `client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;
const baseApiUrl = 'https://api.github.com';

const createUserUrl = (username) => `${baseApiUrl}/users/${username}?${CLIENT_QUERY_PARAMETER}`;
const createReposUrl = (username) => `${baseApiUrl}/users/${username}/repos?${CLIENT_QUERY_PARAMETER}`;

const spinner = $('<div>').attr('id', 'spinner');

const searchInput = $('#search-input');
const searchButton = $('#search-button');
const searchResultElement = $('#search-result');

const createEntry = (label, value) => [$('<dt>').append(label), $('<dd>').append(value ?? '-')];

const createUserSection = (user) => {
    const userSection = $('<section>').attr('id', 'gh-user-section');
    const userImage = $('<img>').attr('id', 'gh-user-avatar').attr('src', user.avatar_url);
    const userInfo = $('<dl>')
        .addClass('kv-list kv-list-7-entries')
        .append(
            ...createEntry('Username', user.login),
            ...createEntry('Name', user.name),
            ...createEntry('Email', user.email),
            ...createEntry('Bio', user.bio),
            ...createEntry('Location', user.location),
            ...createEntry('Registered at', new Date(user.created_at).toLocaleDateString()),
            ...createEntry('GitHub', $('<a>').attr('href', user.html_url).text(user.html_url))
        );
    return userSection.append(userImage, userInfo);
};

const createReposSection = (repos) => {
    const reposSection = $('<section>').attr('id', 'gh-repos-section');
    const reposList = $('<dl>')
        .addClass('kv-list kv-list-5-entries')
        .append(
            ...repos.flatMap(({ name, html_url }) => createEntry(name, $('<a>').attr('href', html_url).text(html_url)))
        );
    return reposSection.append(reposList);
};

const search = (username) => {
    searchButton.prop('disabled', true);
    searchResultElement.empty().append(spinner);
    $.when($.getJSON(createUserUrl(username)), $.getJSON(createReposUrl(username)))
        .done((...responses) => {
            const [userData, reposData] = responses.map(([data]) => data);
            searchResultElement
                .empty()
                .append(
                    $('<h2>').text('User info'),
                    createUserSection(userData),
                    $('<h2>').text("User's repositories"),
                    createReposSection(reposData)
                );
        })
        .fail(() => {
            searchResultElement.empty().append('<div>').text(`No data found for user "${username}".`);
        })
        .always(() => {
            searchButton.prop('disabled', false);
        });
};

$('#search-form').on('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    search(formData.get('search'));
});
