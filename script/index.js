import Profile from "./components/profile.js";
import {
  renderInitialCards,
  renderCard,
  openPopup,
  closePopup,
} from "./utilities/utils.js";
import { initialCards } from "./data/config.js";

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

  // Event listeners
  const addCardButton = document.querySelector(".profile__add-button");
  const addCardPopup = document.querySelector(".popup_type_add");
  const addCardForm = addCardPopup.querySelector(".popup__form");
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
    renderCard(newCard, ".elements", ".element__template", handleDeleteCard);
    closePopup(addCardPopup);
    addCardForm.reset();
  });

  // Render initial cards
  renderInitialCards(
    initialCards,
    ".elements",
    ".element__template",
    handleDeleteCard,
  );

  // Set up profile
  profile.setEventListeners();
  profile.initialize("Jacques Cousteau", "Explorador");
});
