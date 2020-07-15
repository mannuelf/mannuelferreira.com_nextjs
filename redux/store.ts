import { applyMiddleware, createStore } from 'redux';
import { MakeStore, createWrapper, Context } from 'next-redux-wrapper';
import { createLogger } from 'redux-logger';
import LogRocket from 'logrocket';
import thunk from 'redux-thunk';
import freeze from 'redux-freeze';
import _ from 'lodash';
import { rootReducer, InitialState } from './rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const logger = createLogger();

const middleWares = _.compact([
  thunk,
  freeze,
  logger,
  LogRocket.reduxMiddleware(),
]);

export const makeStore: MakeStore<InitialSate> = (context: Context) =>
  createStore(rootReducer, applyMiddleware(...middleWares));

export const wrapper = createWrapper<State>(makeStore, { debug: true });
