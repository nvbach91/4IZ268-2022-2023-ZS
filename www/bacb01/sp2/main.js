// // Google Calendar part
// // TODO(developer): Set to client ID and API key from the Developer Console
// //const CLIENT_ID = '<YOUR_CLIENT_ID>';
// //const API_KEY = '<YOUR_API_KEY>';
// const CLIENT_ID = document.getElementById('#idInput');
// const API_KEY = document.getElementById('#apiInput');

// // Discovery doc URL for APIs used by the quickstart
// const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';

// // Authorization scopes required by the API; multiple scopes can be
// // included, separated by spaces.
// const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

// let tokenClient;
// let gapiInited = false;
// let gisInited = false;

// document.getElementById('authorize_button').style.visibility = 'hidden';
// document.getElementById('signout_button').style.visibility = 'hidden';

// /**
//  * Callback after api.js is loaded.
//  */
// function gapiLoaded() {
//   gapi.load('client', initializeGapiClient);
// }

// /**
//  * Callback after the API client is loaded. Loads the
//  * discovery doc to initialize the API.
//  */
// async function initializeGapiClient() {
//   await gapi.client.init({
//     apiKey: API_KEY,
//     discoveryDocs: [DISCOVERY_DOC],
//   });
//   gapiInited = true;
//   maybeEnableButtons();
// }

// /**
//  * Callback after Google Identity Services are loaded.
//  */
// function gisLoaded() {
//   tokenClient = google.accounts.oauth2.initTokenClient({
//     client_id: CLIENT_ID,
//     scope: SCOPES,
//     callback: '', // defined later
//   });
//   gisInited = true;
//   maybeEnableButtons();
// }

// /**
//  * Enables user interaction after all libraries are loaded.
//  */
// function maybeEnableButtons() {
//   if (gapiInited && gisInited) {
//     document.getElementById('authorize_button').style.visibility = 'visible';
//   }
// }

// /**
//  *  Sign in the user upon button click.
//  */
// function handleAuthClick() {
//   tokenClient.callback = async (resp) => {
//     if (resp.error !== undefined) {
//       throw (resp);
//     }
//     document.getElementById('signout_button').style.visibility = 'visible';
//     document.getElementById('authorize_button').innerText = 'Refresh';
//     await listUpcomingEvents();
//   };

//   if (gapi.client.getToken() === null) {
//     // Prompt the user to select a Google Account and ask for consent to share their data
//     // when establishing a new session.
//     tokenClient.requestAccessToken({prompt: 'consent'});
//   } else {
//     // Skip display of account chooser and consent dialog for an existing session.
//     tokenClient.requestAccessToken({prompt: ''});
//   }
// }

// /**
//  *  Sign out the user upon button click.
//  */
// function handleSignoutClick() {
//   const token = gapi.client.getToken();
//   if (token !== null) {
//     google.accounts.oauth2.revoke(token.access_token);
//     gapi.client.setToken('');
//     document.getElementById('content').innerText = '';
//     document.getElementById('authorize_button').innerText = 'Authorize';
//     document.getElementById('signout_button').style.visibility = 'hidden';
//   }
// }

// /**
//  * Print the summary and start datetime/date of the next ten events in
//  * the authorized user's calendar. If no events are found an
//  * appropriate message is printed.
//  */
// async function listUpcomingEvents() {
//   let response;
//   try {
//     const request = {
//       'calendarId': 'primary',
//       'timeMin': (new Date()).toISOString(),
//       'showDeleted': false,
//       'singleEvents': true,
//       'maxResults': 10,
//       'orderBy': 'startTime',
//     };
//     response = await gapi.client.calendar.events.list(request);
//   } catch (err) {
//     document.getElementById('content').innerText = err.message;
//     return;
//   }

//   const events = response.result.items;
//   if (!events || events.length == 0) {
//     document.getElementById('content').innerText = 'No events found.';
//     return;
//   }
//   // Flatten to string to display
//   const output = events.reduce(
//       (str, event) => `${str}${event.summary} (${event.start.dateTime || event.start.date})\n`,
//       'Events:\n');
//   document.getElementById('content').innerText = output;
// }

// Tasks part
let form = document.getElementById("form");
let textInput = document.getElementById("ntTittleInput");
let dateInput = document.getElementById("ntDateInput");
let textarea = document.getElementById("ntTextArea");
let msg = document.getElementById("ntMsg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("ntAdd");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

let formValidation = () => {
  if (textInput.value === "") {
    console.log("failure");
    msg.innerHTML = "Task cannot be blank";
  } else {
    console.log("success");
    msg.innerHTML = "";
    acceptData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();

    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
};

let data = [{}];

let acceptData = () => {
  data.push({
    text: textInput.value,
    date: dateInput.value,
    description: textarea.value,
  });

  localStorage.setItem("data", JSON.stringify(data));

  console.log(data);
  createTasks();
};

let createTasks = () => {
  tasks.innerHTML = "";
  data.map((x, y) => {
    return (tasks.innerHTML += `
    <div id=${y}>
          <span class="fw-bold">${x.text}</span>
          <span class="small text-secondary">${x.date}</span>
          <p>${x.description}</p>
  
          <span class="options">
            <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
            <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
          </span>
        </div>
    `);
  });

  resetForm();
};

let deleteTask = (e) => {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);
  
};

let editTask = (e) => {
  let selectedTask = e.parentElement.parentElement;

  textInput.value = selectedTask.children[0].innerHTML;
  dateInput.value = selectedTask.children[1].innerHTML;
  textarea.value = selectedTask.children[2].innerHTML;

  deleteTask(e);
};

let resetForm = () => {
  textInput.value = "";
  dateInput.value = "";
  textarea.value = "";
};

(() => {
  data = JSON.parse(localStorage.getItem("data")) || []
  console.log(data);
  createTasks();
})();