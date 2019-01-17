// SurveyForm shows a form fo a user to add input
import React, { Component } from 'react';
// reduxForm helps communicate to redux store at top of application, similar to connect function
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import validateEmails from '../../utils/validateEmails';

const FIELDS = [
  { label: 'Survey Title', name: 'title' },
  { label: 'Subject Line', name: 'subject' },
  { label: 'Email Body', name: 'body' },
  { label: 'Recipient List', name: 'emails' }
];

class SurveyForm extends Component {
  renderFields() {
    return _.map(FIELDS, ({ label, name }) => {
      return <Field key={name} component={SurveyField} type="text" label={label} name={name} />;
    });
  }

  render() {
    return (
      <div>
        {/* Field can show any type of input specified by props given to it */}
        <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

// validation of values (contained inside of object)
// if empty errors object returned redux form will know there are no errors and submit form
function validate(values) {
  const errors = {};

  errors.emails = validateEmails(values.emails || ' ');

  _.each(FIELDS, ({ name }) => {
    // not values.name because that would include name: key itself (name: 'title')
    // square brackets provide just the actually value of key
    if (!values[name]) {
      errors[name] = 'You must provide a value';
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: 'surveyForm'
})(SurveyForm);
