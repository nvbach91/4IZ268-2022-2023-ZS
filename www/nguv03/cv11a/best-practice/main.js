(() => {
    const body = $('body');
    const list = $('<ul>');

    const names = ['Adam', 'Eva', 'Barbora', 'James'];
    const listItems = [];
    names.forEach((name) => {
        const listItem = $(`<li>${name}</li>`);
        listItems.push(listItem);
    });
    list.append(listItems);
    body.append(list);
})()