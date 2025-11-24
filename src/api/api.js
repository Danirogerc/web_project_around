import { API_BASE_URL, API_TOKEN } from "../config/env.js";

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  //request path
  _request(path, options = {}) {
    const opts = {
      headers: this._headers,
      ...options,
      headers: { ...this._headers, ...(options.headers || {}) },
    };

    //logging
    console.group(`API Request: ${options.method || "GET"} ${path}`);
    console.log("Full URL:", `${this._baseUrl}${path}`);
    console.log("Headers:", opts.headers);
    if (opts.body) {
      try {
        console.log("Body:", JSON.parse(opts.body));
      } catch (e) {
        console.log("Body (raw):", opts.body);
      }
    }
    console.groupEnd();

    return fetch(`${this._baseUrl}${path}`, opts).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Error: ${res.status}`);
      }
    });
  }

  //Users
  getUserInfo() {
    return this._request("/users/me");
  }
  updateUserInfo({ name, about }) {
    return this._request("/users/me", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, about }),
    });
  }
  updateAvatar({ avatar }) {
    return this._request("/users/me/avatar", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ avatar }),
    });
  }

  //cards
  getInitialCards() {
    return this._request("/cards/");
  }

  addCard({ name, link }) {
    return this._request("/cards/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, link }),
    });
  }

  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, { method: "DELETE" });
  }

  addLike(cardId) {
    return this._request(`/cards/${cardId}/likes`, { method: "PUT" });
  }

  removeLike(cardId) {
    return this._request(`/cards/${cardId}/likes`, { method: "DELETE" });
  }

  // Carga inicial conjunta
  getAppData() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }
} // end of api class
export const api = new Api({
  baseUrl: API_BASE_URL,
  headers: {
    authorization: API_TOKEN,
    "Content-Type": "application/json",
  },
});
