(() => {
    const appContainer = $('#app');
    const postsList = $('<ul>');

    // const getPostsButton = $('<button>Get posts</button>');
    // appContainer.append(getPostsButton);
    // appContainer.append(postsList);

    // getPostsButton.click(() => {
    //     const url = 'https://jsonplaceholder.typicode.com/posts';
    //     axios.get(url).then((resp) => {
    //         const posts = resp.data;
    //         const postElements = [];
    //         posts.forEach((post) => {
    //             const postElement = $('<li>');
    //             postElement.text(post.title);
    //             postElements.push(postElement);
    //         });
    //         postsList.append(postElements);

    //     });
    // });
    const spinner = $('<div>Loading...</div>');
    const showSpinner = () => {
        // show the spinner
        spinner.appendTo(appContainer);
    };
    const hideSpinner = () => {
        // hide the spinner;
        spinner.remove();
    };

    const usersPaginationInput = $('<input type="number">');
    appContainer.append(usersPaginationInput);
    const getUsersButton = $('<button>Get users</button>');
    appContainer.append(getUsersButton);
    const usersList = $('<ul>');
    appContainer.append(usersList);


    getUsersButton.click(() => {
        const page = usersPaginationInput.val();
        const url = `https://reqres.in/api/users?page=${page}`;
        showSpinner();
        axios.get(url).then((resp) => {
            hideSpinner();
            const users = resp.data.data;
            const userElements = [];
            users.forEach((user) => {
                const userElement = $(`<li>${user.email}</li>`);
                userElements.push(userElement);
            });
            usersList.empty().append(userElements);
        }).catch((e) => {
            hideSpinner();
            console.error(e);
            alert(e.message)
        });

        // axios.post('url', { name: 'something' })
        // axios.put()
        // axios.delete()
    });


})();