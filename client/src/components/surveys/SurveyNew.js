// SurveyNew shows SurveyForm and SurveyFormReview; the parent container
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
  state = {
    showFormReview: false
  };

  renderContent() {
    if (this.state.showFormReview) {
      return <SurveyFormReview onCancel={() => this.setState({ showFormReview: false })} />;
    }

    return <SurveyForm onSurveySubmit={() => this.setState({ showFormReview: true })} />;
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

// reduxForm default behavior - dumps form values on unmount, so it is wired up to CANCEL survey
// causes error for some reason: Warning: Failed prop type: Invalid prop `component` of type `object` supplied to `Route`, expected `function`.
export default reduxForm({
  form: 'surveyForm'
})(SurveyNew);
