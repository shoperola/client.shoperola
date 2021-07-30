import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { API } from '../../API';

function Subscription(props) {
    const username=localStorage.getItem("client_info_usename");
    const [feesPerMonth,setFeesPerMonth]=useState(0);
    const [feesPerYear,setfeesPerYear]=useState(0);
    console.log("username",username);
    useEffect(() => {
        axios
          .get(`${API}/profile/${username}`)
          .then((response) => {
            console.log("public url",response.data.data);
            const data = response.data.data;
            setFeesPerMonth(data.feesPerMonth)
            setfeesPerYear(data.feesPerYear);
            
            
          })
          .catch((err) => {
            console.log(err);
          });
      });
    return (
        <div>
            <h1><span>Monthly subscription{feesPerMonth}</span><Link to="/user/paypal" 
            onClick={()=>{localStorage.setItem("subcrription_type","monthly")}}
            >PayNow</Link></h1>
            <h1><span>Yearly subscription{feesPerYear}</span><Link to="/user/paypal"
            onClick={()=>{localStorage.setItem("subcrription_type","yearly")}}
            >PayNow</Link></h1>
        </div>
    );
}

export default Subscription;