//Functions to be imported
import Card from "../components/cards.js";

//Functions to open and close popups
export function openPopup(popup) {
  popup.classList.remove("popup_hidden");
}
export function closePopup(popup) {
  popup.classList.add("popup_hidden");
}
//Function to render one card
export function renderCard(cardData, containerSelector, templateSelector) {
  const container = document.querySelector(containerSelector);
  const card = new Card(cardData, templateSelector);
  const cardElement = card.generateCard();
  container.prepend(cardElement);
}

//Function to render the initial cards
export function renderInitialCards(
  initialCards,
  containerSelector,
  templateSelector,
) {
  initialCards.forEach((cardData) =>
    renderCard(cardData, containerSelector, templateSelector),
  );
}
