//Pre-authentication state -> all main content disabled -> only content in body usable (this should be only login button)
const appContent = document.querySelector('main');
appContent.style.opacity = '0.2';
appContent.style.userSelect = 'none';
appContent.style.pointerEvents = 'none';

//Creating login button
const loginWindow = document.createElement('div');
loginWindow.setAttribute('class','loginWindow')

const loginIcon = document.createElement('img');
loginIcon.setAttribute('class', 'loginIcon');
loginIcon.setAttribute('src', '../img/login_icon.png');
loginIcon.setAttribute('width', '130px');
loginIcon.setAttribute('height', '130px');

const loginText = document.createElement('p');
loginText.setAttribute('class','loginText');
loginText.innerText = 'Přihlášení do Manažeru úkolů';

const loginImg = document.createElement('img');
loginImg.setAttribute('class', 'loginImg');
loginImg.setAttribute('src', '../img/google_signin.png');
loginImg.setAttribute('width', '267.4px');
loginImg.setAttribute('height', '64.4px');

const loginRegister = document.createElement('p');
loginRegister.setAttribute('class','loginRegister');
loginRegister.innerText = 'Založit účet Google';
loginRegister.addEventListener('click', () => {
  window.open('https://accounts.google.com/signup/v2/webcreateaccount?flowName=GlifWebSignIn&flowEntry=SignUp', '_blank');
})

loginWindow.appendChild(loginIcon);
loginWindow.appendChild(loginText);
loginWindow.appendChild(loginImg);
loginWindow.appendChild(loginRegister);


const body = document.querySelector('body');
body.appendChild(loginWindow);



//Authentication and Authorization process
const CLIENT_ID = '629701758649-kai0b8etkre98ssnbqgd3e7ip6mp4tv2.apps.googleusercontent.com';
const API_KEY = 'AIzaSyBn_rf9ZTCMTfsvOPzmF5-PTBD29hmVIEA';
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
const SCOPES = 'https://www.googleapis.com/auth/calendar';

let tokenClient;
let gapiInited = false;
let gisInited = false;


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
async function gisLoaded() {
  tokenClient = await google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: '', // defined later
  } );

  gisInited = true;
  maybeEnableButtons();
}

/**
 * Enables user interaction after all libraries are loaded.
 */
function maybeEnableButtons() {
  if (gapiInited && gisInited) {
    loginImg.addEventListener('click', handleAuthClick)
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
    loginWindow.style.display = 'none';
    appContent.style.opacity = '1';
    appContent.style.userSelect = 'text';
    appContent.style.pointerEvents = 'auto';
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

document.querySelector('#gapi').onload = gapiLoaded;
document.querySelector('#gis').onload = gisLoaded;
