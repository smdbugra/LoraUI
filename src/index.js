import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import App from './components/App';
import reducers from './reducers';

import DataCollect from './components/DataCollect';
import SpreadTable from './components/SpreadTable';
import DistanceTable from './components/DistanceTable';
import DeleteTable from './components/DeleteTable';
import signalDetection from './components/SignalDetection';
import MainPage from './components/MainPage';

const store = createStore(reducers, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Route path="/" exact component={MainPage} />
        <Route path="/form-for-new-features" exact component={DataCollect} />
        <Route path="/spread-factor-table" exact component={SpreadTable} />
        <Route
          path="/spread-factor-table/:id"
          exact
          component={DistanceTable}
        />
        <Route
          path="/table/delete/spreadfactor/:sf/distance/:distance"
          exact
          component={DeleteTable}
        />
        <Route
          path="/signal-location-detection"
          exact
          component={signalDetection}
        />
      </App>
    </BrowserRouter>
  </Provider>,
  document.querySelector('#root')
);
