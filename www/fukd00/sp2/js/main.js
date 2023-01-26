function AMOUNTQUESTIONS() { return 10; }
var questionSet;
var categories;

var selectedCategory;
var selectedDifficulty;
var currQIndex = 0;

const quizSection = $('.quiz');
const categoriesSection = $('.categories');
const difficultySection = $('.difficulty');
const difficultyContainer = $('#difficultySelection');
const categoriesContainer = $('.categoriesContainer');
const questionsWrapper = $('#questions');
const questionList = $('#questionList');
const quizSuccessRatio = $('#quizSuccessRatio');
const congratsModal = $('#congratsModal');
const resultScreen = $('.resultScreen');
const homepageBtn = $('#homepageBtn');

$(document).ready(() => {
    // show categories as buttons when site loads
    createCategories();

    // disable homepage btn to show current page
    homepageBtn.prop('disabled', true);
});

const createCategories = () => {
    // add loader
    categoriesContainer.append(getLoaderElement());
    // load categories
    $.ajax({
        url: 'https://opentdb.com/api_category.php',
        type: "GET",
        success: function (data) {
            // get all available categories
            categories = [...data.trivia_categories];
            // create category buttons with onclick that returns its id
            var categoryBtnsArr = [];
            $.each(categories, function (index, item) {
                var categoryNameButton = $('<button/>',
                    {
                        id: item.id,
                        class: 'btn btn-warning',
                        text: item.name
                    });
                categoryNameButton.click({ id: item.id }, categoryButtonClicked);
                categoryBtnsArr.push(categoryNameButton);
            });
            // create button for mix of questions from all categories
            categoryBtnsArr.push(createMixedCategoryBtn());
            // append created categories fragment
            categoriesContainer.append(categoryBtnsArr);
            // remove loader
            removeLoaderElement();
        }
    });
}

const createMixedCategoryBtn = () => {
    var mixCatButton = $('<button/>',
        {
            id: 'mixed',
            class: 'btn btn-warning',
            text: 'Mix of all categories'
        });
    mixCatButton.click({ id: 'mixed' }, categoryButtonClicked);
    return mixCatButton;
}

const initQuiz = (questions) => {
    // clear quiz questions and question list before generating a new quiz
    questionsWrapper.empty();
    questionList.empty();
    // setup session storage variable to keep track of how many questions were answered and how many correctly
    sessionStorage.setItem('answeredCount', '0');
    sessionStorage.setItem('quizCorrectCount', '0');
    // save fetched set of questions to variable
    questionSet = [...questions];
    // create aside quiz navigation with questions
    createQuizNav();
    // create all questions in HTML
    createQuestions();
    // show first question
    currQIndex = 0;
    showQuestion(currQIndex);
}

const finishQuiz = () => {
    // clear data from result screen
    $('.resultScreen span').empty();
    // generate data in hidden end result screen
    $('#selCat').append($('#' + selectedCategory).text());
    $('#selDiff').append(selectedDifficulty);
    $('#qCount').append(AMOUNTQUESTIONS());

    $('#corrAnsCount').append(sessionStorage.getItem('quizCorrectCount'));
    $('#incorrAnsCount').append(AMOUNTQUESTIONS() - Number(sessionStorage.getItem('quizCorrectCount')));
    let quizPercent = 100 * Number(sessionStorage.getItem('quizCorrectCount')) / AMOUNTQUESTIONS();
    $('#corrAnsPercQuiz').append(roundTwoDecimals(quizPercent) + ' %');

    let overallPercent = 100 * Number(localStorage.getItem('correctAnsCount')) / (Number(localStorage.getItem('correctAnsCount')) + Number(localStorage.getItem('incorrectAnsCount')));
    $('#corrAnsPercOverall').append(roundTwoDecimals(overallPercent) + ' %');

    // create button to show result screen in quiz nav above questions
    questionList.prepend('<button type="button" class="btn btn-warning" onclick="showResultScreenBtnClick()">Show results</button>');

    // open modal with congratulations (Bootstrap)
    congratsModal.modal('show');
}

