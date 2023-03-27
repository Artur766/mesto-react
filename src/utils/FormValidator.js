export default class FormValidator {
  constructor(config, formSelector) {
    this._config = config;
    this._formSelector = formSelector;
    this._inputList = Array.from(this._formSelector.querySelectorAll(this._config.inputSelector));
    this._buttonElement = this._formSelector.querySelector(this._config.submitButtonSelector);
  }

  //добавляем ошибку
  _showInputError(inputElement) {
    //находим ошибки (инпуты)
    const errorElement = this._formSelector.querySelector(`.${inputElement.id}-error`);

    //добовляем спаны
    errorElement.classList.add(this._config.errorClass);
    //добавляем дефолтно-браузерный текст ошибки
    errorElement.textContent = inputElement.validationMessage;
    //добавляем инпуту красную обводку
    inputElement.classList.add(this._config.inputErrorClass);
  }

  //убираем ошибку
  _hideInputError(inputElement) {
    const errorElement = this._formSelector.querySelector(`.${inputElement.id}-error`);

    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = "";
    inputElement.classList.remove(this._config.inputErrorClass);
  }

  // функция проверяет есть ли у инпутов валидация
  _checkInputValidity(inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement);
    }
  }

  //проходимся по всем инпутам, для нахождения у каждого валидности
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  //блокирует кнопку
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disabledSubmitButton();
    } else {
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  //находим список инпутов у каждой формы и навешиваем обработчики на событие инпут
  _setEventListeners() {
    //навешиваем обработчики событий на инпуты
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      })
    })
  }

  enableValidation() {
    this._setEventListeners();
  }

  //метод очистки полей 
  resetInput() {
    //проходимся по каждому инпуту и навешиваем метод хайд и очищаем значения инпутов 
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    })

  }

  //метод для блокировки кнопки
  disabledSubmitButton() {
    this._buttonElement.classList.add(this._config.inactiveButtonClass);
    this._buttonElement.disabled = true;
  }
}