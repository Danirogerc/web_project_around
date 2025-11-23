//Section para manejar y render listas de items
class Section {
  //destructurar
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  //loop cada item en el array _items, call renderer() en cada item, append returned DOM element to container
  renderItems() {
    this._items.forEach((item) => {
      const element = this._renderer(item);
      this._container.append(element);
    });
  }
  //takes item and uses renderer to create a dom element, prepend and add to container
  addItem(item) {
    const element = this._renderer(item);
    this._container.prepend(element);
    return element;
  }
  setItems(items) {
    this._items = items;
  }
}
export { Section };
