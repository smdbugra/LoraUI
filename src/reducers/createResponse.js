/* eslint-disable import/no-anonymous-default-export */
import { LOAD_ERROR, LOAD_DATA } from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case LOAD_DATA:
      return { ...state, message: action.payload };
    case LOAD_ERROR:
      return { ...state, message: action.payload };
    default:
      return state;
  }
}
