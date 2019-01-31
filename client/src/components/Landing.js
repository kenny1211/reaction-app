import React, { Component } from 'react';
import { connect } from 'react-redux';

class Landing extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <h1>Getting Started</h1>
        </div>
        <div className="divider" />
        <div className="row">
          <div className="col">
            <p>
              Collect feedback from your users simply. Just signin with Google, create a survey and
              the rest will be taken care of.
            </p>
          </div>
          <div className="center">
            <button className="btn-flat">
              <a href={this.props.auth ? '/surveys' : '/auth/google'}>
                Begin
                <i className="material-icons right">folder_open</i>
              </a>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

// call state(auth property) object in redux store
function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Landing);