const createQuizNav = () => {
    // save question nav button to array
    var questionNavBtns = [];
    $.each(questionSet, function (index, item) {
        // fill aside list
        var questionListButton = $('<button/>',
            {
                id: 'question' + index,
                class: 'btn btn-dark',
                text: 'QUESTION #' + (index + 1)
            });
        questionListButton.click({ goToIdx: index }, jumpToQuestion);
        questionNavBtns.push(questionListButton);
    });
    // append as a document fragment all at once
    questionList.append(questionNavBtns);
    // update success ratio
    showQuizSuccessRatio();
}

const createQuestions = () => {
    // array with questions
    var questionsArray = [];
    for (let index = 0; index < AMOUNTQUESTIONS(); index++) {
        // question headline with number
        var questionHeadline = $('<h1/>', { text: 'Question #' + (index + 1) });
        // question navigation with prev and next btns
        var qNavPrevBtn = $('<button/>', {
            type: 'button',
            class: 'btn btn-secondary btn-prev-q',
            click: prevQBtnClicked,
            text: decodeHTML('&#8592; Previous')
        });
        var qNavNextBtn = $('<button/>', {
            type: 'button',
            class: 'btn btn-secondary btn-next-q',
            click: nextQBtnClicked,
            text: decodeHTML('Next &#8594;')
        });
        // check if it is first or last question to disable nav buttons
        qNavPrevBtn.prop('disabled', index === 0);
        qNavNextBtn.prop('disabled', index === questionSet.length - 1);
        // complete question nav
        var questionNav = $('<div/>', { class: 'questionNav' });
        questionNav.append(qNavPrevBtn, qNavNextBtn);
        // question text
        var questionText = $('<p\>', {
            class: 'questionText',
            text: decodeHTML(questionSet[index].question)
        });
        // question answers form
        var questionAnswers = $('<form/>', {
            id: 'answersContainer' + index,
            class: 'answersContainer',
            method: 'post'
        });
        if (questionSet[index].type === 'multiple') {
            questionAnswers.append(createMultipleAnswers(index));
        } else if (questionSet[index].type === 'boolean') {
            questionAnswers.append(createBooleanAnswers(index));
        }
        // connect all parts of question
        var questionBody = $('<section/>', {
            id: 'questionContainer' + index,
            class: 'questionContainer'
        });
        questionBody.append(questionHeadline, questionNav, questionText, questionAnswers);
        // add to array of questions
        questionsArray.push(questionBody);
    }
    // append fragment to DOM
    questionsWrapper.append(questionsArray);
}

const showQuestion = (qIdx) => {
    // TODO - performance improvement when prevQIdx stored
    // enable all question nav btns
    $.each(questionSet, function (index, item) {
        $('#questionList > #question' + index).prop('disabled', false);
        $('#questionContainer' + index).addClass('hidden');
    });
    // disable nav btn for current question
    $('#questionList > #question' + qIdx).prop('disabled', true);
    // show container with question of given index
    $('#questionContainer' + qIdx).removeClass('hidden');
}

const createMultipleAnswers = (idx) => {
    // get incorrect answers and add correct
    let answers = [...questionSet[idx].incorrect_answers];
    answers.push(questionSet[idx].correct_answer);
    // mix them up
    shuffleAnswers(answers);
    // answers inputs
    var ansInputs = [];
    $.each(answers, function (index, item) {
        // add Bootstrap structure for each radio answer
        var inputRadio = $('<input/>', {
            id: 'ansCont' + idx + 'A' + (index + 1),
            class: 'form-check-input',
            type: 'radio',
            name: 'answerRadio',
            value: decodeHTML(item)
        });
        inputRadio.on('click', { value: decodeHTML(item) }, checkAnswer);
        var inputRadioLabel = $('<label/>', {
            class: 'form-check-label',
            for: 'ansCont' + idx + 'A' + (index + 1),
            text: decodeHTML(item)
        });
        // complete input answer
        var inputBody = $('<div/>', { class: 'form-check' });
        inputBody.append(inputRadio, inputRadioLabel);
        // add to answers inputs
        ansInputs.push(inputBody);
    });
    // return answers for question
    return ansInputs;
}

