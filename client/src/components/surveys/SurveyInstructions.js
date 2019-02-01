import React, { Component } from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

class SurveyInstructions extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    return (
      <div>
        <a className="btn-tiny" onClick={this.openModal}>
          <i className="material-icons">help_outline</i>
        </a>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Survey Instructions"
        >
          <div className="modal-content">
            <h1>Content!</h1>
          </div>
          <div className="modal-footer">
            <button className="right btn" onClick={this.closeModal}>
              Close
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default SurveyInstructions;
