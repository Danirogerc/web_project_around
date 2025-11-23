import { UserInfo } from "./userinfo.js";

// Profile class: handles profile UI interactions
class Profile {
  constructor(selectors) {
    this._userInfo = new UserInfo(selectors);
  }

  // Initialize profile with name and job
  initialize({ name, job, avatar }) {
    this._userInfo.setUserInfo({ name, job, avatar });
  }

  setEventListeners() {}

  // Update profile information
  setUserInfo(name, job, avatar) {
    this._userInfo.setUserInfo({ name, job, avatar });
  }

  // Get current user information
  getUserInfo() {
    return this._userInfo.getUserInfo();
  }
}

export { Profile };
