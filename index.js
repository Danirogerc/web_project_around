import { Profile } from "./components/profile/profile.js";
import { Popup } from "./components/popup/popup.js";
import { initialCards } from "./data/config.js";
import { Card } from "./components/card/card.js";
import { Section } from "./components/section/section.js";
import { FormValidator, enableValidation } from "./utils/FormValidator.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded"); //Debug check
  // Initialize Profile
  const profile = new Profile({
    nameSelector: ".profile__title",
    jobSelector: ".profile__subtitle",
    editButtonSelector: ".profile__edit-button",
    popupSelector: ".popup_type_edit",
    formSelector: ".popup__form_type_edit",
    closeButtonSelector: ".popup__close_type_edit",
  });

  // Function to handle card deletion
  function handleDeleteCard(cardElement) {
    cardElement.remove();
  }

  //CREATE POPUP INSTANCES
  const addCardPopupInstance = new Popup(".popup_type_add");
  const imagePopupInstance = new Popup(".popup_type_image");

  //CREATE THE RENDERER FUNCTION
  function createCardElement(cardData) {
    const card = new Card(
      cardData,
      ".element__template",
      handleDeleteCard,
      imagePopupInstance
    );
    return card.generateCard();
  }

  // Initialize Section for cards
  const cardSection = new Section(
    {
      items: initialCards,
      renderer: createCardElement,
    },
    ".elements"
  );

  // Event listeners
  const addCardButton = document.querySelector(".profile__add-button");
  const addCardForm = document.querySelector(".popup__form_type_add");

  // Open add card popup
  addCardButton.addEventListener("click", () => addCardPopupInstance.open());

  // Add card form submission
  addCardForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Check if form is valid before proceeding
    const titleInput = addCardForm.querySelector(".popup__input-name");
    const linkInput = addCardForm.querySelector(".popup__input-link");

    // Don't submit if inputs are empty or invalid
    if (!titleInput.value.trim() || !linkInput.value.trim()) {
      return; // Stop here if validation fails
    }

    // Additional check: verify URL is valid
    try {
      new URL(linkInput.value);
    } catch (e) {
      return; // Stop here if URL is invalid
    }

    // Only proceed if validation passes
    const newCard = {
      name: titleInput.value,
      link: linkInput.value,
    };
    cardSection.addItem(newCard);
    addCardPopupInstance.close();
    addCardForm.reset();
  });

  // Render initial cards using Section
  cardSection.renderItems();

  // Set up profile
  profile.initialize("Jacques Cousteau", "Explorador");

  // Set up popup event listeners
  addCardPopupInstance.setEventListeners();
  imagePopupInstance.setEventListeners();

  //enable validation
  enableValidation();
});
