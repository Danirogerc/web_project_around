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
      avatar: this._avatarElement.src,
    };
  }

  // Public method to set user information
  setUserInfo({ name, job, avatar }) {
    if (name) this._nameElement.textContent = name;
    if (job) this._jobElement.textContent = job;
    if (avatar) this._avatarElement.src = avatar;
  }

  // Private method to initialize DOM elements
  _initElements() {
    const { nameSelector, jobSelector, avatarSelector } = this._selectors;

    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }
}

export { UserInfo };
