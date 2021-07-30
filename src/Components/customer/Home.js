import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API } from '../../API';
import { PayPalButton } from "react-paypal-button-v2";
import { Link } from "react-router-dom";

export default function Home() {
    let idToken=sessionStorage.getItem("id_token");
    let clientID=localStorage.getItem("client_info_id");
    const clientInfo=JSON.parse(localStorage.getItem("client_info"));
    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [subcription,setSubcription]=useState({});
    // const [complete,setComplete]=useState(false);
    const username=localStorage.getItem("client_info_usename");
    const feesPerMonth=clientInfo.feesPerMonth;
    const feesPerYear=clientInfo.feesPerYear;
    console.log("username",username);
    // setInterval(()=>{
    //   console.log("run after two second");
    //   idToken=sessionStorage.getItem("id_token");
    // },2000)
    
      useEffect(()=>{
        axios
        .post(`${API}/api/client`,{userID:clientID}, {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        })
        .then((response)=>{
          let data=response.data.data;
          setFirstName(data.firstName);
          setLastName(data.lastName);
         // setComplete(true);
        })
        .catch((err) => {
          console.log(err);
        });
        
      },[idToken]);
      useEffect(()=>{
        console.log("here client id and token",clientID,idToken);
        // let params = new URLSearchParams({userID:clientID})
        axios
        .post(`${API}/api/client/subscription`,{userID:clientID}, {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        })
        .then((response)=>{
          let data=response.data.data;
          console.log("subcription data",data);
          console.log("subcription data",response);
          if(data){
            //////////coment below remove for showing stripe payment
            setSubcription(data)
            
          }
          
        })
        .catch((err) => {
          console.log(err);
        });
        
      },[idToken]);
        return (
            <div>
              
                <h1><span>firstname:{firstName}</span></h1>
                <h1><span>lastName:{lastName}</span></h1>
                {!(Object.keys(subcription).length === 0 && subcription.constructor === Object) && !subcription.subscriber.status  && 
                <div>
                <h1><span>Monthly subscription{feesPerMonth}</span><Link to="/user/payment" 
                onClick={()=>{localStorage.setItem("subcrription_type","monthly")}}
                >PayNow</Link></h1>
                <h1><span>Yearly subscription{feesPerYear}</span><Link to="/user/payment"
                onClick={()=>{localStorage.setItem("subcrription_type","yearly")}}
                >PayNow</Link></h1>
            </div>
                }
                {(Object.keys(subcription).length === 0 && subcription.constructor === Object)  && 
                <div>
                <h1><span>Monthly subscription{feesPerMonth}</span><Link to="/user/payment" 
                onClick={()=>{localStorage.setItem("subcrription_type","monthly")}}
                >PayNow</Link></h1>
                <h1><span>Yearly subscription{feesPerYear}</span><Link to="/user/payment"
                onClick={()=>{localStorage.setItem("subcrription_type","yearly")}}
                >PayNow</Link></h1>
            </div>
                }
                {!(Object.keys(subcription).length === 0 && subcription.constructor === Object) && subcription.subscriber.status && 
                <div>
                  <h1>subscription details</h1>
                  <h3>subcriptiion Type : {subcription.subType}</h3>
                  <h3>amount : {subcription.amount}</h3>
                  <h3>end data : {(new Date(subcription.subEnd)).toDateString()}</h3>
                </div>
                
            

                }
            </div>
        );
}
