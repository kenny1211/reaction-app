// SurveyForm shows a form fo a user to add input
import React, { Component } from 'react';
// reduxForm helps communicate to redux store at top of application, similar to connect function
import { reduxForm } from 'redux-form';

class SurveyForm extends Component {
  render() {
    return <div>SurveyForm!</div>;
  }
}

export default reduxForm({
  form: 'surveyForm'
})(SurveyForm);
