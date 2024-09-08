// Imports
// We're bringing in the Card and Profile classes we created in other files
import Card from "./components/cards.js";
import Profile from "./components/profile.js";

// Constants
// This is a list of initial cards that will be displayed on the page
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

// DOM elements
// We're finding the container where we'll put all our cards
const cardsContainer = document.querySelector(".elements");

// Functions
// This function removes a card from the page when the delete button is clicked
function handleDeleteCard(cardElement) {
  // We use the remove() method to delete the card from the webpage
  cardElement.remove();
}

// This function creates a new card and adds it to the page
function renderCard(cardData) {
  // We create a new Card object using the data, template, and delete function
  const card = new Card(cardData, ".element__template", handleDeleteCard);
  // We generate the card's HTML
  const cardElement = card.generateCard();
  // We add the new card to the beginning of our cards container
  cardsContainer.prepend(cardElement);
}

// This function creates all the initial cards when the page loads
function renderInitialCards() {
  // We go through each card in our initialCards list
  initialCards.forEach((cardData) => renderCard(cardData));
}

// Initialize Profile
// We're creating a new Profile object with all the selectors it needs
const profile = new Profile({
  nameSelector: ".profile__title",
  jobSelector: ".profile__subtitle",
  editButtonSelector: ".profile__edit-button",
  popupSelector: ".popup",
  formSelector: ".popup__form",
  closeButtonSelector: ".popup__close",
});

// Event listeners
// This code runs when the page is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Create all the initial cards
  renderInitialCards();
  // Set up the event listeners for the profile
  profile.setEventListeners();
  // Set the initial profile information
  profile.initialize("Jacques Cousteau", "Explorador");
});
