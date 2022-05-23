/* eslint-disable import/no-anonymous-default-export */
import { SF_DISTANCES, ERROR_DISTANCES } from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case SF_DISTANCES:
      return { ...action.payload };
    case ERROR_DISTANCES:
      return { state, ...action.payload };
    default:
      return state;
  }
}
