import _ from 'lodash';
import * as constants from './constants';
import * as weatherService from '../services/weather';

const FORCAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';
const WEATHER_DATA_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const currentCityReducer = (state = {}, action) => {
  switch (action.type) {
    case constants.SET_CURRENT_CITY:
      return action.data;
    case constants.RESET_CURRENT_CITY:
      return {};
    default:
      return state;
  }
};

export const forcastReducer = (state = [], action) => {
  switch (action.type) {
    case constants.FETCH_CITY_FORCAST_SUCCESS: {
      const filteredData = _.filter(action.data.list, o => o.dt_txt.includes('12:00:00'));
      const mappedData = _.map(filteredData, day => weatherService.mapModelToView(day));

      return mappedData;
    }

    case constants.FETCH_CITY_FORCAST_FAILURE:
      return state;

    case constants.RESET_FORCAST:
      return [];

    default:
      return state;
  }
};

const cities = [
  {
    key: 1,
    value: 'Zagreb',
    currentWeather: {},
    isLoading: false,
  },
  {
    key: 2,
    value: 'Split',
    currentWeather: {},
    isLoading: false,
  },
  {
    key: 3,
    value: 'Rijeka',
    currentWeather: {},
    isLoading: false,
  },
  {
    key: 4,
    value: 'Osijek',
    currentWeather: {},
    isLoading: false,
  },
];

export const citiesReducer = (state = cities, action) => {
  switch (action.type) {
    case constants.FETCH_CURRENT_WEATHER_FOR_CITY_SUCCESS: {
      const weather = weatherService.mapModelToView(action.data);

      return _.map(state, city => {
        if (city.value !== weather.cityName) {
          return city;
        }
        return { ...city, currentWeather: weather, isLoading: false };
      });
    }

    case constants.FETCH_CURRENT_WEATHER_FOR_CITY_FAILURE:
      return state;

    case constants.TOGGLE_IS_LOADING: {
      return _.map(state, city => {
        if (city.value !== action.data) {
          return city;
        }

        const isLoading = _.get(city, 'isLoading');

        return { ...city, isLoading: !isLoading };
      });
    }

    default:
      return state;
  }
};
