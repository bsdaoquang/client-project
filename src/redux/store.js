/** @format */

const { configureStore } = require('@reduxjs/toolkit');
import authReducer from './reducers/authRecucer';

const store = configureStore({
	reducer: {
		auth: authReducer,
	},
});

export default store;
