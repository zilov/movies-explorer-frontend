import { API_CONFIG } from "./constants";

class MainApi {
  constructor(config) {
    this._url = config.mainApiUrl;
    this._headers = config.headers;
  }

  _checkResponse(res, job) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res);
  }
  
  getProfileInfo() {
    const job = 'Get user info'
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      credentials: 'include',
      headers: this._headers,
    }).then((res) => {return this._checkResponse(res, job)})
  }
  

  updateProfileInfo(name, email) {
    const job = 'Update user info'
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({name, email})
    }).then((res) => {return this._checkResponse(res, job)})
  }

  getMovies() {
    const job = 'Get saved movies list'
    return fetch(`${this._url}/movies`, {
      method: "GET",
      credentials: 'include',
      headers: this._headers,
    }).then((res) => {return this._checkResponse(res, job)})
  }

  saveMovie(movieInfo) {
    const job = 'Save movie to main API'
    return fetch(`${this._url}/movies`, {
      method: "POST",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(movieInfo)
    }).then((res) => {return this._checkResponse(res, job)})
  }

  deleteMovie(movieId) {
    const job = 'Save movie to main API'
    return fetch(`${this._url}/movies/:${movieId}`, {
      method: "DELETE",
      credentials: 'include',
      headers: this._headers,
    }).then((res) => {return this._checkResponse(res, job)})
  }
}

export default new MainApi(API_CONFIG);