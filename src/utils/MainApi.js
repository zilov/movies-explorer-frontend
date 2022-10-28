import { apiConfig } from "./constants";

class MainApi {
  constructor(config) {
    this._url = config.mainApiUrl;
    this._headers = config.headers;
  }

  _checkResponse(res, job) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка в ${job}`)
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
}

export default new MainApi(apiConfig);