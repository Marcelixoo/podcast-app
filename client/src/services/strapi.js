import axios from 'axios';

const strapiApi = axios.create({
  baseURL: 'http://localhost:1337'
});

export default strapiApi;