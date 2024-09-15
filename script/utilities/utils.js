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
export function renderCard(
  cardData,
  containerSelector,
  templateSelector,
  handleDeleteCard,
) {
  const container = document.querySelector(containerSelector);
  const card = new Card(cardData, templateSelector, handleDeleteCard);
  const cardElement = card.generateCard();
  container.prepend(cardElement);
  return cardElement; // Return the created card element
}

//Function to render the initial cards
export function renderInitialCards(
  initialCards,
  containerSelector,
  templateSelector,
  handleDeleteCard,
) {
  initialCards.forEach((cardData) =>
    renderCard(cardData, containerSelector, templateSelector, handleDeleteCard),
  );
}
