import { CartActions, CartActionTypes } from './types';
import { ProductInterface } from '../../../pages/Home/ProductInterface';

const INITIAL_STATE: ProductInterface[] = [];

function cart(state = INITIAL_STATE, action: CartActions) {
  switch (action.type) {
    case CartActionTypes.ADD_ITEM_TO_CART:
      return [...state, action.payload];
    default:
      return state;
  }
}

export default cart;
