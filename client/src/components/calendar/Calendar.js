import React from 'react';

function Calendar() {
  const gapi = window.gapi;
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const API_KEY = process.env.REACT_APP_API_KEY;
  const DISCOVERY_DOC =
    'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
  const SCOPES = 'https://www.googleapis.com/auth/calendar';

  function addEvent() {
    gapi.load('client:auth2', () => {
      console.log('loaded client');
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: [DISCOVERY_DOC],
        scope: SCOPES,
      });

      gapi.client.load('calendar', 'v3', () => console.log('calendar loaded'));

      gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(() => {
          var event = {
            summary: 'Test Event',
            location: '1 Kenton Road, Harrow',
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

          var request = gapi.client.calendar.events.insert({
            calendarId: 'primary',
            resource: event,
          });

          request.execute((event) => {
            console.log(event);
            window.open(event.htmlLink);
          });
          console.log('ended');
        });
    });
  }

  return (
    <>
      <div>Calendar</div>
      <div></div>

      <button onClick={addEvent}>Add Event</button>
    </>
  );
}

export default Calendar;

// "You have created a new client application that uses libraries for user authentication or authorization that will soon be deprecated. New clients must use the new libraries instead; existing clients must also migrate before these libraries are deprecated. See the [Migration Guide](https://developers.google.com/identity/gsi/web/guides/gis-migration) for more information."
