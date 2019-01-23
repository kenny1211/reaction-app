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

// reduxForm defaul behavior - dumps form values on unmount, so it is wired up to CANCEL survey
export default reduxForm({
  form: 'surveyForm'
})(SurveyNew);
