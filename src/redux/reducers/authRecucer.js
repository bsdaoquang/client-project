/** @format */

import { createSlice } from '@reduxjs/toolkit';

/** @format */
export const authSlice = createSlice({
	name: 'auth',
	initialState: {
		authData: {
			id: '',
			accesstoken: '',
			emai: '',
		},
	},
	reducers: {
		addAuth: (state, action) => {
			state.authData = action.payload;
		},

		removeAuth: (state) => {
			state.authData = {
				id: '',
				accesstoken: '',
				emai: '',
			};
		},
	},
});

export const { addAuth, removeAuth } = authSlice.actions;

export default authSlice.reducer;