const createBooleanAnswers = (idx) => {
    // Bootstrap structure with btn-styled radios
    var truefalseAnsBody = $('<div/>', { class: 'trueFalseContainer' });
    // true btn and label
    var trueBtn = $('<input/>', {
        id: 'ansCont' + idx + 'A0',
        class: 'btn-check',
        type: 'radio',
        name: 'answerRadio',
        autocomplete: 'off'
    });
    trueBtn.on('click', { value: 'True' }, checkAnswer);
    var trueBtnLabel = $('<label/>', {
        class: 'btn btn-success btn-answer',
        for: 'ansCont' + idx + 'A0',
        text: 'TRUE'
    });
    var trueBody = $('<div/>', { class: 'form-check' });
    trueBody.append(trueBtn, trueBtnLabel);
    // false btn and label
    var falseBtn = $('<input/>', {
        id: 'ansCont' + idx + 'A1',
        class: 'btn-check',
        type: 'radio',
        name: 'answerRadio',
        autocomplete: 'off'
    });
    falseBtn.on('click', { value: 'False' }, checkAnswer);
    var falseBtnLabel = $('<label/>', {
        class: 'btn btn-danger btn-answer',
        for: 'ansCont' + idx + 'A1',
        text: 'FALSE'
    });
    var falseBody = $('<div/>', { class: 'form-check' });
    falseBody.append(falseBtn, falseBtnLabel);
    // complete structure
    truefalseAnsBody.append(trueBody, falseBody);
    // return completed structure
    return truefalseAnsBody;
}

function checkAnswer(param) {
    // fetch value of clicked answer
    var answer = param.data.value;
    // lock the form so responses can't be changed
    $('#answersContainer' + currQIndex + ' input').prop('disabled', true);
    // check if answer was correct and react accordingly 
    let isAnsCorrect = (answer === decodeHTML(questionSet[currQIndex].correct_answer));
    if (isAnsCorrect) {
        // answer is correct, mark the question in the list
        $('#question' + currQIndex).css('color', 'lightgreen');
        // increase number of correct answers in local storage
        incrCorrectAnsCount();
    } else {
        // answer is wrong, mark the question in the list
        $('#question' + currQIndex).css('color', 'red');
        // increase number of incorrect answers in local storage
        incrIncorrectAnsCount();
    }
    // show popup above answers and hide it shortly after
    ansResultPopup(isAnsCorrect);

    // option to show correct answer for incorrectly answered questions
    if (!isAnsCorrect) {
        createCorrectAnsBtn();
    }

    // increase answered questions count in session storage
    let ansCount = Number(sessionStorage.getItem('answeredCount')) + 1;
    sessionStorage.setItem('answeredCount', ansCount);
    // check if all was answered
    if (Number(sessionStorage.getItem('answeredCount')) === AMOUNTQUESTIONS()) {
        finishQuiz();
    }

    // update success ratio
    showQuizSuccessRatio();
}

const showQuizSuccessRatio = () => {
    // calculate success ratio
    let ansCount = Number(sessionStorage.getItem('answeredCount'));
    if (ansCount === 0) {
        // reset quiz ratio text
        quizSuccessRatio.text('Answer question for success rate');
        quizSuccessRatio.css('color', 'gray');
    } else {
        // show ratio rounded to two decimals
        let ratio = 100 * Number(sessionStorage.getItem('quizCorrectCount')) / ansCount;
        quizSuccessRatio.text(roundTwoDecimals(ratio) + ' % answered correctly');
        // set text color according to score
        if (ratio >= 80) {
            quizSuccessRatio.css('color', 'lightgreen');
        } else if (ratio < 80 && ratio >= 50) {
            quizSuccessRatio.css('color', 'orange');
        } else {
            quizSuccessRatio.css('color', 'red');
        }
    }
}

