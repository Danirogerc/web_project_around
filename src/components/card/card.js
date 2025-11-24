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
    // Fix: Handle owner safely (can be string, object, or undefined)
    this._ownerId = data.owner ? data.owner._id || data.owner : null;

    // Handle both isLiked (boolean) and likes (array) formats
    this._likes = data.likes || [];
    this._isLiked = data.isLiked; // Store the boolean if provided

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
    // 1. Priority: Check explicit boolean property if set
    if (typeof this._isLiked === "boolean") {
      return this._isLiked;
    }

    // 2. Fallback: Check likes array if available
    if (Array.isArray(this._likes) && this._likes.length > 0) {
      return this._likes.some(
        (user) => user._id === this._userId || user === this._userId
      );
    }

    return false;
  }

  // Public method to update likes view
  setLikes(newLikes) {
    // Reset state based on input type
    if (Array.isArray(newLikes)) {
      this._likes = newLikes;
      // Recalculate boolean based on array + userId
      this._isLiked = this._likes.some(
        (user) => user._id === this._userId || user === this._userId
      );
    } else if (typeof newLikes === "boolean") {
      this._isLiked = newLikes;
      // If boolean is true but we have no array, we can't reconstruct the array easily
      // but usually we don't need to display the count, just the icon status.
    } else {
      // Handle 'undefined' or null from API edge cases
      this._isLiked = false;
    }

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
    this._likeButton.addEventListener("click", () =>
      this._handleLikeClick(this)
    );

    this._deleteButton = this._element.querySelector(".element__delete");

    if (this._deleteButton) {
      this._deleteButton.addEventListener("click", () => {
        this._handleDeleteCard(this);
      });
    }
  }

  // Create and return the card element
  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".element__icono");

    // Handle delete button visibility
    this._deleteButton = this._element.querySelector(".element__delete");
    if (!this._ownerId || this._ownerId !== this._userId) {
      if (this._deleteButton) {
        this._deleteButton.remove();
        this._deleteButton = null;
      }
    }

    this._setEventListeners();

    const cardImage = this._element.querySelector(".element__image");
    const cardTitle = this._element.querySelector(".element__title");

    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;

    // Set initial like state
    if (this._isLiked !== undefined) {
      // Use boolean to set initial state
      if (this._isLiked) {
        this._likeButton.classList.add("element__icono_active");
      } else {
        this._likeButton.classList.remove("element__icono_active");
      }
    } else {
      // Use likes array
      this.setLikes(this._likes);
    }

    return this._element;
  }

  // Public getter for ID
  getId() {
    return this._id;
  }
}

export { Card };
