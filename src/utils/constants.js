export const apiConfig = {
    mainApiUrl: "http://localhost:3000",
    moviesApiUrl: "https://api.nomoreparties.co/beatfilm-movies",
    moviesImagesUrl: "https://api.nomoreparties.co",
    headers: {
      "Content-type": "application/json",
    },
  }

export const inputsValidation = {
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
  }
}