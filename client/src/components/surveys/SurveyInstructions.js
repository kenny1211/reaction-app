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
            <ul>
              <li>
                Add Credit:
                <li>
                  Stripe is in test mode, so just enter the test credit card #: 4242 4242 4242 4242
                </li>
                <li>The cvc code can be any numbers</li>
                <li>The expiration date can be any date in the future</li>
              </li>
              <br />
              <li>Afterwards 5 credits will appear in the header</li>
              <li>A survey costs 1 credit to send</li>
              <li>To create a survey just click the plus button on the bottom right!</li>
            </ul>
          </div>
          <div className="modal-footer">
            <a className="right btn-tiny" onClick={this.closeModal}>
              <i className="material-icons">close</i>
            </a>
          </div>
        </Modal>
      </div>
    );
  }
}

export default SurveyInstructions;
