$(document).ready(() => {

    /* $.ajax({
        type: 'PUT', // 'DELETE'
        data: {}
    })*/
    // $.post('...')
    /*$.getJSON('https://jsonplaceholder.typicode.com/todos?id=1&name=ahoj&age=42')
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
        data: { abc: 'def', ghi: 'jkl' },
    }).done((data) => {
        console.log(data);
    }).fail((resp) => {
        console.log(resp);
    });

    $.getJSON('https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22').done((data) => {

        console.log(data);
    });*/

    const appContainer = $('#app');

    const form = $(`
        <form>
            <input name="page" type="number">
            <button>Get data</button>
        </form>
    `);

    const userList = $(`
        <div class="user-list"></div>;
    `);

    form.appendTo(appContainer);
    userList.appendTo(appContainer);

    form.submit((e) => {
        e.preventDefault();
        const page = form.find('input[name="page"]').val();
        $.getJSON(`https://reqres.in/api/users?page=${page}`).done((data) => {
            console.log(data);
            renderUsers(data);
        });

    });

    const renderUsers = (data) => {
        const users = data.data.map((user) => {
            const avatar = user.avatar;
            const email = user.email;
            const first_name = user.first_name;
            const last_name = user.last_name;
            
            // destructuring
            // const [ avatar, email, first_name, last_name ] = user;
            const userElement = $(`
                <div class="user">
                    <a class="user-email" href="mailto:${email}">${email}</a>
                    <div class="user-first">${first_name}</div>
                    <div class="user-last">${last_name}</div>
                    <img class="user-avatar" src="${avatar}" alt="user image">
                </div>
            `);
            return userElement;
        });
        userList.empty().append(users);
    };
});