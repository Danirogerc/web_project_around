/*Encapsulation - Keep all popup logic in one class
Reusability - Same class works for all popups (edit, add card, image)
User Experience - Multiple ways to close (button, overlay, ESC key)
Memory Management - Properly handle event listeners*/

class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this.close = this.close.bind(this);
  }
  open() {
    //show popup
    this._popupElement.classList.remove("popup_hidden");
    document.addEventListener("keydown", this._handleEscClose);
  }
  close() {
    //hide popup
    this._popupElement.classList.add("popup_hidden");
    document.removeEventListener("keydown", this._handleEscClose);
  }
  _handleEscClose(event) {
    //Private method for ESC
    if (event.key === "Escape") {
      this.close();
    }
  }
  setEventListeners() {
    //Add eLi
    const closeButton = this._popupElement.querySelector(".popup__close");
    closeButton.addEventListener("click", this.close);

    const overlay = this._popupElement.querySelector(".popup__overlay");
    overlay.addEventListener("click", this.close);
  }
}

export { Popup };
