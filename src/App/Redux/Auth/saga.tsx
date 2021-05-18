import { put, takeEvery } from 'redux-saga/effects';

import {
  DO_LOGIN,
  FETCH_LOGIN_USER,
  fetchLoginUserFail,
  fetchLoginUserReset,
  fetchLoginUserStarted,
  fetchLoginUserSuccess,
  loginFail,
  loginStarted,
  loginSuccess,
  LOGOUT_USER,
} from './actions';

// Login
export function* sagaDoLogin(action: any) {
  yield put(loginStarted());
  try {
    // LOGIN API CALL SET HERE Below Dummy Data Into Login Success Action
    const data = { isLoggedIn: true };
    yield put(loginSuccess(data));
  } catch (e) {
    yield put(loginFail(e.message));
  }
}

// Fetch Login User
export function* sagaFetchLoginUser(action: any) {
  yield put(fetchLoginUserStarted());
  try {
    // GET LOGIN USER API CALL SET HERE Below Dummy Data Into Login Success Action
    const data = { _id: '1', name: 'John Doe' };
    yield put(fetchLoginUserSuccess(data));
  } catch (e) {
    yield put(fetchLoginUserFail(e.message));
  }
}

// Logout User
export function* sagaLogoutUser(action: any) {
  try {
    yield put(fetchLoginUserReset());
    // LOGOUT API CALL SET HERE
  } catch (e) {}
}

export default function* rootSaga() {
  // Login
  yield takeEvery(DO_LOGIN, sagaDoLogin);
  // Fetch Login User
  yield takeEvery(FETCH_LOGIN_USER, sagaFetchLoginUser);
  // Logout User
  yield takeEvery(LOGOUT_USER, sagaLogoutUser);
}
