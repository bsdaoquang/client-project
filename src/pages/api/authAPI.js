/** @format */

import { appConfig } from '@/constants/appConfig';
import axiosClient from './axiosClient';

class AuthAPI {
	HandleAuthenticationAPI = async (url, data, method, isFile, onProgress) => {
		return await axiosClient(`${appConfig.BASE_API}/auth${url}`, {
			headers: {
				'Content-Type': isFile ? 'multipart/form-data' : 'application/json',
			},
			method: method ?? 'get',
			data: data ? (isFile ? data : JSON.stringify(data)) : undefined,
			onUploadProgress: onProgress ? onProgress : () => {},
		});
	};
}

const authenticationAPI = new AuthAPI();
export default authenticationAPI;
