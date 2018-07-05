import Config from 'react-native-config';
import axios from 'react-native-axios';
import _ from 'lodash';

const weatherDataURL = 'https://api.openweathermap.org/data/2.5/weather';
const weatherImageURL = 'https://openweathermap.org/img/w/';
const imageExtension = '.png';

function convertKelvinToCelsius(temperature) {
  return (temperature - 273.15).toFixed(1);
}

function mapModelToView(model) {
  return {
    description: _.get(model, 'weather[0].main'),
    tempMin: convertKelvinToCelsius(_.get(model, 'main.temp_min')),
    tempMax: convertKelvinToCelsius(_.get(model, 'main.temp_max')),
    icon: _.get(model, 'weather[0].icon'),
  };
}

export const fetchWeatherData = async city => {
  const response = await axios.get(weatherDataURL, {
    params: {
      q: city.value,
      APPID: Config.APPID,
    },
  });

  return mapModelToView(response.data);
};

export const getIconURL = icon => weatherImageURL + icon + imageExtension;
