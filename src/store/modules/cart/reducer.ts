/* eslint-disable no-unused-expressions */
import { CartActions, CartActionTypes } from './types';
import { ProductInterface } from '../../../pages/Home/ProductInterface';

const INITIAL_STATE: ProductInterface[] = [];

function cart(state = INITIAL_STATE, action: CartActions) {
  switch (action.type) {
    case CartActionTypes.ADD_ITEM_TO_CART_SUCCESS: {
      const productIndex = state.findIndex((product) => product.id === action.payload.id);
      const product = state[productIndex];

      if (product) {
        const newState = [...state];
        product.amount += 1;
        newState.splice(productIndex, 1, product);
        return newState;
      }
      return [...state, { ...action.payload, amount: 1 }];
    }
    case CartActionTypes.REMOVE_ITEM_FROM_CART: {
      const productIndex = state.findIndex((product) => product.id === action.payload.id);
      return state.filter((product) => product !== state[productIndex]);
    }
    case CartActionTypes.UPDATE_ITEM_FROM_CART: {
      const productIndex = state.findIndex((product) => product.id === action.payload.product.id);
      const product = state[productIndex];

      const newState = [...state];
      product.amount = action.payload.amount || 0;
      return newState;
    }
    default:
      return state;
  }
}

export default cart;
