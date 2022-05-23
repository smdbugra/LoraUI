/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState, useMemo } from 'react';
import MapContainer from './MapContainer';
import { connect } from 'react-redux';
import { fetchSignal, getAllData } from '../actions';

const signalDetection = (props) => {
  const { fetchSignal, dataDevice, getAllData, dataCollection } = props;
  const [deviceDataState, setDeviceDataState] = useState([]);

  const deviceData = useMemo(
    () => deviceDataState[deviceDataState.length - 1],
    [deviceDataState]
  );

  useEffect(() => {
    getAllData();
    fetchSignal(() => {});
    setInterval(() => {
      fetchSignal(() => {});
    }, 10000);
  }, []);

  useEffect(() => {
    if (dataDevice.length > 0) {
      setDeviceDataState(dataDevice);
    }
  }, [dataDevice]);
  return (
    <div>
      <MapContainer collectionData={dataCollection} deviceData={deviceData} />;
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    dataDevice: Object.values(state.fetchDeviceData),
    dataCollection: Object.values(state.getAllCollectionData),
  };
};

export default connect(mapStateToProps, { fetchSignal, getAllData })(
  signalDetection
);
