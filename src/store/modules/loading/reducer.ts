/* eslint-disable no-unused-expressions */
import { LoadActions, LoadActionsTypes } from './types';

const INITIAL_STATE: MapAny = {

};

interface MapAny { [key: number]: boolean; }

function load(state = INITIAL_STATE, action: LoadActions) {
  switch (action.type) {
    case LoadActionsTypes.LOAD_ITENS: {
      const itensMap: MapAny = action.payload.reduce(
        (current, item) => ({
          ...current,
          [item.id]: false,
        }),
        {},
      );
      return { ...state, ...itensMap };
    }
    case LoadActionsTypes.LOADING: {
      const newState = { ...state };
      newState[action.payload] = true;

      return newState;
    }
    case LoadActionsTypes.LOADED: {
      const newState = { ...state };
      newState[action.payload] = false;
      return newState;
    }

    default:
      return state;
  }
}

export default load;
