import axios from 'axios';

const api = axios.create({
  baseURL: 'https://x8ki-letl-twmt.n7.xano.io/api:FEqbEpBj',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
