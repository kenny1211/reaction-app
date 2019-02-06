import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';
import SurveyInstructions from './SurveyInstructions';
import { Doughnut } from 'react-chartjs-2';

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderSurveys() {
    return this.props.surveys.reverse().map(survey => {
      const data = {
        labels: ['Yes', 'No'],
        datasets: [
          {
            data: [survey.yes, survey.no],
            backgroundColor: ['rgba(0,255,0,0.3)', 'rgba(255,0,0,0.3)']
          }
        ]
      };

      return (
        <div
          className="col card s3 col-content darken-1"
          key={survey._id}
          style={{ width: '50%', display: 'inline-block' }}
        >
          <div className="card-content center">
            <span className="card-title">{survey.title}</span>
            <p>{survey.body}</p>
            <p>Sent On: {new Date(survey.dateSent).toLocaleDateString()}</p>
          </div>
          <div className="card-image" style={{ position: 'relative' }}>
            <Doughnut data={data} />
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <div className="center">
          <h3>Survey List</h3>
          <SurveyInstructions />
        </div>
        <div>{this.renderSurveys()}</div>
      </div>
    );
  }
}

function mapStateToProps({ surveys }) {
  return { surveys };
}

export default connect(
  mapStateToProps,
  { fetchSurveys }
)(SurveyList);
