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
// This function creates all the initial cards and adds them to the page
function renderCards() {
  // For each card in our initial list...
  initialCards.forEach((cardData) => {
    // Create a new Card object
    const card = new Card(cardData, ".element__template");
    // Generate the HTML for the card
    const cardElement = card.generateCard();
    // Add the card to our page
    cardsContainer.appendChild(cardElement);
  });
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
  renderCards();
  // Set up the event listeners for the profile
  profile.setEventListeners();
  // Set the initial profile information
  profile.initialize("Jacques Cousteau", "Explorador");
});
