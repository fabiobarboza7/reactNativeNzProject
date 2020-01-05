import axios from 'axios';

export default axios.create({
  baseURL: `https://www.seek.co.nz/api/chalice-search/search?siteKey=NZ-Main&sourcesystem=houston&where=All+New+Zealand&page=1&seekSelectAllPages=true&daterange=1`,
});
