import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

const sagaMiddleware = createSagaMiddleware();
const middleWares = [];
middleWares.push(sagaMiddleware);

if (process.env.NODE_ENV === 'development') {
  middleWares.push(logger);
}

// Pegar todos os reducers do combineReducers para formar
// um objeto com todos os tipos para serem usados com react
export type RootState = ReturnType<typeof rootReducer>
const store = createStore(rootReducer, applyMiddleware(...middleWares));

sagaMiddleware.run(rootSaga);

export default store;
