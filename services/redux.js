const { createStore } = require("redux");

const saveAccessToken = (state = "", action) => {
  switch (action.type) {
    case "SAVE_TOKEN":
      return action.payload;
    default:
      return state;
  }
};

let store = createStore(saveAccessToken);

module.exports = store;
