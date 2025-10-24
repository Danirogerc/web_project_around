// Class Card
// Set up the card with its data and functionality
// metodos privados
class Card {
  constructor(data, templateSelector, handleDeleteCard, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleDeleteCard = handleDeleteCard;
    this._handleCardClick = handleCardClick;
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
    // Add image click handler
    const cardImage = this._element.querySelector(".element__image");
    cardImage.addEventListener("click", () => {
      this._handleCardClick({ name: this._name, link: this._link });
    });
    //if url not image
    cardImage.addEventListener("error", () => {
      cardImage.onerror = null;
      cardImage.src = "./images/elements__photo-error.jpeg";
    });

    this._likeButton = this._element.querySelector(".element__icono");
    this._likeButton.addEventListener("click", () => this._toggleLike());

    this._deleteButton = this._element.querySelector(".element__delete");
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteCard(this._element);
    });
  }

  // Create and return the card element
  // public method
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
//exports
export { Card };
