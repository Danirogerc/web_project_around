// Imports
// (None in this file)

// Class definition
// This class represents a card in our application
export default class Card {
  // Constructor
  // The constructor is called when we create a new Card
  // It takes three parameters: data (information about the card) and templateSelector (used to find the card template in HTML)
  constructor(data, templateSelector, handleDeleteCard) {
    // Store the card's name from the data
    this._name = data.name;
    // Store the card's image link from the data
    this._link = data.link;
    // Store the template selector for later use
    this._templateSelector = templateSelector;
    this._handleDeleteCard = handleDeleteCard;
  }

  // Private methods
  // This method gets the card template from the HTML
  _getTemplate() {
    // Find the template in the HTML using the stored selector
    const cardElement = document
      .querySelector(this._templateSelector)
      // Get the content of the template
      .content // Find the main element of the card within the template
      .querySelector(".element__element")
      // Create a copy of the template
      .cloneNode(true);

    // Return the copy of the template
    return cardElement;
  }

  // This method handles the like button functionality
  _toggleLike() {
    // Toggle the 'active' class on the like button
    // This will typically change its appearance to show it's been liked/unliked
    this._likeButton.classList.toggle("element__icono_active");
  }

  // This method sets up all the event listeners for the card
  _setEventListeners() {
    // Find the like button within the card element
    this._likeButton = this._element.querySelector(".element__icono");
    // Add a click event listener to the like button
    // When clicked, it will call the _toggleLike method
    this._likeButton.addEventListener("click", () => this._toggleLike());

    // Add this block
    this._deleteButton = this._element.querySelector(".element__delete");
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteCard(this._element);
    });
  }

  // Public methods
  // This method creates the card and returns it
  generateCard() {
    // Get a copy of the card template
    this._element = this._getTemplate();
    // Set up the event listeners for this card
    this._setEventListeners();

    // Find the image and title elements within the card
    const cardImage = this._element.querySelector(".element__image");
    const cardTitle = this._element.querySelector(".element__title");

    // Set the image source to the card's link
    cardImage.src = this._link;
    // Set the image alt text to the card's name
    cardImage.alt = this._name;
    // Set the card's title text
    cardTitle.textContent = this._name;

    // Return the fully formed card element
    return this._element;
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
