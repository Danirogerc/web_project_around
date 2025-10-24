// UserInfo class: handles user data management
class UserInfo {
  constructor(selectors) {
    this._selectors = selectors;
    this._initElements();
  }

  // Public method to get current user information
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
    };
  }

  // Public method to set user information
  setUserInfo(name, job) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
  }

  // Private method to initialize DOM elements
  _initElements() {
    const { nameSelector, jobSelector } = this._selectors;

    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
  }
}

export { UserInfo };
