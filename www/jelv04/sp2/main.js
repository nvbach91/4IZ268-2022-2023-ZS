(() => {

    const App = {};
    App.API_KEY = 'AIzaSyCk-SfdvJIBmuV4fJ3_SBy1wlWckQnOjak';
    App.CLIENT_ID = '323799687838-hpkneofj83rdv955etfbf44t8lfcduvs.apps.googleusercontent.com';
    App.spreadsheetID = '12HKIkmYmo_YaEyxZrn7A8PnEGqBeLWwT5OSHamLMfFI';
    App.DISCOVERY_DOCS = ['https://sheets.googleapis.com/$discovery/rest?version=v4'];
    App.SCOPES = 'https://www.googleapis.com/auth/spreadsheets';
    App.handleClientLoad = () => {
        gapi.load('client:auth2', App.initClient);
    };

    App.initClient = () => {
        gapi.client.init({
            apiKey: App.API_KEY,
            clientId: App.CLIENT_ID,
            discoveryDocs: App.DISCOVERY_DOCS,
            scope: App.SCOPES
        }).then(() => {
            gapi.auth2.getAuthInstance().isSignedIn.listen(App.updateSigninStatus);
            App.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
            App.authorizeButton.click(App.handleAuthClick);
            App.signoutButton.click(App.handleSignoutClick);
        }, (error) => {
            App.appendPre(JSON.stringify(error, null, 2));
        });
    };

    App.updateSigninStatus = (isSignedIn) => {
        if (isSignedIn) {
            App.authorizeButton.hide();
            App.signoutButton.show();
            App.listData();
        } else {
            App.authorizeButton.show();
            App.signoutButton.hide();
        }
    };

    App.handleAuthClick = (event) => {
        gapi.auth2.getAuthInstance().signIn();
    };

    App.handleSignoutClick = (event) => {
        gapi.auth2.getAuthInstance().signOut();
    };



    const bodyElement = document.querySelector('body');

    const answerList = document.createElement('ul');

    const answerForm = document.createElement('form');

    const answerInput = document.createElement('input');

    answerInput.setAttribute('name', 'name');
    answerInput.setAttribute('placeholder', 'Enter answer here!');
    answerInput.setAttribute('required', true);

    answerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const answer = answerInput.value;
    });

    const submitButton = document.createElement('button');
    submitButton.innerText = 'Confirm answer';
    answerForm.appendChild(answerInput);
    answerForm.appendChild(submitButton);
    bodyElement.appendChild(answerForm);
    bodyElement.appendChild(answerList);


})()