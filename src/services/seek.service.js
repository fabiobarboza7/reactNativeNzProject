import axios from './seek-api';

export const getTodayJobs = async () => {
  const { data } = await axios.get(`/`);
  return data;
};
