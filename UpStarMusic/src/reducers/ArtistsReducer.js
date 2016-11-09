import {
  SEARCH_ARTISTS,
  FIND_ARTIST,
  RESET_ARTIST
} from '../actions/types';

const INITIAL_STATE = {
  all: [],
  offset: 0,
  limit: 20
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SEARCH_ARTISTS:
      return action.payload;
    case FIND_ARTIST:
      return { ...state, artist: action.payload };
    case RESET_ARTIST:
      return { ...state, artist: null };
    default:
      return state;
  }
};
