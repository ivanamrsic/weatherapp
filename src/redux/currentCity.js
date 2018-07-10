import * as actionTypes from '../services/actionTypes';

const currentCity = (state = '', action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_CITY:
      return action.data;
    default:
      return state;
  }
};

export default currentCity;
