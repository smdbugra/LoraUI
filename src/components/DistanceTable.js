import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { distancesBySpreadFactor } from '../actions';

class DistanceTable extends React.Component {
  componentDidMount() {
    this.props.distancesBySpreadFactor(this.props.match.params.id);
  }

  renderDistance() {
    if (!this.props.distanceData) {
      return <div>Loading DATA</div>;
    } else {
      return this.props.distanceData.map((el, index) => {
        return (
          <tr key={index}>
            <th scope="row">
              <Link
                className="btn btn-outline-info"
                to={`/table/delete/spreadfactor/${this.props.match.params.id}/distance/${el.Distance}`}
              >
                {this.props.match.params.id}
              </Link>
            </th>
            <td>{el.Distance}m</td>
            <td>{el.numberOfDistances}</td>
            <td>{Number(el.avgSNR).toFixed(2)}</td>
            <td>{Number(el.minRSSI).toFixed(2)}</td>
            <td>{Number(el.maxRSSI).toFixed(2)}</td>
            <td>{Number(el.avgRSSI).toFixed(2)}</td>
          </tr>
        );
      });
    }
  }

  render() {
    return (
      <>
        <table className="table m-5">
          <thead>
            <tr>
              <th scope="col">Spreading Factor</th>
              <th scope="col">Distance 'm'</th>
              <th scope="col">Number of Signals</th>
              <th scope="col">Avg SNR</th>
              <th scope="col">Min RSSI</th>
              <th scope="col">Max RSSI</th>
              <th scope="col">Avg RSSI</th>
            </tr>
          </thead>
          <tbody>{this.renderDistance()}</tbody>
        </table>
        <Link
          className="float-right btn btn-light mr-5"
          to="/spread-factor-table"
        >
          <img src={require('./../icons/icon-back.png')} alt="" />
        </Link>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    distanceData: Object.values(state.spreadFactorDistances),
  };
};

export default connect(mapStateToProps, { distancesBySpreadFactor })(
  DistanceTable
);
