$(document).ready(() => {
    (() => {
        //API
        const baseApiUrl = 'https://newsapi.org/v2/everything';
        const apiKey = 'ec488c4adab74fa99a4e069ae76f6973';

        //Request form
        const keywordInput = $('#keywordInput');
        const resultsFromInput = $('#resultsFromInput');
        const resultsToInput = $('#resultsToInput');
        const sortBySelect = $('#sortBySelect');

        //Navigation elements
        const homeLink = $('#homeLink');
        const savedArticlesLink = $('#savedArticlesLink');

        //Other elements
        const articlesElement = $('#articlesElement');
        const filtersSection = $('#filtersSection')
        const spinner = $('<div class="d-flex justify-content-center align-items-center"><strong> Loading...</strong ><div class="spinner-border spinner-border-sm text-primary ms-2" role="status" aria-hidden="true"></div></div>');
        const toastElement = $('#toastElement');
        const toastBody = $('#toastBody');

        //Prepends 0(s) to number if the number is not long enough.
        const formatNumber = (number, totalLength = 2) => {
            return (String(number).padStart(totalLength, '0'))
        }

        //Build dates for form inputs and default values for API request.
        const dateTime = new Date();
        const now = dateTime.getFullYear() + '-' +
            formatNumber((dateTime.getMonth() + 1)) + '-' +
            formatNumber(dateTime.getDate()) + 'T' +
            formatNumber(dateTime.getHours()) + ':' +
            formatNumber(dateTime.getMinutes());

        const yesterday = dateTime.getFullYear() + '-' +
            formatNumber((dateTime.getMonth()) + 1) + '-' +
            formatNumber((dateTime.getDate()) - 1) + 'T' +
            formatNumber(dateTime.getHours()) + ':' +
            formatNumber(dateTime.getMinutes());

        //Set default values of form inputs.
        resultsFromInput.val(yesterday);
        resultsToInput.val(now);

        let articlesToAppend = [];

        //Renders article.
        const renderArticle = (article, savedArticles = false) => {
            articlesToAppend.push($(`<article class="col-md-4" data-title="${article.title}" data-url="${article.url}" data-urlToImage="${article.urlToImage}" data-publishedAt="${article.publishedAt}"></article>`).html(`
                <div class="card border-0 h-100">
                    <div class="card-header d-flex align-items-center justify-content-center p-0"> 
                        ${article.urlToImage !== null ? '<img src="' + article.urlToImage + '" class="card-img-top" alt="news_img"">' : '😞 Obrázek nedostupný 😞'}
                    </div>
                    <div class="card-body px-0">
                        <h3 class="fs-5 card-title">
                            <a href="${article.url}" class="text-decoration-none" target="_blank">${article.title}</a>
                        </h3>
                        <small class="text-muted" >${article.publishedAt}</small>
                        <p class="card-text mt-2">${article.description || ''}</p>
                    </div>
                    <div class="card-footer px-0 bg-white d-flex justify-content-between">
                        <a href="${article.url}" target="_blank" class="btn btn-sm btn-primary">Číst více</a>
                        <button class="${!savedArticles ? 'read-later' : 'delete'} btn btn-sm btn-outline-${!savedArticles ? 'warning' : 'danger'}"><i class="${!savedArticles ? 'bi bi-star' : 'bi bi-trash'}"></i></button>
                    </div>
                </div>
        `));
        }

        const fetch = (requestUrl) => {
            $.getJSON(requestUrl, function (data) {
                $.each(data.articles, function (index, article) {
                    renderArticle(article);
                });

                articlesElement.empty().append(articlesToAppend);
            }).fail(() => {
                articlesElement.empty().append('<div class="alert alert-danger">Nastala chyba při zpracování požadavku.</div>');
            });
        }

        //Event that handels form submission.
        $('form').submit((e) => {
            e.preventDefault();
            articlesToAppend = [];
            //TODO změnit URL adresu (přidat parametry hledání)
            articlesElement.empty();
            const keyWord = keywordInput.val().trim();

            if (keyWord.length < 1) {
                articlesElement.append($('<div class="alert alert-danger">Pro vyhledání článků je třeba zadat alespoň 1 klíčové slovo.</div>'));
                toastBody.text('Pro vyhledání článků je třeba zadat alespoň 1 klíčové slovo.');
                toastElement.toast("show");
                return;
            }

            articlesElement.append(spinner);

            const resultsFrom = resultsFromInput.val() || now;
            const resultsTo = resultsToInput.val() || yesterday;
            const sortBy = sortBySelect.val();

            const requestParameters = `?q=${keyWord}&language=cs&from=${resultsFrom + ':00'}&to=${resultsTo + ':00'}&sortBy=${sortBy}&apiKey=${apiKey}`;

            fetch(baseApiUrl + requestParameters);
        });

        //Gets articles from local storage and return them as an array.
        const getArticlesFromStorage = () => {
            return $.parseJSON(localStorage.getItem('articles'));
        }

        //Checks if at least 1 article is stored in local storage. 
        const isStorageEmpty = () => {
            return getArticlesFromStorage() === null
        }

        //Checks if article is not already stored and if not, the article is stored.
        const storeArticle = (articleToStore) => {
            let articlesToCheck = [];

            if (!isStorageEmpty()) {
                articlesToCheck = getArticlesFromStorage();
            }

            if (!articlesToCheck.some(item => item.url == articleToStore['url'])) {
                articlesToCheck.push(articleToStore);
                localStorage.setItem('articles', JSON.stringify(articlesToCheck));
                toastBody.text('Článek uložen.');
                toastElement.toast("show");
            }
            else {
                toastBody.text('Tento článek byl již dříve uložen.');
                toastElement.toast("show");
            }
        }

        //Removes selected article from local storage.
        const removeArticle = (articleToRemoveUrl) => {
            var remainingArticles = $.grep(getArticlesFromStorage(), function (e) {
                return e.url != articleToRemoveUrl;
            });

            localStorage.setItem('articles', JSON.stringify(remainingArticles));
            toastBody.text('Článek úsěšně odstraněn.');
            toastElement.toast("show");
        }

        //Renders saved articles "page".
        savedArticlesLink.click(() => {
            homeLink.removeClass('active');
            $(this).addClass('active');

            filtersSection.hide();
            articlesToAppend = [];
            const savedArticles = getArticlesFromStorage();

            if (isStorageEmpty()) {
                articlesElement.empty().append($('<div class="alert alert-info">Zatím nebyl uložen žádný článek.</div>'));
                return;
            }

            savedArticles.forEach(savedArticle => {
                renderArticle(savedArticle, true);
            });

            articlesElement.empty().append(articlesToAppend);
        });

        //Renders home "page".
        homeLink.click(() => {
            savedArticlesLink.removeClass('active');
            $(this).addClass('active');

            filtersSection.show();
            articlesElement.empty().append($('<div class="alert alert-info">Pro vyhledání článků použijte formulář výše.</div>'));
        });

        //Handels article save request.
        $(document).on('click', 'button.read-later', function () {
            const articleElement = $(this).parents('article');

            const articleToStore = {
                'title': articleElement.data('title'),
                'url': articleElement.data('url'),
                'urlToImage': articleElement.data('urltoimage'),
                'publishedAt': articleElement.data('publishedat'),
            }

            storeArticle(articleToStore);
        });

        //Handels article delete request.
        $(document).on('click', 'button.delete', function () {
            const articleElement = $(this).parents('article');

            const articleToRemoveUrl = articleElement.data('url');

            removeArticle(articleToRemoveUrl);
            articleElement.remove();
        });
    })();
});
