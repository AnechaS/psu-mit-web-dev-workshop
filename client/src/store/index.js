import { applyMiddleware, compose, createStore } from 'redux';
import { persistStore } from 'redux-persist';
import { createLogger } from 'redux-logger';

import combinedReducers from '../reducers';

const enhancer = compose(applyMiddleware(createLogger()));

const store = createStore(combinedReducers, enhancer);

export const persistor = persistStore(store);

export default store;
