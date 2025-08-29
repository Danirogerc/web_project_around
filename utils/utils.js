//Functions to be imported
import { Card } from "../blocks/card/card.js";

//Functions to open and close popups
function openPopup(popup) {
  popup.classList.remove("popup_hidden");
  // Add event listeners when opening popup
  document.addEventListener("keydown", handleEscClose);
  document.addEventListener("mousedown", handleOverlayClick);
}

function closePopup(popup) {
  popup.classList.add("popup_hidden");
  // Remove event listeners when closing popup
  document.removeEventListener("keydown", handleEscClose);
  document.removeEventListener("mousedown", handleOverlayClick);
}

// Function to handle Esc key press
function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup:not(.popup_hidden)");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

// Function to handle clicking outside popup
function handleOverlayClick(evt) {
  if (evt.target.classList.contains("popup__overlay")) {
    const popup = evt.target.closest(".popup");
    if (popup) {
      closePopup(popup);
    }
  }
}

//Function render one card
function renderCard(
  cardData,
  containerSelector,
  templateSelector,
  handleDeleteCard
) {
  const container = document.querySelector(containerSelector);
  const card = new Card(cardData, templateSelector, handleDeleteCard);
  const cardElement = card.generateCard();
  container.prepend(cardElement);
  return cardElement; // Return the created card element
}

//Function to render the initial cards
function renderInitialCards(
  initialCards,
  containerSelector,
  templateSelector,
  handleDeleteCard
) {
  initialCards.forEach((cardData) =>
    renderCard(cardData, containerSelector, templateSelector, handleDeleteCard)
  );
}

//exports
export { openPopup, closePopup, renderInitialCards, renderCard };
