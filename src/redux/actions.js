import * as constants from './constants';

export function setCurrentCity(city) {
  return {
    type: constants.SET_CURRENT_CITY,
    data: city,
  };
}

export function resetCurrentCity() {
  return {
    type: constants.RESET_CURRENT_CITY,
    data: {},
  };
}

export function getCurrentCity(state) {
  return state.city;
}
