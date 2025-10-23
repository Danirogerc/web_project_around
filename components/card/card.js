// Class Card
// Set up the card with its data and functionality
// metodos privados
class Card {
  constructor(data, templateSelector, handleDeleteCard, imagePopupInstance) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleDeleteCard = handleDeleteCard;
    this._imagePopupInstance = imagePopupInstance;
    this._popupImage = document.querySelector(".popup__image");
    this._popupCaption = document.querySelector(".popup__image-caption");
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
      this._handleImageClick();
    });

    this._likeButton = this._element.querySelector(".element__icono");
    this._likeButton.addEventListener("click", () => this._toggleLike());

    this._deleteButton = this._element.querySelector(".element__delete");
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteCard(this._element);
    });
  }

  _handleImageClick() {
    this._popupImage.src = this._link;
    this._popupImage.alt = this._name;
    this._popupCaption.textContent = this._name;
    this._imagePopupInstance.open(); // Use popup instance method
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
