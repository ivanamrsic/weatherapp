import * as constants from './constants';
import initialState from '.';

export const cityReducer = (state = initialState.city, action) => {
  switch (action.type) {
    case constants.SET_CURRENT_CITY:
      return action.data;
    case constants.RESET_CURRENT_CITY:
      return {};
    default:
      return state;
  }
};
