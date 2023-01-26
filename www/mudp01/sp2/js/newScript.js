//Loading spinner
const preBody = document.querySelector('body');
const preMain = document.querySelector('main')
const loader = document.createElement('div');
loader.setAttribute('class', 'loader');
preBody.append(loader);

loaderActive = (state, mainDisplay) => {
    if (state) {
        loader.style.display = 'flex';
        preBody.style.opacity = '0.2';
        loader.style.opacity = '1'
        preBody.style.userSelect = 'none';
        preBody.style.pointerEvents = 'none';
    }
    if (!state) {
        loader.style.display = 'none';
        preBody.style.opacity = '1';
        preBody.style.userSelect = 'text';
        preBody.style.pointerEvents = 'auto';
    }
    if (mainDisplay) {
        preMain.style.display = 'none';
    }
    if (!mainDisplay) {
        preMain.style.display = 'flex';
    }
}

loaderActive(true, true);

window.addEventListener('load', () => {
    const body = $('body');
    const main = $('main');
    /** --------------------------------------------------------------------------- LOG IN PROCESS ------------------------------------------------------------------- */
    hideContent = () => {
        $(main).css('opacity', '0.2');
        $(main).css('userSelect', 'none');
        $(main).css('pointerEvents', 'none')
    }
    hideContent();

    showContent = () => {
        $(main).css('opacity', '1');
        $(main).css('userSelect', 'text');
        $(main).css('pointerEvents', 'auto')
    }

    // Login process.
    let autoLogin = false;

    if (localStorage.getItem('accessToken') !== null) { autoLogin = true };

    createLogin = () => {
        const loginWindow = $('<div>');
        loginWindow.attr('id', 'loginWindow');
        loginWindow.attr('class', 'loginWindow');

        const loginIcon = $('<img>');
        loginIcon.attr('class', 'loginIcon');
        loginIcon.attr('src', 'img/login_icon.png');
        loginIcon.attr('width', '130px');
        loginIcon.attr('height', '130px');

        const loginText = $('<p>');
        loginText.attr('class', 'loginText');
        loginText.text('Přihlášení do Manažeru úkolů');

        const loginImg = $('<img>');
        loginImg.attr('class', 'loginImg');
        loginImg.attr('src', 'img/google_signin.png');
        loginImg.attr('width', '267.4px');
        loginImg.attr('height', '64.4px');
        loginImg.on('click', handleAuthClick);

        const loginRegister = $('<p>');
        loginRegister.attr('class', 'loginRegister');
        loginRegister.text('Založit účet Google');
        loginRegister.on('click', () => {
            window.open('https://accounts.google.com/signup/v2/webcreateaccount?flowName=GlifWebSignIn&flowEntry=SignUp', '_blank');
        })

        loginWindow.append(loginIcon);
        loginWindow.append(loginText);
        loginWindow.append(loginImg);
        loginWindow.append(loginRegister);
        body.append(loginWindow);
    }

    let tokenClient;
    let gapiInited = false;
    let gisInited = false;

    const CLIENT_ID = '629701758649-kai0b8etkre98ssnbqgd3e7ip6mp4tv2.apps.googleusercontent.com';
    const API_KEY = 'AIzaSyBn_rf9ZTCMTfsvOPzmF5-PTBD29hmVIEA';
    const DISCOVERY_DOC_CALENDAR = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
    const DISCOVERY_DOC_TASKS = 'https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest';
    const SCOPES = 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/tasks';

    // Callback after api.js is loaded.
    gapiLoaded = () => {
        gapi.load('client', initializeGapiClient);
    }

    // Callback after the API client is loaded. Loads the discovery doc to initialize the API.
    initializeGapiClient = async () => {
        await gapi.client.init({
            apiKey: API_KEY,
            discoveryDocs: [DISCOVERY_DOC_CALENDAR, DISCOVERY_DOC_TASKS],
        });
        gapiInited = true;
        maybeEnableButtons();
    }

    // Callback after Google Identity Services are loaded.
    gisLoaded = async () => {
        tokenClient = await google.accounts.oauth2.initTokenClient({
            client_id: CLIENT_ID,
            scope: SCOPES,
            callback: '', // defined later
        });
        gisInited = true;
        maybeEnableButtons();
    }

    maybeEnableButtons = async () => {
        if (gapiInited && gisInited) {
            if (!autoLogin) {
                createLogin();
                loaderActive(false, true);
            }
            if (autoLogin) {
                let accessToken = localStorage.getItem('accessToken');
                gapi.auth.setToken({
                    access_token: accessToken,
                    expires_in: 3600,
                    token_type: 'Bearer'
                });
                // try if sucessfully loginned
                try {
                    const resp = await gapi.client.calendar.events.list({ 'calendarId': 'primary' });
                    if (!(resp.status < 300)) {
                        gapi.auth.signOut();
                        localStorage.clear();
                        loaderActive(false, true);
                        createLogin();
                    } else {
                        fechEvents();
                        displayDays();
                        showContent();
                        loaderActive(false, false);
                    }
                } catch (error) {
                    gapi.auth.signOut();
                    localStorage.clear();
                    loaderActive(false, true);
                    createLogin();

                }
            }
        }
    }

    // Sign in the user upon button click.
    handleAuthClick = async () => {
        tokenClient.callback = async (resp) => {
            if (resp.error !== undefined) {
                throw (resp);
            }
            //logined displaying app content
            //initializeApplication();
            localStorage.setItem('accessToken', gapi.auth.getToken().access_token);
            fechEvents();
            displayDays();
            $('#loginWindow').remove();
            showContent();
            loaderActive(false, false);
        };
        if (gapi.client.getToken() === null) {
            // Prompt the user to select a Google Account and ask for consent to share their data when establishing a new session.
            tokenClient.requestAccessToken({ prompt: 'consent' });
        } else {
            // Skip display of account chooser and consent dialog for an existing session.
            tokenClient = await google.accounts.oauth2.initTokenClient({
                client_id: CLIENT_ID,
                scope: SCOPES,
                callback: () => {
                    localStorage.setItem('accessToken', gapi.auth.getToken().access_token);
                    fechEvents();
                    displayDays();
                    showContent();
                    loaderActive(false, false);
                    $('#loginWindow').remove();
                },
            });
            tokenClient.requestAccessToken({ prompt: '' });

        }
    }

    // Enables user interaction after all libraries are loaded.
    $('#gapi').ready(gapiLoaded);
    $('#gis').ready(gisLoaded);

    /** --------------------------------------------------------------------- END OF LOG IN PROCESS --------------------------------------------------------------- */
    /** ----------------------------------------------------------------------- LOG OUT PROCESS --------------------------------------------------------------- */
    const logOutImg = $('#logoutImg');
    let buttonCreated = false;
    logOutImg.on('click', () => {
        if (!buttonCreated) {
            createButton();
            buttonCreated = true;
        } else {
            $('#logOutButton').remove();
            buttonCreated = false
        }
    })

    //creates log out button and appends it on body
    createButton = () => {
        const logOutButton = $('<input>');
        logOutButton.attr('class', 'logOutButton');
        logOutButton.attr('id', 'logOutButton');
        logOutButton.attr('type', 'button');
        logOutButton.attr('value', 'Odhlásit se');
        logOutButton.on('click', () => {
            localStorage.clear();
            location.reload();
        })
        body.append(logOutButton)
    }

    /** ---------------------------------------------------------------------- END OF LOG OUT PROCESS --------------------------------------------------------------- */
    /** -------------------------------------------------------- ----------- DEFINING REQUEST METHODS --------------------------------------------------------------- */
    // Send request for returning all events durring inputed day
    getEvents = async (day) => {
        const request = {
            'calendarId': 'primary',
            'timeMin': `${date.val().slice(0, 4)}-${date.val().slice(5, 7)}-${dayPrefix(day)}${day}T00:00:00${timeZoneOperation()}${timeZonePrefix()}${(new Date().getTimezoneOffset() / 60).toString().slice(1, 3)}:00`,
            'timeMax': `${date.val().slice(0, 4)}-${date.val().slice(5, 7)}-${dayPrefix(day)}${day}T23:59:59${timeZoneOperation()}${timeZonePrefix()}${(new Date().getTimezoneOffset() / 60).toString().slice(1, 3)}:00`,
            'showDeleted': false,
        }
        const response = await gapi.client.calendar.events.list(request);
        return response;

    }

    createNewEvent = async () => {
        const pinn = () => { if ($('#pinnedInput').attr('checked') === 'checked') { return 'public' } else { return 'private' } }
        await gapi.client.calendar.events.insert({
            'calendarId': 'primary',
            'resource': {
                'summary': $('#nameInput').val(),
                'start': {
                    'dateTime': `${$('#startInput').val()}:00${timeZoneOperation()}${timeZonePrefix()}${(new Date().getTimezoneOffset() / 60).toString().slice(1, 3)}:00`,
                    'timeZone': 'Europe/Prague', // yes its wrong, maybe do it right way after
                },
                'end': {
                    'dateTime': `${$('#endInput').val()}:00${timeZoneOperation()}${timeZonePrefix()}${(new Date().getTimezoneOffset() / 60).toString().slice(1, 3)}:00`,
                    'timeZone': 'Europe/Prague', // yes its wrong, maybe do it right way after
                },
                'source': {
                    'title': `${$('#priorityInput').val()}`,
                    'url': window.location.href
                },
                'description': `${$('#descriptionInput').val()}`,
                'visibility': pinn()
            }
        });
    }

    deleteEvent = async (eventId) => {
        await gapi.client.calendar.events.delete({
            'calendarId': 'primary',
            'eventId': eventId
        })
    }

    updateEvent = async (eventId) => {
        const pinn = () => { if ($('#pinnedInput').attr('checked') === 'checked') { return 'public' } else { return 'private' } }
        await gapi.client.calendar.events.update({
            'calendarId': 'primary',
            'eventId': eventId,
            'summary': $('#nameInput').val(),
            'start': { 'dateTime': `${$('#startInput').val()}:00${timeZoneOperation()}${timeZonePrefix()}${(new Date().getTimezoneOffset() / 60).toString().slice(1, 3)}:00` },
            'end': { 'dateTime': `${$('#endInput').val()}:00${timeZoneOperation()}${timeZonePrefix()}${(new Date().getTimezoneOffset() / 60).toString().slice(1, 3)}:00` },
            'source': {
                'title': `${$('#priorityInput').val()}`,
                'url': window.location.href
            },
            'description': `${$('#descriptionInput').val()}`,
            'visibility': pinn()
        });
    }

    /* ------------------------------------------------------ ---------- END OF REQUEST METHODS DEFINITION--------------------------------------------------------------- */
    /* --------------------------------------------------------------------- CREATING DAYS IN CALENDAR--------------------------------------------------------------- */
    // Set present month and year
    const date = $('#date');
    monthPrefix = () => { if (new Date().getMonth() < 10) { return 0 } else { return '' } };
    date.attr('value', `${new Date().getFullYear()}-${(monthPrefix())}${new Date().getMonth() + 1}`);
    date.on('change', () => {
        if (date.val() != '') {
            displayDays()
        }
    })

    const calendarBody = $('#divCalendarBody');
    // Create divs with days and its priority images and appends them to calendarBody    
    const displayDays = () => {
        let daysHolder = [];
        for (let i = 1; i <= `${new Date(`${date.val().slice(0, 4)}`, `${date.val().slice(5, 7)}`, 0).getDate()}`; i++) {
            const day = $('<div>');
            const dayNumber = $('<div>');
            dayNumber.text(`${i}.`)
            const dayPriority = $('<div>');
            dayPriority.attr('id', i);
            day.append(dayPriority);
            day.append(dayNumber);
            getPriorities(i);
            day.on('click', () => {
                getDayWindow(i);
            })
            daysHolder.push(day);
        }
        calendarBody.empty()
        daysHolder.forEach((day) => {
            calendarBody.append(day);
        })
    }

    /* --------------------------------------------------------------------- DEFINING DAY FUNCTIONS--------------------------------------------------------------- */
    // Returns inputed day in 2 digit format
    dayPrefix = (day) => { if (day < 10) { return 0 } else { return '' } };

    // Returns 0 if pc timezone is 1 digit number, or '' if 2 digit
    timeZonePrefix = () => { if (Math.abs(`${new Date().getTimezoneOffset() / 60}`) < 10) { return 0 } else { return '' } }

    // Returns + or - operator depending on pc timezone
    timeZoneOperation = () => { if (`${(new Date().getTimezoneOffset() / -60)}` < 0) { return '-' } else { return '+' } }

    // Apends images of priorities to parametered day
    getPriorities = async (day,notIncluded) => {
        //send request to api for optaining all events that occure that day
        const response = await getEvents(day);

        //go throught events in the day and count priorites
        let low = 0;
        let medium = 0;
        let high = 0;
        let no = 0;
        const imageDiv = $(`#${day}`);
        imageDiv.empty();
        response.result.items.forEach((event) => {
            let endLoop = false;
            try {
                if (notIncluded[0] !== 'undefined') {//if doesnt crash...
                    try {
                        if ($.inArray(event.source.title, notIncluded) === -1) {
                        } else {
                            endLoop = true;
                        }
                    } catch (error) {
                        if ($.inArray('no', notIncluded) === -1) {
                            endLoop = true;
                        }
                    }
                }
            } catch (error) {
                //sorting wasnt applied
            }
            if(!endLoop){
            try {
                if (event.source.title === 'nízká') {
                    low++;
                }
                else if (event.source.title === 'střední') {
                    medium++;
                }
                else if (event.source.title === 'vysoká') {
                    high++;
                } else {                    
                        no++;
                }
            } catch (error) {no++}

            //according to number of priorities append priority images and titles with number of type (if more then 1)
            const imageDiv = $(`#${day}`);
            imageDiv.empty();
            if (low > 0) {
                const lowImg = $('<img>');
                lowImg.attr('src', 'img/lowPriorityEvent.png');
                lowImg.attr('alt', 'image indicating low priority');
                imageDiv.append(lowImg);
                if (low > 1) {
                    lowImg.attr('title', `${low}x`);
                }
            }
            if (medium > 0) {
                const mediumImg = $('<img>');
                mediumImg.attr('src', 'img/mediumPriorityEvent.png');
                mediumImg.attr('alt', 'image indicating medium priority');
                imageDiv.append(mediumImg);
                if (medium > 1) {
                    mediumImg.attr('title', `${medium}x`);
                }
            }
            if (high > 0) {
                const highImg = $('<img>');
                highImg.attr('src', 'img/highPriorityEvent.png');
                highImg.attr('alt', 'image indicating high priority');
                imageDiv.append(highImg);
                if (high > 1) {
                    highImg.attr('title', `${high}x`);
                }
            }
            if (no > 0) {
                const noImg = $('<img>');
                noImg.attr('src', 'img/noPriorityEvent.png');
                noImg.attr('alt', 'image indicating no priority');
                imageDiv.append(noImg);
                if (noImg > 1) {
                    noImg.attr('title', `${noImg}x`);
                }
            }
    }})


    }

    // Display detailed window of inputed day  
    getDayWindow = async (day) => {
        // Send request to api for optaining all events that occure that day
        const response = await getEvents(day);

        // Create window and its basic structure
        const window = $('<div>');
        window.attr('class', 'eventDetailWindow');

        const close = $('<input>');
        close.attr('type', 'button');
        close.attr('value', 'X');
        close.attr('class', 'closeButton');
        close.on('click', () => { window.remove() })

        const newEvent = $('<input>');
        newEvent.attr('type', 'button');
        newEvent.attr('class', 'newEvent');
        newEvent.attr('value', 'Nový úkol');
        newEvent.on('click', () => { editEvent('create') })

        const title = $('<label>');
        title.attr('class', 'eventsTitle')
        title.text(`${day}.${date.val().slice(5, 7)}. ${date.val().slice(0, 4)}`)

        const eventsDiv = $('<div>');

        // for each event that occure create form with short information about it and edit button
        response.result.items.forEach((event) => {

            const eventForm = $('<form>');
            eventForm.attr('id', Math.random());

            const priorityImg = $('<img>');
            try {
                if (event.source.title === 'nízká') {
                    priorityImg.attr('src', 'img/lowPriorityEvent.png');
                    priorityImg.attr('alt', 'image indicating low priority');
                }
                else if (event.source.title === 'střední') {
                    priorityImg.attr('src', 'img/mediumPriorityEvent.png');
                    priorityImg.attr('alt', 'image indicating medium priority');
                }
                else if (event.source.title === 'vysoká') {
                    priorityImg.attr('src', 'img/highPriorityEvent.png');
                    priorityImg.attr('alt', 'image indicating high priority');
                } else {
                    priorityImg.attr('src', 'img/noPriorityEvent.png');
                    priorityImg.attr('alt', 'image indicating no priority');
                }
            } catch (error) {
                priorityImg.attr('src', 'img/noPriorityEvent.png')
                priorityImg.attr('alt', 'image indicating not set priority');
            }

            const nameLabel = $('<label>');
            nameLabel.text('Název:');

            const nameInput = $('<input>');
            nameInput.attr('type', 'text');
            nameInput.attr('readonly', true);
            if (event.summary === 'undefined') {
                nameInput.val('Úkol nemá název')
            } else {
                nameInput.val(event.summary);
            }

            const startLabel = $('<label>');
            startLabel.text('Začátek:');

            const startInput = $('<input>');
            startInput.attr('type', 'time');
            startInput.attr('readonly', true);
            try {
                startInput.attr('value', `${event.start.dateTime.slice(11, 16)}`);
            } catch {
                startInput.attr('value', `00:00`);
            }

            const endLabel = $('<label>');
            endLabel.text('Konec:');

            const endInput = $('<input>');
            endInput.attr('type', 'time');
            endInput.attr('readonly', true);
            try {
                endInput.attr('value', `${event.end.dateTime.slice(11, 16)}`);
            } catch {
                endInput.attr('value', `23:59`);
            }

            const edit = $('<input>');
            edit.attr('type', 'button');
            edit.attr('value', 'Upravit');
            edit.on('click', () => { editEvent(event) });

            eventForm.append(priorityImg);
            eventForm.append(nameLabel);
            eventForm.append(nameInput);
            eventForm.append(startLabel);
            eventForm.append(startInput);
            eventForm.append(endLabel);
            eventForm.append(endInput);
            eventForm.append(edit);
            eventsDiv.append(eventForm);
        })

        //append all elements, and then append whole window to body
        window.append(close);
        window.append(title);
        window.append(eventsDiv);
        window.append(newEvent);
        body.append(window);
    }

    /* ---------------------------------------------------------------- END OF DAY FUNCTIONS DEFINITION--------------------------------------------------------------- */
    /* -------------------------------------------------------------------- DEFINING EVENT FUNCTIONS----------------------------------------------------------------- */
    const pastTasks = $('#divTasksAfter');
    const futureTasks = $('#divTasksBefore');
    const pinnedTasks = $('#divPinnedTasks')

    // Display detailed window of inputed day, if event is true only display window for event creation
    editEvent = async (event) => {
        // create the structure of form and fill it
        const window = $('<div>');
        window.attr('class', 'eventDetailWindow');
        const form = $('<form>');
        form.attr('class', 'eventDetailedForm');

        const close = $('<input>');
        close.attr('type', 'button');
        close.attr('value', 'X');
        close.attr('class', 'closeButton');
        close.on('click', () => { window.remove() })


        const nameLabel = $('<label>');
        nameLabel.text('Název:');

        const nameInput = $('<input>');
        nameInput.attr('type', 'text');
        nameInput.attr('id', 'nameInput');
        if (event !== 'create') {
            if (event.summary === 'undefined') {
                nameInput.val('Úkol nemá název')
            } else {
                nameInput.val(event.summary);
            }
        }

        //returns date for dateTime format, used for start and end date inputs
        dayTimePrefix = () => {
            if ($('.eventsTitle').text().slice(0, 2)[1] === '.') {
                return `${$('.eventsTitle').text().slice(6)}-${$('.eventsTitle').text().slice(2, 4)}-0${$('.eventsTitle').text().slice(0, 2)[0]}`;
            } else {
                return `${$('.eventsTitle').text().slice(7)}-${$('.eventsTitle').text().slice(3, 5)}-${$('.eventsTitle').text().slice(0, 2)}`;
            }
        }

        const startLabel = $('<label>');
        startLabel.text('Začátek:');

        const startInput = $('<input>');
        startInput.attr('type', 'datetime-local');
        startInput.attr('id', 'startInput');
        if (event !== 'create') {
            try {
                startInput.attr('value', `${event.start.dateTime.slice(0, 16)}`);
            } catch {
                startInput.attr('value', `${event.start.date.slice(0, 16)}`);
            }
        } else {
            try {
                startInput.attr('value', `${dayTimePrefix()}T00:00`);
            } catch {
            }
        }

        const endLabel = $('<label>');
        endLabel.text('Konec:');

        const endInput = $('<input>');
        endInput.attr('type', 'datetime-local');
        endInput.attr('id', 'endInput');
        if (event !== 'create') {
            try {
                endInput.attr('value', `${event.end.dateTime.slice(0, 16)}`)
            } catch {
                endInput.attr('value', `${event.end.date.slice(0, 16)}`)
            }
        } else {
            try {
                endInput.attr('value', `${dayTimePrefix()}T23:59`);
            } catch {
            }
        }

        const priorityLabel = $('<label>');
        priorityLabel.text('Důležitost:');

        const priorityInput = $('<select>');
        priorityInput.attr('id', 'priorityInput');

        const optionDefault = $('<option>');
        optionDefault.attr('disabled', true);
        optionDefault.text('Vyberte důležitost:');
        priorityInput.append(optionDefault);

        const optionLow = $('<option>');
        optionLow.attr('value', 'nízká');
        optionLow.text('nízká');
        priorityInput.append(optionLow);

        const optionMedium = $('<option>');
        optionMedium.attr('value', 'střední');
        optionMedium.text('střední');
        priorityInput.append(optionMedium);

        const optionHigh = $('<option>');
        optionHigh.attr('value', 'vysoká');
        optionHigh.text('vysoká');
        priorityInput.append(optionHigh);

        const descriptionLabel = $('<label>');
        descriptionLabel.text('Popis:')

        const descriptionInput = $('<input>');
        descriptionInput.attr('type', 'text');
        descriptionInput.attr('id', 'descriptionInput');
        if (event !== 'create') {
            if (event.description != 'undefined') {
                descriptionInput.val(event.description);
            } else {
                descriptionInput.val('Úkol nemá popis');
            }
        }

        const pinnedLabel = $('<label>');
        pinnedLabel.text('Připnuté:')

        const pinnedInput = $('<input>');
        pinnedInput.attr('id', 'pinnedInput');
        pinnedInput.attr('type', 'checkbox');
        if (event !== 'create') {
            if (event.visibility === 'public') {
                pinnedInput.attr('checked', true)
            }
        }
        pinnedInput.on('click', () => { pinnedInput.attr('checked', !(pinnedInput.attr('checked'))) });

        if (event !== 'create') {
            try {
                if (event.source.title === 'nízká') {
                    optionLow.attr('selected', true);
                }
                if (event.source.title === 'střední') {
                    optionMedium.attr('selected', true);
                }
                if (event.source.title === 'vysoká') {
                    optionHigh.attr('selected', true);
                }
            } catch (error) {
                optionDefault.attr('selected', true);
            }
        } else { optionDefault.attr('selected', true); }

        warning = () => {
            const warningWindow = $('<div>');
            warningWindow.attr('class', 'warningWindow');
            const warningText = $('<p>');
            warningText.text('Špatná hodnota pro začátek nebo konec: Úkol nemůže končit dříve než začíná.');
            warningWindow.append(warningText);
            const warningButton = $('<input>');
            warningButton.attr('type', 'button');
            warningButton.on('click', () => { warningWindow.remove() });
            warningButton.attr('value', 'OK');
            warningWindow.append(warningButton);
            body.append(warningWindow);
        }

        //returns start or end days in valid format -> no 04 but 4 etc.
        validDay = (startOrEnd) => {
            if (startOrEnd === 'start') {
                if (startInput.attr('value')[8] === '0') {
                    return startInput.val().slice(9, 10);
                } else {
                    return startInput.val().slice(8, 10);
                }
            }
            if (startOrEnd === 'end') {
                if (endInput.attr('value')[8] === '0') {
                    return endInput.val().slice(9, 10);
                } else {
                    return endInput.val().slice(8, 10);
                }
            }
        }

        if (event !== 'create') {
            const updateButton = $('<input>');
            updateButton.attr('type', 'button')
            updateButton.attr('class', 'updateButton')
            updateButton.attr('value', 'Upravit úkol')
            updateButton.on('click', async () => {
                if (new Date(startInput.val()).getTime() > new Date(endInput.val()).getTime()) {
                    warning();
                }
                else {
                    loaderActive(true);
                    await updateEvent(event.id);
                    for (i = validDay('start'); i <= validDay('end'); i++) {
                        await getPriorities(i);
                    }
                    await fechEvents();
                    $('.eventDetailWindow').remove();
                    loaderActive(false);
                }
            })
            form.append(updateButton);

            const deleteButton = $('<input>');
            deleteButton.attr('type', 'button');
            deleteButton.attr('class', 'deleteButton');
            deleteButton.attr('value', 'Smazat úkol');
            deleteButton.on('click', async () => {
                loaderActive(true);
                await deleteEvent(event.id);
                for (i = validDay('start'); i <= validDay('end'); i++) {
                    await getPriorities(i);
                };
                await fechEvents();
                $('.eventDetailWindow').remove();
                loaderActive(false);
            });
            form.append(deleteButton);
        } else {
            const createButton = $('<input>');
            createButton.attr('type', 'button');
            createButton.attr('class', 'newEvent');
            createButton.attr('value', 'Vytvořit nový úkol');
            createButton.on('click', async () => {
                if (new Date(startInput.val()).getTime() > new Date(endInput.val()).getTime()) {
                    warning();
                }
                else {
                    loaderActive(true);
                    await createNewEvent();
                    for (i = validDay('start'); i <= validDay('end'); i++) {
                        await getPriorities(i);
                    }
                    await fechEvents();
                    $('.eventDetailWindow').remove();
                    loaderActive(false);
                }
            });
            form.append(createButton);
        }

        form.append(close);
        form.append(nameLabel);
        form.append(nameInput);
        form.append(startLabel);
        form.append(startInput);
        form.append(endLabel);
        form.append(endInput);
        form.append(priorityLabel);
        form.append(priorityInput);
        form.append(descriptionLabel);
        form.append(descriptionInput);
        form.append(pinnedLabel);
        form.append(pinnedInput);
        window.append(form);
        body.append(window)
    }
    // Fech past and future events within 1 year and put them into side divs
    fechEvents = async (notIncluded) => {
        //send request for all alltime events
        const response = await gapi.client.calendar.events.list({
            'calendarId': 'primary',
            'timeMin': `${new Date().getFullYear()}-01-01T00:00:00${timeZoneOperation()}${timeZonePrefix()}${(new Date().getTimezoneOffset() / 60).toString().slice(1, 3)}:00`,
            'timeMax': `${new Date().getFullYear()}-12-31T23:59:59${timeZoneOperation()}${timeZonePrefix()}${(new Date().getTimezoneOffset() / 60).toString().slice(1, 3)}:00`,
            'showDeleted': false,
        });
        let past = [];
        let future = [];
        let pinned = [];

        // create divs to be displayed on side and base od end time push them into array
        response.result.items.forEach((item) => {
            let endLoop = false;
            try {
                if (notIncluded[0] !== 'undefined') {//if doesnt crash...
                    try {
                        if ($.inArray(item.source.title, notIncluded) === -1) {
                        } else {
                            endLoop = true;
                        }
                    } catch (error) {
                        if ($.inArray('no', notIncluded) === -1) {
                            endLoop = true;
                        }
                    }
                }
            } catch (error) {
                //sorting wasnt applied
            }
            if(!endLoop){
            const event = $('<div>');
            event.attr('id', item.id);
            event.on('click', () => { editEvent(item) });

            const name = $('<div>');
            name.attr('class', 'divTasksName');
            if (item.summary !== 'undefined') {
                name.text(item.summary)
            } else {
                name.text('Úkol nemá název')
            }


            const priority = $('<div>');
            priority.attr('class', 'divTasksImg');
            const priorityImg = $('<img>');
            priority.append(priorityImg);
            try {
                if (item.source.title === 'nízká') {
                    priorityImg.attr('src', 'img/lowPriorityEvent.png')
                    priorityImg.attr('alt', 'image indicating low priority');

                }
                else if (item.source.title === 'střední') {
                    priorityImg.attr('src', 'img/mediumPriorityEvent.png')
                    priorityImg.attr('alt', 'image indicating middle priority');
                }
                else if (item.source.title === 'vysoká') {
                    priorityImg.attr('src', 'img/highPriorityEvent.png')
                    priorityImg.attr('alt', 'image indicating high priority');
                }
                else {
                    priorityImg.attr('src', 'img/noPriorityEvent.png')
                    priorityImg.attr('alt', 'image indicating no set priority');
                }
            } catch (error) {
                priorityImg.attr('src', 'img/noPriorityEvent.png')
                priorityImg.attr('alt', 'image indicating no set priority');
            }
            event.append(priority);
            event.append(name);

            try {
                if (item.visibility === 'public') {
                    const eventCopy = event.clone(true);
                    pinned.push(eventCopy);
                }

                if (new Date(item.end.dateTime.toString().slice(0, 19)).getTime() <= new Date().getTime()) {
                    const eventCopy = event.clone(true);
                    past.push(eventCopy)
                } else {
                    const eventCopy = event.clone(true);
                    future.push(eventCopy)
                }
            } catch {
                if (item.visibility === 'public') {
                    const eventCopy = event.clone(true);
                    pinned.push(eventCopy);
                }
                if (new Date(item.end.date.toString().slice(0, 19)).getTime() <= new Date().getTime()) {
                    const eventCopy = event.clone(true);
                    past.push(eventCopy)
                } else {
                    const eventCopy = event.clone(true);
                    future.push(eventCopy)
                }
            }
        }})
        pastTasks.empty();
        past.forEach((pastTask) => {
            pastTasks.append(pastTask);
        })
        futureTasks.empty();
        future.forEach((futureTask) => {
            futureTasks.append(futureTask);
        })
        pinnedTasks.empty();
        pinned.forEach((pin) => {
            pinnedTasks.append(pin);
        })
    }
    // Display sorting window, implements sortings by priorities
    (sort = () => {
        const sortWindow = $('<div>');
        sortWindow.attr('id', 'sortWindow');
        sortWindow.attr('class', 'sortWindow');
        sortWindow.css('display', 'none');

        $('#filters').on('click', () => { if(sortWindow.css('display')==='none'){sortWindow.css('display','flex')}else{sortWindow.css('display','none')} });

        const sortLowLabel = $('<input>');
        sortLowLabel.attr('type', 'label');
        sortLowLabel.attr('value', 'Nízká priorita');
        sortLowLabel.attr('readonly', '');
        const sortLowInput = $('<input>');
        sortLowInput.attr('type', 'checkbox');
        sortLowInput.attr('name', 'nízká');
        sortLowInput.attr('checked', true);
        sortLowInput.on('click', () => { if (sortLowInput.attr('checked') === 'checked') { sortLowInput.attr('checked', false) } else { sortLowInput.attr('checked', 'checked') } });
        sortWindow.append(sortLowLabel);
        sortWindow.append(sortLowInput);

        const sortMiddleLabel = $('<input>');
        sortMiddleLabel.attr('type', 'label');
        sortMiddleLabel.attr('value', 'Střední priorita');
        sortMiddleLabel.attr('readonly', '');
        const sortMiddleInput = $('<input>');
        sortMiddleInput.attr('type', 'checkbox');
        sortMiddleInput.attr('name', 'střední');
        sortMiddleInput.attr('checked', true);
        sortMiddleInput.on('click', () => { if (sortMiddleInput.attr('checked') === 'checked') { sortMiddleInput.attr('checked', false) } else { sortMiddleInput.attr('checked', 'checked') } });
        sortWindow.append(sortMiddleLabel);
        sortWindow.append(sortMiddleInput);

        const sortHignLabel = $('<input>');
        sortHignLabel.attr('type', 'label');
        sortHignLabel.attr('value', 'Vysoká priorita');
        sortHignLabel.attr('readonly', '');
        const sortHighInput = $('<input>');
        sortHighInput.attr('type', 'checkbox');
        sortHighInput.attr('name', 'vysoká');
        sortHighInput.attr('checked', true);
        sortHighInput.on('click', () => { if (sortHighInput.attr('checked') === 'checked') { sortHighInput.attr('checked', false) } else { sortHighInput.attr('checked', 'checked') } });
        sortWindow.append(sortHignLabel);
        sortWindow.append(sortHighInput);

        const sortNoLabel = $('<input>');
        sortNoLabel.attr('type', 'label');
        sortNoLabel.attr('value', 'Bez priority');
        sortNoLabel.attr('readonly', '');
        const sortNoInput = $('<input>');
        sortNoInput.attr('type', 'checkbox');
        sortNoInput.attr('name', 'null');
        sortNoInput.attr('checked', true);
        sortNoInput.on('click', () => { if (sortNoInput.attr('checked') === 'checked') { sortNoInput.attr('checked', false) } else { sortNoInput.attr('checked', 'checked') } });
        sortWindow.append(sortNoLabel);
        sortWindow.append(sortNoInput);

        const confirmSort = $('<input>');
        confirmSort.attr('type', 'button');
        confirmSort.attr('class', 'confirmSort');
        confirmSort.attr('value', 'Filtrovat');
        sortWindow.append(confirmSort);
        confirmSort.on('click', async () => {
            loaderActive(true);
            let notIncluded = [];
            $.each([sortLowInput, sortMiddleInput, sortHighInput,sortNoInput], (i, val) => {
                if (val.attr('checked') !== 'checked') {
                    notIncluded.push(val.attr('name'));
                }
            });
            await fechEvents(notIncluded);
            for(i=1;i<=`${new Date(`${date.val().slice(0, 4)}`, `${date.val().slice(5, 7)}`, 0).getDate()}`;i++){
                await getPriorities(i,notIncluded);
            }
            loaderActive(false);
        })
        body.append(sortWindow);
    })()
})