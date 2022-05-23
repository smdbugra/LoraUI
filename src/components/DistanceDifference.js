/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { reduxForm, Field } from 'redux-form';

function renderError({ error, touched }) {
  if (touched && error) {
    return (
      <div className="ui error message" style={{ width: '100%' }}>
        <div className="header">{error}</div>
      </div>
    );
  }
}

const renderInput = ({ input, label, meta }) => {
  const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
  return (
    <div
      className={`form-group ${className}`}
      style={{
        width: '284.23px',
      }}
    >
      <label>{label}</label>
      <input className="form-control bg-light" {...input} autoComplete="off" />
      {renderError(meta)}
    </div>
  );
};

const DistanceDifference = (props) => {
  const { intersection } = props;
  const [deviceLocation, setDeviceLocation] = useState();
  const [distance, setDistance] = useState();

  useEffect(() => {
    if (deviceLocation)
      setDistance(
        Math.sqrt(
          Math.pow(deviceLocation.DeviceLat - intersection.lat, 2) +
            Math.pow(deviceLocation.DeviceLng - intersection.lng, 2)
        )
      );
  }, [intersection]);

  const renderDeviationInfo = () => {
    if (distance && deviceLocation && intersection) {
      return (
        <div className="container">
          <div className="row justify-content-between">
            <div className="column">
              <div className="mb-3 border-bottom">
                Device Lat: {deviceLocation.DeviceLat}
              </div>
              <div className="mt-3 border-bottom">
                Device Lng: {deviceLocation.DeviceLng}
              </div>
            </div>
            <div className="column">
              <div className="mb-3 border-bottom">
                Modelling Lat: {(intersection.lat * 1).toFixed(3)}
              </div>
              <div className="mt-3 border-bottom">
                Modelling Lng: {(intersection.lng * 1).toFixed(3)}
              </div>
            </div>
            <div className="column">
              <div>Deviation: {(distance * 1000).toFixed(2)}m</div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="container text-white">
        <div className="row justify-content-between">
          <div className="column">
            <div className="mb-3 border-bottom">Device Lat: ....</div>
            <div className="mt-3 border-bottom">Device Lng: ....</div>
          </div>
          <div className="column">
            <div className="mb-3 border-bottom">Modelling Lat: ....</div>
            <div className="mt-3 border-bottom">Modelling Lng: ....</div>
          </div>
          <div className="column">
            <div className="mb-3 border-bottom">Deviation: .... m</div>
          </div>
        </div>
      </div>
    );
  };

  const onSubmit = (formProps) => {
    setDeviceLocation(formProps);
    if (intersection) {
      setDistance(
        Math.sqrt(
          Math.pow(formProps.DeviceLat - intersection.lat, 2) +
            Math.pow(formProps.DeviceLng - intersection.lng, 2)
        )
      );
    }
  };
  return (
    <div
      className="ml-5 border rounded p-4 bg-secondary container text-white"
      style={{
        boxShadow: '7px 7px #D9D9D9',
      }}
    >
      <div className="row justify-content-start">
        <div className="col-4">
          <form onSubmit={props.handleSubmit(onSubmit)}>
            <fieldset>
              <Field
                name="DeviceLat"
                label="Device Lat:"
                type="text"
                component={renderInput}
              />
            </fieldset>
            <fieldset>
              <Field
                name="DeviceLng"
                label="Device Lng:"
                type="text"
                component={renderInput}
              />
            </fieldset>
            <button className="btn btn-success mt-2">Calc Deviation</button>
          </form>
        </div>
        <div className="col-6 align-self-center">{renderDeviationInfo()}</div>
      </div>
    </div>
  );
};

const validate = (formValues) => {
  const errors = {};
  if (!formValues.DeviceLat || isNaN(+formValues.DeviceLat)) {
    errors.DeviceLat = 'You must enter a valid coordinate.';
  }
  if (!formValues.DeviceLng || isNaN(+formValues.DeviceLng)) {
    errors.DeviceLng = 'You must enter a valid coordinate.';
  }
  return errors;
};

export default reduxForm({
  form: 'deviceLocation',
  validate,
})(DistanceDifference);
