/** @format */

import axios from 'axios';

const axiosClient = axios.create();

axiosClient.interceptors.request.use(async (config) => {
	config.headers = {
		'Content-Type': 'application/json',
		...config.headers,
	};
	config.data;
	return config;
});

axiosClient.interceptors.response.use(
	(response) => {
		if (response.status === 200 && response.data) {
			return response.data;
		}

		return response;
	},
	(error) => {
		return error.response.data.message;
	}
);

export default axiosClient;
