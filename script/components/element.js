//Export
/* 
1) Exporta la clase Card para que pueda ser utilizada en otros archivos
2) Recibe data y templateSelector como parámetros
3) Asigna los valores de data a las propiedades de la clase
4) Obtiene la plantilla del DOM y la clona
5) Genera la tarjeta
6) Añade los event listeners
*/
export default class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  //método getTemplate obtiene la plantilla de la tarjeta del DOM
  /*
1) querySelector para encontrar la plantilla
2) Selecciona el elemento .element__element del DOM
3) Clona el elemento
4) Devuelve el elemento clonado
*/
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element__element")
      .cloneNode(true);

    return cardElement;
  }

  _toggleLike() {
    this._likeButton.classList.toggle("element__icono_active");
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector(".element__icono");
    this._likeButton.addEventListener("click", () => this._toggleLike());
  }

  //método generateCard, genera la tarjeta
  /*
1) Obtiene la plantilla llamando a getTemplate
2) Asigna los valores de data a las propiedades de la clase
3) Añade los event listeners
4) Devuelve el elemento clonado
*/
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const cardImage = this._element.querySelector(".element__image");
    const cardTitle = this._element.querySelector(".element__title");

    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;

    return this._element;
  }
}
