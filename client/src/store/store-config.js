import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import rootReducers from './../reducer/index';

const middlewares = [thunk];

middlewares.push(logger);

const store = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(...middlewares)),
);
export default store;
