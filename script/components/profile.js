// Imports
// (None in this file)

// Class definition
// This line makes our Profile "recipe" (called a class) available to other parts of our program
export default class Profile {
  // Constructor
  // This special function, called a constructor, runs when we create a new Profile
  // It's like setting up a new profile for the first time
  constructor(selectors) {
    // We save the selectors (which are like addresses for finding things on our webpage)
    // The underscore (_) before the name is a way to say "this is private, don't touch from outside"
    this._selectors = selectors;
    // We call two helper functions to set everything up
    this._initElements();
    this._initEventListeners();
  }

  // Public methods
  // This function sets up the profile with a name and job
  // It's public, so other parts of our program can use it
  initialize(name, job) {
    // We use another function we created to set the user info
    this.setUserInfo(name, job);
  }

  // This function updates the name and job shown on the webpage
  // It's also public so it can be used from outside this class
  setUserInfo(name, job) {
    // We change the text of our name and job elements to the new values
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
  }

  // Private methods
  // This function finds all the parts of our webpage we need to work with
  // It's private (starts with _) because only our Profile class needs to use it
  _initElements() {
    // We're unpacking our selectors object to get each selector string
    const {
      nameSelector,
      jobSelector,
      editButtonSelector,
      popupSelector,
      formSelector,
      closeButtonSelector,
    } = this._selectors;

    // For each part of our webpage, we find it and save it for later use
    // querySelector is a tool that finds things on our webpage
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._editButton = document.querySelector(editButtonSelector);
    this._popup = document.querySelector(popupSelector);
    this._form = document.querySelector(formSelector);
    this._closeButton = document.querySelector(closeButtonSelector);

    // We also find the input boxes inside our form
    this._nameInput = this._form.querySelector(".popup__input-name");
    this._jobInput = this._form.querySelector(".popup__input-work");
  }

  // This function sets up our webpage to listen for user actions
  // It's also private because it's just for setting things up
  _initEventListeners() {
    // When someone clicks the edit button, we'll open the popup
    this._editButton.addEventListener("click", () => this._openPopup());
    // When someone clicks the close button, we'll close the popup
    this._closeButton.addEventListener("click", () => this._closePopup());
    // When someone submits the form, we'll handle that too
    this._form.addEventListener("submit", (e) => this._handleFormSubmit(e));
  }

  // This function opens our popup and fills in the current info
  _openPopup() {
    // We put the current name and job into the input boxes
    this._nameInput.value = this._nameElement.textContent;
    this._jobInput.value = this._jobElement.textContent;
    // We make the popup visible by removing the 'hidden' label
    this._popup.classList.remove("popup_hidden");
  }

  // This function closes our popup
  _closePopup() {
    // We hide the popup by adding the 'hidden' label back
    this._popup.classList.add("popup_hidden");
  }

  // This function handles what happens when someone submits the form
  _handleFormSubmit(event) {
    // We prevent the form from doing its normal submit action
    // (which would refresh the page - we don't want that)
    event.preventDefault();
    // We update the profile info with what's in the input boxes
    this.setUserInfo(this._nameInput.value, this._jobInput.value);
    // Then we close the popup
    this._closePopup();
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
