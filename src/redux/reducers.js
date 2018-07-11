import _ from 'lodash';
import * as constants from './constants';
import { currentCity, forcast, cities } from '.';
import * as weatherService from '../services/weather';

export const currentCityReducer = (state = currentCity, action) => {
  switch (action.type) {
    case constants.SET_CURRENT_CITY:
      return action.data;
    case constants.RESET_CURRENT_CITY:
      return {};
    default:
      return state;
  }
};

export const forcastReducer = (state = forcast, action) => {
  switch (action.type) {
    case constants.FETCH_CITY_FORCAST_SUCCESS: {
      const filteredData = _.filter(action.data.list, o => o.dt_txt.includes('12:00:00'));
      const mappedData = _.map(filteredData, day => weatherService.mapModelToView(day));

      return mappedData;
    }

    case constants.FETCH_CITY_FORCAST_FAILURE:
      return state;

    case constants.RESET_FORCAST:
      return action.data;

    default:
      return state;
  }
};

export const citiesReducer = (state = cities, action) => {
  const newCities = [];
  switch (action.type) {
    case constants.FETCH_CURRENT_WEATHER_FOR_CITY_SUCCESS: {
      const weather = weatherService.mapModelToView(action.data);

      for (let i = 0; i < state.length; i += 1) {
        if (state[i].value === weather.cityName) {
          newCities[i] = Object.assign({
            currentWeather: weather,
            key: state[i].key,
            value: state[i].value,
          });
        } else {
          newCities[i] = Object.assign(state[i]);
        }
      }

      return newCities;
    }

    case constants.FETCH_CURRENT_WEATHER_FOR_CITY_FAILURE:
      return state;
    default:
      return state;
  }
};
