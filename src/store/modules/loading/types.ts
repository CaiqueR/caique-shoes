import { ProductInterface } from '../../../pages/Home/ProductInterface';

export enum LoadActionsTypes {
  LOADING = '@load/LOADING',
  LOADED = '@load/LOADED',
  LOAD_ITENS = '@load/LOAD_ITENS',
}

export interface Loading {
  type: LoadActionsTypes.LOADING;
  payload: number;
}
export interface Loaded {
  type: LoadActionsTypes.LOADED;
  payload: number;
}

export interface LoadItens {
  type: LoadActionsTypes.LOAD_ITENS;
  payload: ProductInterface[];
}

export type LoadActions = Loaded | Loading | LoadItens;
