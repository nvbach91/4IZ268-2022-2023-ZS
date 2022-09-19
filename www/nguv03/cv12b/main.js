$(document).ready(() => {
/*
    $.getJSON('https://jsonplaceholder.typicode.com/todos/1')
        .done((data) => {
            console.log(data);
        })
        .fail((resp) => {
            switch (resp.status) {
                case 404: return console.log('Not found');
                case 401: return console.log('You are not logged in');
            }
            
        });


    $.ajax({
        url: 'https://jsonplaceholder.typicode.com/posts',
        type: 'POST',
        data: { something: 'is working' },
    }).done((data) => {
        console.log(data);
    }).fail((resp) => {
        //...
    });


    $.ajax({
        url: 'https://jsonplaceholder.typicode.com/posts/1',
        type: 'DELETE',
    }).done((data) => {
        console.log('DELETED?', data);
    }).fail((resp) => {
        //...
    });

*/


    const pageNumbers = [1, 2, 3, 4, 5];

    const appContainer = $('#app');

    const paginationItems = pageNumbers.map((pageNumber) => {
        // showSpinner();
        return $(`<button>Page ${pageNumber}</button>`).click(() => {
            const url = `https://reqres.in/api/users?page=${pageNumber}`;
            $.getJSON(url).done((data) => {
                renderUsers(data);
            }).fail((resp) => {
                console.log('Something went wrong');
            }).always(() => {
                // removeSpinner();
            });
        });
    });

    appContainer.append(paginationItems);

    const userList = $('<div class="users">');

    appContainer.append(userList);

    const renderUsers = (data) => {
        const users = data.data;

        const userElements = users.map((user) => {
            // const email = user.email;
            // const first_name = user.first_name;
            // const last_name = user.last_name;
            // const avatar = user.avatar;

            const { email, first_name, last_name, avatar } = user;

            const userElement = $(`
                <div class="user">
                    <a href="mailto:${email}">${email}</a>
                    <div class="user-first-name">${first_name}</div>
                    <div class="user-last-name">${last_name}</div>
                    <img class="user-image" src="${avatar}" alt="user image">
                </div>
            `);

            return userElement;
        });

        userList.empty().append(userElements);
    };
});