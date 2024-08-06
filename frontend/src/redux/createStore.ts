import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import rootReducer from './rootReducer';
import { thunk } from 'redux-thunk';

export const middleware = [thunk, logger];
export const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;