(() => {
    const CLIENT_ID = "0ec8252bea6122d2eca3";
    const CLIENT_SECRET = "88e431c60c8e20ee4d1c2443cb9e293bab2fe824";
    const baseApiUrl = 'https://api.github.com';
    let searchValue = "";
    let reposNumber = 0;


    const button = document.querySelector("#lookupButton");
    const userNameField = document.querySelector("#userName");

    button.addEventListener("click", () => {
        let input = userNameField.value.trim();
        searchValue = input;
        const returns = document.querySelector("#returns");
        const footer = document.querySelector("footer");


        const url = `${baseApiUrl}/users/${searchValue}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;
        $.getJSON(url).then((user) => {
            renderUser(user);
            returns.style.display = "flex";
            footer.style.position = "relative";
        }).catch((e) => {
            console.error(e);
            returns.style.display = "none";
            footer.style.position = "absolute";
            alert("Username not found!");

        })
        const urlRepos = `${baseApiUrl}/users/${searchValue}/repos?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;
        $.getJSON(urlRepos).then((repos) => {
            fetchRepositories(repos);
        }).catch((e) => {
            console.error(e);

        })

    })

    const renderUser = (user) => {
        const imgGithub = document.querySelector("#userImg");
        if (imgGithub.childElementCount > 0) {
            imgGithub.firstChild.remove();
        };
        const createImgGithub = document.createElement("img");
        createImgGithub.setAttribute("src", user.avatar_url);
        createImgGithub.setAttribute("alt", "Github user image.")
        imgGithub.appendChild(createImgGithub);
        const loginGithub = document.querySelector("#login");
        loginGithub.innerText = user.login;
        const idGithub = document.querySelector("#id");
        idGithub.innerText = user.id;
        const locationGithub = document.querySelector("#location");
        locationGithub.innerText = user.location;
        const bioGithub = document.querySelector("#bio");
        bioGithub.innerText = user.bio;
        const companyGithub = document.querySelector("#company");
        companyGithub.innerText = user.company;
        const emailGithub = document.querySelector("#email");
        emailGithub.innerText = user.email;
        const registeredGithub = document.querySelector("#registered");
        registeredGithub.innerText = user.created_at;
        const followersGithub = document.querySelector("#followers");
        followersGithub.innerText = user.followers;
        const githubLink = document.querySelector("#githubLink");
        const createGithubLink = document.createElement("a");
        createGithubLink.setAttribute("href", user.html_url);
        createGithubLink.innerText = "Go to Github profile";
        if (githubLink.childElementCount > 0) {
            githubLink.firstChild.remove();
        };
        githubLink.appendChild(createGithubLink);
        reposNumber = user.public_repos;
    };

    const fetchRepositories = (repos) => {
        const repositoryCount = document.querySelector("#repositoryCount");
        repositoryCount.innerText = `Profile has ${reposNumber} repositories!`

        const repositories = document.querySelector("#repositories");
        const repositoriesTmp = [];
        const reposTotal = document.createElement("div");
        if (repositories.childElementCount > 0) {
            repositories.firstChild.remove();
        }
        repos.forEach((repo) => {
            const repoDiv = document.createElement("div");
            repoDiv.setAttribute("class", "repo");
            const repoName = document.createElement("p");
            repoName.innerText = repo.name;
            const repoLink = document.createElement("a");
            repoLink.setAttribute("href", repo.html_url);
            repoLink.innerText = repo.html_url;
            repoDiv.appendChild(repoName);
            repoDiv.appendChild(repoLink);
            reposTotal.appendChild(repoDiv);
        });
        repositories.append(reposTotal);
    };

})()