import Config from 'react-native-config';
import axios from 'react-native-axios';

function convertKelvinToCelsius(temperature) {
  return (temperature - 273.15).toFixed(1);
}

function mapModelToView(model) {
  return {
    weather_description: model.weather[0].main,
    temp_min: convertKelvinToCelsius(model.main.temp_min),
    temp_max: convertKelvinToCelsius(model.main.temp_max),
    icon: model.weather[0].icon,
  };
}

export const fetchWeatherData = async city => {
  const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
    params: {
      q: city.value,
      APPID: Config.APPID,
    },
  });

  return mapModelToView(response.data);
};
