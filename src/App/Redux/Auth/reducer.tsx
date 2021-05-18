import { deepClone } from '@Libs/helper';
import _ from 'lodash';

import {
  FETCH_LOGIN_USER_FAIL,
  FETCH_LOGIN_USER_RESET,
  FETCH_LOGIN_USER_STARTED,
  FETCH_LOGIN_USER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_RESET,
  LOGIN_STARTED,
  LOGIN_SUCCESS,
} from './actions';

// Login
export interface LoginStateProps {
  data?: any;
  isLoading?: boolean;
  error?: string;
}

const initialLoginState: LoginStateProps = {
  data: {},
  error: null,
  isLoading: false,
};

export const getInitialLoginState = () => deepClone(initialLoginState);

export const login = (state = getInitialLoginState(), action: any) => {
  switch (action.type) {
    case LOGIN_STARTED:
      return _.assignIn({}, state, {
        isLoading: true,
      });
    case LOGIN_SUCCESS:
      return _.assignIn({}, state, {
        data: action.payload,
        error: null,
        isLoading: false,
      });
    case LOGIN_FAIL:
      return _.assignIn({}, state, {
        // data: {},
        error: action.payload,
        isLoading: false,
      });
    case LOGIN_RESET:
      return getInitialLoginState();
    default:
      return state;
  }
};

// Login user

export interface LoginUserProps {
  data?: any;
  isLogin?: boolean;
  error?: string;
  isLoading?: boolean;
}

const initialLoginUserState: LoginUserProps = {
  data: {},
  isLogin: false,
  error: null,
  isLoading: false,
};

export const getInitialLoginUserState = () => deepClone(initialLoginUserState);

export const loginUser = (state = getInitialLoginUserState(), action: any) => {
  switch (action.type) {
    case FETCH_LOGIN_USER_STARTED:
      return _.assignIn({}, state, {
        isLoading: true,
      });
    case FETCH_LOGIN_USER_SUCCESS:
      return _.assignIn({}, state, {
        data: action.payload,
        error: null,
        isLoading: false,
        isLogin: true,
      });
    case FETCH_LOGIN_USER_FAIL:
      return _.assignIn({}, state, {
        // data: {},
        error: action.payload,
        isLoading: false,
      });
    case FETCH_LOGIN_USER_RESET:
      return getInitialLoginUserState();
    default:
      return state;
  }
};
