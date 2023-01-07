$(document).ready(() => {
    // show categories as buttons when site loads
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://opentdb.com/api_category.php');
    xhr.addEventListener('load', () => {
        // get all available categories
        const data = JSON.parse(xhr.responseText);
        // create a button with onClick that returns its id
        $.each(data.trivia_categories, function (index, item) {
            var categoryNameButton = $('<button/>',
                {
                    text: item.name,
                    id: item.id
                });
            $('#categoryContainer').append(categoryNameButton);
            $('#' + item.id).addClass("btn btn-warning");
            $('#' + item.id).click({ id: item.id }, CategoryButtonClicked);
        });
    });
    xhr.addEventListener('error', function (e) {
        console.error('XHR error', e);
    });
    xhr.send();

    // assign functions to the nav bar buttons
    $("#btnHomepage").click(ShowHomepage);
});

function CategoryButtonClicked(param) {
    // load 20 questions from given category
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://opentdb.com/api.php?amount=20&category=' + param.data.id);
    xhr.addEventListener('load', () => {
        const data = JSON.parse(xhr.responseText);
        console.log(data);
        // hide categories and show questions
        $('.categories').addClass("hidden");
        $('.questions').removeClass("hidden");
        // TODO complex showing of questions and checks, now only a list for now to try functionality
        var questionNumber = 1;
        $.each(data.results, function (index, item) {
            var questionText = $('<p/>',
                {
                    text: questionNumber + ") " + item.question
                });
            $('#questionsContainer').append(questionText);
            questionNumber++;
        });
    });
    xhr.addEventListener('error', function (e) {
        console.error('XHR error', e);
    });
    xhr.send();
}

function ShowHomepage() {
    $('.categories').removeClass("hidden");
    $('.questions').addClass("hidden");
    $('#questionsContainer').empty();
}