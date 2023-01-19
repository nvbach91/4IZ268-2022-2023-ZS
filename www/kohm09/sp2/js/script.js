// TODO(developer): Set to client ID and API key from the Developer Console

const CLIENT_ID = "945875647120-gks4s4t0u2lueni2urlpo5jfj8actc3q.apps.googleusercontent.com";

const API_KEY = "AIzaSyBRY8dNNbok3X5d7h1-vmoeLhzc2hOYok0";

const SPREADSHEET_ID = "1739_-NLyU9httypp0RS7JDGcuqfATJFF2WQ48_fDFR8";

// Discovery doc URL for APIs used by the quickstart

const DISCOVERY_DOC = "https://sheets.googleapis.com/$discovery/rest?version=v4";

// Authorization scopes required by the API; multiple scopes can be

// included, separated by spaces.

const SCOPES = "https://www.googleapis.com/auth/spreadsheets";

let tokenClient;

let tableData;

let editingRow = -1;

let gapiInited = false;

let gisInited = false;

let numberOfRows = 0;

document.getElementById("authorize_button").style.visibility = "visible";

document.getElementById("signout_button").style.visibility = "hidden";

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

  gapiInited = true;

}

/**
 * Callback after Google Identity Services are loaded.
 */
function gisLoaded() {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES, 
    callback: "", 
  });
  gisInited = true;

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

  document.getElementById("finish_edit_button").style.visibility = "visible";

  document.getElementById("jmenoInput").value = tableData[rowNumberToUpdate - 1][0];
  document.getElementById("prijmeniInput").value = tableData[rowNumberToUpdate - 1][1];
  document.getElementById("datumNarozeniInput").value = tableData[rowNumberToUpdate - 1][2];
  document.getElementById("vahaInput").value = tableData[rowNumberToUpdate - 1][3];
  document.getElementById("vyskaInput").value = tableData[rowNumberToUpdate - 1][4];
}

async function handleWrite(rowNumberToUpdate) {
  const jmeno = document.getElementById("jmenoInput").value;
  const prijmeni = document.getElementById("prijmeniInput").value;
  const datumNarozeni = document.getElementById("datumNarozeniInput").value;
  const vaha = document.getElementById("vahaInput").value;
  const vyska = document.getElementById("vyskaInput").value;

  try {
    const range = `DATA!A${editingRow !== -1 ? editingRow : numberOfRows + 1}:E${editingRow !== -1 ? editingRow : numberOfRows + 1
      }`;

    const response = await gapi.client.sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      valueInputOption: "USER_ENTERED",
      range,
      resource: {
        range,
        values: [[jmeno, prijmeni, datumNarozeni, vaha, vyska]],
      },
    });
    console.log("write response: ", response);

    editingRow = -1;


    document.getElementById("jmenoInput").value = "";
    document.getElementById("prijmeniInput").value = "";
    document.getElementById("datumNarozeniInput").value = "";
    document.getElementById("vahaInput").value = "";
    document.getElementById("vyskaInput").value = "";


    document.getElementById("finish_edit_button").style.visibility = "hidden";

    load();

  } catch (err) {
    console.log("error when writing : ", err);

    document.getElementById("content").innerText === err.message;

    return;
  }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick() {
  tokenClient.callback = async (resp) => {
    if (resp.error !== undefined) {
      throw resp;
    }
    document.getElementById("signout_button").style.visibility = "visible";
    // document.getElementById("authorize_button").innerText = "Refresh";
  };

  if (gapi.client.getToken() === null) {
    // Prompt the user to select a Google Account and ask for consent to share their data
    // when establishing a new session.
    tokenClient.requestAccessToken({ prompt: "consent" });
  } else {
    // Skip display of account chooser and consent dialog for an existing session.
    tokenClient.requestAccessToken({ prompt: "" });
  }
  load();
}


async function load() {
  let response;

  try {

    response = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "Data!A:E",
    });
  } catch (err) {
    console.log("error when fetching: ", err);
    document.getElementById("content").innerText = err.message;

    return;
  }

  const result = response.result;
  console.log("result: ", result);

  if (!result || !result.values || result.values.length == 0) {
    document.getElementById("content").innerText = "No values found.";

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
          .join(
            ""
          )}<div calss="dataZaznamy2"><button class="upr" onclick="resetInputs(${idx + 1
        })">Upravit</button><button class="smz" id="radekCislo${idx + 1}" onclick="handleDelete(${idx + 1
        })" >Smazat</button></div></div>`
    )
    .join("\n");

  document.getElementById("table").innerHTML = text;
}
