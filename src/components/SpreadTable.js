import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { spreadFactorNumbers } from '../actions';

class SpreadTable extends React.Component {
  componentDidMount() {
    this.props.spreadFactorNumbers();
  }

  renderNumberOfSignal() {
    console.log(this.props.sfData);
    return this.props.sfData.map((el, index) => {
      return (
        <tr key={index}>
          <th scope="row">
            <Link
              className="btn btn-outline-info"
              to={`/spread-factor-table/${el.SF}`}
            >
              {el.SF}
            </Link>
          </th>
          <td>{el.deviceAddress[0]}</td>
          <td>{el.numberSF}</td>
        </tr>
      );
    });
  }
  render() {
    if (this.props.sfData.length === 0) return <div>Waiting for Data...</div>;
    return (
      <div className="m-5">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Spreading Factor</th>
              <th scope="col">Device Name</th>
              <th scope="col">Number of Signals</th>
            </tr>
          </thead>
          <tbody>{this.renderNumberOfSignal()}</tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sfData: Object.values(state.spreadFactor),
  };
};

export default connect(mapStateToProps, { spreadFactorNumbers })(SpreadTable);
