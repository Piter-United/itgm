import createStore from "storeon";

import user from "./user";
import request from "./request";
import community from "./community";
import activity from "./activity";

const store = createStore([
  request,
  user,
  community,
  activity,
  process.env.NODE_ENV !== "production" && require("storeon/devtools")
]);

export default store;
