import axios from 'axios';

export default axios.create({
  baseURL: `https://www.metaweather.com/api`,
});
