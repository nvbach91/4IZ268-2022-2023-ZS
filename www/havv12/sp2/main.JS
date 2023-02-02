
const main = document.querySelector('.container');
let url = '';
let question;
let arrSelector = pageEles(main, 'div', '', 'arrSelector');
let el;
let answers = [];
let message = pageEles(main, 'div', '', 'message');
let btnsDel = [];
let fileSelect = pageEles(main, 'ul', '', 'file-selection');;
start();
function start() {
    arrSelector.innerHTML = '';
    message.innerHTML = 'Choose quiz';
    answers = [];
    fileSelect.style.display = 'block';
}

function loadData() {
    fileSelect.style.display = 'none';
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => {
            const temp = {
                total: data.length,
                q: data,
                counter: 0,
                finished: false
            };

            for (let i = 0; i < temp.total; i++) {
                answers[i] = [false, null];

            };
            question = temp.q[0];
            createQuestion(temp);
            createNav(temp);

        })
}
function createNav(data) {
    for (let i = 0; i < data.total; i++) {
        let name = 'question' + i;
        let inxButton = pageEles(arrSelector, 'button', i + 1, name);
        inxButton.classList.add("index-button");
        inxButton.onclick = () => {
            removeButtons();
            data.counter = i;
            question = data.q[data.counter];
            el.remove();
            createQuestion(data);

        }
    }
}
function createQuestion(data) {

    el = pageEles(main, 'div', '', 'question');
    const nextBtn = pageEles(main, 'button', '4', 'nav-btn');
    btnsDel.push(nextBtn)
    if (data.q.length - 1 == data.counter) {
        nextBtn.classList.add("end");
        nextBtn.textContent = 'End';

        nextBtn.onclick = () => {
            removeButtons();
            el.remove();
            createEnd(data, el)
        }
    }
    else {
        nextBtn.classList.add("next");

        nextBtn.onclick = () => {
            data.counter++; // beru jako index
            question = data.q[data.counter];
            el.remove();
            removeButtons();
            createQuestion(data);
        }
    }


    const prevBtn = pageEles(main, 'button', '3', 'nav-btn');
    prevBtn.classList.add("previous");
    btnsDel.push(prevBtn);

    if (data.counter == 0) {
        // prevBtn.style.display = "none"
        prevBtn.remove();
    }

    prevBtn.onclick = () => {
        data.counter--;
        question = data.q[data.counter];
        el.remove();
        removeButtons();
        createQuestion(data);
    }

    message.textContent = `Question ${data.counter + 1} of ${data.total}`;


    outputQuestion(question, el, data);
    return el;
}
function createEnd(data) {
    const restartBtn = pageEles(main, 'button', 'Restart', 'restart');
    restartBtn.classList.add("nav-btn");
    btnsDel.push(restartBtn)

    let count = 0;
    let incorrects = "";
    for (let i = 0; i < answers.length; i++) {
        if (answers[i][0]) {
            count++;
        }
        else incorrects = incorrects.concat(i + 1 + ", ");
    };
    incorrects = incorrects.substring(0, incorrects.length - 2);
    message.innerHTML = `<h1>Game Over</h1> <div>${count} correct out of ${data.total} questions.</div>`;
    console.log(answers);
    let incorrectAnswersDiv = pageEles(message, 'div', `<p>Incorrect answers:</p>` + incorrects, 'incorrects');
    data.finished = true;
    restartBtn.onclick = () => {
        incorrectAnswersDiv.remove();
        data.finished = false;
        el.remove();
        removeButtons();
        start();
    }

    //incorrectAnswersDiv.innerHTML = `<p>Incorrect answers:</p>` + incorrects;

}

function outputQuestion(question, parent, data) {
    console.log(question);
    const que = pageEles(parent, 'div', `${question.question}?`, 'question_text');
    const arr = question.options;
    //arr.push(question.answer);
    arr.sort(() => {
        return Math.random() - 0.5;
    })
    const btns = pageEles(parent, 'div', '', 'options')
    let classIndex = 0;
    arr.forEach(e => {


        classIndex++;



        const optemp = pageEles(btns, 'button', e, 'btns');

        if (data.finished) {
            optemp.disabled = true;
            if (question.answer == e) {
                optemp.style.backgroundColor = "rgb(128, 255, 128)";
            }
            else if (e == answers[data.counter][1]) {
                optemp.style.backgroundColor = "rgb(255, 128, 128)";
            }

        }
        if (optemp.innerHTML == answers[data.counter][1]) optemp.classList.add('clicked-answer');
        optemp.onclick = () => {

            optemp.classList.add('clicked-answer');
            if (question.answer == e) {
                //message.textContent = 'Correct';
                answers[data.counter][1] = optemp.innerHTML;
                answers[data.counter][0] = true;

            } else {
                //message.textContent = 'Incorrect';
                answers[data.counter][1] = optemp.innerHTML;
                answers[data.counter][0] = false;

            }

            const temps = parent.querySelectorAll('.btns');


            temps.forEach(el => {
                el.classList.remove('clicked-answer');
            })
            optemp.classList.add('clicked-answer');
        }
    });
}

