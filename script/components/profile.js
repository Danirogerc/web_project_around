import { openPopup, closePopup } from "../utilities/utils.js";

// Profile class: handles user profile display and updates
export default class Profile {
  // Set up the profile
  constructor(selectors) {
    this._selectors = selectors;
    this._initElements();
    this._initEventListeners();
  }

  // Initialize profile with name and job
  initialize(name, job) {
    this.setUserInfo(name, job);
  }

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
      this._handleFormSubmit(event),
    );
  }

  // Handle edit button click
  _handleEditClick() {
    this._nameInput.value = this._nameElement.textContent;
    this._jobInput.value = this._jobElement.textContent;
    openPopup(this._popup);
  }

  // Handle close button click
  _handleCloseClick() {
    closePopup(this._popup);
  }

  // Handle form submission
  _handleFormSubmit(event) {
    event.preventDefault();
    this.setUserInfo(this._nameInput.value, this._jobInput.value);
    closePopup(this._popup);
  }
}

// Constants
// (None in this file)

// DOM elements
// (None in this file)

// Functions
// (None outside the class in this file)

// Event listeners
// (None outside the class in this file)
