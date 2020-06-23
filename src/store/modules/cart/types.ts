import { ProductInterface } from '../../../pages/Home/ProductInterface';

export enum CartActionTypes {
  ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART',
  REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART'
}

export interface AddItemToCartAction {
  type: CartActionTypes.ADD_ITEM_TO_CART,
  payload: ProductInterface
}

export interface RemoveItemToCartAction {
  type: CartActionTypes.REMOVE_ITEM_FROM_CART,
  payload: ProductInterface
}

export type CartActions = AddItemToCartAction | RemoveItemToCartAction
