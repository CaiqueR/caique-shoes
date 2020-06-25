import { LoadActionsTypes } from './types';
import { ProductInterface } from '../../../pages/Home/ProductInterface';

export const setItensToLoad = (products: ProductInterface[]) => ({
  type: LoadActionsTypes.LOAD_ITENS,
  payload: products,
});

export const setLoading = (productId: number) => ({
  type: LoadActionsTypes.LOADING,
  payload: productId,
});

export const setLoaded = (productId: number) => ({
  type: LoadActionsTypes.LOADED,
  payload: productId,

});
