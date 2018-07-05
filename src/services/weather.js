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

async function fetchWeatherData(city) {
  const response = await axios.get(weatherDataURL, {
    params: {
      q: city.value,
      APPID: Config.APPID,
    },
  });

  return mapModelToView(response.data);
}

function getIconURL(icon) {
  return weatherImageURL + icon + imageExtension;
}

export const fetchWeatherForcastForCity = async (city, completation) => {
  const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
    params: {
      q: 'Zagreb',
      APPID: Config.APPID,
    },
  });

  completation(_.filter(response.data.list, o => o.dt_txt.includes('12:00:00')));
};

function mapModelForecastToView(model) {
  return {
    forecast: model.list,
  };
}
