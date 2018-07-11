import _ from 'lodash';

const WEATHER_IMAGE_URL = 'https://openweathermap.org/img/w/';
const IMAGE_EXTENSION = '.png';
const DEGREE_SIGN = '°';

function convertKelvinToCelsius(temperature) {
  return (temperature - 273.15).toFixed(0);
}

export function mapModelToView(model) {
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
    cityName: _.get(model, 'name'),
  };
}

export function getIconURL(icon) {
  return WEATHER_IMAGE_URL + icon + IMAGE_EXTENSION;
}
