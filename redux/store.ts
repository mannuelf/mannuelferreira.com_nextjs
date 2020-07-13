import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import LogRocket from "logrocket";
import thunk from "redux-thunk";
import freeze from "redux-freeze";
import _ from "lodash";
import rootReducer from "./rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const logger = createLogger();
const middleWares = _.compact([
  thunk,
  freeze,
  logger,
  LogRocket.reduxMiddleware()
]);

let store;
store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleWares))
);

export default store;
