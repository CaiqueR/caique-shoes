import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import reducers from './modules/rootReducer';

// Pegar todos os reducers do combineReducers para formar
// um objeto com todos os tipos para serem usados com react
export type RootState = ReturnType<typeof reducers>
const store = createStore(reducers, applyMiddleware(logger));

export default store;
