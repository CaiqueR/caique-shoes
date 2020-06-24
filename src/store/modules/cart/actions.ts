import { ProductInterface } from '../../../pages/Home/ProductInterface';
import { CartActionTypes } from './types';

export const addItemToCartRequest = (id: number) => ({
  type: CartActionTypes.ADD_ITEM_TO_CART_REQUEST,
  payload: id,
});

export const addItemToCartSuccess = (product: ProductInterface) => ({
  type: CartActionTypes.ADD_ITEM_TO_CART_SUCCESS,
  payload: product,
});

export const removeItemFromCart = (id: ProductInterface) => ({
  type: CartActionTypes.REMOVE_ITEM_FROM_CART,
  payload: id,
});

export const updateItemFromCart = (id: ProductInterface, amount: number) => ({
  type: CartActionTypes.UPDATE_ITEM_FROM_CART,
  payload: { id, amount },
});
