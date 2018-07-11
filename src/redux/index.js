import * as actionTypes from '../services/actionTypes';

const cityInformation = {};

export function setCurrentCity(city) {
  return {
    type: actionTypes.SET_CURRENT_CITY,
    data: city,
  };
}

export function fetchWeatherForecastForCity(city) {}

export const cityReducer = (state = cityInformation, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_CITY:
      return action.data;
    default:
      return state;
  }
};
