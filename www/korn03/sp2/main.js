(() => {
    const date = new Date();
    let day = ("0" + (date.getDate())).slice(-2);
    let month = ("0" + (date.getMonth() + 1)).slice(-2);

    let year = date.getFullYear();
    let currentDate = `${year}-${month}-${day}`;

    let nutrRatingAvg = "";



    const appContainer = $("#app");

    const searchBarDiv = $('<div id="searchBarDiv"></div>');
    const barInput = $(
        '<input placeholder="&#x1F50E;&#xFE0E; Search by barcode" type="text"/>'
    );
    //const getProductsButton = $("<button>Get product!</button>");

    const sortAndDateDiv = $('<div id="sortAndDateDiv"></div>');
    const sortButton = $(`<label for="sortButton">Sort:</label><button id='sortButton'>&udarr;</button>`);
    const dateInput = $(`
    <label for="date">filter by date:</label><input type="date" name="date" id="dateInput" max="${currentDate}" placeholder="Enter date">`);

    const productsDiv = $('<div class="productsDiv"></div>');
    const productDivTitle = $("<h2 id='productsDivTitle'>My products</h2>");
    const noProductsGuide = $("<p id='noProductsGuide'>Hmm... You still haven't searched for any product! Let's fix that. Enter any barcode in search above! <br><br> 8715700421360, for example.</p>");
    const searchDiv = $('<div class="searchDiv"></div>');

    //// obhajoba
    const checkCustomAttr = $('<div class="checkCustomAttr"></div>');

    const quantityCheckbox = $('<input type="checkbox" id="quantityCheckbox" name="quantityCheckbox" value="true" /><label for="quantityCheckbox">Quantity?</label>');
    const nutrimentsCheckbox = $('<input type="checkbox" id="nutrimentsCheckbox" name="nutrimentsCheckbox" value="true" /><label for="nutrimentsCheckbox">Nutriments?</label>');



    ////



    const footer = $('<footer></footer>');
    const footerText = $('<p>Bar Scout | Made with love by <a href="https://github.com/Nikinayzer">Nikita Korotov</a></p>');

    const header = $("header");


    searchBarDiv.append(barInput);
    //searchBarDiv.append(getProductsButton);
    searchDiv.append(searchBarDiv);

    sortAndDateDiv.append(sortButton);
    sortAndDateDiv.append(dateInput);
    searchDiv.append(sortAndDateDiv);

    /// obhajova
    checkCustomAttr.append(quantityCheckbox);
    checkCustomAttr.append(nutrimentsCheckbox);

    searchDiv.append(checkCustomAttr);
    ///

    appContainer.append(searchDiv);
    appContainer.append(productsDiv);
    productsDiv.append(productDivTitle);

    footer.append(footerText);



    function retrieveItemsFromLocalStorage() {
        let nutrRatingArr = [];

        productsDiv.empty();
        productsDiv.append(productDivTitle);

        if (localStorage.getItem("entries") === null) {
            productsDiv.append(noProductsGuide);
            appContainer.append(footer);
            return
        }

        if (JSON.parse(localStorage.getItem("entries")).entries.length == 0) {
            console.log("Localstorage is empty");
            const noProductsAfterDelete = $("<p id='noProductsGuide'>Looks like you deleted all of your products... Wanna add some more?</p>");
            productsDiv.append(noProductsAfterDelete);
            $(document).ready(function () {
                $("#nutrRatingAvg").remove();
            })
        }
        else
            JSON.parse(localStorage.getItem("entries")).entries.forEach((entry) => {
                const dateOfEntryDiv = $(
                    `<div class="dateOfEntryDiv" id="${entry.date}"></div>`
                );
                const dateOfEntry = $(`<h2 class="dateOfEntry">${entry.date}</h2>`);
                dateOfEntryDiv.append(dateOfEntry);
                productsDiv.append(dateOfEntryDiv);
                createProductCards(entry, nutrRatingArr);
            });
        nutrRatingAvg = translateScoreToGrade(
            calcAvgOfArr(lettersToDigits(nutrRatingArr))
        );
        $("#nutrRatingAvg").remove();
        const nutritionRatingAvgDisplay = $(
            `<h2 id='nutrRatingAvg'>Your average nutrition rating: ${nutrRatingAvg}</h2>`
        );
        header.append(nutritionRatingAvgDisplay);
        appContainer.append(footer);
    }

    const lettersToDigits = (arr) => {
        let lettersToDigitsArr = [];
        arr.forEach((letter) => {
            switch (letter) {
                case "a":
                    lettersToDigitsArr.push(5);
                    break;
                case "b":
                    lettersToDigitsArr.push(4);
                    break;
                case "c":
                    lettersToDigitsArr.push(3);
                    break;
                case "d":
                    lettersToDigitsArr.push(2);
                    break;
                case "e":
                    lettersToDigitsArr.push(1);
            }
        });
        return lettersToDigitsArr;
    };

    const calcAvgOfArr = (arr) => {
        const sum = arr.reduce((a, b) => a + b, 0);
        const avg = sum / arr.length || 0;
        return avg;
    };
    const translateScoreToGrade = (score) => {
        let grade;
        if (score < 2) grade = "E";
        if (score >= 2 && score < 2.3) grade = "D";
        if (score >= 2.3 && score < 2.5) grade = "D+";
        if (score >= 2.5 && score < 3) grade = "C-";
        if (score >= 3 && score < 3.3) grade = "C";
        if (score >= 3.3 && score < 3.5) grade = "C+";
        if (score >= 3.5 && score < 4) grade = "B-";
        if (score >= 4 && score < 4.3) grade = "B";
        if (score >= 4.3 && score < 4.5) grade = "A-";
        if (score >= 4.5) grade = "A";
        return grade;
    };

    function createProductCards(entry, nutrRatingArr) {
        entry.products.forEach((product, index) => {
            nutrRatingArr.push(product.nutriscore_grade);
            const productCard = $(
                `<div class="productCard" id="${entry.date}_${index}"></div>`
            );
            const productCardPicture = $(
                `<img class="productCardPicture" src="${product.image_small_url || "./noPhotoImg.png"}" alt="${product.product_name}+ photo"></img>`
            );
            const productCardInfo = $(`<div class="productCardInfo"></div`);
            const productCardTitle = $(
                `<h3 class="productCardTitle">${product.product_name || "no info"}</h3>`
            );
            const productCardStats = $('<ul class="productCardStats"></ul>');
            const productCardQuanity = $(`<li>Quantity: ${product.quantity || "no info"}</li>`);
            const productCardRating = $(
                `<h2 class="productCardRating">${product.nutriscore_grade || "?"}</h2>`
            );

            //delete button
            const productCardDeleteButton = $(
                `<button class="deleteButton" id="${entry.date}_${index}_button">X</button>`
            );

            productCard.append(productCardPicture);
            productCard.append(productCardInfo);
            productCardInfo.append(productCardTitle);
            productCardInfo.append(productCardStats);
            console.log("HasOwnProperty?" + product.hasOwnProperty('nutriments'));
            if (product.hasOwnProperty('nutriments')) {
                const productCardEnergy = $(
                    `<li>Energy: ${product.nutriments.energy || "no info"} ${product.nutriments.energy_unit || ""}</li>`
                );
                const productCardCarbonhydrates = $(
                    `<li>Carbonhydrates: ${product.nutriments.carbohydrates || "no info"} ${product.nutriments.carbohydrates_unit || ""}</li>`
                );
                const productCardFat = $(
                    `<li>Fats: ${product.nutriments.fat || "no info"} ${product.nutriments.fat_unit || ""}</li>`
                );
                //const productCardFiber = $(`<li>${product.nutriments.fiber}</li>`);
                const productCardProteins = $(
                    `<li>Protein: ${product.nutriments.proteins || "no info"} ${product.nutriments.proteins_unit || ""}</li>`
                );
                const productCardSugars = $(
                    `<li>Sugars: ${product.nutriments.sugars || "no info"} ${product.nutriments.sugars_unit || ""}</li>`
                );
                productCardStats.append(productCardEnergy);
                productCardStats.append(productCardCarbonhydrates);
                productCardStats.append(productCardFat);
                //productCardStats.append(productCardFiber);
                productCardStats.append(productCardProteins);
                productCardStats.append(productCardSugars);
            }
            productCardStats.append(productCardQuanity);

            productCard.append(productCardRating);

            productCard.append(productCardDeleteButton);

            const dateOfEntryDiv = $(`#${entry.date}`);
            //productsDiv.append(productCard);
            dateOfEntryDiv.append(productCard);
        });
    }
    const loadSpinner = () => {
        const loadSpinnerContainer = $('<div class="loadSpinnerContainer"></div>');
        const loadSpinnerBackground = $('<div class="loadSpinnerBackground"></div>');
        const loadSpinner = $('<div class="loadSpinner"></div>');
        loadSpinnerContainer.append(loadSpinnerBackground);
        loadSpinnerContainer.append(loadSpinner);
        appContainer.append(loadSpinnerContainer);
        //$('body').append(loadSpinnerContainer);
    };

    const removeSpinner = () => {
        $(".loadSpinnerContainer").remove();
    }

    function findIndexOfDate(list) {
        const index = list.entries.findIndex(
            (element) => element.date === currentDate
        );
        return index;
    }

    $(document).ready(function () {
        console.log("Init " + currentDate);
        console.log("test products: 8715700421360,8593807234713,5900020018403");
        retrieveItemsFromLocalStorage()

        //obh

        /*
        quantityCheckbox.on('change', function () {
            $('input[type=hidden]').val($(this).is(':checked'));
        });
        */
        //




        /*
                                            // $(document) is because of event delegation ('.productCard' is being overwritten).
                                            */
        $(document).on("click", ".deleteButton", function (event) {
            event.preventDefault();

            let list = JSON.parse(localStorage.getItem("entries"));

            const id = $(this).closest("div").attr("id");
            const deleteIDIndexArr = id.split("_");
            const deleteDate = deleteIDIndexArr[0];
            const deletePosition = deleteIDIndexArr[1];

            console.log("index of deleting item " + deletePosition);
            console.log("date of deleting item " + deleteDate);
            //console.log(list);

            function findIndexOfDeletingDate(list) {
                const index = list.entries.findIndex(
                    (element) => element.date === deleteDate
                );
                return index;
            }

            const entryIndex = findIndexOfDeletingDate(list);
            //console.log(entryIndex);

            //console.log(list.entries[entryIndex].products[deletePosition]);
            list.entries[entryIndex].products.splice(deletePosition, 1);
            console.log(list.entries[entryIndex].products.length);
            if (list.entries[entryIndex].products.length == 0) {
                console.log(list.entries[entryIndex]);
                list.entries.splice(entryIndex, 1);
            }

            localStorage.setItem("entries", JSON.stringify(list));

            retrieveItemsFromLocalStorage();
        });

        /* Sorting alg*/
        $(document).on("click", "#sortButton", function (event) {
            event.preventDefault();

            let toSort = $(".productsDiv").children().not(productDivTitle);
            toSort = Array.prototype.slice.call(toSort, 0);

            toSort.sort(function (a, b) {
                let aord = +a.id.split("-")[1];
                let bord = +b.id.split("-")[1];
                return aord > bord ? 1 : -1;
            });

            let parentProductDiv = $(".productsDiv");
            toSort.forEach((div, i) => {
                parentProductDiv.append(toSort[i]);
            });
        });

        /* Display products by date */
        $("#dateInput").change(function () {
            if (localStorage.getItem("entries") === null || JSON.parse(localStorage.getItem("entries")).entries.length == 0) return;
            $("#noProductsToDisplay").remove();

            let date = $("#dateInput").val();

            if (date == "") {
                $(".dateOfEntryDiv").show();
            } else {
                $(".dateOfEntryDiv").show(); // to update already hidden cards by this func.
                $(".dateOfEntryDiv").not(`#${date}`).hide();
            }

            if (
                $("div.productsDiv>div").length ==
                $('div.productsDiv>div[style*="display: none;"]').length
            ) {
                const noProductsToDisplay = $(
                    '<h2 id="noProductsToDisplay">No products to display!</h2>'
                );
                $(".productsDiv").append(noProductsToDisplay);
            }
        });




        /* Finding a product on enter*/

        barInput.on("keypress", function (e) {
            if (e.which == 13) {
                e.preventDefault();
                const inputRegexCheck = new RegExp("^[0-9]{8,14}(,[0-9]{8,14})*$");
                if (!inputRegexCheck.test(barInput.val())) {
                    barInput.addClass("error");
                    barInput.attr("placeholder", "Provide a valid barcode!");
                    barInput.val('');

                }
                else {
                    loadSpinner();
                    //setup localstorage on first fetch request
                    if (localStorage.getItem("entries") === null) {
                        let jsonList = {
                            entries: [],
                        };
                        //jsonList.entries.push({ date: currentDate, products: [] });
                        localStorage.setItem("entries", JSON.stringify(jsonList));
                    }
                    //const url = `https://world.openfoodfacts.org/api/v2/search?code=${barInput.val()}&fields=code,product_name,generic_name,quantity,image_small_url,nutriments,nutriments_data,nutriscore_grade`;
                    ///obhajoba
                    const url = `https://world.openfoodfacts.org/api/v2/search?code=${barInput.val()}&fields=code,product_name,generic_name,image_small_url,nutriscore_grade,${$("#quantityCheckbox").is(':checked') && ",quantity"},${$("#nutrimentsCheckbox").is(':checked') && ",nutriments"}`; //
                    console.log(quantityCheckbox.val());
                    console.log(url);
                    //
                    barInput.removeClass("error");
                    barInput.val('');
                    barInput.attr("placeholder", "🔎︎ Search by barcode");

                    let list = JSON.parse(localStorage.getItem("entries"));
                    axios
                        .get(url)
                        .then((resp) => {
                            if (resp.data.products.length == 0) {
                                barInput.addClass("error");
                                barInput.attr("placeholder", "Didn't find a product!");
                                barInput.val('');
                                removeSpinner();
                                return;
                            }
                            resp.data.products.forEach((product) => {
                                resp.data.products.slice(product, 1);
                            });
                            console.log(resp.data);
                            const productsJSON = [];
                            console.log("productsJSON");
                            console.log(productsJSON);
                            resp.data.products.forEach((product) => {
                                const productJSON = product;
                                productsJSON.push(productJSON);
                            });

                            if (findIndexOfDate(list) === -1) {
                                console.log("JSON needs a new day");
                                list.entries.push({ date: currentDate, products: [] });
                            }
                            productsJSON.forEach((product) => {
                                list.entries[findIndexOfDate(list)].products.push(product);
                            });
                            localStorage.setItem("entries", JSON.stringify(list));
                            retrieveItemsFromLocalStorage();

                            setTimeout(removeSpinner, 1000)
                        })
                        .catch((err) => console.log(err));
                }
            }
        });
    });
})();