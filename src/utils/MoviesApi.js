import { apiConfig } from "./constants";

class MoviesApi {
  constructor(config) {
    this._moviesUrl = config.moviesApiUrl;
    this._mainUrl = config.mainApiUrl;
    this._headers = config.headers;
  }

  _checkResponse(res, job) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка в ${job}`)
  }
  
  getMovies() {
    const job = 'Get all movies from Beatfilms API'
    return fetch(`${this._moviesUrl}`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {return this._checkResponse(res, job)})
  }

  addMovieToFavorite(movieParams) {
    const job = 'Add movie to user favorites'
    return fetch(`${this._mainUrl}/movies`, {
      method: "POST",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(movieParams),
    }).then((res) => {return this._checkResponse(res, job)})
  }

  deleteMovieFromFavorite(id) {
    const job = 'Remove movie from user favorites'
    return fetch(`${this._mainUrl}/movies/${id}`, {
      method: "DELETE",
      credentials: 'include',
      headers: this._headers,
    }).then((res) => {return this._checkResponse(res, job)})
  }
  
}

export default new MoviesApi(apiConfig);