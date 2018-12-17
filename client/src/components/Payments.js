import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";

class Payments extends Component {
  render() {
    return (
      <StripeCheckout
        name="Reaction"
        description="$5 for 5 email credits"
        amount={500} //amount in US cents; $5 USD
        token={token => console.log(token)} //expecting to receive call back function after succesful stripe API call
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button class="btn">Add Credits</button>
      </StripeCheckout>
    );
  }
}

export default Payments;
