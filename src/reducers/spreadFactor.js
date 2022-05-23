/* eslint-disable import/no-anonymous-default-export */
import { SF_ERROR, SF_TABLE } from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case SF_TABLE:
      return { ...action.payload };
    case SF_ERROR:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
