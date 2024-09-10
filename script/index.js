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
document.addEventListener("DOMContentLoaded", () => {
  const addCardButton = document.querySelector(".profile__add-button");
  const addCardPopup = document.querySelector(".popup_type_add");
  const closeAddPopupButton = document.querySelector(".popup__close_type_add");

  if (addCardButton && addCardPopup && closeAddPopupButton) {
    addCardButton.addEventListener("click", () => openPopup(addCardPopup));
    closeAddPopupButton.addEventListener("click", () =>
      closePopup(addCardPopup),
    );
  } else {
    console.error("Add button or popup not found");
  }

  // Render initial cards
  const cardContainer = document.querySelector(".elements");
  initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData);
    cardContainer.append(cardElement);
  });

  // Set up profile
  profile.setEventListeners();
  profile.initialize("Jacques Cousteau", "Explorador");

  // Add card functionality
  const addCardCloseButton = addCardPopup.querySelector(
    ".popup__close_type_add",
  );

  addCardCloseButton.addEventListener("click", () => closePopup(addCardPopup));
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

  // Select the add button and the add popup
  const addButton = document.querySelector(".profile__add-button");
  const addPopup = document.querySelector(".popup_type_add");
  const addPopupCloseButton = addPopup.querySelector(".popup__close_type_add");

  // Add event listener to open the popup
  addButton.addEventListener("click", () => openPopup(addPopup));

  // Add event listener to close the popup
  addPopupCloseButton.addEventListener("click", () => closePopup(addPopup));
});
