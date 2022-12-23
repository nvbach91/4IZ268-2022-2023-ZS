(() => {
    $(document).ready(function () {
        //date setup
        const date = new Date();
        let day = date.getDate() + 5;
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let currentDate = `${day}-${month}-${year}`;

        console.log("Init " + currentDate);

        console.log('test products: 8715700421360,8593807234713,5900020018403');
        const appContainer = $('#app');
        const getPostsButton = $("<button>Get product!</button>");
        const barInput = $('<input type="text"/>');

        const productsDiv = $('<div class="productsDiv"></div>')
        const productDivTitle = $('<h2>My products</h2>')
        const searchDiv = $('<div class="searchDiv"></div>')

        searchDiv.append(barInput);
        searchDiv.append(getPostsButton);
        appContainer.append(searchDiv);
        appContainer.append(productsDiv);
        productsDiv.append(productDivTitle);



        //localStorage setup and getting saved info
        if (!localStorage.getItem('entries')) {
            let jsonList = {
                "entries": [

                ]
            }
            jsonList.entries.push({ 'date': currentDate, 'products': [] });
            localStorage.setItem('entries', JSON.stringify(jsonList));
            //retrieveItemsFromLocalStorage();

        } else {
            retrieveItemsFromLocalStorage();

        }

        function retrieveItemsFromLocalStorage() {
            productsDiv.empty();
            JSON.parse(localStorage.getItem('entries')).entries.forEach((entry) => {

                const dateOfEntry = $(`<h2 id="${entry.date}"></h2>`)
                dateOfEntry.text(entry.date);
                productsDiv.append(dateOfEntry);
                console.log(entry);

                entry.products.forEach((product) => {
                    console.log(product.product_name);
                })
                createProductCard(entry);

            })

        }

        function createProductCard(entry) {
            //let list = (JSON.parse(localStorage.getItem('entries')));

            entry.products.forEach((product, index) => {

                const productCard = $(`<div class="productCard" id="${entry.date}_${index}"></div>`);
                const productCardPicture = $(`<img class="productCardPicture" src="${product.image_small_url}" alt="${product.product_name}+ photo"></img>`)
                const productCardInfo = $(`<div class="productCardInfo"></div`);
                const productCardTitle = $(`<h3 class="productCardTitle">${product.product_name}</h3>`)
                const productCardStats = $('<ul class="productCardStats"></ul>');
                const productCardQuanity = $(`<li>Quantity: ${product.quantity}</li>`);
                const productCardEnergy = $(`<li>Energy: ${product.nutriments.energy} kJ</li>`);
                const productCardCarbonhydrates = $(`<li>Carbonhydrates: ${product.nutriments.carbohydrates} ${product.nutriments.carbohydrates_unit}</li>`);
                const productCardFat = $(`<li>Fats: ${product.nutriments.fat} ${product.nutriments.fat_unit}</li>`);
                //const productCardFiber = $(`<li>${product.nutriments.fiber}</li>`);
                const productCardProteins = $(`<li>Protein: ${product.nutriments.proteins} ${product.nutriments.proteins_unit}</li>`);
                const productCardSugars = $(`<li>Sugars: ${product.nutriments.sugars} ${product.nutriments.sugars_unit}</li>`);
                const productCardRating = $(`<h2 class="productCardRating">${product.nutriscore_grade}</h2>`)

                //delete button
                const productCardDeleteButton = $(`<button class="deleteButton" id="${entry.date}_${index}_button">X</button>`)

                productCard.append(productCardPicture);
                productCard.append(productCardInfo);
                productCardInfo.append(productCardTitle);
                productCardInfo.append(productCardStats);
                productCardStats.append(productCardQuanity);
                productCardStats.append(productCardEnergy);
                productCardStats.append(productCardCarbonhydrates);
                productCardStats.append(productCardFat);
                //productCardStats.append(productCardFiber);
                productCardStats.append(productCardProteins);
                productCardStats.append(productCardSugars);
                productCard.append(productCardRating);

                productCard.append(productCardDeleteButton);

                productsDiv.append(productCard);

            })
        }

        /*
        // $(document) is because of event delegation ('.productCard' is being overwritten).
        */
        $(document).on('click', '.deleteButton', function (event) {

            event.preventDefault();

            let list = (JSON.parse(localStorage.getItem('entries')));


            const id = $(this).closest('div').attr('id');
            const deleteIDIndexArr = id.split('_');
            const deleteDate = (deleteIDIndexArr[0]);
            const deletePosition = (deleteIDIndexArr[1]);

            console.log("index of deleting item " + deletePosition);
            console.log("date of deleting item " + deleteDate);
            //console.log(list);


            function findIndexOfDeletingDate(list) {

                const index = list.entries.findIndex(element => element.date === deleteDate);
                return index
            }


            const entryIndex = findIndexOfDeletingDate(list);
            //console.log(entryIndex);

            //console.log(list.entries[entryIndex].products[deletePosition]);
            list.entries[entryIndex].products.splice(deletePosition, 1)

            localStorage.setItem('entries', JSON.stringify(list));

            retrieveItemsFromLocalStorage();

        });

        function findIndexOfDate(list) {

            const index = list.entries.findIndex(element => element.date === currentDate);
            return index
        }



        //ON CLICK

        getPostsButton.click(() => {
            const url = `https://world.openfoodfacts.org/api/v2/search?code=${barInput.val()}&fields=code,product_name,generic_name,quantity,image_small_url,nutriments,nutriments_data,nutriscore_grade`;

            let list = (JSON.parse(localStorage.getItem('entries')));
            console.log("orig list");
            console.log(list);

            console.log(findIndexOfDate(list));

            if (barInput.val() == "") {
                alert("poshel nahuj")
            }
            else {
                axios.get(url).then((resp) => {
                    console.log(resp.data);
                    //const productElements = []; setting products to list
                    const productsJSON = [];
                    //console.log(resp.data.products);
                    //console.log(resp.data.products[0].product_name);

                    console.log('productsJSON');
                    console.log(productsJSON);
                    //console.log('productElements'); setting products to list
                    //console.log(productElements); setting products to list

                    resp.data.products.forEach((product) => {

                        //const productElement = $(`<div>${product.product_name}</div>`); setting products to list
                        const productJSON = (product);

                        //productElements.push(productElement); setting products to list
                        productsJSON.push(productJSON);


                    });

                    if (findIndexOfDate(list) === -1) {
                        console.log('JSON needs a new day');
                        list.entries.push({ 'date': currentDate, 'products': [] });
                    }
                    productsJSON.forEach((product) => {
                        list.entries[findIndexOfDate(list)].products.push(product);
                    })
                    localStorage.setItem('entries', JSON.stringify(list));
                    retrieveItemsFromLocalStorage();
                });
            }
        });


    })
})();



