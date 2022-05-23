import axios from 'axios';
import {
  CATCH_DATA,
  COLLECT_DATA,
  LOAD_DATA,
  LOAD_ERROR,
  DELETE_SIGNAL,
  SF_TABLE,
  SF_ERROR,
  SF_DISTANCES,
  ERROR_DISTANCES,
  GET_DATA,
  GET_DATA_ERROR,
  DELETE_COLLECTION_TABLE,
  GET_ALL_DATA,
} from './types';

export const fetchSignal = (callback) => async (dispatch) => {
  const response = await axios.get(
    'http://localhost:3080/api/device/get-all-device-data'
  );
  dispatch({
    type: CATCH_DATA,
    payload: response.data.data.allSignals,
  });
  callback();
};

export const getAllData = () => async (dispatch) => {
  const response = await axios.get(
    'http://localhost:3080/api/lora/get-all-data'
  );

  dispatch({
    type: GET_ALL_DATA,
    payload: response.data.data.allSignals,
  });
};

export const createSignal = (signalProp, callback) => async (dispatch) => {
  try {
    console.log(signalProp);
    await axios.post(
      'http://localhost:3080/api/lora/post-lora-data',
      signalProp
    );

    dispatch({
      type: LOAD_DATA,
      payload: 'SUCCESS',
    });
    callback();
  } catch (e) {
    dispatch({ type: LOAD_ERROR, payload: 'Something is wrong' });
  }
};

export const getAllSignalByDistanceAndSf =
  (sf, distance) => async (dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:3080/api/lora/spreadFactor/${sf}/distance/${distance}`
      );
      console.log(response);
      dispatch({
        type: GET_DATA,
        payload: response.data.data.signals,
      });
    } catch (err) {
      dispatch({
        type: GET_DATA_ERROR,
        payload: 'Something occure when signals get',
      });
    }
  };

export const deleteFromCollectionSignals = (id) => async (dispatch) => {
  await axios.delete(`http://localhost:3080/api/lora/delete/singal/${id}`);

  dispatch({
    type: DELETE_COLLECTION_TABLE,
    payload: id,
  });
};

export const spreadFactorNumbers = () => async (dispatch) => {
  try {
    const response = await axios.get(
      'http://localhost:3080/api/lora/get-sf-count'
    );

    dispatch({
      type: SF_TABLE,
      payload: response.data.data.table,
    });
  } catch (e) {
    dispatch({ type: SF_ERROR, payload: 'Something wrong with SF values' });
  }
};

export const distancesBySpreadFactor = (id) => async (dispatch) => {
  try {
    const response = await axios.get(
      `http://localhost:3080/api/lora/get-sf-count/${id}`
    );
    dispatch({
      type: SF_DISTANCES,
      payload: response.data.data.table,
    });
  } catch (e) {
    dispatch({
      type: ERROR_DISTANCES,
      payload: 'Something wrong with SF values',
    });
  }
};

export const getDataWithFeatures = (arraySignals, formProps) => {
  const distanceAndMeasurementLocation = {
    distance: Math.round(
      Math.sqrt(
        Math.pow(formProps.GatewayLat - formProps.IOTLat, 2) +
          Math.pow(formProps.GatewayLng - formProps.IOTLng, 2)
      )
    ),
    measureamentsPlace: formProps.measureamentsPlace,
  };
  const newArrayWithDistance = arraySignals.map((el) =>
    Object.assign(el, distanceAndMeasurementLocation)
  );
  newArrayWithDistance.forEach(function (item, index) {
    item.id = index;
  });
  console.log(newArrayWithDistance);
  return {
    type: COLLECT_DATA,
    payload: newArrayWithDistance,
  };
};

export const deleteSignal = (id) => {
  return {
    type: DELETE_SIGNAL,
    payload: id,
  };
};
