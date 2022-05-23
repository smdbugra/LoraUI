import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import fetchDeviceData from './fetchDeviceData';
import createResponse from './createResponse';
import spreadFactor from './spreadFactor';
import spreadFactorDistances from './spreadFactorDistances';
import allDeviceData from './allDeviceData';
import getAllCollectionData from './getAllCollectionData';

export default combineReducers({
  form: formReducer,
  spreadFactor,
  fetchDeviceData,
  createResponse,
  spreadFactorDistances,
  allDeviceData,
  getAllCollectionData,
});
