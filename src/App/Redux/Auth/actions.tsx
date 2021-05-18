// Login
export const DO_LOGIN = 'DO_LOGIN';
export const LOGIN_STARTED = 'LOGIN_STARTED';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGIN_RESET = 'LOGIN_RESET';

export const doLogin = (data: any) => ({
  type: DO_LOGIN,
  payload: data,
});

export const loginStarted = () => ({
  type: LOGIN_STARTED,
});

export const loginSuccess = (data: any) => ({
  type: LOGIN_SUCCESS,
  payload: data,
});

export const loginFail = (error: any) => ({
  type: LOGIN_FAIL,
  payload: error,
});

export const loginReset = () => ({
  type: LOGIN_RESET,
});

// Login user
export const FETCH_LOGIN_USER = 'FETCH_LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const FETCH_LOGIN_USER_STARTED = 'FETCH_LOGIN_USER_STARTED';
export const FETCH_LOGIN_USER_SUCCESS = 'FETCH_LOGIN_USER_SUCCESS';
export const FETCH_LOGIN_USER_FAIL = 'FETCH_LOGIN_USER_FAIL';
export const FETCH_LOGIN_USER_RESET = 'FETCH_LOGIN_USER_RESET';

export const fetchLoginUser = (data: any = {}) => ({
  type: FETCH_LOGIN_USER,
  payload: data,
});

export const fetchLoginUserStarted = () => ({
  type: FETCH_LOGIN_USER_STARTED,
});

export const fetchLoginUserSuccess = (data: any) => ({
  type: FETCH_LOGIN_USER_SUCCESS,
  payload: data,
});

export const fetchLoginUserFail = (error: any) => ({
  type: FETCH_LOGIN_USER_FAIL,
  payload: error,
});

export const fetchLoginUserReset = () => ({
  type: FETCH_LOGIN_USER_RESET,
});

export const logoutUser = (data: any) => ({
  type: LOGOUT_USER,
  payload: data,
});
