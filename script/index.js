import Card from "./components/cards.js";
import Profile from "./components/profile.js";
import {
  renderInitialCards,
  renderCard,
  openPopup,
  closePopup,
} from "./utilities/utils.js";

// Constants
const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "./images/elements__photo-yosemite.png",
  },
  {
    name: "Lago Louise",
    link: "./images/elements__photo-louise.png",
  },
  {
    name: "Montañas Calvas",
    link: "./images/elements__photo-calvas.png",
  },
  {
    name: "Latemar",
    link: "./images/elements__photo-latemar.png",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "./images/elements__photo-vanois.png",
  },
  {
    name: "Lago di Braies",
    link: "./images/elements__photo-braies.png",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Profile
  const profile = new Profile({
    nameSelector: ".profile__title",
    jobSelector: ".profile__subtitle",
    editButtonSelector: ".profile__edit-button",
    popupSelector: ".popup_type_edit",
    formSelector: ".popup__form_type_edit",
    closeButtonSelector: ".popup__close_type_edit",
  });

  // Function to handle card deletion
  function handleDeleteCard(cardElement) {
    cardElement.remove();
  }

  // Function to create a new card
  function createCard(cardData) {
    const card = new Card(cardData, ".element__template", handleDeleteCard);
    return card.generateCard();
  }

  // Event listeners
  const addCardButton = document.querySelector(".profile__add-button");
  const addCardPopup = document.querySelector(".popup_type_add");
  const addCardForm = addCardPopup.querySelector(".popup__form");
  const cardContainer = document.querySelector(".elements");
  const closeAddPopupButton = addCardPopup.querySelector(
    ".popup__close_type_add",
  );

  // Open add card popup
  addCardButton.addEventListener("click", () => openPopup(addCardPopup));

  // Close add card popup
  closeAddPopupButton.addEventListener("click", () => closePopup(addCardPopup));

  // Add card form submission
  addCardForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const titleInput = addCardForm.querySelector(".popup__input-name");
    const linkInput = addCardForm.querySelector(".popup__input-link");
    const newCard = {
      name: titleInput.value,
      link: linkInput.value,
    };
    const cardElement = createCard(newCard);
    cardContainer.prepend(cardElement);
    closePopup(addCardPopup);
    addCardForm.reset();
  });

  // Render initial cards
  initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData);
    cardContainer.append(cardElement);
  });

  // Set up profile
  profile.setEventListeners();
  profile.initialize("Jacques Cousteau", "Explorador");
});
