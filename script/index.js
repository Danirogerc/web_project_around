//Imports
/*Importa una clase "Card"*/
import Card from "./components/element.js";

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

// Call the function to render cards when the page loads
/*
Escucha el evento DOMContentLoaded para asegurarse de que el DOM está completamente cargado antes de ejecutar la función renderCards()
*/
document.addEventListener("DOMContentLoaded", renderCards);
//Seleccionar elementos para el toggle del popup
const editButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const closePopupButton = document.querySelector(".popup__close");

//Función para abrir y cerrar el popup
function togglePopup() {
  popup.classList.toggle("popup_hidden");
}

//Agregar event listeners a los botones
editButton.addEventListener("click", togglePopup);
closePopupButton.addEventListener("click", togglePopup);
