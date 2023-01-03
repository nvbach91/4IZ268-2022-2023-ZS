// disabling aplication till user is logined
const appContent = document.querySelector('main');
function hideContent(){
  appContent.style.opacity = '0.2';
  appContent.style.userSelect = 'none';
  appContent.style.pointerEvents = 'none';
};
hideContent();

function showContent(){
  loginWindow.style.display = 'none';
    appContent.style.opacity = '1';
    appContent.style.userSelect = 'text';
    appContent.style.pointerEvents = 'auto';
};

//Creating login button
const loginWindow = document.createElement('div');
loginWindow.setAttribute('class', 'loginWindow')

const loginIcon = document.createElement('img');
loginIcon.setAttribute('class', 'loginIcon');
loginIcon.setAttribute('src', './img/login_icon.png');
loginIcon.setAttribute('width', '130px');
loginIcon.setAttribute('height', '130px');

const loginText = document.createElement('p');
loginText.setAttribute('class', 'loginText');
loginText.innerText = 'Přihlášení do Manažeru úkolů';

const loginImg = document.createElement('img');
loginImg.setAttribute('class', 'loginImg');
loginImg.setAttribute('src', './img/google_signin.png');
loginImg.setAttribute('width', '267.4px');
loginImg.setAttribute('height', '64.4px');

const loginRegister = document.createElement('p');
loginRegister.setAttribute('class', 'loginRegister');
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
const DISCOVERY_DOC_CALENDAR = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
const DISCOVERY_DOC_TASKS = 'https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest';
const SCOPES = 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/tasks';

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
    discoveryDocs: [DISCOVERY_DOC_CALENDAR, DISCOVERY_DOC_TASKS],
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
  });

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

document.querySelector('#gapi').onload = gapiLoaded;
document.querySelector('#gis').onload = gisLoaded;















/* Creating calendar */
const calendarBody = document.querySelector('#divCalendarBody')
/* Initializing variables according to system settings */
let year = new Date().getFullYear();
let month = 1 + new Date().getMonth();
let daysInMonth;  //holds value of days(28-31) according to year and month

//sets number of days in month variable to daysInMonth
function getDaysInYear() {
  daysInMonth = new Date(year, month, 0).getDate();
};
getDaysInYear();

//returns months in 2 digits format
function getRequestMonth() {
  if (month < 10) {
    return `0${month}`;
  } else {
    return month;
  }
}

// returns system time zone, in format +- and 2 hour digits (+06, -12)
function getTimeZone() {
  const timeZone = new Date().getTimezoneOffset() / 60;
  if (timeZone > 0) {
    if (timeZone < 10) {
      return `+0${timeZone}`;
    } if (timeZone > 10) {
      return `+${timeZone}`;
    }
  } if (timeZone < 0) {
    if (-1 * timeZone < 10) {
      return `-0${-1 * timeZone}`;
    } if (-1 * timeZone > 10) {
      return `${timeZone}`;
    }
  } else {
    return '+00';
  }
}

let requestMonth = getRequestMonth();
let requestTimeZone = getTimeZone();

// returns array of events for inputed day
async function getEvents(day) {
  // preparing inputed day into 2 digits format
  let requestDay;
  if (day < 10) {
    requestDay = `0${day}`
  } else {
    requestDay = daysInMonth;
  }

  //sending GET request to calendar api for events during inputed day from 00:00 to 23:59
  try {
    const request = {
      'calendarId': 'primary',
      'timeMin': `${year}-${requestMonth}-${requestDay}T00:00:00${requestTimeZone}:00`,
      'timeMax': `${year}-${requestMonth}-${requestDay}T23:59:59${requestTimeZone}:00`,
      'showDeleted': true,
    };
    let response = await gapi.client.calendar.events.list(request);
    return response.result.items;
  } catch (error) {
    return console.error(error);;
  }
}

