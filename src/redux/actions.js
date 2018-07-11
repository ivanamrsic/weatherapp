import Config from 'react-native-config';
import axios from 'react-native-axios';
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

export async function fetchForcastForCity(cityName) {
  try {
    const response = await axios.get(constants.FORCAST_URL, {
      params: {
        q: cityName,
        APPID: Config.APPID,
      },
    });

    return {
      type: constants.FETCH_CITY_FORCAST_SUCCESS,
      data: response.data,
    };
  } catch (err) {
    return {
      type: constants.FETCH_CITY_FORCAST_FAILURE,
      data: err,
    };
  }
}

export function resetForcast() {
  return {
    type: constants.RESET_FORCAST,
    data: [],
  };
}

export async function fetchCurrentWeatherForCity(cityName) {
  try {
    const response = await axios.get(constants.WEATHER_DATA_URL, {
      params: {
        q: cityName,
        APPID: Config.APPID,
      },
    });

    return {
      type: constants.FETCH_CURRENT_WEATHER_FOR_CITY_SUCCESS,
      data: response.data,
    };
  } catch (err) {
    return {
      type: constants.FETCH_CURRENT_WEATHER_FOR_CITY_FAILURE,
      data: err,
    };
  }
}
