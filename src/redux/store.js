import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import rootReducer from './root-reducer';

const middelWares = [logger]; 

const store = createStore(rootReducer, applyMiddleware(...middelWares));

export default store;