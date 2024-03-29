export const apiConfig = {
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-60",
  headers: {
    "authorization": 'f5f41958-0d62-4bdb-b46a-d0e71e230b2c',
    'Content-Type': 'application/json'
  }
}

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};