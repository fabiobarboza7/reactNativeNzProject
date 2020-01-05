import axios from './weather-api';

export const getWeather = async (lat, lon) => {
  const { data } = await axios.get(`/location/search/?lattlong=${lat},${lon}`);
  return data;
};

export const getCurrentWeather = async cityId => {
  const { data } = await axios.get(`/location/${cityId}`);
  return data;
};
