import {
  call, put, all, takeLatest,
} from 'redux-saga/effects';
import { AnyAction } from 'redux';

import api from '../../../services/api';
import { addItemToCartSuccess } from './actions';
import { CartActionTypes } from './types';
import { setLoading, setLoaded } from '../loading/actions';

function* addCart({ payload: id }: AnyAction) {
  yield put(setLoading(id));
  const response = yield call(api.get, `/products/${id}`);

  yield put(setLoaded(id));
  yield put(addItemToCartSuccess(response.data));
}

export default all([
  takeLatest(CartActionTypes.ADD_ITEM_TO_CART_REQUEST, addCart),
]);
