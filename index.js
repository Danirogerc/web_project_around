import { Profile } from "./components/profile/profile.js";
import { Popup } from "./components/popup/popup.js";
import { PopupWithForm } from "./components/popup/popupwithform.js";
import { initialCards } from "./data/config.js";
import { Card } from "./components/card/card.js";
import { Section } from "./components/section/section.js";
import { FormValidator, enableValidation } from "./utils/FormValidator.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded"); //Debug check

  // Function to handle card deletion
  function handleDeleteCard(cardElement) {
    cardElement.remove();
  }

  // Function to handle add card form submission
  function handleAddCardSubmit(formData) {
    // Check if form is valid before proceeding
    if (!formData.cardTitle?.trim() || !formData.cardLink?.trim()) {
      return; // Stop here if validation fails
    }

    // Additional check: verify URL is valid
    try {
      new URL(formData.cardLink);
    } catch (e) {
      return; // Stop here if URL is invalid
    }

    // Only proceed if validation passes
    const newCard = {
      name: formData.cardTitle,
      link: formData.cardLink,
    };
    cardSection.addItem(newCard);
    addCardPopupInstance.close();
  }

  // Function to handle edit profile form submission
  function handleEditProfileSubmit(formData) {
    profile.setUserInfo(formData.name, formData.work);
    editProfilePopupInstance.close();
  }

  //CREATE POPUP INSTANCES
  const addCardPopupInstance = new PopupWithForm(
    ".popup_type_add",
    handleAddCardSubmit
  );
  const editProfilePopupInstance = new PopupWithForm(
    ".popup_type_edit",
    handleEditProfileSubmit
  );
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

  // Initialize Profile
  const profile = new Profile({
    nameSelector: ".profile__title",
    jobSelector: ".profile__subtitle",
  });

  // Event listeners
  const addCardButton = document.querySelector(".profile__add-button");
  const editProfileButton = document.querySelector(".profile__edit-button");

  // Open add card popup
  addCardButton.addEventListener("click", () => addCardPopupInstance.open());

  // Open edit profile popup
  editProfileButton.addEventListener("click", () => {
    // Get current user info using the new method
    const currentUserInfo = profile.getUserInfo();

    // Pre-fill the form with current values
    const nameInput = document.querySelector(".popup__input-name");
    const workInput = document.querySelector(".popup__input-work");

    nameInput.value = currentUserInfo.name;
    workInput.value = currentUserInfo.job;

    editProfilePopupInstance.open();
  });

  // Render initial cards using Section
  cardSection.renderItems();

  // Set up profile
  profile.initialize("Jacques Cousteau", "Explorador");

  // Set up popup event listeners
  addCardPopupInstance.setEventListeners();
  editProfilePopupInstance.setEventListeners();
  imagePopupInstance.setEventListeners();

  //enable validation
  enableValidation();
});
