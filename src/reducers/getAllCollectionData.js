/* eslint-disable import/no-anonymous-default-export */
import { GET_ALL_DATA } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_DATA:
      // return { ...state, ..._.mapKeys(action.payload, 'id') };
      return { state, ...action.payload };
    default:
      return state;
  }
};
