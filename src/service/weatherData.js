import Config from 'react-native-config';
import axios from 'react-native-axios';

function mapModelToView(model) {
  return {
    weather_description: model.weather[0].main,
    temp_min: model.main.temp_min,
    temp_max: model.main.temp_max,
    icon: model.weather[0].icon,
  };
}

export const convertKelvinToCelsius = temperature => (temperature - 273.15).toFixed(1);

export const fetchWeatherData = async city => {
  const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
    params: {
      q: city.value,
      APPID: Config.APPID,
    },
  });

  return mapModelToView(response.data);
};
