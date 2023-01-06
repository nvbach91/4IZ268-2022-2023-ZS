(() => {
  // disabling aplication till user is logined
  const appContent = document.querySelector('main');
  function hideContent() {
    appContent.style.opacity = '0.2';
    appContent.style.userSelect = 'none';
    appContent.style.pointerEvents = 'none';
  };
  hideContent();

  function showContent() {
    loginWindow.style.display = 'none';
    appContent.style.opacity = '1';
    appContent.style.userSelect = 'text';
    appContent.style.pointerEvents = 'auto';
  };

  let autoLogin = localStorage.getItem('autoLogin');
  if (autoLogin === null) { autoLogin = false };
  let tokenClient;
  const body = document.querySelector('body');

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
  if (!localStorage.getItem('autoLogin')) { body.appendChild(loginWindow); }

  //Authentication and Authorization process
  const CLIENT_ID = '629701758649-kai0b8etkre98ssnbqgd3e7ip6mp4tv2.apps.googleusercontent.com';
  const API_KEY = 'AIzaSyBn_rf9ZTCMTfsvOPzmF5-PTBD29hmVIEA';
  const DISCOVERY_DOC_CALENDAR = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
  const DISCOVERY_DOC_TASKS = 'https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest';
  const SCOPES = 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/tasks';

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
      loginImg.addEventListener('click', handleAuthClick);
      if (localStorage.getItem('autoLogin')) {
        loginUser();
      }
    }
  }

  document.querySelector('#gapi').onload = gapiLoaded;
  document.querySelector('#gis').onload = gisLoaded;

  //Loading data spinner
  const loader = document.createElement('div');
  loader.setAttribute('class', 'loader');
  body.appendChild(loader);

  function loaderActive(state) {
    if (state) {
      loader.style.display = 'flex';
      body.style.opacity = '0.2';
      loader.style.opacity = '1'
      body.style.userSelect = 'none';
      body.style.pointerEvents = 'none';
    }
    if (!state) {
      loader.style.display = 'none';
      body.style.opacity = '1';
      body.style.userSelect = 'text';
      body.style.pointerEvents = 'auto';
    }
  }

  /* Creating calendar */
  const calendarBody = document.querySelector('#divCalendarBody');
  const divTasksExpired = document.querySelector('#divTasksAfter');
  const divTasksBefore = document.querySelector('#divTasksBefore');
  const divPinned = document.querySelector('#divPinnedTasks');
  const dayWindowsElement = document.getElementsByClassName('dayWindow');
  /* Initializing variables according to system settings */
  let year = new Date().getFullYear();
  let month = 1 + new Date().getMonth();
  let daysInMonth;  //holds value of days(28-31) according to year and month

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const monthDisplay = document.querySelector('#month');
  const yearDisplay = document.querySelector('#year');
  yearDisplay.innerText = year;

  function setMonth() {
    monthDisplay.innerText = monthNames[month - 1];
  }
  setMonth();

  // click on month opens menu
  monthDisplay.addEventListener('click', () => {
    monthMenu.style.display = 'flex';
  })

  //click on year opens menu
  yearDisplay.addEventListener('click', () => {
    yearMenu.style.display = 'flex';
  })

  // creating menu for months
  const monthMenu = document.createElement('div');
  monthMenu.setAttribute('class', 'monthMenu');
  monthNames.forEach((monthName) => {
    const monthDiv = document.createElement('div');
    monthDiv.innerText = monthName;
    monthDiv.addEventListener('click', () => {
      month = monthNames.indexOf(monthDiv.innerText) + 1;
      getRequestMonth();
      getDaysInYear();
      setMonth();
      monthMenu.style.display = 'none';
      actualizeDisplay();
    });
    monthMenu.appendChild(monthDiv);
  })
  monthDisplay.parentElement.appendChild(monthMenu);

  // creating menu for years
  const yearMenu = document.createElement('div');
  yearMenu.setAttribute('class', 'yearMenu');
  // 5 years back to 10 year in future
  let yearsInMenu = year - 5;
  for (i = 0; i < 16; i++) {
    const yearDiv = document.createElement('div');
    yearDiv.innerText = yearsInMenu;
    yearMenu.appendChild(yearDiv);
    yearsInMenu++;
    yearDiv.addEventListener('click', () => {
      year = yearDiv.innerText;
      yearDisplay.innerText = year;
      getDaysInYear();
      yearMenu.style.display = 'none';
      actualizeDisplay();
    })
  }
  yearDisplay.parentElement.appendChild(yearMenu)

  //sets number of days in month variable to daysInMonth
  function getDaysInYear() {
    daysInMonth = new Date(year, month, 0).getDate();
  };
  getDaysInYear();

  let requestMonth;
  let requestTimeZone;

  //returns months in 2 digits format
  function getRequestMonth() {
    if (month < 10) {
      requestMonth = `0${month}`;
    } else {
      requestMonth = month;
    }
  }
  getRequestMonth()

  // returns system time zone, in format +- and 2 hour digits (+06, -12)
  function getTimeZone() {
    const timeZone = new Date().getTimezoneOffset() / 60;
    if (timeZone > 0) {
      if (timeZone < 10) {
        requestTimeZone = `+0${timeZone}`;
      } if (timeZone > 10) {
        requestTimeZone = `+${timeZone}`;
      }
    } if (timeZone < 0) {
      if (-1 * timeZone < 10) {
        requestTimeZone = `-0${-1 * timeZone}`;
      } if (-1 * timeZone > 10) {
        requestTimeZone = `${timeZone}`;
      }
    } else {
      requestTimeZone = '+00';
    }
  };
  getTimeZone();

  // returns array of events for inputed day
  async function getEvents(day) {
    // preparing inputed day into 2 digits format
    let requestDay;
    if (day < 10) {
      requestDay = `0${day}`
    } else {
      requestDay = day;
    }

    //sending GET request to calendar api for events during inputed day from 00:00 to 23:59
    try {
      const request = {
        'calendarId': 'primary',
        'timeMin': `${year}-${requestMonth}-${requestDay}T00:00:00${requestTimeZone}:00`,
        'timeMax': `${year}-${requestMonth}-${requestDay}T23:59:59${requestTimeZone}:00`,
        'showDeleted': false,
      };
      let response = await gapi.client.calendar.events.list(request);
      return response.result.items;
    } catch (error) {
      return console.error(error);;
    }
  }

  async function getDaysArray(filter1, filter2, filter3) {
    // holds instances of created days and their description windows
    const days = [];
    const dayWindows = [];
    const bodyTmp = document.createElement('div');

    // creating divs for days in month, writing inner text, setting alerts, creating details window, setting on click event for details
    for (i = 1; i <= daysInMonth; i++) {
      const day = document.createElement('div');
      day.setAttribute('class', 'days');
      const dayName = document.createElement('p');
      dayName.innerText = `${i}.`;
      day.appendChild(dayName);

      // Creating window with details
      const dayWindow = document.createElement('div');
      const dayWindowTitle = document.createElement('h2');
      dayWindowTitle.setAttribute('class', 'dayWindowTitle');
      dayWindowTitle.innerText = `Úkoly pro den ${i}. ${month}. ${year}`
      dayWindow.appendChild(dayWindowTitle);
      dayWindow.setAttribute('class', 'dayWindow');
      day.addEventListener('click', () => {
        dayWindow.style.display = 'flex';
        hideContent();
      })

      //creating close button for window
      const closeDayWindow = document.createElement('img');
      closeDayWindow.setAttribute('src', './img/closeButton.png');
      closeDayWindow.setAttribute('alt', 'image showing button that closes window with details');
      closeDayWindow.setAttribute('class', 'closeButton');
      closeDayWindow.addEventListener('click', () => {
        dayWindow.style.display = 'none';
        showContent();
      });
      dayWindow.appendChild(closeDayWindow);

      //create new Event button for window
      const newEventButton = document.createElement('button');
      newEventButton.setAttribute('class', 'newEventButton');
      newEventButton.innerText = 'Vytvořit nový úkol';
      newEventButton.addEventListener('click', () => {
        newEvent();
      })
      dayWindow.appendChild(newEventButton);

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
              try {
                if ([filter1, filter2, filter3].includes(response[i].source.title)) {

                }
                else {
                  try {
                    if (response[i].source.title == 'nízká') {
                      low++;
                    }
                    if (response[i].source.title == 'střední') {
                      medium++;
                    }
                    if (response[i].source.title == 'vysoká') {
                      high++;
                    }
                  } catch (error) {
                  }
                  //creating events in window
                  const event = document.createElement('div');
                  const eventName = document.createElement('div');
                  eventName.innerText = `Úkol: ${response[i].summary}`;
                  event.appendChild(eventName);
                  const eventDetail = document.createElement('div');
                  eventDetail.innerText = `Začátek: ${dateTimeToUser(response[i].start.dateTime)} Konec: ${dateTimeToUser(response[i].end.dateTime)}`;
                  event.appendChild(eventDetail);

                  dayWindow.appendChild(event);

                  //creating detailed window for particular event
                  const eventWindow = document.createElement('div');
                  eventWindow.setAttribute('class', 'eventWindow');
                  eventWindow.setAttribute('id', `${response[i].id}`);
                  const eventWindowTitle = document.createElement('h2');
                  eventWindowTitle.setAttribute('class', 'eventWindowTitle');
                  eventWindowTitle.innerText = `Úkol: ${response[i].summary}`;
                  eventWindow.appendChild(eventWindowTitle);
                  event.addEventListener('click', () => {
                    eventWindow.style.display = 'flex';
                  });
                  //its content
                  const eventWindowName = document.createElement('div');
                  const eventWindowNameLabel = document.createElement('label');
                  eventWindowNameLabel.innerText = 'Název:'
                  const eventWindowNameInput = document.createElement('input');
                  eventWindowNameInput.setAttribute('type', 'text');
                  eventWindowNameInput.setAttribute('value', `${response[i].summary}`);
                  eventWindowName.appendChild(eventWindowNameLabel);
                  eventWindowName.appendChild(eventWindowNameInput);

                  const eventWindowStart = document.createElement('div');
                  const eventWindowStartLabel = document.createElement('label');
                  eventWindowStartLabel.innerText = 'Začátek:'
                  const eventWindowStartInput = document.createElement('input');
                  eventWindowStartInput.setAttribute('type', 'text');
                  eventWindowStartInput.setAttribute('placeholder', 'dd.mm.yyyy-hh:mm');
                  eventWindowStartInput.setAttribute('value', dateTimeToUser(response[i].start.dateTime));
                  eventWindowStart.appendChild(eventWindowStartLabel);
                  eventWindowStart.appendChild(eventWindowStartInput);

                  const eventWindowEnd = document.createElement('div');
                  const eventWindowEndLabel = document.createElement('label');
                  eventWindowEndLabel.innerText = 'Konec:'
                  const eventWindowEndInput = document.createElement('input');
                  eventWindowEndInput.setAttribute('type', 'text');
                  eventWindowEndInput.setAttribute('placeholder', 'dd.mm.yyyy-hh:mm');
                  eventWindowEndInput.setAttribute('value', dateTimeToUser(response[i].end.dateTime));
                  eventWindowEnd.appendChild(eventWindowEndLabel);
                  eventWindowEnd.appendChild(eventWindowEndInput);

                  const eventWindowPriority = document.createElement('div');
                  const eventWindowPriorityLabel = document.createElement('label');
                  eventWindowPriorityLabel.innerText = 'Priorita:'
                  const eventWindowPriorityInput = document.createElement('input');
                  eventWindowPriorityInput.setAttribute('type', 'text');
                  eventWindowPriorityInput.setAttribute('placeholder', 'Hodnoty: nízká, střední, vysoká');
                  try { eventWindowPriorityInput.setAttribute('value', `${response[i].source.title}`); } catch (error) { }
                  eventWindowPriority.appendChild(eventWindowPriorityLabel);
                  eventWindowPriority.appendChild(eventWindowPriorityInput);

                  const eventWindowDescription = document.createElement('div');
                  const eventWindowDescriptionLabel = document.createElement('label');
                  eventWindowDescriptionLabel.innerText = 'Popis:'
                  const eventWindowDescriptionInput = document.createElement('input');
                  eventWindowDescriptionInput.setAttribute('type', 'textarea');
                  eventWindowDescriptionInput.setAttribute('value', `${response[i].description}`);
                  eventWindowDescription.appendChild(eventWindowDescriptionLabel);
                  eventWindowDescription.appendChild(eventWindowDescriptionInput);

                  const pinned = document.createElement('input');
                  pinned.setAttribute('class', 'pinned');
                  pinned.setAttribute('type', 'checkbox');
                  pinned.setAttribute('name', 'button');
                  let pinnedVisibility = 'private';
                  if (response[i].visibility === 'public') {
                    pinned.checked = true;
                    pinnedVisibility = 'public';
                  }
                  function isPinnedChecked() {
                    if (pinned.checked) {
                      pinnedVisibility = 'public';
                    } if (!pinned.checked) {
                      pinnedVisibility = 'private';
                    }
                  }

                  // creating error text label
                  const errorInput = document.createElement('label');
                  errorInput.setAttribute('class', errorInput);

                  //creating close 'button'
                  const closeEventWindow = document.createElement('img');
                  closeEventWindow.setAttribute('src', './img/closeButton.png');
                  closeEventWindow.setAttribute('alt', 'image showing button that closes window with particular event details');
                  closeEventWindow.setAttribute('class', 'closeButton');
                  closeEventWindow.addEventListener('click', () => {
                    eventWindow.style.display = 'none';
                    errorInput.innerText = '';
                  });

                  //creating delete event button
                  const deleteEventButton = document.createElement('button');
                  deleteEventButton.setAttribute('class', 'deleteEventButton');
                  deleteEventButton.innerText = 'Smazat úkol';
                  deleteEventButton.addEventListener('click', () => {
                    deleteEvent(deleteEventButton.parentElement.getAttribute('id'));
                    loaderActive(true);
                    setTimeout(actualizeDisplay, 500);
                    setTimeout(loaderActive, 500, false);
                    for (i = 0; i < dayWindowsElement.length; i++) {
                      dayWindowsElement[i].style.display = 'none';
                    }
                    deleteEventButton.parentElement.remove();
                    setTimeout(showContent, 500);
                  })

                  // updating event
                  async function updateEvent() {
                    await gapi.client.calendar.events.update({ 'calendarId': 'primary', 'eventId': eventWindow.getAttribute('id'), 'summary': eventWindowNameInput.value, 'start': { 'dateTime': userToDateTime(eventWindowStartInput.value) }, 'end': { 'dateTime': userToDateTime(eventWindowEndInput.value) }, 'source': { 'title': eventWindowPriorityInput.value, 'url': 'https://esotemp.vse.cz/~mudp01/sp2/' }, 'description': eventWindowDescriptionInput.value, 'visibility': pinnedVisibility });
                  }

                  //creating update button
                  const updateEventButton = document.createElement('button');
                  updateEventButton.setAttribute('class', 'updateEventButton');
                  updateEventButton.innerText = 'Upravit úkol';
                  updateEventButton.addEventListener('click', () => {
                    if (areDataValid(eventWindowStartInput.value, eventWindowEndInput.value, eventWindowPriorityInput.value) === 'OK') {
                      isPinnedChecked();
                      updateEvent();
                      updateEventButton.parentElement.style.display = 'none';
                      for (i = 0; i < dayWindowsElement.length; i++) {
                        dayWindowsElement[i].style.display = 'none';
                      }
                      loaderActive(true);
                      setTimeout(actualizeDisplay, 500);
                      setTimeout(loaderActive, 500, false);
                      setTimeout(showContent, 500);
                      errorInput.innerText = '';
                    } else {
                      errorInput.innerText = areDataValid(eventWindowStartInput.value, eventWindowEndInput.value, eventWindowPriorityInput.value);
                    }
                  });
                  eventWindow.appendChild(errorInput);
                  eventWindow.appendChild(deleteEventButton);
                  eventWindow.appendChild(updateEventButton);
                  eventWindow.appendChild(closeEventWindow);
                  eventWindow.appendChild(eventWindowName);
                  eventWindow.appendChild(eventWindowStart);
                  eventWindow.appendChild(eventWindowEnd);
                  eventWindow.appendChild(eventWindowPriority);
                  eventWindow.appendChild(eventWindowDescription);
                  eventWindow.appendChild(pinned);
                  bodyTmp.appendChild(eventWindow);
                }

                const lowPriorityImage = document.createElement('img');
                lowPriorityImage.setAttribute('src', './img/lowPriorityEvent.png');
                lowPriorityImage.setAttribute('alt', 'image alerting, that this day has low priority events');
                lowPriorityImage.setAttribute('class', 'priorityImg');

                const mediumPriorityImage = document.createElement('img');
                mediumPriorityImage.setAttribute('src', './img/mediumPriorityEvent.png');
                mediumPriorityImage.setAttribute('alt', 'image alerting, that this day has medium priority events');
                mediumPriorityImage.setAttribute('class', 'priorityImg');

                const highPriorityImage = document.createElement('img');
                highPriorityImage.setAttribute('src', './img/highPriorityEvent.png');
                highPriorityImage.setAttribute('alt', 'image alerting, that this day has high priority events');
                highPriorityImage.setAttribute('class', 'priorityImg');

                if (low != 0) {
                  if (low > 1) {
                    lowPriorityImage.setAttribute('title', `${low}x`);
                  }
                  day.appendChild(lowPriorityImage);
                  low -= 1;
                }
                if (medium != 0) {
                  if (medium > 1) {
                    mediumPriorityImage.setAttribute('title', `${medium}x`);
                  }
                  day.appendChild(mediumPriorityImage);
                  medium -= 1;
                }
                if (high != 0) {
                  if (high > 1) {
                    highPriorityImage.setAttribute('title', `${high}x`);
                  }
                  day.appendChild(highPriorityImage);
                  high -= 1;
                }
              } catch (error) { }
            }
          }
        });
      days[i - 1] = day;
      dayWindows[i - 1] = dayWindow;
    }

    //displaying all day div and windows and details
    days.forEach((day) => {
      calendarBody.appendChild(day);
    });
    dayWindows.forEach((dayWindow) => {
      body.appendChild(dayWindow);
    });
    body.appendChild(bodyTmp);
  }
  //sending insert into api 
  async function createNewEvent() {
    await gapi.client.calendar.events.insert({
      'calendarId': 'primary',
      'resource': {
        'summary': document.querySelector('#newEventNameInput').value,
        'start': {
          'dateTime': userToDateTime(document.querySelector('#newEventStartInput').value),
          'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        'end': {
          'dateTime': userToDateTime(document.querySelector('#newEventEndInput').value),
          'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        'source': {
          'title': document.querySelector('#newEventPriorityInput').value,
          'url': 'https://esotemp.vse.cz/~mudp01/sp2/'
        },
        'description': document.querySelector('#newEventDescriptionInput').value,
        'visibility': 'private'
      }
    });
  }

  // sending delete to api
  async function deleteEvent(eventId) {
    await gapi.client.calendar.events.delete({
      'calendarId': 'primary',
      'eventId': eventId
    })
  }

  //Create new Event
  function newEvent() {
    const newEventWindow = document.createElement('div');
    newEventWindow.setAttribute('class', 'newEventWindow')

    const newEventName = document.createElement('div');
    const newEventNameLabel = document.createElement('label');
    newEventNameLabel.innerText = 'Název:'
    const newEventNameInput = document.createElement('input');
    newEventNameInput.setAttribute('type', 'text');
    newEventNameInput.setAttribute('id', 'newEventNameInput');
    newEventName.appendChild(newEventNameLabel);
    newEventName.appendChild(newEventNameInput);

    const newEventStart = document.createElement('div');
    const newEventStartLabel = document.createElement('label');
    newEventStartLabel.innerText = 'Začátek:'
    const newEventStartInput = document.createElement('input');
    newEventStartInput.setAttribute('type', 'text');
    newEventStartInput.setAttribute('placeholder', 'dd.mm.yyyy-hh:mm');
    newEventStartInput.setAttribute('id', 'newEventStartInput');
    newEventStart.appendChild(newEventStartLabel);
    newEventStart.appendChild(newEventStartInput);

    const newEventEnd = document.createElement('div');
    const newEventEndLabel = document.createElement('label');
    newEventEndLabel.innerText = 'Konec:'
    const newEventEndInput = document.createElement('input');
    newEventEndInput.setAttribute('type', 'text');
    newEventEndInput.setAttribute('placeholder', 'dd.mm.yyyy-hh:mm');
    newEventEndInput.setAttribute('id', 'newEventEndInput');
    newEventEnd.appendChild(newEventEndLabel);
    newEventEnd.appendChild(newEventEndInput);

    const newEventPriority = document.createElement('div');
    const newEventPriorityLabel = document.createElement('label');
    newEventPriorityLabel.innerText = 'Priorita:'
    const newEventPriorityInput = document.createElement('input');
    newEventPriorityInput.setAttribute('type', 'text');
    newEventPriorityInput.setAttribute('placeholder', 'Hodnoty: nízká, střední, vysoká');
    newEventPriorityInput.setAttribute('id', 'newEventPriorityInput');
    newEventPriority.appendChild(newEventPriorityLabel);
    newEventPriority.appendChild(newEventPriorityInput);

    const newEventDescription = document.createElement('div');
    const newEventDescriptionLabel = document.createElement('label');
    newEventDescriptionLabel.innerText = 'Popis:'
    const newEventDescriptionInput = document.createElement('input');
    newEventDescriptionInput.setAttribute('type', 'textarea');
    newEventDescriptionInput.setAttribute('id', 'newEventDescriptionInput');
    newEventDescription.appendChild(newEventDescriptionLabel);
    newEventDescription.appendChild(newEventDescriptionInput);

    //creating close button for window
    const newEventWindowClose = document.createElement('img');
    newEventWindowClose.setAttribute('src', './img/closeButton.png');
    newEventWindowClose.setAttribute('alt', 'image showing button that closes window with new event');
    newEventWindowClose.setAttribute('class', 'closeButton');
    newEventWindowClose.addEventListener('click', () => {
      newEventWindowClose.parentElement.remove();
    });

    //creating label to print error messages
    const errorInput = document.createElement('label');
    errorInput.setAttribute('class', errorInput);

    //creating create button for window
    const newEventWindowCreate = document.createElement('button');
    newEventWindowCreate.innerText = 'Vytvořit úkol';
    newEventWindowCreate.setAttribute('class', 'newEventWindowCreate');
    newEventWindowCreate.addEventListener('click', () => {
      if (areDataValid(newEventStartInput.value, newEventEndInput.value, newEventPriorityInput.value) === 'OK') {
        createNewEvent();
        for (i = 0; i < dayWindowsElement.length; i++) {
          dayWindowsElement[i].style.display = 'none';
        }
        newEventWindowCreate.parentElement.remove();
        loaderActive(true);
        setTimeout(actualizeDisplay, 500);
        setTimeout(loaderActive, 500, false);
        setTimeout(showContent, 500);
      } else {
        errorInput.innerText = areDataValid(newEventStartInput.value, newEventEndInput.value, newEventPriorityInput.value);
      }
    })

    newEventWindow.appendChild(newEventName);
    newEventWindow.appendChild(newEventStart);
    newEventWindow.appendChild(newEventEnd);
    newEventWindow.appendChild(newEventPriority);
    newEventWindow.appendChild(newEventDescription);
    newEventWindow.appendChild(newEventWindowClose);
    newEventWindow.appendChild(newEventWindowCreate);
    newEventWindow.appendChild(errorInput);
    body.appendChild(newEventWindow);
  }

  function actualizeDisplay(filter1, filter2, filter3) {
    while (calendarBody.firstChild) {
      calendarBody.removeChild(calendarBody.firstChild)
    };
    getDaysArray(filter1, filter2, filter3);
    while (divTasksExpired.firstChild) {
      divTasksExpired.removeChild(divTasksExpired.firstChild)
    };
    displayExpiredTasks(filter1, filter2, filter3);
    while (divTasksBefore.firstChild) {
      divTasksBefore.removeChild(divTasksBefore.firstChild)
    };
    displayTasksBefore(filter1, filter2, filter3);
    while (divPinned.firstChild) {
      divPinned.removeChild(divPinned.firstChild)
    };
    displayPinned(filter1, filter2, filter3)
  }

  //transforms dateTime format into user handleable form
  function dateTimeToUser(dateTimeString) {
    const stringArray = dateTimeString.split('');
    //returns in format: dd.mm.yyyy-hh:mm
    return `${stringArray[8]}${stringArray[9]}.${stringArray[5]}${stringArray[6]}.${stringArray[0]}${stringArray[1]}${stringArray[2]}${stringArray[3]}-${stringArray[11]}${stringArray[12]}:${stringArray[14]}${stringArray[15]}`;
  }

  // transforms user input into dateTime format
  function userToDateTime(userString) {
    const stringArray = userString.split('');
    //returns in dateTyme
    return `${stringArray[6]}${stringArray[7]}${stringArray[8]}${stringArray[9]}-${stringArray[3]}${stringArray[4]}-${stringArray[0]}${stringArray[1]}T${stringArray[11]}${stringArray[12]}:${stringArray[14]}${stringArray[15]}:00${requestTimeZone}:00`;
  }

  //checks if dateTime and priority values are valid
  function areDataValid(dateTimeStart, dateTimeEnd, priorityValue) {
    let dateTimeCorrect = false;
    let doesntStartBeforeEnd = false;
    let priorityCorrect = false;
    const dateTimePattern = /^[0-3][0-9]\.[0-1][0-9]\.[2][0][0-4][0-9]\-[0-2][0-9]\:[0-5][0-9]$/
    if (dateTimePattern.test(dateTimeStart) && dateTimePattern.test(dateTimeEnd)) {
      dateTimeCorrect = true;
    }
    startYear = `${dateTimeStart.split('')[0]}${dateTimeStart.split('')[1]}${dateTimeStart.split('')[2]}${dateTimeStart.split('')[3]}`;
    endYear = `${dateTimeEnd.split('')[0]}${dateTimeEnd.split('')[1]}${dateTimeStart.split('')[2]}${dateTimeStart.split('')[3]}`;
    startMonth = `${dateTimeStart.split('')[5]}${dateTimeStart.split('')[6]}`;
    endMonth = `${dateTimeEnd.split('')[5]}${dateTimeEnd.split('')[6]}`;
    startDay = `${dateTimeStart.split('')[8]}${dateTimeStart.split('')[9]}`;
    endDay = `${dateTimeEnd.split('')[8]}${dateTimeEnd.split('')[9]}`;
    startHours = `${dateTimeStart.split('')[11]}${dateTimeStart.split('')[12]}`;
    startMinutes = `${dateTimeStart.split('')[15]}${dateTimeStart.split('')[16]}`;
    endHours = `${dateTimeEnd.split('')[11]}${dateTimeEnd.split('')[12]}`;
    endMinutes = `${dateTimeEnd.split('')[15]}${dateTimeEnd.split('')[16]}`;

    if (endYear > startYear) {
      doesntStartBeforeEnd = true;
    }
    if (endYear === startYear) {
      if (endMonth > startMonth) {
        doesntStartBeforeEnd = true;
      }
    }
    if (endYear === startYear && endMonth === startMonth) {
      if (endDay > startDay) {
        doesntStartBeforeEnd = true;
      }
    }
    if (endYear === startYear && endMonth === startMonth && endDay === startDay) {
      if (endHours > startHours) {
        doesntStartBeforeEnd = true;
      }
    }
    if (endYear === startYear && endMonth === startMonth && endDay === startDay && endHours === startHours) {
      if (endMinutes > startMinutes) {
        doesntStartBeforeEnd = true;
      }
    }

    if (['nízká', 'střední', 'vysoká'].includes(priorityValue)) {
      priorityCorrect = true;
    }

    if (!dateTimeCorrect) {
      return 'Špatný formát začátku nebo konce!';
    }
    if (!doesntStartBeforeEnd) {
      return 'Úkol končí dříve než začíná!';
    }
    if (!priorityCorrect) {
      return 'Povolené hodnoty jsou pouze: nízká, střední, vysoká!';
    }
    else {
      return 'OK';
    }
  }
  async function displayExpiredTasks(filter1, filter2, filter3) {
    function getTwoDigits(number) {
      if (number < 10) {
        return `0${number}`
      } else {
        return number;;
      }
    }
    async function sendRequest() {
      try {
        const request = {
          'calendarId': 'primary',
          'timeMin': `${new Date().getFullYear() - 1}-${getTwoDigits(new Date().getMonth() + 1)}-${getTwoDigits(new Date().getDate())}T${getTwoDigits(new Date().getHours())}:${getTwoDigits(new Date().getMinutes())}:${getTwoDigits(new Date().getSeconds())}${requestTimeZone}:00`,
          'timeMax': `${new Date().getFullYear()}-${getTwoDigits(new Date().getMonth() + 1)}-${getTwoDigits(new Date().getDate())}T${getTwoDigits(new Date().getHours())}:${getTwoDigits(new Date().getMinutes())}:${getTwoDigits(new Date().getSeconds())}${requestTimeZone}:00`,
          'showDeleted': false,
        };
        const response = await gapi.client.calendar.events.list(request);
        return response.result.items;
        //return response;
      } catch (error) {
        return console.error(error);
      }
    }
    const response = await sendRequest();
    const expiredTasks = document.createElement('div');
    const bodyTmp = document.createElement('div');
    response.forEach((item) => {
      if ([filter1, filter2, filter3].includes(item.source.title)) {

      }
      else {
        const expiredTask = document.createElement('div');
        const pDiv = document.createElement('div');
        const imgDiv = document.createElement('div');
        expiredTask.appendChild(pDiv);
        expiredTask.appendChild(imgDiv);
        pDiv.innerText = item.summary;
        try {
          if (item.source.title == 'nízká') {
            const lowPriorityImage = document.createElement('img');
            lowPriorityImage.setAttribute('src', './img/lowPriorityEvent.png');
            lowPriorityImage.setAttribute('alt', 'image alerting, that this day has low priority events');
            lowPriorityImage.setAttribute('class', 'priorityImg');
            imgDiv.appendChild(lowPriorityImage);
          }
          if (item.source.title == 'střední') {
            const mediumPriorityImage = document.createElement('img');
            mediumPriorityImage.setAttribute('src', './img/mediumPriorityEvent.png');
            mediumPriorityImage.setAttribute('alt', 'image alerting, that this day has medium priority events');
            mediumPriorityImage.setAttribute('class', 'priorityImg');
            imgDiv.appendChild(mediumPriorityImage);
          }
          if (item.source.title == 'vysoká') {
            const highPriorityImage = document.createElement('img');
            highPriorityImage.setAttribute('src', './img/highPriorityEvent.png');
            highPriorityImage.setAttribute('alt', 'image alerting, that this day has high priority events');
            highPriorityImage.setAttribute('class', 'priorityImg');
            imgDiv.appendChild(highPriorityImage);
          }
        } catch (error) { }
        expiredTasks.appendChild(expiredTask)


        //creating detailed window for particular task
        const eventWindow = document.createElement('div');
        eventWindow.setAttribute('class', 'eventWindow');
        eventWindow.setAttribute('id', `${item.id}`);
        const eventWindowTitle = document.createElement('h2');
        eventWindowTitle.setAttribute('class', 'eventWindowTitle');
        eventWindowTitle.innerText = `Úkol: ${item.summary}`;
        eventWindow.appendChild(eventWindowTitle);
        expiredTask.addEventListener('click', () => {
          eventWindow.style.display = 'flex';
          hideContent();
        });
        const eventWindowName = document.createElement('div');
        const eventWindowNameLabel = document.createElement('label');
        eventWindowNameLabel.innerText = 'Název:'
        const eventWindowNameInput = document.createElement('input');
        eventWindowNameInput.setAttribute('type', 'text');
        eventWindowNameInput.setAttribute('value', `${item.summary}`);
        eventWindowName.appendChild(eventWindowNameLabel);
        eventWindowName.appendChild(eventWindowNameInput);

        const eventWindowStart = document.createElement('div');
        const eventWindowStartLabel = document.createElement('label');
        eventWindowStartLabel.innerText = 'Začátek:'
        const eventWindowStartInput = document.createElement('input');
        eventWindowStartInput.setAttribute('type', 'text');
        eventWindowStartInput.setAttribute('placeholder', 'dd.mm.yyyy-hh:mm');
        eventWindowStartInput.setAttribute('value', dateTimeToUser(item.start.dateTime));
        eventWindowStart.appendChild(eventWindowStartLabel);
        eventWindowStart.appendChild(eventWindowStartInput);

        const eventWindowEnd = document.createElement('div');
        const eventWindowEndLabel = document.createElement('label');
        eventWindowEndLabel.innerText = 'Konec:'
        const eventWindowEndInput = document.createElement('input');
        eventWindowEndInput.setAttribute('type', 'text');
        eventWindowEndInput.setAttribute('placeholder', 'dd.mm.yyyy-hh:mm');
        eventWindowEndInput.setAttribute('value', dateTimeToUser(item.end.dateTime));
        eventWindowEnd.appendChild(eventWindowEndLabel);
        eventWindowEnd.appendChild(eventWindowEndInput);

        const eventWindowPriority = document.createElement('div');
        const eventWindowPriorityLabel = document.createElement('label');
        eventWindowPriorityLabel.innerText = 'Priorita:'
        const eventWindowPriorityInput = document.createElement('input');
        eventWindowPriorityInput.setAttribute('type', 'text');
        eventWindowPriorityInput.setAttribute('placeholder', 'Hodnoty: nízká, střední, vysoká');
        try { eventWindowPriorityInput.setAttribute('value', `${item.source.title}`); } catch (error) { }
        eventWindowPriority.appendChild(eventWindowPriorityLabel);
        eventWindowPriority.appendChild(eventWindowPriorityInput);

        const eventWindowDescription = document.createElement('div');
        const eventWindowDescriptionLabel = document.createElement('label');
        eventWindowDescriptionLabel.innerText = 'Popis:'
        const eventWindowDescriptionInput = document.createElement('input');
        eventWindowDescriptionInput.setAttribute('type', 'textarea');
        eventWindowDescriptionInput.setAttribute('value', `${item.description}`);
        eventWindowDescription.appendChild(eventWindowDescriptionLabel);
        eventWindowDescription.appendChild(eventWindowDescriptionInput);

        const pinned = document.createElement('input');
        pinned.setAttribute('class', 'pinned');
        pinned.setAttribute('type', 'checkbox');
        pinned.setAttribute('name', 'button');
        let pinnedVisibility = 'private';
        if (item.visibility === 'public') {
          pinned.checked = true;
          pinnedVisibility = 'public';
        }
        function isPinnedChecked() {
          if (pinned.checked) {
            pinnedVisibility = 'public';
          } if (!pinned.checked) {
            pinnedVisibility = 'private';
          }
        }

        // creating error text label
        const errorInput = document.createElement('label');
        errorInput.setAttribute('class', 'errorInput');

        //creating close 'button'
        const closeEventWindow = document.createElement('img');
        closeEventWindow.setAttribute('src', './img/closeButton.png');
        closeEventWindow.setAttribute('alt', 'image showing button that closes window with particular event details');
        closeEventWindow.setAttribute('class', 'closeButton');
        closeEventWindow.addEventListener('click', () => {
          eventWindow.style.display = 'none';
          errorInput.innerText = '';
          showContent();
        });

        //creating delete event button
        const deleteEventButton = document.createElement('button');
        deleteEventButton.setAttribute('class', 'deleteEventButton');
        deleteEventButton.innerText = 'Smazat úkol';
        deleteEventButton.addEventListener('click', () => {
          deleteEvent(deleteEventButton.parentElement.getAttribute('id'));
          loaderActive(true);
          setTimeout(actualizeDisplay, 500);
          setTimeout(loaderActive, 500, false);
          deleteEventButton.parentElement.remove();
          setTimeout(showContent, 500);
        })

        // updating event
        async function updateEvent() {
          await gapi.client.calendar.events.update({ 'calendarId': 'primary', 'eventId': eventWindow.getAttribute('id'), 'summary': eventWindowNameInput.value, 'start': { 'dateTime': userToDateTime(eventWindowStartInput.value) }, 'end': { 'dateTime': userToDateTime(eventWindowEndInput.value) }, 'source': { 'title': eventWindowPriorityInput.value, 'url': 'https://esotemp.vse.cz/~mudp01/sp2/' }, 'description': eventWindowDescriptionInput.value, 'visibility': pinnedVisibility });
        }

        //creating update button
        const updateEventButton = document.createElement('button');
        updateEventButton.setAttribute('class', 'updateEventButton');
        updateEventButton.innerText = 'Upravit úkol';
        updateEventButton.addEventListener('click', () => {
          if (areDataValid(eventWindowStartInput.value, eventWindowEndInput.value, eventWindowPriorityInput.value) === 'OK') {
            isPinnedChecked();
            updateEvent();
            updateEventButton.parentElement.style.display = 'none';
            loaderActive(true);
            setTimeout(actualizeDisplay, 500);
            setTimeout(loaderActive, 500, false);
            setTimeout(showContent, 500);
            errorInput.innerText = '';
          } else {
            errorInput.innerText = areDataValid(eventWindowStartInput.value, eventWindowEndInput.value, eventWindowPriorityInput.value);
          }

        });
        eventWindow.appendChild(errorInput);
        eventWindow.appendChild(deleteEventButton);
        eventWindow.appendChild(updateEventButton);
        eventWindow.appendChild(closeEventWindow);
        eventWindow.appendChild(eventWindowName);
        eventWindow.appendChild(eventWindowStart);
        eventWindow.appendChild(eventWindowEnd);
        eventWindow.appendChild(eventWindowPriority);
        eventWindow.appendChild(eventWindowDescription);
        eventWindow.appendChild(pinned);
        bodyTmp.appendChild(eventWindow);
      }
    })
    divTasksExpired.appendChild(expiredTasks);
    body.appendChild(bodyTmp);
  };


  async function displayTasksBefore(filter1, filter2, filter3) {
    function getTwoDigits(number) {
      if (number < 10) {
        return `0${number}`
      } else {
        return number;;
      }
    }
    async function sendRequest() {
      try {
        const request = {
          'calendarId': 'primary',
          'timeMin': `${new Date().getFullYear()}-${getTwoDigits(new Date().getMonth() + 1)}-${getTwoDigits(new Date().getDate())}T${getTwoDigits(new Date().getHours())}:${getTwoDigits(new Date().getMinutes())}:${getTwoDigits(new Date().getSeconds())}${requestTimeZone}:00`,
          'timeMax': `${new Date().getFullYear() + 1}-${getTwoDigits(new Date().getMonth() + 1)}-${getTwoDigits(new Date().getDate())}T${getTwoDigits(new Date().getHours())}:${getTwoDigits(new Date().getMinutes())}:${getTwoDigits(new Date().getSeconds())}${requestTimeZone}:00`,
          'showDeleted': false,
        };
        const response = await gapi.client.calendar.events.list(request);
        return response.result.items;
        //return response;
      } catch (error) {
        return console.error(error);
      }
    }
    const response = await sendRequest();
    const expiredTasks = document.createElement('div');
    const bodyTmp = document.createElement('div');
    response.forEach((item) => {
      if ([filter1, filter2, filter3].includes(item.source.title)) {

      }
      else {
        const expiredTask = document.createElement('div');
        const pDiv = document.createElement('div');
        const imgDiv = document.createElement('div');
        expiredTask.appendChild(pDiv);
        expiredTask.appendChild(imgDiv);
        pDiv.innerText = item.summary;
        try {
          if (item.source.title == 'nízká') {
            const lowPriorityImage = document.createElement('img');
            lowPriorityImage.setAttribute('src', './img/lowPriorityEvent.png');
            lowPriorityImage.setAttribute('alt', 'image alerting, that this day has low priority events');
            lowPriorityImage.setAttribute('class', 'priorityImg');
            imgDiv.appendChild(lowPriorityImage);
          }
          if (item.source.title == 'střední') {
            const mediumPriorityImage = document.createElement('img');
            mediumPriorityImage.setAttribute('src', './img/mediumPriorityEvent.png');
            mediumPriorityImage.setAttribute('alt', 'image alerting, that this day has medium priority events');
            mediumPriorityImage.setAttribute('class', 'priorityImg');
            imgDiv.appendChild(mediumPriorityImage);
          }
          if (item.source.title == 'vysoká') {
            const highPriorityImage = document.createElement('img');
            highPriorityImage.setAttribute('src', './img/highPriorityEvent.png');
            highPriorityImage.setAttribute('alt', 'image alerting, that this day has high priority events');
            highPriorityImage.setAttribute('class', 'priorityImg');
            imgDiv.appendChild(highPriorityImage);
          }
        } catch (error) { }
        expiredTasks.appendChild(expiredTask)


        //creating detailed window for particular task
        const eventWindow = document.createElement('div');
        eventWindow.setAttribute('class', 'eventWindow');
        eventWindow.setAttribute('id', `${item.id}`);
        const eventWindowTitle = document.createElement('h2');
        eventWindowTitle.setAttribute('class', 'eventWindowTitle');
        eventWindowTitle.innerText = `Úkol: ${item.summary}`;
        eventWindow.appendChild(eventWindowTitle);
        expiredTask.addEventListener('click', () => {
          eventWindow.style.display = 'flex';
          hideContent();
        });
        const eventWindowName = document.createElement('div');
        const eventWindowNameLabel = document.createElement('label');
        eventWindowNameLabel.innerText = 'Název:'
        const eventWindowNameInput = document.createElement('input');
        eventWindowNameInput.setAttribute('type', 'text');
        eventWindowNameInput.setAttribute('value', `${item.summary}`);
        eventWindowName.appendChild(eventWindowNameLabel);
        eventWindowName.appendChild(eventWindowNameInput);

        const eventWindowStart = document.createElement('div');
        const eventWindowStartLabel = document.createElement('label');
        eventWindowStartLabel.innerText = 'Začátek:'
        const eventWindowStartInput = document.createElement('input');
        eventWindowStartInput.setAttribute('type', 'text');
        eventWindowStartInput.setAttribute('placeholder', 'dd.mm.yyyy-hh:mm');
        eventWindowStartInput.setAttribute('value', dateTimeToUser(item.start.dateTime));
        eventWindowStart.appendChild(eventWindowStartLabel);
        eventWindowStart.appendChild(eventWindowStartInput);

        const eventWindowEnd = document.createElement('div');
        const eventWindowEndLabel = document.createElement('label');
        eventWindowEndLabel.innerText = 'Konec:'
        const eventWindowEndInput = document.createElement('input');
        eventWindowEndInput.setAttribute('type', 'text');
        eventWindowEndInput.setAttribute('placeholder', 'dd.mm.yyyy-hh:mm');
        eventWindowEndInput.setAttribute('value', dateTimeToUser(item.end.dateTime));
        eventWindowEnd.appendChild(eventWindowEndLabel);
        eventWindowEnd.appendChild(eventWindowEndInput);

        const eventWindowPriority = document.createElement('div');
        const eventWindowPriorityLabel = document.createElement('label');
        eventWindowPriorityLabel.innerText = 'Priorita:'
        const eventWindowPriorityInput = document.createElement('input');
        eventWindowPriorityInput.setAttribute('type', 'text');
        eventWindowPriorityInput.setAttribute('placeholder', 'Hodnoty: nízká, střední, vysoká');
        try { eventWindowPriorityInput.setAttribute('value', `${item.source.title}`); } catch (error) { }
        eventWindowPriority.appendChild(eventWindowPriorityLabel);
        eventWindowPriority.appendChild(eventWindowPriorityInput);

        const eventWindowDescription = document.createElement('div');
        const eventWindowDescriptionLabel = document.createElement('label');
        eventWindowDescriptionLabel.innerText = 'Popis:'
        const eventWindowDescriptionInput = document.createElement('input');
        eventWindowDescriptionInput.setAttribute('type', 'textarea');
        eventWindowDescriptionInput.setAttribute('value', `${item.description}`);
        eventWindowDescription.appendChild(eventWindowDescriptionLabel);
        eventWindowDescription.appendChild(eventWindowDescriptionInput);

        const pinned = document.createElement('input');
        pinned.setAttribute('class', 'pinned');
        pinned.setAttribute('type', 'checkbox');
        pinned.setAttribute('name', 'button');
        let pinnedVisibility = 'private';
        if (item.visibility === 'public') {
          pinned.checked = true;
          pinnedVisibility = 'public';
        }
        function isPinnedChecked() {
          if (pinned.checked) {
            pinnedVisibility = 'public';
          } if (!pinned.checked) {
            pinnedVisibility = 'private';
          }
        }

        // creating error text label
        const errorInput = document.createElement('label');
        errorInput.setAttribute('class', 'errorInput');

        //creating close 'button'
        const closeEventWindow = document.createElement('img');
        closeEventWindow.setAttribute('src', './img/closeButton.png');
        closeEventWindow.setAttribute('alt', 'image showing button that closes window with particular event details');
        closeEventWindow.setAttribute('class', 'closeButton');
        closeEventWindow.addEventListener('click', () => {
          eventWindow.style.display = 'none';
          errorInput.innerText = '';
          showContent();
        });

        //creating delete event button
        const deleteEventButton = document.createElement('button');
        deleteEventButton.setAttribute('class', 'deleteEventButton');
        deleteEventButton.innerText = 'Smazat úkol';
        deleteEventButton.addEventListener('click', () => {
          deleteEvent(deleteEventButton.parentElement.getAttribute('id'));
          loaderActive(true);
          setTimeout(actualizeDisplay, 500);
          setTimeout(loaderActive, 500, false);
          deleteEventButton.parentElement.remove();
          setTimeout(showContent, 500);
        })

        // updating event
        async function updateEvent() {
          await gapi.client.calendar.events.update({ 'calendarId': 'primary', 'eventId': eventWindow.getAttribute('id'), 'summary': eventWindowNameInput.value, 'start': { 'dateTime': userToDateTime(eventWindowStartInput.value) }, 'end': { 'dateTime': userToDateTime(eventWindowEndInput.value) }, 'source': { 'title': eventWindowPriorityInput.value, 'url': 'https://esotemp.vse.cz/~mudp01/sp2/' }, 'description': eventWindowDescriptionInput.value, 'visibility': pinnedVisibility });
        }

        //creating update button
        const updateEventButton = document.createElement('button');
        updateEventButton.setAttribute('class', 'updateEventButton');
        updateEventButton.innerText = 'Upravit úkol';
        updateEventButton.addEventListener('click', () => {
          if (areDataValid(eventWindowStartInput.value, eventWindowEndInput.value, eventWindowPriorityInput.value) === 'OK') {
            isPinnedChecked();
            updateEvent();
            updateEventButton.parentElement.style.display = 'none';
            loaderActive(true);
            setTimeout(actualizeDisplay, 500);
            setTimeout(loaderActive, 500, false);
            setTimeout(showContent, 500);
            errorInput.innerText = '';
          } else {
            errorInput.innerText = areDataValid(eventWindowStartInput.value, eventWindowEndInput.value, eventWindowPriorityInput.value);
          }

        });
        eventWindow.appendChild(errorInput);
        eventWindow.appendChild(deleteEventButton);
        eventWindow.appendChild(updateEventButton);
        eventWindow.appendChild(closeEventWindow);
        eventWindow.appendChild(eventWindowName);
        eventWindow.appendChild(eventWindowStart);
        eventWindow.appendChild(eventWindowEnd);
        eventWindow.appendChild(eventWindowPriority);
        eventWindow.appendChild(eventWindowDescription);
        eventWindow.appendChild(pinned);
        bodyTmp.appendChild(eventWindow);
      }
    })
    divTasksBefore.appendChild(expiredTasks);
    body.appendChild(bodyTmp);
  };

  //creating filter window
  const filterWindow = document.createElement('div');
  filterWindow.setAttribute('class', 'filterWindow');
  const filterLowLabel = document.createElement('label');
  filterLowLabel.innerText = 'Vypnout nízkou prioritu';
  const filterLowButton = document.createElement('input');
  filterLowButton.setAttribute('type', 'checkbox');
  filterLowButton.setAttribute('name', 'button');
  const filterMediumLabel = document.createElement('label');
  filterMediumLabel.innerText = 'Vypnout střední prioritu';
  const filterMediumButton = document.createElement('input');
  filterMediumButton.setAttribute('type', 'checkbox');
  filterMediumButton.setAttribute('name', 'button');
  const filterHighLabel = document.createElement('label');
  filterHighLabel.innerText = 'Vypnout vysokou prioritu';
  const filterHighButton = document.createElement('input');
  filterHighButton.setAttribute('type', 'checkbox');
  filterHighButton.setAttribute('name', 'button');
  const applyFilterButton = document.createElement('button');
  applyFilterButton.innerText = 'Filtrovat';
  applyFilterButton.setAttribute('class', 'applyFilterButton');
  applyFilterButton.addEventListener('click', () => {
    let filters = ['', '', '']
    if (filterLowButton.checked) {
      filters[0] = 'nízká';
    }
    if (filterMediumButton.checked) {
      filters[1] = 'střední';
    }
    if (filterHighButton.checked) {
      filters[2] = 'vysoká';
    }
    actualizeDisplay(filters[0], filters[1], filters[2]);
    filterWindow.style.display = 'none';
  })

  const closeEventWindow = document.createElement('img');
  closeEventWindow.setAttribute('src', './img/closeButton.png');
  closeEventWindow.setAttribute('alt', 'image showing button that closes window with filters');
  closeEventWindow.setAttribute('class', 'closeButton');
  closeEventWindow.addEventListener('click', () => {
    filterWindow.style.display = 'none';
  });

  filterWindow.appendChild(closeEventWindow);
  filterWindow.appendChild(filterLowLabel);
  filterWindow.appendChild(filterLowButton);
  filterWindow.appendChild(filterMediumLabel);
  filterWindow.appendChild(filterMediumButton);
  filterWindow.appendChild(filterHighLabel);
  filterWindow.appendChild(filterHighButton);
  filterWindow.appendChild(applyFilterButton);

  const filter = document.querySelector('#filters');
  filter.addEventListener('click', () => {
    filterWindow.style.display = 'flex';
  })
  document.querySelector('.divPinnedSorting').appendChild(filterWindow);


  // creating pinned tasks
  async function displayPinned(filter1, filter2, filter3) {
    function getTwoDigits(number) {
      if (number < 10) {
        return `0${number}`
      } else {
        return number;;
      }
    }
    async function sendRequest() {
      try {
        const request = {
          'calendarId': 'primary',
          'timeMin': `${new Date().getFullYear() - 5}-${getTwoDigits(new Date().getMonth() + 1)}-${getTwoDigits(new Date().getDate())}T${getTwoDigits(new Date().getHours())}:${getTwoDigits(new Date().getMinutes())}:${getTwoDigits(new Date().getSeconds())}${requestTimeZone}:00`,
          'timeMax': `${new Date().getFullYear() + 5}-${getTwoDigits(new Date().getMonth() + 1)}-${getTwoDigits(new Date().getDate())}T${getTwoDigits(new Date().getHours())}:${getTwoDigits(new Date().getMinutes())}:${getTwoDigits(new Date().getSeconds())}${requestTimeZone}:00`,
          'showDeleted': false,
        };
        const response = await gapi.client.calendar.events.list(request);
        return response.result.items;
        //return response;
      } catch (error) {
        return console.error(error);
      }
    }
    const response = await sendRequest();
    const pinnedTasks = document.createElement('div');
    const bodyTmp = document.createElement('div');
    response.forEach((item) => {
      try {
        if ([filter1, filter2, filter3].includes(item.source.title)) {

        }
        else if (item.visibility === 'public') {
          const pinnedTask = document.createElement('div');
          const pDiv = document.createElement('div');
          const imgDiv = document.createElement('div');
          pinnedTask.appendChild(pDiv);
          pinnedTask.appendChild(imgDiv);
          pDiv.innerText = item.summary;
          try {
            if (item.source.title == 'nízká') {
              const lowPriorityImage = document.createElement('img');
              lowPriorityImage.setAttribute('src', './img/lowPriorityEvent.png');
              lowPriorityImage.setAttribute('alt', 'image alerting, that this day has low priority events');
              lowPriorityImage.setAttribute('class', 'priorityImg');
              imgDiv.appendChild(lowPriorityImage);
            }
            if (item.source.title == 'střední') {
              const mediumPriorityImage = document.createElement('img');
              mediumPriorityImage.setAttribute('src', './img/mediumPriorityEvent.png');
              mediumPriorityImage.setAttribute('alt', 'image alerting, that this day has medium priority events');
              mediumPriorityImage.setAttribute('class', 'priorityImg');
              imgDiv.appendChild(mediumPriorityImage);
            }
            if (item.source.title == 'vysoká') {
              const highPriorityImage = document.createElement('img');
              highPriorityImage.setAttribute('src', './img/highPriorityEvent.png');
              highPriorityImage.setAttribute('alt', 'image alerting, that this day has high priority events');
              highPriorityImage.setAttribute('class', 'priorityImg');
              imgDiv.appendChild(highPriorityImage);
            }
          } catch (error) { }
          pinnedTasks.appendChild(pinnedTask)


          //creating detailed window for particular task
          const eventWindow = document.createElement('div');
          eventWindow.setAttribute('class', 'eventWindow');
          eventWindow.setAttribute('id', `${item.id}`);
          const eventWindowTitle = document.createElement('h2');
          eventWindowTitle.setAttribute('class', 'eventWindowTitle');
          eventWindowTitle.innerText = `Úkol: ${item.summary}`;
          eventWindow.appendChild(eventWindowTitle);
          pinnedTask.addEventListener('click', () => {
            eventWindow.style.display = 'flex';
            hideContent();
          });
          const eventWindowName = document.createElement('div');
          const eventWindowNameLabel = document.createElement('label');
          eventWindowNameLabel.innerText = 'Název:'
          const eventWindowNameInput = document.createElement('input');
          eventWindowNameInput.setAttribute('type', 'text');
          eventWindowNameInput.setAttribute('value', `${item.summary}`);
          eventWindowName.appendChild(eventWindowNameLabel);
          eventWindowName.appendChild(eventWindowNameInput);

          const eventWindowStart = document.createElement('div');
          const eventWindowStartLabel = document.createElement('label');
          eventWindowStartLabel.innerText = 'Začátek:'
          const eventWindowStartInput = document.createElement('input');
          eventWindowStartInput.setAttribute('type', 'text');
          eventWindowStartInput.setAttribute('placeholder', 'dd.mm.yyyy-hh:mm');
          eventWindowStartInput.setAttribute('value', dateTimeToUser(item.start.dateTime));
          eventWindowStart.appendChild(eventWindowStartLabel);
          eventWindowStart.appendChild(eventWindowStartInput);

          const eventWindowEnd = document.createElement('div');
          const eventWindowEndLabel = document.createElement('label');
          eventWindowEndLabel.innerText = 'Konec:'
          const eventWindowEndInput = document.createElement('input');
          eventWindowEndInput.setAttribute('type', 'text');
          eventWindowEndInput.setAttribute('placeholder', 'dd.mm.yyyy-hh:mm');
          eventWindowEndInput.setAttribute('value', dateTimeToUser(item.end.dateTime));
          eventWindowEnd.appendChild(eventWindowEndLabel);
          eventWindowEnd.appendChild(eventWindowEndInput);

          const eventWindowPriority = document.createElement('div');
          const eventWindowPriorityLabel = document.createElement('label');
          eventWindowPriorityLabel.innerText = 'Priorita:'
          const eventWindowPriorityInput = document.createElement('input');
          eventWindowPriorityInput.setAttribute('type', 'text');
          eventWindowPriorityInput.setAttribute('placeholder', 'Hodnoty: nízká, střední, vysoká');
          try { eventWindowPriorityInput.setAttribute('value', `${item.source.title}`); } catch (error) { }
          eventWindowPriority.appendChild(eventWindowPriorityLabel);
          eventWindowPriority.appendChild(eventWindowPriorityInput);

          const eventWindowDescription = document.createElement('div');
          const eventWindowDescriptionLabel = document.createElement('label');
          eventWindowDescriptionLabel.innerText = 'Popis:'
          const eventWindowDescriptionInput = document.createElement('input');
          eventWindowDescriptionInput.setAttribute('type', 'textarea');
          eventWindowDescriptionInput.setAttribute('value', `${item.description}`);
          eventWindowDescription.appendChild(eventWindowDescriptionLabel);
          eventWindowDescription.appendChild(eventWindowDescriptionInput);

          const pinned = document.createElement('input');
          pinned.setAttribute('class', 'pinned');
          pinned.setAttribute('type', 'checkbox');
          pinned.setAttribute('name', 'button');
          let pinnedVisibility = 'private';
          if (item.visibility === 'public') {
            pinned.checked = true;
            pinnedVisibility = 'public';
          }
          function isPinnedChecked() {
            if (pinned.checked) {
              pinnedVisibility = 'public';
            } if (!pinned.checked) {
              pinnedVisibility = 'private';
            }
          }

          // creating error text label
          const errorInput = document.createElement('label');
          errorInput.setAttribute('class', 'errorInput');

          //creating close 'button'
          const closeEventWindow = document.createElement('img');
          closeEventWindow.setAttribute('src', './img/closeButton.png');
          closeEventWindow.setAttribute('alt', 'image showing button that closes window with particular event details');
          closeEventWindow.setAttribute('class', 'closeButton');
          closeEventWindow.addEventListener('click', () => {
            eventWindow.style.display = 'none';
            errorInput.innerText = '';
            showContent();
          });

          //creating delete event button
          const deleteEventButton = document.createElement('button');
          deleteEventButton.setAttribute('class', 'deleteEventButton');
          deleteEventButton.innerText = 'Smazat úkol';
          deleteEventButton.addEventListener('click', () => {
            deleteEvent(deleteEventButton.parentElement.getAttribute('id'));
            loaderActive(true);
            setTimeout(actualizeDisplay, 500);
            setTimeout(loaderActive, 500, false);
            deleteEventButton.parentElement.remove();
            setTimeout(showContent, 500);
          })

          // updating event
          async function updateEvent() {
            await gapi.client.calendar.events.update({ 'calendarId': 'primary', 'eventId': eventWindow.getAttribute('id'), 'summary': eventWindowNameInput.value, 'start': { 'dateTime': userToDateTime(eventWindowStartInput.value) }, 'end': { 'dateTime': userToDateTime(eventWindowEndInput.value) }, 'source': { 'title': eventWindowPriorityInput.value, 'url': 'https://esotemp.vse.cz/~mudp01/sp2/' }, 'description': eventWindowDescriptionInput.value, 'visibility': pinnedVisibility });
          }

          //creating update button
          const updateEventButton = document.createElement('button');
          updateEventButton.setAttribute('class', 'updateEventButton');
          updateEventButton.innerText = 'Upravit úkol';
          updateEventButton.addEventListener('click', () => {
            if (areDataValid(eventWindowStartInput.value, eventWindowEndInput.value, eventWindowPriorityInput.value) === 'OK') {
              isPinnedChecked();
              updateEvent();
              updateEventButton.parentElement.style.display = 'none';
              loaderActive(true);
              setTimeout(actualizeDisplay, 500);
              setTimeout(loaderActive, 500, false);
              setTimeout(showContent, 500);
              errorInput.innerText = '';
            } else {
              errorInput.innerText = areDataValid(eventWindowStartInput.value, eventWindowEndInput.value, eventWindowPriorityInput.value);
            }

          });
          eventWindow.appendChild(errorInput);
          eventWindow.appendChild(deleteEventButton);
          eventWindow.appendChild(updateEventButton);
          eventWindow.appendChild(closeEventWindow);
          eventWindow.appendChild(eventWindowName);
          eventWindow.appendChild(eventWindowStart);
          eventWindow.appendChild(eventWindowEnd);
          eventWindow.appendChild(eventWindowPriority);
          eventWindow.appendChild(eventWindowDescription);
          eventWindow.appendChild(pinned);
          bodyTmp.appendChild(eventWindow);
        }
      } catch (error) { }
    })
    divPinned.appendChild(pinnedTasks);
    body.appendChild(bodyTmp);
  };




  // Initializing and loading data to application
  function initializeApplication() {
    getDaysArray();
    displayExpiredTasks();
    displayTasksBefore();
    displayPinned()
  }

  /**
   *  Sign in the user upon button click.
   */
  async function handleAuthClick() {
    tokenClient.callback = async (resp) => {
      if (resp.error !== undefined) {
        throw (resp);
      }
      //logined displaying functionality
      if (!autoLogin) {
        initializeApplication();
        showContent();
      }
    };
    if (gapi.client.getToken() === null) {
      // Prompt the user to select a Google Account and ask for consent to share their data
      // when establishing a new session.
      tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
      // Skip display of account chooser and consent dialog for an existing session.
      tokenClient = await google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: '', // defined later
      });
      tokenClient.requestAccessToken({ prompt: '' });
    }
  }
  function loginUser() {
    if (autoLogin) {
      tokenClient = JSON.parse(localStorage.getItem('tokenClient'));
      gapi.client.setToken({
        access_token: tokenClient,
        expires_in: 3600,
        token_type: 'Bearer'
      });
      handleAuthClick();
      setTimeout(initializeApplication, 2000);
      setTimeout(showContent, 2000);
    }
  }

  //Autologin button
  const autoLogginButton = document.createElement('button');
  autoLogginButton.setAttribute('class', 'autoLogginButton');
  function buttonCollor() {
    if (autoLogin) {
      autoLogginButton.style.backgroundColor = 'green';
    } else {
      autoLogginButton.style.backgroundColor = 'red';
    }
  };
  function deleteCookie(name) {
    setCookie(name, '', -1);
  }
  buttonCollor();
  autoLogginButton.innerText = 'Automatické přihlášení';
  autoLogginButton.addEventListener('click', () => {
    localStorage.setItem('tokenClient', JSON.stringify(tokenClient));
    if (!autoLogin) {
      localStorage.setItem('autoLogin', true);
      autoLogginButton.style.backgroundColor = 'green';
    } else {
      localStorage.setItem('autoLogin', false);
      autoLogginButton.style.backgroundColor = 'red';
    }
    autoLogin = !autoLogin;
    //deleteCookie('localhost');
  });
  body.appendChild(autoLogginButton);
  let buttonVisible = false;
  const settingsImg = document.querySelector('.divSettingsImg');
  settingsImg.addEventListener('click', () => {
    if (!buttonVisible) {
      autoLogginButton.style.display = 'flex';
    }
    if (buttonVisible) {
      autoLogginButton.style.display = 'none';
    }
    buttonVisible = !buttonVisible;
  });
})()