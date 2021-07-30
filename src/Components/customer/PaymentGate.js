import React from 'react';
import { Link } from "react-router-dom";

function PaymentGate(props) {
    return (
        <div>
            <Link to="/user/paypal">Pay by Paypal</Link>
            <Link to="/user/stripe">Pay by Stripe</Link>
            
        </div>
    );
}

export default PaymentGate;