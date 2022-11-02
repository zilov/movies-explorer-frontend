const { apiConfig } = require("./constants");

const authUrl = apiConfig.mainApiUrl;

function checkResponse(res, job) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка в ${job}`)
}

export const registerRequest = (email, password, name) => {
  const job = 'register new user'
  return fetch(
    `${authUrl}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({email, password, name})
    }
  ).then((response) => {return checkResponse(response, job)})
}

export const loginRequest = (email, password) => {
  const job = 'login a user'
  return fetch(
    `${authUrl}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({email, password}),
    }
  ).then((response) => {return checkResponse(response, job)})
}

export const logoutRequest = () => {
  const job = 'logout'
  return fetch(
    `${authUrl}/signout`, {
      method: 'POST',
      credentials: 'include',
      headers: {"Content-Type": "application/json"},
    }
  ).then((response) => {return checkResponse(response, job)})
}

export const checkToken = (jwt) => {
  console.log(`Trying to check JWT: ${jwt}`)
  if (jwt) {
    return true;
  } else {
    return Promise.reject();
  }
}