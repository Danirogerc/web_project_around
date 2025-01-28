export function enableValidation() {
  //naming all necessary variables
  const profileForm = document.querySelector(".popup__form_type_edit");
  const nameInput = document.querySelector(".popup__input-name");
  const workInput = document.querySelector(".popup__input-work");
  const saveButton = document.querySelector(".popup__button-container");

  const showInputError = (formElement, inputElement, errorElement) => {
    inputElement.classList.add("popup__input_type_error");
    errorElement.classList.add("popup__error_visible");
  };

  const hideInputError = (formElement, inputElement, errorElement) => {
    inputElement.classList.remove("popup__input_type_error");
    errorElement.classList.remove("popup__error_visible");
  };

  const checkInputValidity = (formElement, inputElement) => {
    const errorElement = inputElement.classList.contains("popup__input-name")
      ? formElement.querySelector(".popup__error_type_name")
      : formElement.querySelector(".popup__error_type_work");

    if (!inputElement.value) {
      showInputError(formElement, inputElement, errorElement);
      return false;
    } else {
      if (inputElement.classList.contains("popup__input-name")) {
        if (inputElement.value.length < 2 || inputElement.value.length > 40) {
          showInputError(formElement, inputElement, errorElement);
          return false;
        } else {
          hideInputError(formElement, inputElement, errorElement);
          return true;
        }
      } else if (inputElement.classList.contains("popup__input-work")) {
        if (inputElement.value.length < 2 || inputElement.value.length > 200) {
          showInputError(formElement, inputElement, errorElement);
          return false;
        } else {
          hideInputError(formElement, inputElement, errorElement);
          return true;
        }
      }
    }
    return true;
  };

  const toggleButtonState = () => {
    const isNameValid = checkInputValidity(profileForm, nameInput);
    const isWorkValid = checkInputValidity(profileForm, workInput);

    if (isNameValid && isWorkValid) {
      saveButton.classList.remove("popup__button-container_disabled");
      saveButton.disabled = false;
    } else {
      saveButton.classList.add("popup__button-container_disabled");
      saveButton.disabled = true;
    }
  };

  // Add event listeners
  nameInput.addEventListener("input", () => {
    checkInputValidity(profileForm, nameInput);
    toggleButtonState();
  });

  workInput.addEventListener("input", () => {
    checkInputValidity(profileForm, workInput);
    toggleButtonState();
  });

  // Initial validation
  toggleButtonState();

  // Prevent form submission if invalid
  profileForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    if (
      checkInputValidity(profileForm, nameInput) &&
      checkInputValidity(profileForm, workInput)
    ) {
      // Form submission logic here
    }
  });
}
