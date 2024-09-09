//Functions to be imported
import Card from "../utilities/cards.js";

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
  cardContainer,
  templateSelector,
  handleDeleteCard,
) {
  const card = new Card(cardData, templateSelector, handleDeleteCard);
  const cardElement = card.generateCard();
  cardContainer.prepend(cardElement);
}

//Function to render the initial cards
export function renderInitialCards(
  cardData,
  cardContainer,
  templateSelector,
  handleDeleteCard,
) {
  cardData.forEach((card) => {
    renderCard(card, cardContainer, templateSelector, handleDeleteCard);
  });
}
