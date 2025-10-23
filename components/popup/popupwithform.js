import { Popup } from "./popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupElement.querySelector(".popup__form");
  }

  // Private method to collect data from all input fields
  _getInputValues() {
    const inputList = this._form.querySelectorAll(".popup__input");
    const formValues = {};

    inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });

    return formValues;
  }

  // Override parent's setEventListeners method
  setEventListeners() {
    super.setEventListeners(); // Call parent method first

    // Add form submit event listener
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  // Override parent's close method to reset form
  close() {
    super.close(); // Call parent method first
    this._form.reset(); // Reset the form
  }
}

export { PopupWithForm };
