import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { PayPalButton } from "react-paypal-button-v2";
import { Redirect, useHistory } from 'react-router-dom';
import { API } from '../../API';
import { Link } from "react-router-dom";
import StripeCheckout from 'react-stripe-checkout';




function UserPaypal(props) {
    const username=localStorage.getItem("client_info_usename");
    const clientData=JSON.parse(localStorage.getItem("client_info"));
    const paymentType=localStorage.getItem("subcrription_type");
    const [complete,setComplete]=useState(false);
    const [paymentinfo,setPaymentinfo]=useState({})
    var stripe = window.Stripe('pk_test_51IX1o4SB0gSsu8cg4mxASlX5BgEFJO7NYfVbNHnfRHmps8tOzn8XoP14yl894TJv3vC2pxSRSduMaE5gzo2XRxLW00gYpG8hHv', {
      stripeAccount: clientData.payments.stripe.id
    });
    let history=useHistory();
    console.log(clientData);
    const [once,setOnce]=useState(false);
    let idToken=sessionStorage.getItem("id_token");
    console.log("username",username);

    const makePayment=async ()=>{
      
      const data = await fetch("https://mantur-server.herokuapp.com/api/client/stripe/create-checkout-session", {
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "application/json"
        },
        method: "post",
        body: JSON.stringify({
          userID: clientData._id,
          paymentType: paymentType
        })
      })
      const session = await data.json();
      sessionStorage.setItem("sessionStripeId",JSON.stringify(session))
      console.log(session)
      stripe.redirectToCheckout({
        sessionId: session.id
      }).then(function (result) {
        console.log(result)
      });
    }
    const onApprove= (data, actions)=> {
        return fetch('https://mantur-server.herokuapp.com/api/client/paypal/capture-order/' + data.orderID, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }).then(function (res) {
          if (!res.ok) {
            alert('Something went wrong');
          }
        });
      };
    const createOrder = (data, actions) =>{
        return fetch('https://mantur-server.herokuapp.com/api/client/paypal/create-order', {
          method: 'post',
          headers: {
            "Content-Type": 'application/json',
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify({
            userID: clientData._id,
            paymentType: paymentType
          })
        }).then(function (res) {
          return res.json();
        }).then(function (data) {
          return data.orderID;
        });
      }
      
    const direct=()=>{
      history.push("/paymentDetails");
    }
    
   
    return (
        <div style={{width:"50vw",margin:"auto"}}>
        <h1 style={{color:"#f5050d"}}>Paypal Payment GateWay</h1> 
      <PayPalButton
      createOrder={(data, actions) =>createOrder(data, actions)}
      onApprove={(data, actions) => onApprove(data, actions)}
      onSuccess={(details, data) => {
          //alert("Transaction completed by " + details);
          console.log("transection detaiols",details,data);
          localStorage.removeItem("subcrription_type");
          if(details.status==="COMPLETED"){
              //setComplete(true);
              // setPaymentinfo(details.data);
              localStorage.setItem('payment_info',JSON.stringify(details));
              direct();
          }

          
        }}

      
      options={{
      clientId: "AX5JBUrhLD7KcC9TPRAJ41uGCd4ysd6PblZw0epyH6G5YdOgvBiXFfLnpY1Q_DEkPXDv9h2ClcXo5WHK",
      merchantId:clientData.payments.paypal.merchantIdInPayPal
     }}
    /> 

   <div style={{height:"10vh",backgroundColor:"#5b94a6",textAlign:"center"}}>
     <h1 style={{color:"#f5050d"}}>Stripe Payment GateWay</h1>
   {/* <StripeCheckout
      stripeKey="pk_test_51IX1o4SB0gSsu8cg4mxASlX5BgEFJO7NYfVbNHnfRHmps8tOzn8XoP14yl894TJv3vC2pxSRSduMaE5gzo2XRxLW00gYpG8hHv"
      token={makePayment}
    >
      <button style={{width:"100%",textAlign:"center"}}>Pay with stripe</button>
    </StripeCheckout> */}
    <button style={{width:"100%",textAlign:"center"}} onClick={makePayment}>Pay with stripe</button>
   </div>
  </div>
    );
}

export default UserPaypal;