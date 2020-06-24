import { ProductInterface } from '../../../pages/Home/ProductInterface';

export enum CartActionTypes {
  ADD_ITEM_TO_CART_REQUEST = '@cart/ADD_REQUEST',
  ADD_ITEM_TO_CART_SUCCESS = '@cart/ADD_SUCCESS',
  REMOVE_ITEM_FROM_CART = '@cart/REMOVE',
  UPDATE_ITEM_FROM_CART = '@cart/UPDATE'
}

export interface AddItemToCartActionRequest {
  type: CartActionTypes.ADD_ITEM_TO_CART_REQUEST,
  payload: number
}
export interface AddItemToCartAction {
  type: CartActionTypes.ADD_ITEM_TO_CART_SUCCESS,
  payload: ProductInterface
}

export interface RemoveItemToCartAction {
  type: CartActionTypes.REMOVE_ITEM_FROM_CART,
  payload: ProductInterface
}

export interface UpdateItemToCartAction {
  type: CartActionTypes.UPDATE_ITEM_FROM_CART,
  payload: { product: ProductInterface, amount?: number },
}

export type CartActions = AddItemToCartAction | RemoveItemToCartAction | UpdateItemToCartAction
