import Config from 'react-native-config';
import axios from 'react-native-axios';
import _ from 'lodash';

const WEATHER_DATA_URL = 'https://api.openweathermap.org/data/2.5/weather';
const WEATHER_IMAGE_URL = 'https://openweathermap.org/img/w/';
const FORCAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';
const IMAGE_EXTENSION = '.png';
const DEGREE_SIGN = '°';

function convertKelvinToCelsius(temperature) {
  return (temperature - 273.15).toFixed(0);
}

function mapModelToView(model) {
  const tempMin = convertKelvinToCelsius(_.get(model, 'main.temp_min')) + DEGREE_SIGN;
  const tempMax = convertKelvinToCelsius(_.get(model, 'main.temp_max')) + DEGREE_SIGN;
  const temp = convertKelvinToCelsius(_.get(model, 'main.temp')) + DEGREE_SIGN;

  return {
    temp,
    tempMin,
    tempMax,
    description: _.get(model, 'weather[0].main'),
    icon: _.get(model, 'weather[0].icon'),
    date: _.get(model, 'dt_txt'),
  };
}

export async function fetchWeatherData(city) {
  const response = await axios.get(WEATHER_DATA_URL, {
    params: {
      q: city.value,
      APPID: Config.APPID,
    },
  });

  return mapModelToView(response.data);
}

export function getIconURL(icon) {
  return WEATHER_IMAGE_URL + icon + IMAGE_EXTENSION;
}

export async function fetchWeatherForcastForCity(city) {
  const response = await axios.get(FORCAST_URL, {
    params: {
      q: city,
      APPID: Config.APPID,
    },
  });

  const filteredData = _.filter(response.data.list, o => o.dt_txt.includes('12:00:00'));

  const mappedData = _.map(filteredData, day => mapModelToView(day));

  return mappedData;
}
