import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from './reducers';

const middlewares = applyMiddleware(thunk, logger);

function makeStore(initialState, options) {
  return createStore( reducer, middlewares );
}

export default makeStore;
