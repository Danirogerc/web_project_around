export function enableValidation() {
  // 1. Forms validation - Profile form validation
  const profileForm = document.querySelector(".popup__form_type_edit");
  const nameInput = profileForm.querySelector(".popup__input-name");
  const workInput = profileForm.querySelector(".popup__input-work");
  const saveButtonProfile = profileForm.querySelector(
    ".popup__button-container"
  );

  // Add Card Form Validation
  const addCardForm = document.querySelector(".popup__form_type_add");
  const titleInput = addCardForm?.querySelector(".popup__input-name");
  const linkInput = addCardForm?.querySelector(".popup__input-link");
  const saveButtonAdd = addCardForm?.querySelector(".popup__button-container");

  // 2. Function to show error messages
  const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(
      `.popup__error_type_${inputElement.name}`
    );
    // Add error styling to input
    inputElement.classList.add("popup__input_type_error");
    inputElement.style.borderBottomColor = "#FF0000";
    // Show error message if error element exists
    if (errorElement) {
      errorElement.textContent = errorMessage;
      errorElement.style.display = "block";
      errorElement.style.color = "#FF0000";
    }
  };
  // 3. Function to hide error messages
  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(
      `.popup__error_type_${inputElement.name}`
    );
    // Remove error styling from input
    inputElement.classList.remove("popup__input_type_error");
    inputElement.style.borderBottomColor = "";
    // Hide error message
    if (errorElement) {
      errorElement.textContent = "";
      errorElement.style.display = "none";
    }
  };
  // 4. function to check url validity
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };
  // 5. Function to check if input is valid
  const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.value) {
      showInputError(formElement, inputElement, "Este campo es obligatorio.");
      return false;
    }

    // Profile form validations
    if (formElement === profileForm) {
      if (inputElement === nameInput) {
        if (inputElement.value.length < 2) {
          showInputError(
            formElement,
            inputElement,
            "El nombre debe tener al menos 2 caracteres."
          );
          return false;
        } else if (inputElement.value.length > 40) {
          showInputError(
            formElement,
            inputElement,
            "El nombre no puede tener más de 40 caracteres."
          );
          return false;
        }
      } else if (inputElement === workInput) {
        if (inputElement.value.length < 2) {
          showInputError(
            formElement,
            inputElement,
            "La ocupación debe tener al menos 2 caracteres."
          );
          return false;
        } else if (inputElement.value.length > 200) {
          showInputError(
            formElement,
            inputElement,
            "La ocupación no puede tener más de 200 caracteres."
          );
          return false;
        }
      }
    }
    // Add card form validations
    if (formElement === addCardForm) {
      if (inputElement === titleInput) {
        if (inputElement.value.length < 2) {
          showInputError(
            formElement,
            inputElement,
            "El título debe tener al menos 2 caracteres."
          );
          return false;
        } else if (inputElement.value.length > 30) {
          showInputError(
            formElement,
            inputElement,
            "El título no puede tener más de 30 caracteres."
          );
          return false;
        }
      } else if (inputElement === linkInput) {
        if (!isValidUrl(inputElement.value)) {
          showInputError(
            formElement,
            inputElement,
            "Por favor, introduzca una URL válida."
          );
          return false;
        }
      }
    }
    hideInputError(formElement, inputElement);
    return true;
  };

  const toggleButtonState = (formElement, inputs, buttonElement) => {
    const isValid = inputs.every((input) =>
      checkInputValidity(formElement, input)
    );

    if (isValid) {
      buttonElement.disabled = false;
      buttonElement.classList.remove("popup__button_disabled");
    } else {
      buttonElement.disabled = true;
      buttonElement.classList.add("popup__button_disabled");
    }
  };

  // Set up form validation
  const setupFormValidation = (formElement, inputs, buttonElement) => {
    if (!formElement) return;

    inputs.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(formElement, inputs, buttonElement);
      });
    });
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      if (inputs.every((input) => checkInputValidity(formElement, input))) {
        // Form submission logic here
      }
    });

    // Initial validation
    toggleButtonState(formElement, inputs, buttonElement);
  };

  // Initialize both forms
  if (profileForm) {
    setupFormValidation(profileForm, [nameInput, workInput], saveButtonProfile);
  }
  if (addCardForm) {
    setupFormValidation(addCardForm, [titleInput, linkInput], saveButtonAdd);
  }
}
