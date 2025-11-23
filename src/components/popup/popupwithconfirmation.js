import { Popup } from "./popup.js";

class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popupElement.querySelector(".popup__form");
  }

  setAction(action) {
    this._handleFormSubmit = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (this._handleFormSubmit) {
        this._handleFormSubmit();
      }
    });
  }
}

export { PopupWithConfirmation };
