/* eslint-disable import/no-anonymous-default-export */
import _ from 'lodash';
import {
  DELETE_COLLECTION_TABLE,
  GET_DATA,
  GET_DATA_ERROR,
} from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case GET_DATA:
      return { state, ..._.mapKeys(action.payload, '_id') };
    case DELETE_COLLECTION_TABLE:
      return _.omit(state, action.payload);
    case GET_DATA_ERROR:
      return { state, message: action.payload };
    default:
      return state;
  }
}
