import axios from 'axios';
const instance = axios.create({
	baseURL: 'https://api.coingecko.com/api/v3',
	timeout: 1000,
});
export default instance;
