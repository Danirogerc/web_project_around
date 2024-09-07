export default class Profile {
  constructor({
    nameSelector,
    jobSelector,
    editButtonSelector,
    popupSelector,
    formSelector,
    closeButtonSelector,
  }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._editButton = document.querySelector(editButtonSelector);
    this._popup = document.querySelector(popupSelector);
    this._form = document.querySelector(formSelector);
    this._closeButton = document.querySelector(closeButtonSelector);
    this._nameInput = this._form.querySelector(".popup__input-name");
    this._jobInput = this._form.querySelector(".popup__input-work");

    this.setEventListeners();
  }

  setEventListeners() {
    this._editButton.addEventListener("click", () => this._openPopup());
    this._closeButton.addEventListener("click", () => this._closePopup());
    this._form.addEventListener("submit", (e) => this._handleFormSubmit(e));
  }

  _openPopup() {
    this._nameInput.value = this._nameElement.textContent;
    this._jobInput.value = this._jobElement.textContent;
    this._popup.classList.remove("popup_hidden");
  }

  _closePopup() {
    this._popup.classList.add("popup_hidden");
  }

  _handleFormSubmit(event) {
    event.preventDefault();
    this.setUserInfo(this._nameInput.value, this._jobInput.value);
    this._closePopup();
  }

  setUserInfo(name, job) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
  }

  initialize(name, job) {
    this.setUserInfo(name, job);
  }
}
