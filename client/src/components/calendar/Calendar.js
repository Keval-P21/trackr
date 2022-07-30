import React from 'react';

function Calendar() {
  const gapi = window.gapi;
  const CLIENT_ID = process.env.CLIENT_ID;
  const API_KEY = process.env.API_KEY;
  const DISCOVERY_DOCS =
    'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
  const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

  function addEvent() {
    gapi.load('client:auth2', () => {
      console.log('loaded client');

      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: [DISCOVERY_DOCS],
        scope: SCOPES,
      });

      gapi.client.load('calendar', 'v3', () => console.log('calendar loaded'));

      gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(() => {
          let event = {
            summary: 'Test Event', // or event name
            location: '', //where it would happen
            description: 'Really great refreshments',
            start: {
              dateTime: '2022-07-31T14:00:00.000Z',
              timeZone: 'Europe/London',
            },
            end: {
              dateTime: '2022-07-31T15:00:00.000Z',
              timeZone: 'Europe/London',
            },
            reminders: {
              useDefault: false,
              overrides: [{ method: 'popup', minutes: 20 }],
            },
          };

          let request = gapi.client.calendar.events.insert({
            calendarId: 'primary',
            resource: event,
          });

          request.execute((event) => {
            console.log(event);
            window.open(event.htmlLink);
          });
        });
    });
  }

  return (
    <>
      <div>Calendar</div>
      <button onClick={addEvent}>Add Event</button>
    </>
  );
}

export default Calendar;
