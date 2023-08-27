/** @format */

export class Validation {
	static email = (val) => {
		if (val.includes('@')) {
			return true;
		} else {
			return false;
		}
	};

	static password = (val) => {
		if (val.length < 6 || val.length > 18) {
			return false;
		} else {
			return true;
		}
	};
}