const incrCorrectAnsCount = () => {
    // local storage variable for overall count
    if (localStorage.getItem('correctAnsCount') != null) {
        // variable already exists, increase value
        let count = Number(localStorage.getItem('correctAnsCount')) + 1;
        // set value
        localStorage.setItem('correctAnsCount', count);
    } else {
        localStorage.setItem('correctAnsCount', '1');
    }
    // session storage variable for current quiz - already set to 0 in initQuiz
    let quizCount = Number(sessionStorage.getItem('quizCorrectCount')) + 1;
    sessionStorage.setItem('quizCorrectCount', quizCount);
}

const incrIncorrectAnsCount = () => {
    if (localStorage.getItem('incorrectAnsCount') != null) {
        // variable already exists, increase value
        let count = Number(localStorage.getItem('incorrectAnsCount')) + 1;
        // set value
        localStorage.setItem('incorrectAnsCount', count);
    } else {
        localStorage.setItem('incorrectAnsCount', '1');
    }
}

const ansResultPopup = (result) => {
    // alert div using Bootstrap
    let resultMsg = $('<div/>',
        {
            class: 'alert resultPopup'
        });
    // text and color depends on answer
    if (result) {
        resultMsg.text('CORRECT!');
        resultMsg.addClass('alert-success');
    } else {
        resultMsg.text('INCORRECT');
        resultMsg.addClass('alert-danger');
    }
    $('#answersContainer' + currQIndex).before(resultMsg);
    resultMsg.alert();
    // slide up closing animation for alert after 1.5 sec
    window.setTimeout(function () {
        resultMsg.slideUp(500, function () {
            $(this).remove();
        });
    }, 1500);
}

const createCorrectAnsBtn = () => {
    // show button for correct answer
    let ansBtn = $('<button/>', {
        id: 'showAnsBtn' + currQIndex,
        class: 'btn btn-info correctAnsBtn',
        type: 'button',
        click: showAnsBtnClick,
        text: 'Show correct answer'
    });
    // append behind answers
    $('#answersContainer' + currQIndex).after(ansBtn);
}

function jumpToQuestion(param) {
    // update current index
    currQIndex = param.data.goToIdx;
    // jump to clicked question
    showQuestion(currQIndex);
}

const hideCongratsModal = () => {
    congratsModal.modal('hide');
}

/* --- HELPER FUNCTIONS --- */
const getLoaderElement = () => {
    return $('<div class="rotating-loader"></div>');
}

const removeLoaderElement = () => {
    $('.rotating-loader').remove();
}

const getCategoryName = (id) => {
    var categoryName = '';
    $.each(categories, function (index, item) {
        if (item.id == id) {
            categoryName = item.name;
            return false;
        }
    });
    return categoryName;
}

const roundTwoDecimals = (number) => {
    return Math.round((number + Number.EPSILON) * 100) / 100;
}

function decodeHTML(text) {
    // using temp text area to convert special characters
    var textField = document.createElement('textarea');
    textField.innerHTML = text;
    return textField.value;
}

/** Source: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array */
function shuffleAnswers(answerArray) {
    for (let i = answerArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [answerArray[i], answerArray[j]] = [answerArray[j], answerArray[i]];
    }
}

/* --- ONCLICK FUNCTIONS --- */

function newQuizSameSettingsBtnClick() {
    // show loader
    $('.resultScreenNav > div').append(getLoaderElement());
    // AJAX request for new questions with the same settings
    $.ajax({
        url: getQueryURL(),
        type: "GET",
        success: function (data) {
            // successful API query has response code 0
            if (data.response_code === 0) {
                // remove loader
                removeLoaderElement();
                // hide result screen and show quiz container
                resultScreen.addClass('hidden');
                quizSection.removeClass('hidden');
                // initialize quiz
                initQuiz(data.results);
            }
        }
    });
}

function newQuizSameQuestionsBtnClick() {
    // hide result screen and show quiz container
    resultScreen.addClass('hidden');
    quizSection.removeClass('hidden');
    // restart quiz
    restartQuiz();
}

const restartQuiz = () => {
    // initialize quiz with the same question set
    initQuiz(questionSet);
}

function hideResultScreen() {
    // hide result screen and go back to quiz
    resultScreen.addClass('hidden');
    quizSection.removeClass('hidden');
}

