import { defineStore } from "pinia";
import auth from "@/tools/Auth";

export const useAuthentication = defineStore("authentication", {
  state: () => ({
    user: auth.setUserInfo(),
    token: auth.getToken(),
    check: auth.check(),
  }),
  getters: {
    getUser() {
      return this.user;
    },
    getToken() {
      return this.token;
    },
    getUserName: (state) => {
      return state.user.name;
    },
  },
  actions: {
    setUser(user) {
      this.user = user;
      auth.setUserInfo(user);
    },
    updateUser(value) {
      this.user = value;
      /* Update local storage*/
      auth.setUserInfo(value);
    },
    setToken(token) {
      this.token = token;
      auth.saveToken(token);
    },
    clearAuth() {
      auth.removeToken();
      this.user = auth.getUserInfo();
      this.token = auth.getToken();
      this.check = auth.check();
    },
  },
});
