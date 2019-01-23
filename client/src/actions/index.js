// action creators: returns an action, action gets sent to reducers which produce new values for store, updates state in store, sends state back to components - causes rerender
// reduxThunk: breaks rule that we have to immediately return action for action creators (direct access to dispatch function)
// dispatch function: used behind the scenes; sends action to all diff reducers in store, causing them to instantly recalc app state

import axios from 'axios';
import { FETCH_USER } from './types';

//reduxThunk handles middleware as argument for function (dispatch)
export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token);

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = values => async dispatch => {
  const res = await axios.post('/api/surveys', values);

  dispatch({ type: FETCH_USER, payload: res.data });
};
