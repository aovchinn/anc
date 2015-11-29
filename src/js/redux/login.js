var createStore = require('redux')
	.createStore;

const SUBMIT = "SUBMIT";
const TOGGLE_REMEMBER_ME = "TOGGLE_REMEMBER_ME";
const SET_LOGIN = "SET_LOGIN";
const SET_PASSWORD = "SET_PASSWORD";
const WRONG_LOGIN_ERROR = "Email format is incorrect";
const EMPTY_LOGIN_ERROR = "Enter email";
const EMPTY_PASSWORD_ERROR = "Enter password";

function validateEmail(email) {
	var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
	return re.test(email);
}

function setLogin(login) {
	return {
	  type: SET_LOGIN,
    login: login
	};
}

function setPassword(password) {
	return {
		type: SET_PASSWORD,
		password: password
	};
}

function setRememberMe(checked) {
	return {
		type: TOGGLE_REMEMBER_ME,
		checked: checked
	};
}

function submit() {
	return {
		type: SUBMIT
	};
}

const initialState = {
	loading: false,
	rememberMe: false,
	login: "",
	password: "",
	errors: []
};

function loginApp(state, action) {
	if (!state) {
		return initialState;
	}
	switch (action.type) {
		case SET_LOGIN:
			return Object.assign({}, state, {
				login: action.login
			});
		case SET_PASSWORD:
			return Object.assign({}, state, {
				password: action.password
			});
		case TOGGLE_REMEMBER_ME:
			return Object.assign({}, state, {
				rememberMe: action.checked
			});
		case SUBMIT:
			var errors = [];
			var loading = false;
			if (state.login.length === 0) {
				errors.push(EMPTY_LOGIN_ERROR);
			} else if (!validateEmail(state.login)) {
				errors.push(WRONG_LOGIN_ERROR);
			}
			if (state.password.length === 0) {
				errors.push(EMPTY_PASSWORD_ERROR);
			}
			if (errors.length === 0) {
				loading = true;
			}
			return Object.assign({}, state, {
				errors: errors,
				loading: loading
			});
		default:
			return state;
	}
	return state;
}

var loginStore = createStore(loginApp);

module.exports = {
	getState: function() {
		return loginStore.getState();
	},
	setLogin: function(login) {
		return loginStore.dispatch(setLogin(login));
	},
	setPassword: function(password) {
		return loginStore.dispatch(setPassword(password));
	},
	setRememberMe: function(checked) {
		return loginStore.dispatch(setRememberMe(checked));
	},
	submit: function() {
		return loginStore.dispatch(submit());
	}
};
