const tokens = {
    access_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlFqaEJNRGxDTlRSQlFUTkJRems1TXpNNE1URXpSRGxHUlVNd01URkVNREF6TVRJeE16ZEZSQSJ9.eyJodHRwOi8vc3RhZ2luZy1maXh0dXJlcy5iYXllcy5nZy91c2VyX21ldGFkYXRhIjp7ImZpcnN0X25hbWUiOiJMdXVrIiwibGFzdF9uYW1lIjoidmFuIEVnZXJhYXQiLCJnYW1lcnRhZyI6IiJ9LCJodHRwOi8vc3RhZ2luZy1maXh0dXJlcy5iYXllcy5nZy9hcHBfbWV0YWRhdGEiOnsiYXV0aG9yaXphdGlvbiI6eyJncm91cHMiOltdLCJyb2xlcyI6WyJNRFMgUHVibGljQVBJIFB1YmxpYyBQcm9kdWN0aW9uIl0sInBlcm1pc3Npb25zIjpbInB1YmxpYzptYXRjaDpyZWFkIiwicHVibGljOnRvdXJuYW1lbnQ6cmVhZCIsInB1YmxpYzp0aXRsZTpyZWFkIiwidGVkOnVzZXIiLCJ0ZWQ6cHVibGljOmxvb2t1cDpyZWFkIiwidGVkOnB1YmxpYzptYXRjaDpyZWFkIiwidGVkOnB1YmxpYzp0aXRsZTpyZWFkIiwidGVkOnB1YmxpYzp0b3VybmFtZW50OnJlYWQiLCJ0ZWQ6cHVibGljOnN0YWdlOnJlYWQiLCJ0ZWQ6cHVibGljIl19fSwibmlja25hbWUiOiJsLnZhbmVnZXJhYXQiLCJuYW1lIjoibC52YW5lZ2VyYWF0QGdtYWlsLmNvbSIsInBpY3R1cmUiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci81OTE2OTMyNTQ0YTI0Zjg4ODE0YWNjMDA3ZWVkMDMzNj9zPTQ4MCZyPXBnJmQ9aHR0cHMlM0ElMkYlMkZjZG4uYXV0aDAuY29tJTJGYXZhdGFycyUyRmwucG5nIiwidXBkYXRlZF9hdCI6IjIwMTktMTEtMTVUMTc6MDc6MTYuNTEwWiIsImVtYWlsIjoibC52YW5lZ2VyYWF0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczovL2JheWVzLmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw1ZGM2ZWZiNmEzMjllMDBlMmE3ZmE4M2UiLCJhdWQiOiI5RDduMFBmVG9NcTdpVE1uNW1wZkRPSjR6TWFHU3o3UiIsImlhdCI6MTU3MzgzNzYzOCwiZXhwIjoxNTczODczNjM4fQ.6DIsEQXHxddFkVAB4BoztuHElJV4tyiB01PrS9jZOdIyLPZttOB0Lx1XZ81XRymkR-16rGwhig0Ud-K5CXC0J0jczzvIFPuO7-9ZCatM2v5-PiirIuLnDx91IlWVaPLGXzgAQw6gmUYG4iJnISsuwzlQ4u5pqtK4U_eUspvuDTv7kt3LHmyLuzrH8wqkA6VL_0p49qQ-giveMxJgwgC0XIhfkLmAONaqm1JdBvpR7AHXyt47xP0-NiEvWOndSyObxqD7W2y_PpX9MNxNMO0ZA2J0Qs_V3YzdWGOiHZp_a9KMne6b8W2Fh1Q9CxJbIN3ddD_edEwrZZHVpjwUJT_D-A",
    expires_in: 86400,
    refresh_token: "PFLTq78ex8JYh00kLuWTsBtqjYA8iLeNekukR-ntbH6m4",
    success: true
};

const ENDPOINT = 'https://api.esportsdirectory.info/v1';

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
