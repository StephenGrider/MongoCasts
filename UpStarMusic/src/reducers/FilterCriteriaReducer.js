import {
  SET_AGE_RANGE,
  SET_YEARS_ACTIVE_RANGE
} from '../actions/types';

const INITIAL_STATE = {
  age: { min: 0, max: 100 }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_AGE_RANGE:
      return { ...state, age: action.payload };
    case SET_YEARS_ACTIVE_RANGE:
      return { ...state, yearsActive: action.payload };
    default:
      return state;
  }
};
