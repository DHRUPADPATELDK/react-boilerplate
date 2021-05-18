import _ from 'lodash';

import { deepClone } from '@Libs/helper';
import { UPDATE_ROUTE } from './action';

const initialRouteState: any = {
  path: '',
  name: '',
  url: '',
  params: {},
  queryParam: {},
  isExact: false,
  history: [],
};

export const getInitialRouteState = () => deepClone(initialRouteState);

export const route = (state = getInitialRouteState(), action: any) => {
  switch (action.type) {
    case UPDATE_ROUTE:
      const prevState = deepClone(state);
      delete prevState.history;
      if (!state.history) {
        state.history = [];
      }
      try {
        state.history = [...state.history, prevState];
      } catch (e) {
        console.log(e);
      }
      return _.assignIn({}, state, action.payload);
    default:
      return state;
  }
};
