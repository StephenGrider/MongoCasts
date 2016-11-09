import _ from 'lodash';
import {
  SELECT_ARTIST,
  DESELECT_ARTIST,
  RESET_SELECTION
} from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case SELECT_ARTIST:
      return [...state, action.payload];
    case DESELECT_ARTIST:
      return _.without(state, action.payload);
    case RESET_SELECTION:
      return [];
    default:
      return state;
  }
};
