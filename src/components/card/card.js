// Class Card
// Set up the card with its data and functionality
// metodos privados
class Card {
  constructor(
    data,
    templateSelector,
    handleDeleteCard,
    handleCardClick,
    handleLikeClick,
    userId
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._ownerId = data.owner._id || data.owner;
    this._likes = data.likes || [];
    this._templateSelector = templateSelector;
    this._handleDeleteCard = handleDeleteCard;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._userId = userId;
  }

  // Get the card template from HTML
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element__element")
      .cloneNode(true);

    return cardElement;
  }
  // Check if the user has liked the card
  isLiked() {
    return this._likes.some(
      (user) => user._id === this._userId || user === this._userId
    );
  }

  // Public method to update likes view
  setLikes(newLikes) {
    this._likes = newLikes;

    if (this.isLiked()) {
      this._likeButton.classList.add("element__icono_active");
    } else {
      this._likeButton.classList.remove("element__icono_active");
    }
  }
  // Set up event listeners for the card
  _setEventListeners() {
    const cardImage = this._element.querySelector(".element__image");

    cardImage.addEventListener("click", () => {
      this._handleCardClick({ name: this._name, link: this._link });
    });

    cardImage.addEventListener("error", () => {
      cardImage.onerror = null;
      cardImage.src = "./images/elements__photo-error.jpeg";
    });

    this._likeButton = this._element.querySelector(".element__icono");
    // Update to use the handler passed in constructor
    this._likeButton.addEventListener("click", () =>
      this._handleLikeClick(this)
    );

    this._deleteButton = this._element.querySelector(".element__delete");

    // Only add delete listener if button exists
    if (this._deleteButton) {
      this._deleteButton.addEventListener("click", () => {
        this._handleDeleteCard(this);
      });
    }
  }

  // Create and return the card element
  // public method
  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".element__icono"); // Define early for setLikes

    // Handle delete button visibility
    this._deleteButton = this._element.querySelector(".element__delete");
    if (this._ownerId !== this._userId) {
      this._deleteButton.remove();
      this._deleteButton = null; // clear reference
    }

    this._setEventListeners();

    const cardImage = this._element.querySelector(".element__image");
    const cardTitle = this._element.querySelector(".element__title");

    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;

    // Set initial state
    this.setLikes(this._likes);

    return this._element;
  }
  // Public getter for ID
  getId() {
    return this._id;
  }
}
//exports
export { Card };
