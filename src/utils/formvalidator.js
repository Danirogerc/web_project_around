class FormValidator {
  constructor(config, formElement) {
    this.config = config;
    this.formElement = formElement;
    this.inputs = Array.from(
      this.formElement.querySelectorAll(this.config.inputSelector)
    );
    this.submitButton = this.formElement.querySelector(
      this.config.submitButtonSelector
    );
  }

  enableValidation() {
    this.#setupEventListeners();
    this.#toggleButtonState();
  }

  #setupEventListeners() {
    this.inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this.#checkInputValidity(input);
        this.#toggleButtonState();
      });
    });
  }

  #checkInputValidity(inputElement) {
    if (!inputElement.value) {
      this.#showInputError(inputElement, "Este campo es obligatorio.");
      return false;
    }

    // Apply specific validation rules based on input name
    const validationRules =
      this.config.validationRules?.[inputElement.name] || [];

    // If no validation rules exist, use getErrorMessage for validation
    const isValid =
      validationRules.length === 0
        ? this.#getErrorMessage(inputElement) === "Campo inválido"
        : validationRules.every((rule) => rule(inputElement.value));

    if (isValid) {
      this.#hideInputError(inputElement);
      return true;
    } else {
      const errorMessage = this.#getErrorMessage(inputElement);
      this.#showInputError(inputElement, errorMessage);
      return false;
    }
  }

  #isFormValid() {
    return this.inputs.every((input) => this.#checkInputValidity(input));
  }

  #showInputError(inputElement, errorMessage) {
    const errorElement = this.formElement.querySelector(
      `.${this.config.errorClass}_type_${inputElement.name}`
    );

    // Add error styling to input
    inputElement.classList.add(this.config.inputErrorClass);
    inputElement.style.borderBottomColor = "#FF0000";

    // Show error message if error element exists
    if (errorElement) {
      errorElement.textContent = errorMessage;
      errorElement.style.display = "block";
      errorElement.style.color = "#FF0000";
    }
  }

  #hideInputError(inputElement) {
    const errorElement = this.formElement.querySelector(
      `.${this.config.errorClass}_type_${inputElement.name}`
    );

    // Remove error styling from input
    inputElement.classList.remove(this.config.inputErrorClass);
    inputElement.style.borderBottomColor = "";

    // Hide error message
    if (errorElement) {
      errorElement.textContent = "";
      errorElement.style.display = "none";
    }
  }

  #getErrorMessage(inputElement) {
    const value = inputElement.value;

    // Profile form validations
    if (this.config.formType === "profile") {
      if (inputElement.name === "name") {
        if (value.length < 2) {
          return "El nombre debe tener al menos 2 caracteres.";
        } else if (value.length > 40) {
          return "El nombre no puede tener más de 40 caracteres.";
        }
      } else if (inputElement.name === "work") {
        if (value.length < 2) {
          return "La ocupación debe tener al menos 2 caracteres.";
        } else if (value.length > 200) {
          return "La ocupación no puede tener más de 200 caracteres.";
        }
      }
    }

    // Add card form validations
    if (this.config.formType === "addCard") {
      if (inputElement.name === "cardTitle") {
        if (value.length < 2) {
          return "El título debe tener al menos 2 caracteres.";
        } else if (value.length > 30) {
          return "El título no puede tener más de 30 caracteres.";
        }
      } else if (inputElement.name === "cardLink") {
        if (!this.#isValidUrl(value)) {
          return "Por favor, introduzca una URL válida.";
        }
      }
    }

    // Avatar form validations
    if (this.config.formType === "avatar") {
      if (inputElement.name === "avatar") {
        if (!this.#isValidUrl(value)) {
          return "Por favor, introduzca una URL válida.";
        }
      }
    }

    return "Campo inválido";
  }

  #isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  }

  #toggleButtonState() {
    const isValid = this.inputs.every((input) =>
      this.#checkInputValidity(input)
    );

    if (isValid) {
      this.submitButton.disabled = false;
      this.submitButton.classList.remove(this.config.buttonDisabledClass);
      this.submitButton.style.cursor = "pointer";
      this.submitButton.style.opacity = "1";
    } else {
      this.submitButton.disabled = true;
      this.submitButton.classList.add(this.config.buttonDisabledClass);
      this.submitButton.style.cursor = "not-allowed";
      this.submitButton.style.opacity = "0.6";
    }
  }
}

// Configuration objects for different form types
const profileFormConfig = {
  formType: "profile",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-container", // Keep this as is
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error",
  buttonDisabledClass: "popup__button_disabled",
};

const addCardFormConfig = {
  formType: "addCard",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-container", // Keep this as is
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error",
  buttonDisabledClass: "popup__button_disabled",
};

const avatarFormConfig = {
  formType: "avatar",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-container",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error",
  buttonDisabledClass: "popup__button_disabled",
};

function enableValidation() {
  // Profile form validation
  const profileForm = document.querySelector(".popup__form_type_edit");
  if (profileForm) {
    const profileValidator = new FormValidator(profileFormConfig, profileForm);
    profileValidator.enableValidation();
  }

  // Add Card form validation
  const addCardForm = document.querySelector(".popup__form_type_add");
  if (addCardForm) {
    const addCardValidator = new FormValidator(addCardFormConfig, addCardForm);
    addCardValidator.enableValidation();
  }

  // Avatar form validation
  const avatarForm = document.querySelector(".popup__form_type_avatar");
  if (avatarForm) {
    const avatarValidator = new FormValidator(avatarFormConfig, avatarForm);
    avatarValidator.enableValidation();
  }
}

export { enableValidation, FormValidator };
