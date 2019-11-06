import { notification } from "antd";

const u = window.localStorage.getItem("user");

const defaultState = {
  token: window.localStorage.getItem("token") || null,
  user: u ? JSON.parse(u) : null
};
export const SET_USER_TOKEN = "user/set-user-token";
export const SET_USER = "user/set-user";
export const SET_TOKEN = "user/set-token";
export const GET_CURRENT_USER = "user/get-current-user";
export const LOGOUT = "user/logout";
export const LOGOUT_SUCCESS = "user/logout_success";

const user = store => {
  store.on("@init", () => {
    if (defaultState.token && defaultState.user) {
      store.dispatch("request", {
        resourceType: "User",
        id: defaultState.user.id,
        success: SET_USER,
        error: {
          env: SET_USER_TOKEN,
          params: { token: null, user: null }
        }
      });
    }
    return defaultState;
  });
  store.on(SET_USER_TOKEN, (store, { token, user }) => {
    if (token) {
      window.localStorage.setItem("token", token);
    } else {
      window.localStorage.removeItem("token");
    }
    if (user) {
      window.localStorage.setItem("user", JSON.stringify(user));
    } else {
      window.localStorage.removeItem("user");
    }
    return { token, user };
  });
  store.on(SET_TOKEN, (store, token) => {
    if (token) {
      window.localStorage.setItem("token", token);
    } else {
      window.localStorage.removeItem("token");
    }
    return { token };
  });
  store.on(SET_USER, (store, user) => {
    if (user) {
      window.localStorage.setItem("user", JSON.stringify(user));
    } else {
      window.localStorage.removeItem("user");
    }
    return { user };
  });
  store.on(GET_CURRENT_USER, async s => {
    if (s.user && s.user.id) {
      store.dispatch("request", {
        resourceType: "User",
        id: s.user.id,
        success: SET_USER,
        error: {
          env: SET_USER_TOKEN,
          params: { token: null, user: null }
        }
      });
    }
  });
  store.on(LOGOUT, async s => {
    store.dispatch("request", {
      resourceType: "Session",
      method: "DELETE",
      success: LOGOUT_SUCCESS,
      error: LOGOUT_SUCCESS
    });
  });
  store.on(LOGOUT_SUCCESS, () => {
    notification.success({ message: "Вы вышли из системы" });
    store.dispatch(SET_USER_TOKEN, { token: null, user: null });
  });
};

export default user;
