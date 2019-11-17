export const tokens = {"success":true,"access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlFqaEJNRGxDTlRSQlFUTkJRems1TXpNNE1URXpSRGxHUlVNd01URkVNREF6TVRJeE16ZEZSQSJ9.eyJodHRwOi8vc3RhZ2luZy1maXh0dXJlcy5iYXllcy5nZy91c2VyX21ldGFkYXRhIjp7ImZpcnN0X25hbWUiOiJMdXVrIiwibGFzdF9uYW1lIjoidmFuIEVnZXJhYXQiLCJnYW1lcnRhZyI6IiJ9LCJodHRwOi8vc3RhZ2luZy1maXh0dXJlcy5iYXllcy5nZy9hcHBfbWV0YWRhdGEiOnsiYXV0aG9yaXphdGlvbiI6eyJncm91cHMiOltdLCJyb2xlcyI6WyJNRFMgUHVibGljQVBJIFB1YmxpYyBQcm9kdWN0aW9uIl0sInBlcm1pc3Npb25zIjpbInB1YmxpYzptYXRjaDpyZWFkIiwicHVibGljOnRvdXJuYW1lbnQ6cmVhZCIsInB1YmxpYzp0aXRsZTpyZWFkIiwidGVkOnVzZXIiLCJ0ZWQ6cHVibGljOmxvb2t1cDpyZWFkIiwidGVkOnB1YmxpYzptYXRjaDpyZWFkIiwidGVkOnB1YmxpYzp0aXRsZTpyZWFkIiwidGVkOnB1YmxpYzp0b3VybmFtZW50OnJlYWQiLCJ0ZWQ6cHVibGljOnN0YWdlOnJlYWQiLCJ0ZWQ6cHVibGljIl19fSwibmlja25hbWUiOiJsLnZhbmVnZXJhYXQiLCJuYW1lIjoibC52YW5lZ2VyYWF0QGdtYWlsLmNvbSIsInBpY3R1cmUiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci81OTE2OTMyNTQ0YTI0Zjg4ODE0YWNjMDA3ZWVkMDMzNj9zPTQ4MCZyPXBnJmQ9aHR0cHMlM0ElMkYlMkZjZG4uYXV0aDAuY29tJTJGYXZhdGFycyUyRmwucG5nIiwidXBkYXRlZF9hdCI6IjIwMTktMTEtMTZUMjA6MTE6NTUuMjQ4WiIsImVtYWlsIjoibC52YW5lZ2VyYWF0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczovL2JheWVzLmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw1ZGM2ZWZiNmEzMjllMDBlMmE3ZmE4M2UiLCJhdWQiOiI5RDduMFBmVG9NcTdpVE1uNW1wZkRPSjR6TWFHU3o3UiIsImlhdCI6MTU3MzkzNTExNiwiZXhwIjoxNTczOTcxMTE2fQ.RH6-NkKGOy1PZvVezxuaMgA7VIXFIt_8Ab7LrXetXlKBLP3SPXneMLPX0JRK_5hDwOrJWnjzNfqIaOD6q4swzFHKs0li6Y8NgKbaJwvMTIucGh2q6zNg7yVteZh3r4-a0Hl2QOHDZ0fIoQhzDHOwQrlUYEZ9uW3aJYuFodtLOY-EYhJRUqqIt6fQv5cUbPHg-sqSzFT9VmZqUw4VlbEZYiU-JliSNy9AF7vgJM56vFV7y1UoNuhbRwTdiZpmIO6Q_3XEHOGzQQOsQ46iRDb_cq_DwVRWeEXAMlhelnqHuzc-WZm_TTjakJwDmiZQAtGflM0ZF5yw7VB7Fwz9ndezkg","refresh_token":"QhArJVByzSw95GPtmIweGScQonyxt7ud54xUnL-VlxBR1","expires_in":86400};

export const ENDPOINT = 'https://api.esportsdirectory.info/v1';

// authenticate('', '', (response) => {
//   console.log(JSON.stringify(response, null, 2));
// });

// get('title', response => {
//   console.log(JSON.stringify(response, null, 2));
// });

// const teams = matches.reduce((memo, match, index) => {
//   console.log(index);
//   match.teams.map(team => {
//     memo[team.id] = team;
//   });
//   return memo;
// }, {});

// console.log(JSON.stringify(Object.keys(teams).map(key => teams[key])));

// teams.map((team) => {
//   getImage(team.id, team.logo_icon);
// });

// async function getImage(id, url) {
//   const response = await fetch(url, { method: 'GET', headers: { Authorization: `Bearer ${tokens.access_token}` } });

//   const blob = await response.blob();

//   const reader = new FileReader();

//   reader.onloadend = () => {       
//       console.log(id, reader.result.length);  
//       window.logos = window.logos || {};
//       window.logos[id] = reader.result;
//   };

//   reader.readAsDataURL(blob); 
// }

export const authenticate = async (username, password, callback) => {
    const response = await fetch(`${ENDPOINT}/auth/`, {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' }
    });

    const newTokens = await response.json();

    Object.assign(tokens, newTokens);

    callback(newTokens);
};

export const get = async (type, callback, url, buffer) => {
    if(url) url = url.replace('http:', 'https:');

    const response = await fetch(url || `${ENDPOINT}/${type}/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tokens.access_token}`
        }
    });

    const { next, results } = await response.json();

    buffer = (buffer || []).concat(results);

    if(next) return get(type, callback, next, buffer);

    callback(buffer);
};
