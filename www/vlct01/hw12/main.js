(() => {
    // Příklad volání na GitHub API
    const CLIENT_ID = '2d20f3db8bdb55e64683';     // client_id získáte po registraci OAuth účtu
    const CLIENT_SECRET = '4afc48ab2e877a56c98cdb3c6ad3b31bcadc784d'; // client_secret získáte po registraci OAuth účtu
    const baseApiUrl = 'https://api.github.com';
    // sestavujeme URL, který obsahuje parametry CLIENT_ID a CLIENT_SECRET
    // každý parametr se určuje v podobě klíč=hodnota, parametry se oddělují ampersandem, 
    // na začátek přidáme otazník
    // např. ?client_id=abcdef&client_secret=fedcba

    $(document).ready(function () {
        const userForm = $('#search-form');
        const userSearchInpput = $('#search-input');
        const userProfileContainer = $('#user-profile');
        const userRepositoriesElement = $('#repositories');
        const loader = $('<div class="loader"></div>');

        userForm.submit(function (event) {
            event.preventDefault();

            userProfileContainer.empty();
            userRepositoriesElement.empty();

            const searchInputValue = userSearchInpput.val().trim();
            const url = `${baseApiUrl}/users/${searchInputValue}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;
            fetchRequest(url);
        });


        const renderUser = (user) => {
            const details = $(`
            <div class="user-name">${user.name || ''}</div>
            <div class="user-details">
                <img src="${user.avatar_url}" alt="user_profile" class="avatar">
                <ul class="user-details">
                    <li>
                        <div>Login</div>
                        <div>${user.login || 'Not filled'}</div>
                    </li>
                    <li>
                        <div>Bio</div>
                        <div>${user.bio || 'Not filled'}</div>
                    </li>
                    <li>
                        <div>Location</div>
                        <div>${user.location || 'Not filled'}</div>
                    </li>
                    <li>
                        <div>Description</div>
                        <div>${user.description || 'Not filled'}</div>
                    </li>
                    <li>
                        <div>Email</div>
                        <div>${user.email || 'Not filled'}</div>
                    </li>
                    <li>
                        <div>Followers</div>
                        <div>${user.followers}</div>
                    </li>
                    <li>
                        <div>Registered</div>
                        <div>${user.registered || 'Not filled'}</div>
                    </li>
                    <li>
                        <a href="${user.html_url}" target="_blank">${user.html_url}</a>
                    </li>
                </ul>
            </div>
            <a href="${user.html_url}" target="_blank" class="btn-profile">View profile</a>
        
            `);

            userProfileContainer.empty().append(details);
        };

        const renderRepositories = (userRepositoriesURL) => {
            fetchedRepositoriesHTML = [];

            userRepositoriesElement.append(loader);
            $.getJSON(userRepositoriesURL).done((repositories) => {
                fetchedRepositoriesHTML.push($(`<li>This user has ${repositories.length} repositories.</li>`));

                repositories.forEach(repository => {
                    fetchedRepositoriesHTML.push($(`
                    <li>
                        <div>
                            ${repository.name}
                        </div>
                        <div>
                            <a href="${repository.html_url}" target="_blank">${repository.html_url}</a>
                        </div>
                    </li>
                    `));
                });

                userRepositoriesElement.empty().append(fetchedRepositoriesHTML);
            }).fail(() => {
                userProfileContainer.append('<p>User not found</p>');
            });
        };

        const fetchRequest = (url) => {
            userProfileContainer.append(loader);
            $.getJSON(url).done((user) => {
                renderUser(user);
                renderRepositories(user.repos_url);
            }).fail(() => {
                userProfileContainer.empty().append('<p>User not found</p>');
            });
        };
    });
})();