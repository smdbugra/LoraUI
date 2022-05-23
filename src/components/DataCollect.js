import React from 'react';
import { connect } from 'react-redux';
import {
  getDataWithFeatures,
  fetchSignal,
  createSignal,
  deleteSignal,
} from '../actions';
import { reduxForm, Field } from 'redux-form';

class DataCollect extends React.Component {
  state = {
    renderSetter: false,
  };

  getStyles = () => {
    const GREY = '#D9D9D9';

    return {
      well: {
        boxShadow: `7px 7px ${GREY}`,
      },
    };
  };

  renderError({ error, touched }) {
    if (touched && error) {
      console.log(error);
      return (
        <div className="ui error message" style={{ width: '100%' }}>
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div
        className={`form-group ${className}`}
        style={{
          width: '284.23px',
        }}
      >
        <label>{label}</label>
        <input
          className="form-control bg-light"
          {...input}
          autoComplete="off"
        />
        {this.renderError(meta)}
      </div>
    );
  };

  renderSelect = (formProps) => {
    const className = `field ${
      formProps.meta.error && formProps.meta.touched ? 'error' : ''
    }`;
    return (
      <div className={`form-group d-flex flex-column ${className}`}>
        <label>{formProps.label}</label>
        <select
          className="form-select border rounded bg-light"
          style={{ width: '20%', height: '35px' }}
          {...formProps.input}
        >
          <option>Choose Location</option>
          <option>Clear Area</option>
          <option>Under Concrete</option>
        </select>
        {this.renderError(formProps.meta)}
      </div>
    );
  };

  renderListOfData = () => {
    return this.props.data.map((signal, index) => {
      if (signal.signalType === 'up') {
        return (
          <div className="border border-secondary rounded mb-3 p-3" key={index}>
            <div>Signal Type: {signal.signalType}</div>
            <div>Device Address: {signal.deviceAddress}</div>
            <div>Gateway: {signal.gateway}</div>
            <div>RSSI Value: {signal.rssi}</div>
            <div>SNR Value: {signal.SNR}</div>
            <div>
              Spread Factor:
              {signal.spreadingFactor}
            </div>
            <div>Distance: {signal.distance}</div>
            <div>Measuring Area: {signal.measureamentsPlace}</div>
            <div>
              <button
                className="btn btn-success"
                onClick={() =>
                  this.props.createSignal(signal, () =>
                    this.props.deleteSignal(signal.id)
                  )
                }
              >
                Send Database
              </button>
              <button
                className="btn btn-danger m-2"
                onClick={() => this.props.deleteSignal(signal.id)}
              >
                Delete Data
              </button>
            </div>
          </div>
        );
      }
      return null;
    });
  };

  onSubmit = (formProps) => {
    console.log(formProps);
    this.props.fetchSignal(() => {
      this.props.getDataWithFeatures(this.props.data, formProps);
      this.setState({ renderSetter: true });
    });
  };
  render() {
    const styles = this.getStyles();
    return (
      <div className="m-5">
        <form
          className="border rounded p-4"
          onSubmit={this.props.handleSubmit(this.onSubmit)}
          style={styles.well}
        >
          <div className="d-flex justify-content-start">
            <fieldset className="mr-2">
              <Field
                name="GatewayLat"
                label="Gateway Lat:"
                type="text"
                component={this.renderInput}
              />
            </fieldset>
            <fieldset>
              <Field
                name="GatewayLng"
                label="Gateway Lng:"
                type="text"
                component={this.renderInput}
              />
            </fieldset>
          </div>
          <div className="d-flex justify-content-start">
            <fieldset className="mr-2">
              <Field
                name="IOTLat"
                label="Device Lat:"
                type="text"
                component={this.renderInput}
              />
            </fieldset>
            <fieldset>
              <Field
                name="IOTLng"
                label="Device Lng:"
                type="text"
                component={this.renderInput}
              />
            </fieldset>
          </div>

          <fieldset>
            <Field
              name="measureamentsPlace"
              label="Measuring Location: "
              component={this.renderSelect}
            ></Field>
          </fieldset>

          <div>
            <button className="btn btn-success mt-2">Fetch Data</button>
          </div>
        </form>
        <div className="mt-5">
          <h3>List of Lora Signal</h3>
          <div className="d-flex flex-wrap mt-3">
            {this.state.renderSetter
              ? this.renderListOfData()
              : 'Waiting For Location Info...'}
          </div>
        </div>
      </div>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  if (!formValues.GatewayLat || isNaN(+formValues.GatewayLat)) {
    errors.GatewayLat = 'You must enter a valid coordinate.';
  }
  if (!formValues.GatewayLng || isNaN(+formValues.GatewayLng)) {
    errors.GatewayLng = 'You must enter a valid coordinate.';
  }
  if (!formValues.IOTLat || isNaN(+formValues.IOTLat)) {
    errors.IOTLat = 'You must enter a valid coordinate.';
  }
  if (!formValues.IOTLng || isNaN(+formValues.IOTLng)) {
    errors.IOTLng = 'You must enter a valid coordinate.';
  }
  if (
    !formValues.measureamentsPlace ||
    formValues.measureamentsPlace === 'Choose Location'
  ) {
    errors.measureamentsPlace = 'You must choose a location.';
  }
  return errors;
};

const mapStateToProps = (state) => {
  return {
    data: Object.values(state.fetchDeviceData),
  };
};

export default connect(mapStateToProps, {
  getDataWithFeatures,
  fetchSignal,
  createSignal,
  deleteSignal,
})(
  reduxForm({
    form: 'collectData',
    validate,
  })(DataCollect)
);
