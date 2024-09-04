//Imports
import Card from "./components/element.js";

// Initial cards data
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

// Function to render cards
function renderCards() {
  const cardsContainer = document.querySelector(".elements");

  initialCards.forEach((cardData) => {
    const card = new Card(cardData, ".element__template");
    const cardElement = card.generateCard();
    cardsContainer.appendChild(cardElement);
  });
}

// Call the function to render cards when the page loads
document.addEventListener("DOMContentLoaded", renderCards);
