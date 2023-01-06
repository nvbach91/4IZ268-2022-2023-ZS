//Set to client ID and API key from the Developer Console
const CLIENT_ID = "352824278951-9t86o8a0ht3k14vo6ulog1qdq3vd91e1.apps.googleusercontent.com";
const API_KEY = "AIzaSyCXhH0yoK6oybI3oUJPsJ9luF_yQQC9auU";

// Discovery doc URL for APIs used by the quickstart
const DISCOVERY_DOC = "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest";

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = "https://www.googleapis.com/auth/drive";

let tokenClient;
let gapiInited = false;
let gisInited = false;
let driveReady = false;
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
    maybeEnableDrive();
}
/**
 * Callback after Google Identity Services are loaded.
 */
function gisLoaded() {
    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: "", // defined later
    });
    gisInited = true;
    maybeEnableDrive();
}
/**
 * Enables user interaction after all libraries are loaded.
 */
function maybeEnableDrive() {
    if (gapiInited && gisInited) {
        getAccessToken();
    }
}

function waitFor(conditionFunction) {

    const poll = resolve => {
        if (conditionFunction()) resolve();
        else setTimeout(_ => poll(resolve), 400);
    }

    return new Promise(poll);
}
async function waitUntilDriveReady(mode,fileId,filename,data) {
    await waitFor(_ => driveReady === true);
    return useDrive(mode,fileId,filename,data);
}
function callDrive(mode,fileId,filename,data) {
    waitUntilDriveReady(mode,fileId,filename,data);
}

function useDrive(mode,fileId,filename,data) {
    tokenClient.callback = async (resp) => {
        if (resp.error !== undefined) {
            throw (resp);
        }

        if (mode === "selectTest") {
            createTestList(await driveListFiles());

        }
        if (mode === "selectedTest") {
            createSelectedTest(await driveDownloadFile(fileId));
        }
        if (mode === "uploadTest") {
            fileCreateResult(driveCreateFile(filename, data));
        }
    };
    if (gapi.client.getToken() === null) {
        // Prompt the user to select a Google Account and ask for consent to share their data
        // when establishing a new session.
        // This should never happen.
        tokenClient.requestAccessToken({ prompt: "consent" });
    } else {
        // Skip display of account chooser and consent dialog for an existing session.
        tokenClient.requestAccessToken({ prompt: "" });
    }
}
function getAccessToken() {
    // from the oauth playground
    const refresh_token = "1//04L9pMcCGWHAzCgYIARAAGAQSNwF-L9Iru5FIEW2nYYIv3PVMw0sc2ty6yQxa0oTJbuB4jDREhsCBtpQQ0X7q-eUZU9REorn7Z3M";
    // from the API console
    const client_id = "352824278951-9t86o8a0ht3k14vo6ulog1qdq3vd91e1.apps.googleusercontent.com";
    // from the API console
    const client_secret = "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";
    // from https://developers.google.com/identity/protocols/OAuth2WebServer#offline
    const refresh_url = "https://www.googleapis.com/oauth2/v4/token";

    const post_body = `grant_type=refresh_token&client_id=${encodeURIComponent(client_id)}&client_secret=${encodeURIComponent(client_secret)}&refresh_token=${encodeURIComponent(refresh_token)}`;

    let refresh_request = {
        body: post_body,
        method: "POST",
        headers: new Headers({
            "Content-Type": "application/x-www-form-urlencoded"
        })
    }
    // post to the refresh endpoint, parse the json response and use the access token to call files.list
    fetch(refresh_url, refresh_request).then(response => {
        return (response.json());
    }).then(response_json => {
        let accessToken = response_json.access_token;
        gapi.client.setToken(accessToken);
        driveReady = true;
    });
}
//List all files in the sp2 folder
async function driveListFiles() {
    let response;
    try {
        const folderId = "1tai6c5lE5wy_XlCyUsuDKXEqxga5vuNC";
        response = await gapi.client.drive.files.list({
            "pageSize": 100,
            "fields": "files(id, name)",
            "q": "'" + folderId + "' in parents and trashed = false",
        });
    } catch (err) {
        document.getElementById("error").innerText = "ERROR:" + err.message;
        document.getElementById("error").hidden = false;
        return;
    }
    const files = response.result.files;
    if (!files || files.length == 0) {
        document.getElementById("error").innerText = "ERROR: No files found.";
        document.getElementById("error").hidden = false;
        return;
    }
    return files;
}
//Download file from drive using FileID
async function driveDownloadFile(fileId) {
    try {
        const file = await gapi.client.drive.files.get({
            fileId: fileId,
            alt: "media",
        });
        return file;
    } catch (err) {
        document.getElementById("error").innerText = "ERROR:" + err.message;
        document.getElementById("error").hidden = false;
        return;
    }
}
//Create text file on drive
var driveCreateFile = function (filename, data) {
    const folderId = "1tai6c5lE5wy_XlCyUsuDKXEqxga5vuNC";

    const boundary = "-------314159265358979323846";
    const delimiter = "\r\n--" + boundary + "\r\n";
    const close_delim = "\r\n--" + boundary + "--";

    const contentType = "text/plain";

    var metadata = {
        "name": filename,
        "mimeType": contentType,
        "parents": [folderId],
    };

    var multipartRequestBody =
        delimiter +
        "Content-Type: application/json\r\n\r\n" +
        JSON.stringify(metadata) +
        delimiter +
        "Content-Type: " + contentType + "\r\n\r\n" +
        data +
        close_delim;

    var request = gapi.client.request({
        "path": "/upload/drive/v3/files",
        "method": "POST",
        "params": { "uploadType": "multipart" },
        "headers": {
            "Content-Type": 'multipart/related; boundary="' + boundary + '"'
        },
        "body": multipartRequestBody
    });
    callback = false;
    request.execute(callback);
}
