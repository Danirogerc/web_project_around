//naming all necessary variables
const profileForm = document.querySelector(".popup__form_type_edit");
const nameInput = document.querySelector(".popup__input-name");
const worktInput = document.querySelector(".popup__input-work");
const saveButtonEdit = document.querySelector(".popup__button-profile");
profileForm.addEventListener("submit", function (evt) {
  // Cancela el comportamiento del navegador por defecto
  evt.preventDefault();
});
const showInputError = (element) => {
  element.classList.add("form__input_type_error");
};
