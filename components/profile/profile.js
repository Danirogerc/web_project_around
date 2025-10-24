import { UserInfo } from "./userinfo.js";

// Profile class: handles profile UI interactions
class Profile {
  constructor(selectors) {
    this._userInfo = new UserInfo(selectors);
  }

  // Initialize profile with name and job
  initialize(name, job) {
    this._userInfo.setUserInfo(name, job);
  }

  setEventListeners() {}

  // Update profile information
  setUserInfo(name, job) {
    this._userInfo.setUserInfo(name, job);
  }

  // Get current user information
  getUserInfo() {
    return this._userInfo.getUserInfo();
  }
}

export { Profile };
