import React from 'react';
import {loadStripe} from '@stripe/stripe-js';

import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

const CARD_ELEMENT_OPTIONS = {
    iconStyle: "solid",
    hidePostalCode: true,
    style: {
      base: {
        iconColor: "rgb(240, 57, 122)",
        color: "rgb(240, 57, 122)",
        fontSize: "25px",
        fontFamily: '"Open Sans", sans-serif',
        fontSmoothing: "antialiased",
        backgroundColor:"#34ebde",

        "::placeholder": {
          color: "#CFD7DF"
        }
      },
      invalid: {
        color: "#e5424d",
        ":focus": {
          color: "#303238"
        }
      }
    }
  };

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      });
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <CardElement options={CARD_ELEMENT_OPTIONS} className="card-element"/>
        <button type="submit" disabled={!stripe}>
          Pay
        </button>
      </form>
    );
  };
  const stripePromise = loadStripe('acct_1J7aElSJgPdEaek3');

const StripePayment = () => (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
);

export default StripePayment;