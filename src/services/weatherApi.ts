import axios from 'axios';
import keys from '../configs/env';

const api = axios.create({
  baseURL: `http://api.openweathermap.org/data/2.5/weather`,
  params: {
    appid: keys.weatherKey,
    units: 'metric',
  },
});

export default api;
