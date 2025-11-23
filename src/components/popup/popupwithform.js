import { Popup } from "./popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupElement.querySelector(".popup__form");
    // Select the submit button
    this._submitButton = this._form.querySelector(".popup__button");
    // Store original text to restore it later
    this._submitButtonText = this._submitButton.textContent;
  }

  _getInputValues() {
    const inputList = this._form.querySelectorAll(".popup__input");
    const formValues = {};

    inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });

    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  // New UX method: Toggle loading state
  renderLoading(isLoading, loadingText = "Guardando...") {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }
}

export { PopupWithForm };
