import React from 'react';
import { Link } from 'react-router-dom';

const App = ({ children }) => {
  return (
    <div className="p-2" style={{ width: '96%' }}>
      <div className="d-flex justify-content-between border-bottom border-warning radius m-5 p-2">
        <div>
          <Link to="/" className="mr-1">
            <img
              src={require('./../icons/device.png')}
              alt=""
              style={{ width: '80%' }}
            />
          </Link>
        </div>
        <div className="d-flex align-items-center">
          <Link className="btn btn-warning mr-2" to="/form-for-new-features">
            Collect Signal
          </Link>
          <Link className="btn btn-warning mr-2" to="/spread-factor-table">
            SF Table(OA)
          </Link>
          <Link
            className="btn btn-warning mr-2"
            to="/signal-location-detection"
          >
            Location Mapping
          </Link>
        </div>
      </div>
      {children}
    </div>
  );
};

export default App;
