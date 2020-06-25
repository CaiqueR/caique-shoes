import { combineReducers } from 'redux';

import cart from './cart/reducer';
import load from './loading/reducer';

export default combineReducers({
  cart,
  load,
});