function pageEles(parent, tagName, html, className) {
    const ele = document.createElement(tagName);
    ele.innerHTML = html;
    ele.classList.add(className);
    return parent.appendChild(ele);
}
function removeButtons() {
    btnsDel.forEach(element => {
        element.remove();
        btnsDel = [];
    });
}





//api section ------------------------------------------------------------------------------
/* exported gapiLoaded */
/* exported gisLoaded */
/* exported handleAuthClick */
/* exported handleSignoutClick */

// TODO(developer): Set to client ID and API key from the Developer Console
const CLIENT_ID = '216626636098-afh5rlsjp7s9pv584llkjl9hbi1fs46u.apps.googleusercontent.com';
const API_KEY = 'AIzaSyDIbBlleZjpaJ0tQiCsIkgldqgQ2KL7V7g';

// Discovery doc URL for APIs used by the quickstart
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly';

let tokenClient;
let gapiInited = false;
let gisInited = false;

document.getElementById('authorize_button').style.visibility = 'hidden';
document.getElementById('signout_button').style.visibility = 'hidden';

/**
 * Callback after api.js is loaded.
 */
function gapiLoaded() {
    gapi.load('client', initializeGapiClient);
}

/**
 * Callback after the API client is loaded. Loads the
 * discovery doc to initialize the API.
 */
async function initializeGapiClient() {
    await gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: [DISCOVERY_DOC],
    });
    gapiInited = true;
    maybeEnableButtons();
}

/**
 * Callback after Google Identity Services are loaded.
 */
function gisLoaded() {
    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: '', // defined later
    });
    gisInited = true;
    maybeEnableButtons();
}

/**
 * Enables user interaction after all libraries are loaded.
 */
function maybeEnableButtons() {
    if (gapiInited && gisInited) {
        document.getElementById('authorize_button').style.visibility = 'visible';
    }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick() {
    tokenClient.callback = async (resp) => {
        if (resp.error !== undefined) {
            throw (resp);
        }
        document.getElementById('signout_button').style.visibility = 'visible';
        document.getElementById('authorize_button').innerText = 'Refresh';
        await listFiles();
    };

    if (gapi.client.getToken() === null) {
        // Prompt the user to select a Google Account and ask for consent to share their data
        // when establishing a new session.
        tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
        // Skip display of account chooser and consent dialog for an existing session.
        tokenClient.requestAccessToken({ prompt: '' });
    }
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick() {
    const token = gapi.client.getToken();
    if (token !== null) {
        google.accounts.oauth2.revoke(token.access_token);
        gapi.client.setToken('');
        document.getElementById('filesList').innerText = '';
        document.getElementById('authorize_button').innerText = 'Authorize';
        document.getElementById('signout_button').style.visibility = 'hidden';
    }
}

/**
 * Print metadata for first 10 files.
 */
async function listFiles() {
    let response;
    try {
        response = await gapi.client.drive.files.list({
            "q": "'1qY9uql73yn2Oa7BTuS4P40-PGp1D4vyi' in parents",
            'pageSize': 10,
            'fields': 'files(id, name)',
        });
    } catch (err) {
        document.getElementById('filesList').innerText = err.message;
        return;
    }
    const files = response.result.files;
    if (!files || files.length == 0) {
        document.getElementById('filesList').innerText = 'No files found.';
        return;
    }
    // Flatten to string to display function pageEles(parent, tagName, html, className) {
    console.log(files);
    files.forEach(file => {
        let item = pageEles(fileSelect, 'li', file.name, 'file-item');
        item.onclick = () => {
            url = "https://www.googleapis.com/drive/v3/files/" + file.id + "?supportsAllDrives=true&alt=media&key=" + API_KEY;
            loadData();
        }

    });
}
