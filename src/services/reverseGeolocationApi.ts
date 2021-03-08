import axios from 'axios';
import keys from '../configs/env';

const api = axios.create({
  baseURL: `https://us1.locationiq.com/v1/reverse.php?&format=json`,
  params: {
    key: keys.reverseGeolocationKey,
  },
});

export default api;
