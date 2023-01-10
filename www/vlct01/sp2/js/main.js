$(document).ready(() => {
    (() => {
        //API
        const baseSearchApiUrl = 'https://content.guardianapis.com/search';
        const baseSingleItemApiUrl = 'https://content.guardianapis.com/';
        const apiKey = 'test';

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
        const now = `${dateTime.getFullYear()}-${formatNumber(dateTime.getMonth() + 1)}-${formatNumber(dateTime.getDate())}`;

        const weekBack = `${dateTime.getFullYear()}-${formatNumber(dateTime.getMonth() + 1)}-${formatNumber(dateTime.getDate() - 7)}`;

        //Set default values of form inputs.
        resultsFromInput.val(weekBack);
        resultsToInput.val(now);

        let articlesToAppend = [];

        //Renders article.
        const renderArticle = (article, savedArticles = false) => {
            articlesToAppend.push($(`<article class="col-md-4" data-id="${article.id}"></article>`).html(`
                <div class="card border-0 h-100">
                    <div class="card-header d-flex align-items-center justify-content-center p-0"> 
                        ${article.fields.thumbnail != null ? `<img src="${article.fields.thumbnail}" class="card-img-top" alt="news_img">` : '😞 Obrázek nedostupný 😞'}
                    </div>
                    <div class="card-body px-0">
                        <h3 class="fs-5 card-title">
                            <a href="${article.webUrl}" class="text-decoration-none" target="_blank">${article.webTitle}</a>
                        </h3>
                        <small class="text-muted" >${article.webPublicationDate}</small>
                        <p class="card-text mt-2">${article.fields.trailText || ''}</p>
                    </div>
                    <div class="card-footer px-0 bg-white d-flex justify-content-between">
                        <a href="${article.webUrl}" target="_blank" class="btn btn-sm btn-primary">Číst více</a>
                        <button class="${!savedArticles ? 'read-later' : 'delete'} btn btn-sm btn-outline-${!savedArticles ? 'warning' : 'danger'}"><i class="${!savedArticles ? 'bi bi-star' : 'bi bi-trash'}"></i></button>
                    </div>
                </div>
        `));
        }

        const fetch = (requestUrl, savedArticle = false) => {
            requestUrl = `${requestUrl}${savedArticle ? '?' : '&'}show-fields=thumbnail,trailText&page-size=200&api-key=${apiKey}`

            $.getJSON(requestUrl, function (result) {
                if (savedArticle) {
                    renderArticle(result.response.content, savedArticle);
                }
                else {
                    if (result.response.results.length < 1) {
                        articlesElement.empty().append('<div class="alert alert-info">Vámi zadanému klíčovému slovu neodpovídá žádný článek.</div>');
                        return;
                    }

                    $.each(result.response.results, function (i, article) {
                        renderArticle(article, savedArticle);
                    });
                }

                articlesElement.empty().append(articlesToAppend);
            }).fail(() => {
                articlesElement.empty().append('<div class="alert alert-danger">Nastala chyba při zpracování požadavku.</div>');
            });
        }

        //Event that handels form submission.
        $('form').submit((e) => {
            e.preventDefault();
            articlesToAppend = [];

            articlesElement.empty();
            const keyWord = keywordInput.val().trim();

            if (keyWord.length < 1) {
                articlesElement.append($('<div class="alert alert-danger">Pro vyhledání článků je třeba zadat alespoň 1 klíčové slovo.</div>'));
                toastBody.text('Pro vyhledání článků je třeba zadat alespoň 1 klíčové slovo.');
                toastElement.toast('show');
                return;
            }

            articlesElement.append(spinner);

            const resultsFrom = resultsFromInput.val() || now;
            const resultsTo = resultsToInput.val() || weekBack;
            const sortBy = sortBySelect.val();

            const requestParameters = `?q=${keyWord}&from-date=${resultsFrom}&to-date=${resultsTo}&order-by=${sortBy}`;

            window.history.pushState(null, '', requestParameters);

            fetch(baseSearchApiUrl + requestParameters);
        });

        //Gets articles from local storage and return them as an array.
        const getArticleIdsFromStorage = () => {
            return $.parseJSON(localStorage.getItem('articles'));
        }

        //Checks if at least 1 article is stored in local storage. 
        const isStorageEmpty = () => {
            return getArticleIdsFromStorage() === null || getArticleIdsFromStorage().length === 0;
        }

        //Checks if article is not already stored and if not, the article is stored.
        const storeArticle = (articleId) => {
            let articleIdsToCheck = [];

            if (!isStorageEmpty()) {
                articleIdsToCheck = getArticleIdsFromStorage();
            }

            if (!articleIdsToCheck.includes(articleId)) {
                articleIdsToCheck.push(articleId);
                localStorage.setItem('articles', JSON.stringify(articleIdsToCheck));
                toastBody.text('Článek uložen.');
            }
            else {
                toastBody.text('Tento článek byl již dříve uložen.');
            }
            toastElement.toast('show');
        }

        //Removes selected article from local storage.
        const removeArticle = (articleToRemoveId) => {
            const remainingArticles = $.grep(getArticleIdsFromStorage(), function (e) {
                return e != articleToRemoveId;
            });

            localStorage.setItem('articles', JSON.stringify(remainingArticles));
            toastBody.text('Článek úspěšně odstraněn.');
            toastElement.toast('show');
        }

        //Fluhes URL parameters
        const flushParameters = () => {
            window.history.pushState(null, '', window.location.pathname);
        }

        //Renders saved articles "page".
        const renderSavedArticles = () => {
            homeLink.removeClass('active');
            savedArticlesLink.addClass('active');

            articlesElement.empty().append(spinner);
            filtersSection.hide();
            articlesToAppend = [];

            if (isStorageEmpty()) {
                articlesElement.empty().append($('<div class="alert alert-info">Zatím nebyl uložen žádný článek.</div>'));
                return;
            }

            const savedArticles = getArticleIdsFromStorage();
            savedArticles.forEach(savedArticle => {
                fetch(baseSingleItemApiUrl + savedArticle, true);
            });
        }

        //Handels saved articles "page" click.
        savedArticlesLink.click((e) => {
            e.preventDefault();

            window.history.pushState(null, '', '?type=saved');

            renderSavedArticles();
        });

        //Renders home "page".
        homeLink.click((e) => {
            e.preventDefault();
            savedArticlesLink.removeClass('active');
            homeLink.addClass('active');

            flushParameters();

            filtersSection.show();
            articlesElement.empty().append($('<div class="alert alert-info">Pro vyhledání článků použijte formulář výše.</div>'));
        });

        //Handels article save request.
        $(document).on('click', 'button.read-later', function () {
            const articleElement = $(this).parents('article');

            storeArticle(articleElement.data('id'));
        });

        //Handels article delete request.
        $(document).on('click', 'button.delete', function () {
            const articleElement = $(this).parents('article');

            const articleToRemoveId = articleElement.data('id');
            removeArticle(articleToRemoveId);
            articleElement.remove();

            if (isStorageEmpty()) {
                articlesElement.empty().append($('<div class="alert alert-info">Zatím nebyl uložen žádný článek.</div>'));
            }
        });

        //Checks if site is entered with URL parameters
        const checkUrlParameters = () => {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);

            articlesElement.empty();

            if (urlParams.get('q') != null) {
                keywordInput.val(urlParams.get('q'));
                resultsFromInput.val(urlParams.get('from-date') || weekBack);
                resultsToInput.val(urlParams.get('to-date') || now);
                sortBySelect.val(urlParams.get('order-by') || sortBySelect.first().val());

                articlesElement.empty().append(spinner);

                fetch(baseSearchApiUrl + queryString);
            }
            else if (urlParams.get('type') != null && urlParams.get('type') == 'saved') {
                renderSavedArticles();
            }
            else {
                articlesElement.empty().append($('<div class="alert alert-info">Pro vyhledání článků použijte formulář výše.</div>'));
            }
        }

        //Handeles URL change
        $(window).on('popstate', () => {
            checkUrlParameters();
        });

        //Call method that checks parameters on entry
        checkUrlParameters();
    })();
});
