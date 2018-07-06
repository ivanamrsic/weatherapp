import Config from 'react-native-config';
import axios from 'react-native-axios';
import _ from 'lodash';

const weatherDataURL = 'https://api.openweathermap.org/data/2.5/weather';
const weatherImageURL = 'https://openweathermap.org/img/w/';
const imageExtension = '.png';
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const degreeSign = '°';

function convertKelvinToCelsius(temperature) {
  return (temperature - 273.15).toFixed(0);
}

function mapModelToView(model) {
  return {
    description: _.get(model, 'weather[0].main'),
    tempMin: convertKelvinToCelsius(_.get(model, 'main.temp_min')) + degreeSign,
    tempMax: convertKelvinToCelsius(_.get(model, 'main.temp_max')) + degreeSign,
    icon: _.get(model, 'weather[0].icon'),
    temp: convertKelvinToCelsius(_.get(model, 'main.temp')) + degreeSign,
    date: _.get(model, 'dt_txt'),
  };
}

export async function fetchWeatherData(city) {
  const response = await axios.get(weatherDataURL, {
    params: {
      q: city.value,
      APPID: Config.APPID,
    },
  });

  return mapModelToView(response.data);
}

export function getIconURL(icon) {
  return weatherImageURL + icon + imageExtension;
}

function mapModelForecastToView(model) {
  return _.map(model, mapModelToView);
}

export const fetchWeatherForcastForCity = async (city, completation) => {
  const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
    params: {
      q: city,
      APPID: Config.APPID,
    },
  });

  completation(
    mapModelForecastToView(_.filter(response.data.list, o => o.dt_txt.includes('12:00:00')))
  );
};

export function getDayNameFromDate(date) {
  const day = new Date(date).getDay();
  return days[day];
}