function showResultScreenBtnClick() {
    // hide modal
    hideCongratsModal();
    // show result screen
    quizSection.addClass('hidden');
    resultScreen.removeClass('hidden');
}

function showAnsBtnClick() {
    // remove button that was clicked
    $('#showAnsBtn' + currQIndex).remove();
    // create alert div with correct answer
    let correctAnsAlert = $('<div/>', {
        class: 'alert alert-info correctAnsPopup',
    });
    correctAnsAlert.html('Correct answer was: <b>' + decodeHTML(questionSet[currQIndex].correct_answer) + '</b>');
    //let correctAnsAlert = $('<div class="alert alert-info correctAnsPopup">Correct answer was: <b>' + decodeHTML(questionSet[currQIndex].correct_answer) + '</b></div>');
    // attach it behind answers
    $('#answersContainer' + currQIndex).after(correctAnsAlert);
}

function homepageBtnClicked() {
    // show categories selection and hide all other sections
    categoriesSection.removeClass('hidden');
    difficultySection.addClass('hidden');
    quizSection.addClass('hidden');
    resultScreen.addClass('hidden');
    // disable homepage btn to mark current page
    homepageBtn.prop('disabled', true);
}

function prevQBtnClicked() {
    // set current index of question according to nav button
    currQIndex--;
    // show new question
    showQuestion(currQIndex);
}

function nextQBtnClicked() {
    // set current index of question according to nav button
    currQIndex++;
    // show new question
    showQuestion(currQIndex);
}

function categoryButtonClicked(param) {
    // set selected category
    selectedCategory = param.data.id;
    // show difficulty selection
    categoriesSection.addClass('hidden');
    difficultySection.removeClass('hidden');
    // enable homepage btn since homepage is no longer current visible page
    homepageBtn.prop('disabled', false);
}

function difficultyButtonClicked(difficulty) {
    // set selected difficulty for result screen
    selectedDifficulty = difficulty;
    // show loader
    difficultyContainer.addClass('hidden');
    difficultySection.append(getLoaderElement());
    // load questions from selected category of selected difficulty
    $.ajax({
        url: getQueryURL(),
        type: "GET",
        success: function (data) {
            // successful API query has response code 0
            if (data.response_code === 0) {
                // remove loader
                removeLoaderElement();
                // hide difficulty and show quiz container
                difficultyContainer.removeClass('hidden');
                difficultySection.addClass('hidden');
                quizSection.removeClass('hidden');
                // initialize quiz
                initQuiz(data.results);
            } else if (data.response_code === 1) {
                // alert element
                showNotEnoughQuestionsWarning();
                // remove loader and show difficulty btns
                removeLoaderElement();
                difficultyContainer.removeClass('hidden');
            }
        }
    });
}

const showNotEnoughQuestionsWarning = () => {
    let errorMsg = $('<div/>',
        {
            class: 'alert alert-danger alertNotEnoughQs'
        });
    errorMsg.text('Sorry, not enough questions in "' +
        getCategoryName(selectedCategory).toUpperCase() +
        '" category and "' +
        selectedDifficulty.toUpperCase() +
        '" difficulty yet. Please select another difficulty or category.');
    // pop up alert above difficulty buttons
    $('.difficulty > h1').after(errorMsg);
    errorMsg.alert();
    // slide up closing animation for alert after 5 sec
    window.setTimeout(function () {
        errorMsg.slideUp(500, function () {
            $(this).remove();
        });
    }, 7000);
}

const getQueryURL = () => {
    // create pieces for API query
    var queryBase = 'https://opentdb.com/api.php?amount=' + AMOUNTQUESTIONS();
    if (selectedCategory !== 'mixed') {
        var queryCategory = '&category=' + selectedCategory;
    }
    var queryDifficulty = '&difficulty=' + selectedDifficulty;

    // create whole URL from pieces
    var query;
    if (queryCategory) {
        query = queryBase.concat(queryCategory, queryDifficulty);
    } else {
        query = queryBase.concat(queryDifficulty);
    }
    return query;
}