import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import routes from './routes';

// Initialize store
const store = configureStore();

// We require the routes and render to the DOM using ReactDOM API
ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory} routes={routes} />
    </Provider>, document.getElementById('root')
);
