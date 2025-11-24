import { Profile } from "../components/profile/profile.js";
import { PopupWithForm } from "../components/popup/popupwithform.js";
import { PopupWithImage } from "../components/popup/popupwithimage.js";
import { PopupWithConfirmation } from "../components/popup/popupwithconfirmation.js";
import { Card } from "../components/card/card.js";
import { Section } from "../components/section/section.js";
import { FormValidator, enableValidation } from "../utils/formvalidator.js";
import { api } from "../api/api.js";

document.addEventListener("DOMContentLoaded", () => {
  let userId;

  // --- 1. POPUP INSTANCES ---
  const imagePopupInstance = new PopupWithImage(".popup_type_image");
  imagePopupInstance.setEventListeners();

  const confirmPopupInstance = new PopupWithConfirmation(".popup_type_confirm");
  confirmPopupInstance.setEventListeners();

  // --- 2. SECTION & PROFILE INSTANCES ---
  const cardSection = new Section(
    {
      items: [], // Will be filled by API
      renderer: createCardElement,
    },
    ".elements"
  );

  const profile = new Profile({
    nameSelector: ".profile__title",
    jobSelector: ".profile__subtitle",
    avatarSelector: ".profile__avatar-img",
  });

  // --- 3. HANDLERS ---

  // Create Card Element
  function createCardElement(cardData) {
    const card = new Card(
      cardData,
      ".element__template",
      handleDeleteCardClick, // Open confirm popup
      handleCardClick, // Open image popup
      handleLikeClick, // Toggle like
      userId // Current User ID
    );
    return card.generateCard();
  }

  // Handle Card Image Click
  function handleCardClick(cardData) {
    imagePopupInstance.open(cardData);
  }

  // Handle Like Click
  function handleLikeClick(card) {
    const cardId = card.getId();
    if (!cardId) return;

    const isLiked = card.isLiked();

    // 1. Optimistic Update: Toggle immediately visually
    // We simulate the new state (true -> false, false -> true)
    card.setLikes(!isLiked);

    // 2. Send Request
    const apiCall = isLiked ? api.removeLike(cardId) : api.addLike(cardId);

    apiCall
      .then((updatedCardData) => {
        // 3. Confirm with server data (optional, but good for consistency)
        // The visual state is already correct, but this syncs any metadata (like counts)
        card.setLikes(updatedCardData.likes || updatedCardData.isLiked);
      })
      .catch((err) => {
        console.log(err);
        // 4. Revert on Error: If server fails, toggle back to original state
        card.setLikes(isLiked);
      });
  }

  // Handle Delete Icon Click (Opens Confirmation)
  function handleDeleteCardClick(card) {
    confirmPopupInstance.open();
    confirmPopupInstance.setAction(() => {
      api
        .deleteCard(card.getId())
        .then(() => {
          card._element.remove(); // Remove from DOM
          confirmPopupInstance.close();
        })
        .catch((err) => console.log(err));
    });
  }

  // Handle "Add Card" Form Submit
  function handleAddCardSubmit(formData) {
    addCardPopupInstance.renderLoading(true);
    api
      .addCard({ name: formData.cardTitle, link: formData.cardLink })
      .then((newCardData) => {
        cardSection.addItem(newCardData);
        addCardPopupInstance.close();
      })
      .catch((err) => console.log(err))
      .finally(() => addCardPopupInstance.renderLoading(false));
  }

  // Handle "Edit Profile" Form Submit
  function handleEditProfileSubmit(formData) {
    editProfilePopupInstance.renderLoading(true);
    api
      .updateUserInfo({ name: formData.name, about: formData.work })
      .then((userData) => {
        profile.setUserInfo(userData.name, userData.about, userData.avatar);
        editProfilePopupInstance.close();
      })
      .catch((err) => console.log(err))
      .finally(() => editProfilePopupInstance.renderLoading(false));
  }

  // Handle "Avatar" Form Submit
  function handleAvatarSubmit(formData) {
    avatarPopupInstance.renderLoading(true);
    api
      .updateAvatar({ avatar: formData.avatar })
      .then((userData) => {
        profile.setUserInfo(userData.name, userData.about, userData.avatar);
        avatarPopupInstance.close();
      })
      .catch((err) => console.log(err))
      .finally(() => avatarPopupInstance.renderLoading(false));
  }

  // --- 4. POPUP WITH FORMS ---

  const addCardPopupInstance = new PopupWithForm(
    ".popup_type_add",
    handleAddCardSubmit
  );
  addCardPopupInstance.setEventListeners();

  const editProfilePopupInstance = new PopupWithForm(
    ".popup_type_edit",
    handleEditProfileSubmit
  );
  editProfilePopupInstance.setEventListeners();

  const avatarPopupInstance = new PopupWithForm(
    ".popup_type_avatar",
    handleAvatarSubmit
  );
  avatarPopupInstance.setEventListeners();

  // --- 5. EVENT LISTENERS FOR BUTTONS ---

  const addCardButton = document.querySelector(".profile__add-button");
  addCardButton.addEventListener("click", () => addCardPopupInstance.open());

  const editProfileButton = document.querySelector(".profile__edit-button");
  editProfileButton.addEventListener("click", () => {
    const currentUserInfo = profile.getUserInfo();
    const nameInput = document.querySelector(".popup__input-name");
    const workInput = document.querySelector(".popup__input-work");
    nameInput.value = currentUserInfo.name;
    workInput.value = currentUserInfo.job;
    editProfilePopupInstance.open();
  });

  const avatarButton = document.querySelector(".profile__avatar"); // Assuming wrapper
  avatarButton.addEventListener("click", () => avatarPopupInstance.open());

  // --- 6. INITIALIZATION ---

  enableValidation();

  // Fetch User Data and Cards
  api
    .getAppData()
    .then(([userData, cardsData]) => {
      // 1. Set User ID
      userId = userData._id;

      // 2. Set Profile Data
      profile.initialize({
        name: userData.name,
        about: userData.about,
        avatar: userData.avatar,
      });

      // 3. Render Cards
      cardSection.setItems(cardsData);
      cardSection.renderItems();

      // Show profile after data loads (remove inline style)
      const profileSection = document.querySelector(".profile");
      profileSection.style.opacity = "1";
    })
    .catch((err) => console.log(err));
});
