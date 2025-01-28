export function enableValidation() {
  // 1. Select all necessary DOM elements
  const profileForm = document.querySelector(".popup__form_type_edit");
  if (!profileForm) return; // Exit if form not found
  const nameInput = profileForm.querySelector(".popup__input-name");
  const workInput = profileForm.querySelector(".popup__input-work");
  const saveButton = profileForm.querySelector(".popup__button-container");

  // 2. Function to show error messages
  const showInputError = (inputElement, errorMessage) => {
    // Find error element using input's name
    const errorElement = profileForm.querySelector(
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
  const hideInputError = (inputElement) => {
    const errorElement = profileForm.querySelector(
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

  // 4. Function to check if input is valid
  const checkInputValidity = (inputElement) => {
    console.log("Checking validity for:", inputElement.name);

    // Check if input is empty
    if (!inputElement.value) {
      showInputError(inputElement, "Este campo es obligatorio.");
      return false;
    }

    if (inputElement.classList.contains("popup__input-name")) {
      if (inputElement.value.length < 2) {
        showInputError(
          inputElement,
          "El nombre debe tener al menos 2 caracteres."
        );
        return false;
      } else if (inputElement.value.length > 40) {
        showInputError(
          inputElement,
          "El nombre no puede tener más de 40 caracteres."
        );
        return false;
      }
    }
    // Validate work input
    else if (inputElement.classList.contains("popup__input-work")) {
      if (inputElement.value.length < 2) {
        showInputError(
          inputElement,
          "La ocupación debe tener al menos 2 caracteres."
        );
        return false;
      } else if (inputElement.value.length > 200) {
        showInputError(
          inputElement,
          "La ocupación no puede tener más de 200 caracteres."
        );
        return false;
      }
    }

    // If all validations pass, hide error and return true
    hideInputError(inputElement);
    return true;
  };

  // 5. Function to toggle button state based on form validity
  const toggleButtonState = () => {
    // Check both inputs
    const isNameValid = checkInputValidity(nameInput);
    const isWorkValid = checkInputValidity(workInput);

    console.log("Validation state:", { isNameValid, isWorkValid });

    // Enable/disable button based on validation results
    if (isNameValid && isWorkValid) {
      saveButton.disabled = false;
      saveButton.classList.remove("popup__button_disabled");
    } else {
      saveButton.disabled = true;
      saveButton.classList.add("popup__button_disabled");
    }
  };

  // 6. Add real-time validation listeners
  nameInput.addEventListener("input", () => {
    checkInputValidity(nameInput);
    toggleButtonState();
  });

  workInput.addEventListener("input", () => {
    checkInputValidity(workInput);
    toggleButtonState();
  });

  // 7. Add form submit handler
  profileForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    if (checkInputValidity(nameInput) && checkInputValidity(workInput)) {
      // Form submission logic here
    }
  });

  // 8. Run initial validation when form loads
  toggleButtonState();
}
