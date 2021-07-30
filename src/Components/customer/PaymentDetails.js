import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function PaymentDetails(props) {
    //let history=useHistory();
    const [stripePayment,setStripePayment]=useState({});
    const data=JSON.parse(localStorage.getItem("payment_info"))
    const clientData=JSON.parse(localStorage.getItem("client_info"));
    let idToken=sessionStorage.getItem("id_token");
    localStorage.removeItem("payment_info")
    //console.log("historydata",history);
    let link=window.location.href.split("?")[1];
        let params = new URLSearchParams(link);
        let jsobject={};
        for(let pair of params.entries()){
          jsobject[pair[0]]=pair[1];
        }
        //jsobject["userID"]=
        useEffect(async()=>{
            const data = await fetch("https://mantur-server.herokuapp.com/api/client/stripe/check-checkout-session", {
            headers: {
              Authorization: `Bearer ${idToken}`,
              "Content-Type": "application/json"
            },
            method: "post",
            body: JSON.stringify({...jsobject,userID: clientData._id})
          })
          const payment = await data.json();
          console.log("here payment details",payment)
          setStripePayment(payment);
          
        },[])
    return (
        <div>
            <h1>payment details</h1>
            {data && <>
            <h3>payer first name{data.payer.name.given_name}</h3>
            <h3>payer last name{data.payer.name.surname}</h3>
            <h3>payer id {data.payer.payer_id}</h3>
            <h3>payment status {data.status}</h3>
            <h3>order id {data.id}</h3>
             </>
            }
            {stripePayment!=={} && stripePayment.data && stripePayment.status && stripePayment.data.client && <>
             <h3>payer first name{stripePayment.data.client.firstName}</h3>
             <h3>payer last name{stripePayment.data.client.lastName}</h3>
             <h3>order id {stripePayment.data.session.id}</h3>
             <h3>payment status {stripePayment.status}</h3>
             </>

            }
            
        
        </div>
    );
}

export default PaymentDetails;