/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  getAllSignalByDistanceAndSf,
  deleteFromCollectionSignals,
} from '../actions';

const DeleteTable = (props) => {
  useEffect(() => {
    const { sf, distance } = props.match.params;
    props.getAllSignalByDistanceAndSf(sf, distance);
  }, []);

  console.log(props.signals);

  const renderData = () => {
    if (props.signals.length === 0) {
      return <>Loading DATA</>;
    } else {
      return props.signals.map((signal, index) => {
        if (signal.spreadingFactor) {
          return (
            <tr key={index}>
              <th scope="row">{signal.spreadingFactor}</th>
              <td>{signal.distance}m</td>
              <td>{signal.deviceAddress}</td>
              <td>{Number(signal.rssi).toFixed(2)}</td>
              <td>{Number(signal.SNR).toFixed(2)}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => props.deleteFromCollectionSignals(signal._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        }
        return <tr key={index}></tr>;
      });
    }
  };
  return (
    <>
      <div className="ml-5">{props.signals.length - 1} data found</div>
      <table className="table m-5">
        <thead>
          <tr>
            <th scope="col">Spreading Factor</th>
            <th scope="col">Distance 'm'</th>
            <th scope="col">Device Address</th>
            <th scope="col">RSSI</th>
            <th scope="col">SNR</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>{renderData()}</tbody>
      </table>
      <Link
        className="float-right btn btn-light"
        style={{
          marginRight: '85px',
        }}
        to={`/spread-factor-table/${props.match.params.sf}`}
      >
        <img src={require('./../icons/icon-back.png')} alt="" />
      </Link>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    signals: Object.values(state.allDeviceData),
  };
};

export default connect(mapStateToProps, {
  getAllSignalByDistanceAndSf,
  deleteFromCollectionSignals,
})(DeleteTable);
