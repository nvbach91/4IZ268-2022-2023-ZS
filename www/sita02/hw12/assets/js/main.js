(() => {
    const inputElement = document.getElementById('username');
    const buttonFind = document.getElementById('lookup');
    const userElement = document.getElementById('user-profile');
    const avatarElement = document.getElementById('avatar');
    const userInfoElement = document.getElementById('user-info');
    const errorElement = document.getElementById('error');
    const repositoriesElement = document.getElementById('repositories');
    const headerElement = document.getElementById('user');

    const avatarImg = document.getElementById('avatar-img');
    const loginElement = document.getElementById('login');
    const bioElement = document.getElementById('bio');
    const locationElement = document.getElementById('location');
    const companyElement = document.getElementById('company');
    const emailElement = document.getElementById('email');
    const followersElement = document.getElementById('followers');
    const registeredElement = document.getElementById('registered');
    const viewProfile = document.getElementById('view-profile');
    const linkElement = document.getElementById('link');
    const profileLink = document.createElement('a');
    linkElement.appendChild(profileLink);

    const removeInputValue = () => {
        inputElement.setAttribute('placeholder', inputElement.value);
        inputElement.value = null;
    }

    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };

    buttonFind.addEventListener('click', async (e) => {
        e.preventDefault();
        repositoriesElement.innerText = null;
        const user = inputElement.value.trim();
        userElement.classList.remove('hidden');
        errorElement.classList.add('hidden');
        avatarElement.classList.add('hidden');
        userInfoElement.classList.add('hidden');
        userElement.classList.add('spinner');
        headerElement.classList.add('hidden');
        viewProfile.classList.add('hidden');

        await fetch(`https://api.github.com/users/${user}`)
            .then(res => {
                if (!res.ok) {
                    userElement.classList.remove('spinner');
                    errorElement.classList.remove('hidden');
                    userElement.classList.add('hidden');
                    removeInputValue();
                    errorElement.innerText = "Something went wrong, try again!"
                    throw Error(res.statusText);
                }
                return res.json()
            })
            .then(res => {
                console.log(res);
                avatarImg.src = res.avatar_url;
                headerElement.innerText = res.login;
                loginElement.innerText = res.login;
                bioElement.innerText = res.bio ?? "";
                locationElement.innerText = res.location;
                companyElement.innerText = res.company ?? "";
                emailElement.innerText = res.email;
                followersElement.innerText = res.followers;
                const date = new Date(res.created_at);
                registeredElement.innerText = date.toLocaleDateString('cs-CZ', options);
                profileLink.innerText = res.html_url;
                profileLink.setAttribute('href', res.html_url);
                viewProfile.setAttribute('href', res.html_url);

            })
            .catch(err => console.log(err));

        await fetch(`https://api.github.com/users/${user}/repos`)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                res.forEach(item => {
                    const repoLiElement = document.createElement('li');
                    const repoDivElement = document.createElement('div');
                    repoDivElement.classList.add('line');
                    const repoNameDivElement = document.createElement('div');
                    repoNameDivElement.innerText = item.name;
                    const repoLinkDivElement = document.createElement('div');
                    const repoLinkAElement = document.createElement('a');
                    repoLinkAElement.setAttribute('href', item.html_url);
                    repoLinkAElement.innerText = item.html_url;
                    repoLinkDivElement.appendChild(repoLinkAElement);
                    repoDivElement.appendChild(repoNameDivElement);
                    repoDivElement.appendChild(repoLinkDivElement);
                    repoLiElement.appendChild(repoDivElement);
                    repositoriesElement.appendChild(repoLiElement);
                })
            })
            .catch(err => console.log(err));

        userElement.classList.remove('spinner');
        avatarElement.classList.remove('hidden');
        userInfoElement.classList.remove('hidden');
        viewProfile.classList.remove('hidden');
        headerElement.classList.remove('hidden');
        removeInputValue();
    })
})();