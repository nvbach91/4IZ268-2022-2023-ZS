// TODO(developer): Set to client ID and API key from the Developer Console

const CLIENT_ID = "945875647120-gks4s4t0u2lueni2urlpo5jfj8actc3q.apps.googleusercontent.com";

const API_KEY = "AIzaSyBRY8dNNbok3X5d7h1-vmoeLhzc2hOYok0";

const SPREADSHEET_ID = "1739_-NLyU9httypp0RS7JDGcuqfATJFF2WQ48_fDFR8";

// Discovery doc URL for APIs used by the quickstart

const DISCOVERY_DOC = "https://sheets.googleapis.com/$discovery/rest?version=v4";

// Authorization scopes required by the API; multiple scopes can be

// included, separated by spaces.

// Scopes for spreadsheets + profile
const SCOPES = "https://www.googleapis.com/auth/spreadsheets profile";

let tokenClient;

let tableData;

let userEmail = ''

let editingRow = -1;

let gapiInited = false;

let gisInited = false;

let numberOfRows = 0;

const spinner = document.getElementById("spinner");
const errMess = document.getElementById("errMess");
const write_button = document.getElementById("write_button");
const finish_edit_button = document.getElementById("finish_edit_button");
const authorize_button = document.getElementById("authorize_button");
const load_sheets = document.getElementById("load_sheets");

const nameInputElement = document.getElementById("nameInput");
const surnameInputElement = document.getElementById("surnameInput");
const yearInputElement = document.getElementById("yearInput");
const weightInputElement = document.getElementById("weightInput");
const heightInputElement = document.getElementById("heightInput");



write_button.onclick = () => handleWrite();
finish_edit_button.onclick = () => handleWrite();
load_sheets.onclick = () => load();
authorize_button.onclick = () => handleAuthClick();

showLastLogin();


authorize_button.style.visibility = "visible";


/**

       * Callback after api.js is loaded.

       */

function gapiLoaded() {
  gapi.load("client", initializeGapiClient);
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


  // Load oauth2 module
  await gapi.client.load('oauth2', 'v2');

  gapiInited = true;
}

/**
 * Callback after Google Identity Services are loaded.
 */
function gisLoaded() {

  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: (resp) => {
      console.log("RESP: ", resp)
    },
  });


  gisInited = true;
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick() {
  tokenClient.callback = async (resp) => {
    if (resp.error !== undefined) {
      throw resp;
    }
    authorize_button.style.visibility = "hidden";
    load_sheets.style.visibility = "hidden";

    gapi.client.oauth2.userinfo.get().execute(function (resp) {
      console.log("RESPONSE: ", resp)
      userEmail = resp.email;
    })

    load();
    lastApearance();
    showLastLogin();
  };

  if (gapi.client.getToken() === null) {
    // Prompt the user to select a Google Account and ask for consent to share their data
    // when establishing a new session.
    tokenClient.requestAccessToken({ prompt: "consent" });
  } else {
    // Skip display of account chooser and consent dialog for an existing session.
    tokenClient.requestAccessToken({ prompt: "" });
  }

}

function lastApearance() {
  localStorage.setItem('lastLogin', new Date().toLocaleString());
}

function showLastLogin() {
  document.getElementById("lastLogin").innerText = `Poslední přihlášení: ${localStorage.getItem('lastLogin')}`;
}



async function handleDelete(rowNumberToDelete) {
  try {
    const response = await gapi.client.sheets.spreadsheets.batchUpdate(
      {
        spreadsheetId: SPREADSHEET_ID,
      },
      {
        requests: [
          {
            deleteDimension: {
              range: {
                sheetId: 0,
                dimension: "ROWS",
                startIndex: rowNumberToDelete - 1,
                endIndex: rowNumberToDelete,
              },
            },
          },
        ],
      }
    );
    await load();

    alert(`DELETE OF ROW:${rowNumberToDelete} SUCCESSFUL`);

    console.log("delete response: ", response);
  } catch (err) {
    console.log("error when deleting row: ", err);
  }
}

function resetInputs(rowNumberToUpdate) {
  editingRow = rowNumberToUpdate;

  finish_edit_button.style.visibility = "visible";

  write_button.style.visibility = "hidden";

  nameInputElement.value = tableData[rowNumberToUpdate - 1][0];
  surnameInputElement.value = tableData[rowNumberToUpdate - 1][1];
  yearInputElement.value = tableData[rowNumberToUpdate - 1][2];
  weightInputElement.value = tableData[rowNumberToUpdate - 1][3];
  heightInputElement.value = tableData[rowNumberToUpdate - 1][4];
}

async function handleWrite(rowNumberToUpdate) {
  const name = nameInputElement.value;
  const surname = surnameInputElement.value;
  const year = yearInputElement.value;
  const weight = weightInputElement.value;
  const height = heightInputElement.value;
  const time = new Date().toLocaleString();
  const user = userEmail;

  try {
    const range = `DATA!A${editingRow !== -1 ? editingRow : numberOfRows + 1}:G${editingRow !== -1 ? editingRow : numberOfRows + 1
      }`;

    const response = await gapi.client.sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      valueInputOption: "USER_ENTERED",
      range,
      resource: {
        range,
        values: [[name, surname, year, weight, height, time, user]],
      },
    });
    console.log("write response: ", response);

    editingRow = -1;

    nameInputElement.value = "";
    surnameInputElement.value = "";
    yearInputElement.value = "";
    weightInputElement.value = "";
    heightInputElement.value = "";

    finish_edit_button.style.visibility = "hidden";
    write_button.style.visibility = "visible";

    load();
  } catch (err) {
    console.log("error when writing : ", err);

    errMess.innerText === err.message;

    return;
  }
}

async function load() {
  let response;

  spinner.style.visibility = "visible";

  finish_edit_button.style.visibility = "hidden";
  write_button.style.visibility = "visible";

  nameInputElement.value = "";
  surnameInputElement.value = "";
  yearInputElement.value = "";
  weightInputElement.value = "";
  heightInputElement.value = "";

  try {
    response = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "Data!A:E",
    });
  } catch (err) {
    console.log("error when fetching: ", err);
    errMess.innerText = err.message;

    spinner.style.visibility = "hidden";

    return;
  }

  const result = response.result;
  console.log("result: ", result);

  if (!result || !result.values || result.values.length == 0) {
    errMess.innerText = "No values found.";

    return;
  }

  numberOfRows = result.values.length;

  tableData = result.values;

  console.log(`${result.values.length} rows retrieved.`);

  const text = result.values
    .map(
      (row, idx) =>
        `<div class="dataRadek">${row
          .map((cell) => `<div class="dataZaznamy"  >${cell}</div>`)
          .join("")}<div calss="dataZaznamy2"><button id="editButton${idx + 1
        }" class="upr">Upravit</button><button id="deleteButton${idx + 1
        }" class="smz" id="radekCislo${idx + 1}" >Smazat</button></div></div>`
    )
    .join("\n");

  document.getElementById("table").innerHTML = text;

  spinner.style.visibility = "hidden";

  result.values.forEach((row, idx) => {
    document.getElementById(`deleteButton${idx + 1}`).onclick = () => handleDelete(idx + 1);
    document.getElementById(`editButton${idx + 1}`).onclick = () => resetInputs(idx + 1);
  });
}
