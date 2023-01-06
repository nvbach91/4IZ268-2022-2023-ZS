(() => {
    // const something = '123';
    const bodyElement = $('body');
    const itemList = $('<ul>');
    bodyElement.append(itemList);

    const names = ['Alice', 'Bob', 'Copper', 'Dave', 'Emil'];
    const listItems = [];
    names.forEach((name) => {
        const listItem = $(`<li>${name}</li>`);
        // const listItem = $('<li>').text(name).attr('class', 'some-class');
        // listItem.innerText = name;
        // listItem.text(name);
        // itemList.appendChild(listItem);
        listItems.push(listItem);
    });
    itemList.append(listItems);

    const existingItemList = $('ul');
    existingItemList.detach();
    existingItemList.children().each(function () {
        const currentElement = $(this);
        currentElement.addClass('new-class');
    });
    bodyElement.append(existingItemList);
})();