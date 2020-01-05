import axios from './currency-api';

export const conversion = async (amount, from, to) => {
  const { data } = await axios.get(
    `/latest?amount=${amount.toString()}&from=${from}&to=${to}`
  );

  return data;
};
