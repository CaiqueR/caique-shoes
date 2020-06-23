import { ProductInterface } from '../../../pages/Home/ProductInterface';
import { CartActionTypes } from './types';

export const addItemToCart = (product: ProductInterface) => ({
  type: CartActionTypes.ADD_ITEM_TO_CART,
  payload: product,
});

export const removeItemFromCart = (product: ProductInterface) => ({
  type: CartActionTypes.REMOVE_ITEM_FROM_CART,
  payload: product,
});
