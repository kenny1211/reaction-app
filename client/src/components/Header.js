import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  // helper method to inspect this.props.auth property and depending on value, return what ul to display
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <li><a href="/auth/google">Sign In With Google</a></li>
      default:
        return <li><a>Logout</a></li>
    }
  }
  
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a className="left brand-logo">
            Reaction
          </a>
          <ul className="right">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

// call state(auth property) object in redux store
function mapStateToProps({ auth }) {
  return { auth };
} 

// hook up Header to redux store with connect helper from react-redux
export default connect(mapStateToProps)(Header);