// UPDATING EVENT TODO!
async function updateEvent(day, i) {
  const response = await getEvents(day);
  await gapi.client.calendar.events.update({ 'calendarId': 'primary', 'eventId': response[i].id, "start": response[i].start, "end": response[i].end });
}
// Initializing images for priority alers only for calendar body
const lowPriorityImage = document.createElement("img");
lowPriorityImage.setAttribute('src', './img/lowPriorityEvent.png');
lowPriorityImage.setAttribute('alt', 'image alerting, that this day has low priority events');
lowPriorityImage.setAttribute('class', 'priorityImg');


const mediumPriorityImage = document.createElement("img");
mediumPriorityImage.setAttribute('src', './img/mediumPriorityEvent.png');
mediumPriorityImage.setAttribute('alt', 'image alerting, that this day has medium priority events');
mediumPriorityImage.setAttribute('class', 'priorityImg');

const highPriorityImage = document.createElement("img");
highPriorityImage.setAttribute('src', './img/highPriorityEvent.png');
highPriorityImage.setAttribute('alt', 'image alerting, that this day has high priority events');
highPriorityImage.setAttribute('class', 'priorityImg');

async function getDaysArray() {
  // holds instances of created days
  let days = [];

  // creating divs for days in month, writing inner text, setting alerts, creating details window, setting on click event for details
  for (i = 1; i <= daysInMonth; i++) {
    const day = document.createElement('div');
    day.setAttribute('class', 'days');
    day.innerText = `${i}.`;
    
    // Creating window with deatails
    const dayWindow = document.createElement('div');
    dayWindow.setAttribute('class','dayWindow');
    dayWindow.innerText = "asdf";
    body.appendChild(dayWindow);
    day.addEventListener('click',() => {
      dayWindow.style.display = 'flex';
      hideContent();
    })
    //creating close button for window
    const closeDayWindow = document.createElement('img');
    closeDayWindow.setAttribute('src','./img/closeButton.png');
    closeDayWindow.setAttribute('alt', 'image showing button that closes window with details');
    closeDayWindow.setAttribute('class','closeButton');
    closeDayWindow.addEventListener('click',()=>{
      dayWindow.style.display = 'none';
      showContent();
    });
    dayWindow.appendChild(closeDayWindow);


    let response;
    // Checking, if there is any event on this day, if yes, displaying alers with titles for total number
    getEvents(i).then(
      function (value) {
        response = value; // stores array of events for the day
        let eventCount = response.length;

        //counting events, if there are any, appeding alert images
        if (eventCount != 0) {
          let low = 0;
          let medium = 0;
          let high = 0;

          for (i = 0; i < eventCount; i++) {
            if (response[i].source.title == "low") {
              low++;
            }
            if (response[i].source.title == "medium") {
              medium++;
            }
            if (response[i].source.title == "high") {
              high++;
            }
          }
          if (low != 0) {
            if (low > 1) {
              lowPriorityImage.setAttribute('title', `${low}x`);
            }
            day.appendChild(lowPriorityImage);
          }
          if (medium != 0) {
            if (medium > 1) {
              mediumPriorityImage.setAttribute('title', `${medium}x`);
            }
            day.appendChild(mediumPriorityImage);
          }
          if (high != 0) {
            if (high > 1) {
              highPriorityImage.setAttribute('title', `${high}x`);
            }
            day.appendChild(highPriorityImage);
          }
        }
      }
    );
    days[i - 1] = day;
  }

  //displaying all day div 
  days.forEach((day) => {
    calendarBody.appendChild(day);
  });
}

//Create Event
/* 
await gapi.client.calendar.events.insert({
    'calendarId': 'primary',
  'resource': {
      "end":{"dateTime"
: 
"2023-01-02T03:31:00+01:00",
"timeZone"
: 
"Europe/Prague"},
      "start":{"dateTime": '2023-01-02T03:30:00+01:00', "timeZone": 'Europe/Prague'},
      "source":{"url": 'https://www.youtube.com/', "title": 'medium'}
  }
})
*/










// Initializing and loading data to application
function initializeApplication(){
  getDaysArray();
}


/**
 *  Sign in the user upon button click.
 */
function handleAuthClick() {
  tokenClient.callback = async (resp) => {
    if (resp.error !== undefined) {
      throw (resp);
    }
    //logined displaying functionality
    initializeApplication();
    showContent();
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