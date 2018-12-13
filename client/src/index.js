// primary app for rendering redux side of application and root component to DOM
import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './components/App';
import reducers from './reducers';

// 1st arg = reducers, 2nd arg initial state of app (server side rendering), 3rd = middleware
const store = createStore(reducers, {}, applyMiddleware());

ReactDOM.render(
  // Provider tag reads changes of store for redux/reducers that change state
  <Provider store={store}><App /></Provider>, document.querySelector('#root')
);
