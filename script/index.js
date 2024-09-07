//Imports
/*Importa una clase "Card"*/
import Card from "./components/cards.js";
import Profile from "./components/Profile.js";

// Initial cards data
/*Este es un array de objetos que contiene la información de las tarjetas*/
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
/*
1) Selecciona el contenedor .elements donde se añadiran las tarjetas
2) Para cada tarjeta, pasa los datos y el selector para la plantilla
3) Creo un elemento tarjeta usando el método generateCard()
4) Añade el elemento tarjeta al contenedor .elements
*/
function renderCards() {
  const cardsContainer = document.querySelector(".elements");

  initialCards.forEach((cardData) => {
    const card = new Card(cardData, ".element__template");
    const cardElement = card.generateCard();
    cardsContainer.appendChild(cardElement);
  });
}
// Initialize Profile
const profile = new Profile({
  nameSelector: ".profile__title",
  jobSelector: ".profile__subtitle",
  editButtonSelector: ".profile__edit-button",
  popupSelector: ".popup",
  formSelector: ".popup__form",
  closeButtonSelector: ".popup__close",
});
// Initialize profile with default values
profile.initialize("Jacques Cousteau", "Explorador");

// Call the function to render cards when the page loads
document.addEventListener("DOMContentLoaded", () => {
  renderCards();
  profile.setEventListeners();
});
// Call the function to render cards when the page loads
/*
Escucha el evento DOMContentLoaded para asegurarse de que el DOM está completamente cargado antes de ejecutar la función renderCards()
*/
document.addEventListener("DOMContentLoaded", renderCards);

// Select profile elements
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

// Select form elements
const popupForm = document.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input-name");
const workInput = document.querySelector(".popup__input-work");

// Select popup elements
const editButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const closePopupButton = document.querySelector(".popup__close");

// Function to open popup and fill form with current profile info
function openPopup() {
  nameInput.value = profileTitle.textContent;
  workInput.value = profileSubtitle.textContent;
  popup.classList.remove("popup_hidden");
}

// Function to close popup
function closePopup() {
  popup.classList.add("popup_hidden");
}

// Function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = workInput.value;
  closePopup();
}

// Event listeners
document.addEventListener("DOMContentLoaded", renderCards);
editButton.addEventListener("click", openPopup);
closePopupButton.addEventListener("click", closePopup);
popupForm.addEventListener("submit", handleFormSubmit);

// Initialize profile with default values
profileTitle.textContent = "Jacques Cousteau";
profileSubtitle.textContent = "Explorador";
