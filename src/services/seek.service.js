import axios from './seek-api';

export const getWeekJobs = async () => {
  const { data } = await axios.get(`/`);
  return data;
};

export const searchKeywordJobs = async keyword => {
  const { data } = await axios.get(`&keywords=${keyword}`);
  return data;
};
