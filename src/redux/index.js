import Config from 'react-native-config';
import axios from 'react-native-axios';
import * as weather from '../services/weather';
import * as action from '../services/actionTypes';

const weatherDataURL = 'https://api.openweathermap.org/data/2.5/weather';

export const currentCityForecast = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_CURRENT_CITY_FORECAST_SUCCESS':
      return action.data;
    case 'FETCH_CURRENT_CITY_FORECAST_FAILURE':
      return state;
    default:
      return state;
  }
};

export const currentWeatherForCity = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_CURRENT_WEATHER_FOR_CITY_SUCCESS':
      return action.data;
    case 'FETCH_CURRENT_WEATHER_FOR_CITY_FAILURE':
      return state;
    default:
      return state;
  }
};

export async function fetchWeatherData(city) {
  try {
    const response = await axios.get(weatherDataURL, {
      params: {
        q: city.value,
        APPID: Config.APPID,
      },
    });

    return {
      type: action.FETCH_CURRENT_WEATHER_FOR_CITY_SUCCESS,
      data: weather.mapModelToView(response.data),
    };
  } catch (err) {
    return {
      type: action.FETCH_CURRENT_WEATHER_FOR_CITY_FAILURE,
      data: err,
    };
  }
}
