import Card from "./components/cards.js";
import Profile from "./components/profile.js";
import { renderInitialCards } from "./utilities/utils.js";

// Constants
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

// Initialize Profile
const profile = new Profile({
  nameSelector: ".profile__title",
  jobSelector: ".profile__subtitle",
  editButtonSelector: ".profile__edit-button",
  popupSelector: ".popup",
  formSelector: ".popup__form",
  closeButtonSelector: ".popup__close",
});

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  renderInitialCards(initialCards, ".elements", ".element__template");
  profile.setEventListeners();
  profile.initialize("Jacques Cousteau", "Explorador");
});
