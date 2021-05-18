import _ from 'lodash';

import { deepClone } from '@Libs/helper';
import { UPDATE_LAYOUT } from './action';

const initialLayoutState: any = {
  left: true,
  right: true,
};

export const getInitialLayoutState = () => deepClone(initialLayoutState);

export const layout = (state = getInitialLayoutState(), action: any) => {
  switch (action.type) {
    case UPDATE_LAYOUT:
      return _.assignIn({}, state, action.payload);
    default:
      return state;
  }
};
