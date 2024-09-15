// This class represents a card in our application
export default class Card {
  // Set up the card with its data and functionality
  constructor(data, templateSelector, handleDeleteCard) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleDeleteCard = handleDeleteCard;
  }

  // Get the card template from HTML
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element__element")
      .cloneNode(true);

    return cardElement;
  }

  // Handle liking/unliking a card
  _toggleLike() {
    this._likeButton.classList.toggle("element__icono_active");
  }

  // Set up event listeners for the card
  _setEventListeners() {
    this._likeButton = this._element.querySelector(".element__icono");
    this._likeButton.addEventListener("click", () => this._toggleLike());

    this._deleteButton = this._element.querySelector(".element__delete");
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteCard(this._element);
    });
  }

  // Create and return the card element
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const cardImage = this._element.querySelector(".element__image");
    const cardTitle = this._element.querySelector(".element__title");

    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;

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

// Add this function at the end of the file
