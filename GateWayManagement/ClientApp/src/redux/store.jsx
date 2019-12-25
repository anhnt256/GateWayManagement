/* eslint-disable */
import { compose, createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { autoRehydrate } from 'redux-persist';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './rootReducer';

const loggerMiddleware = createLogger();
const rehydrate = autoRehydrate();

const store = createStore(
  rootReducer,
  undefined,
  compose(applyMiddleware(thunkMiddleware), applyMiddleware(loggerMiddleware), rehydrate),
);

export default store;
