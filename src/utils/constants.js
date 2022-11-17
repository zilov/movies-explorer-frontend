export const API_CONFIG = {
    mainApiUrl: "http://localhost:3000",
    moviesApiUrl: "https://api.nomoreparties.co/beatfilm-movies",
    moviesImagesUrl: "https://api.nomoreparties.co",
    headers: {
      "Content-type": "application/json",
    },
  }

export const CARD_NUMBERS_ON_WIDTH = {
  1280: {add: 3, visible: 12},
  768: {add: 2, visible: 8},
  320: {add: 2, visible: 5}
}

export const SHORTS_DURATION = 40;

export const INPUTS_VALIDATION = {
  firstName: {
    required: "Обязательное поле",
    minLength: {
      value: 2,
      message: "Минимальная длина имени - 2 символа"
    },
    maxLength: {
      value: 30,
      message: "Максимальная длина имени - 30 символов"
    }
  },
  email: {
    required: "Обязательное поле",
    pattern: {
      value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: 'Невалидный e-mail',
    },
    maxLength: {
      value: '100',
      message: "Слишком длинный e-mail"
    },
  },
  password: {
    required: "Обязательное поле",
    minLength: {
      value: '8',
      message: "Минимальная длина пароля - 8 символов"
    }
  },
  search: {
    required: "Запрос не может быть пустым",
    maxLength: {
      value: "30",
      message: "Запрос не может быть длиннее 30 символов"
    }
  }
}