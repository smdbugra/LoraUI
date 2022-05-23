/* eslint-disable import/no-anonymous-default-export */
import _ from 'lodash';
import { CATCH_DATA, COLLECT_DATA, DELETE_SIGNAL } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case CATCH_DATA:
      // return { ...state, ..._.mapKeys(action.payload, 'id') };
      return { ...state, ...action.payload };
    case COLLECT_DATA:
      return { ...action.payload };
    case DELETE_SIGNAL:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