/*
(() => {
    console.log("init");
    const appContainer = $('#app');
    const getPostsButton = $("<button>Get users</button>");
    const pageInput = $('<input type="number"/>')
    const postList = $('<ul>');

    getPostsButton.click(() => {
        const url = `https://reqres.in/api/users?page=${pageInput.val()}`;
        //show spinner
        axios.get(url).then((resp) => {
            //hide spinner
            const postElements = [];
            resp.data.forEach((post) => {
                const postElement = $(`<li>${post.title}</li>`);
                postElements.push(postElement);
            });
            postList.append(postElements);
        });
    });
    appContainer.append(getPostsButton);
    appContainer.append(pageInput);
    appContainer.append(postList);



    //axios custom body

    const data = {
        title: "foo",
        body: "barxxx",
        userId: 1,
    };
    axios.post('https://jsonplaceholder.typicoded.com/posts', data)

})();
/*
console.log("init");


const search = $("#text");

let pokemon = "ditto";
//let pokemon = $("#text").val();
let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

function fun(url) {
    return axios.get(url).then((resp) =>{
        console.log(resp.data);
        const height=resp.data.height;
        const response =(`${pokemon}'s height: `+height);
        $('#p').text(response);
    })
}
console.log(fun(url));

axios.get(url).then((resp) =>{
    console.log(resp.data);
    const height=resp.data.height;
    const response =(`${pokemon}'s height: `+height);
    $('#p').text(response);
})
*/