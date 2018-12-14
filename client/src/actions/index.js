// action creators: returns an action, action gets sent to reducers which produce new values for store, updates state in store, sneds state back to components - causes rerender
// reduxThunk: breaks rule that we have to immediately return action for action creators (direct access to dispatch function)
// dispatch function: used behind the scenes; sends action to all diff reducers in store, causing them to instantly recalc app state

import axios from 'axios';
import { FETCH_USER } from './types';

//reduxThunk handles middleware as argument for function
const fetchUser = (dispatch) => {
  return function() {
    axios.get('/api/current_user')
      .then(res => dispatch({ type: FETCH_USER, payload: res}));
  }
};
