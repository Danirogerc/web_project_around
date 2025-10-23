// Profile class: handles user profile display and updates
class Profile {
  constructor(selectors) {
    this._selectors = selectors;
    this._initElements();
    this._initEventListeners();
  }

  // Initialize profile with name and job
  initialize(name, job) {
    this.setUserInfo(name, job);
  }

  setEventListeners() {}

  // Update profile information
  setUserInfo(name, job) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
  }

  // Find and store DOM elements
  _initElements() {
    const {
      nameSelector,
      jobSelector,
      editButtonSelector,
      popupSelector,
      formSelector,
      closeButtonSelector,
    } = this._selectors;

    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._editButton = document.querySelector(editButtonSelector);
    this._popup = document.querySelector(popupSelector);
    this._form = document.querySelector(formSelector);
    this._closeButton = document.querySelector(closeButtonSelector);

    this._nameInput = this._form.querySelector(".popup__input-name");
    this._jobInput = this._form.querySelector(".popup__input-work");
  }

  // Set up event listeners
  _initEventListeners() {
    this._editButton.addEventListener("click", () => this._handleEditClick());
    this._closeButton.addEventListener("click", () => this._handleCloseClick());
    this._form.addEventListener("submit", (event) =>
      this._handleFormSubmit(event)
    );
  }

  // Handle edit button click
  _handleEditClick() {
    this._nameInput.value = this._nameElement.textContent;
    this._jobInput.value = this._jobElement.textContent;
    this._popup.classList.remove("popup_hidden");
  }

  // Handle close button click
  _handleCloseClick() {
    this._popup.classList.add("popup_hidden");
  }

  // Handle form submission
  _handleFormSubmit(event) {
    event.preventDefault();
    this.setUserInfo(this._nameInput.value, this._jobInput.value);
    this._popup.classList.add("popup_hidden");
  }
}

export { Profile };
