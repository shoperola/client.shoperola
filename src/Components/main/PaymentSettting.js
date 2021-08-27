import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../../API";
import { isAutheticated } from "../auth/authhelper";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useHistory } from "react-router";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { getAllISOCodes, getParamByParam } from "iso-country-currency";

export default function PaymentSettting() {
  const [showSubscription,setShowSubscription]=useState(true);
  const [country,setCountry]=useState("");
  const [currency,setCurrency]=useState("");
  const [paypal,setPaypal]=useState({});
  const [stripe,setStripe]=useState({});
  const [paymentLink,setPaymentLink]=useState([]);
  const [enablePayment,setEnablePayment]=useState("");
  const { token } = isAutheticated();
  const [success,setSuccess]=useState(true);
  const history=useHistory();
  const [feesMonth,setfeesMonth]=useState(0);
  const [feesyear,setfeesyear]=useState(0);
  const [currCountry, setcCurrCountry] = useState('');

  const contCurr = getAllISOCodes()
  contCurr.sort((a, b)=> a.countryName > b.countryName ? 1 : -1)
  // const [permissionsGranted,setPermissionsGranted]=useState(false);
  // const [consentStatus,setConsentStatus]=useState(false);
  // const [productIntentId,setProductIntentId]=useState("");
  // const [isEmailConfirmed,setIsEmailConfirmed]=useState(false);
  // const [accountStatus,setAccountStatus]=useState("");
  // var merchantId="";
  // var merchantIdInPayPal="";
  const updateinfo=()=>{
    console.log(country);
    console.log(currency);
    const formdata={
      settings:{
        currency,
        country
      }
    }
    axios
    .put(`${API}/api/user`,formdata, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response)=>{
      console.log("user data response",response);
      setCurrency(response.data.data.settings.currency)
      setCountry(response.data.data.settings.country)
    })
    .catch((err) => {
      console.log(err);
    });
  }
  const handleSubcription=()=>{
    console.log(feesyear);
    console.log(feesMonth);
    if(!country || !currency){
       alert("Please fill currency and country");
       return;
    }
    let formdata;
    if(showSubscription){
      formdata={
        feesPerMonth:feesMonth,
        feesPerYear:feesyear,
        settings:{
          currency,
          country
        }
      }
    }else{
        formdata={
        feesPerMonth:0,
        feesPerYear:0
      }
    }
    
    axios
    .put(`${API}/api/user`,formdata, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response)=>{
      console.log("user data response",response);
      setfeesMonth(response.data.data.feesPerMonth)
      setfeesyear(response.data.data.feesPerYear)
      setCurrency(response.data.data.settings.currency)
      setCountry(response.data.data.settings.country)
    })
    .catch((err) => {
      console.log(err);
    });
    
  }
  const stripeDisable=()=>{
    axios
    .put(`${API}/api/user/payments`,{stripe: {...stripe,ENABLED:false}}, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      const getData=response.data.data;
      //console.log("payment disabled",getData);
      setStripe(getData.stripe);
      history.push(`/payment`);
      
    })
    .catch((err) => {
      console.log(err);
    });
  }
  const stripeEnable=()=>{
    axios
    .put(`${API}/api/user/payments`,{stripe: {...stripe,ENABLED:true}}, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      const getData=response.data.data;
      //console.log("payment disabled",getData);
      setStripe(getData.stripe);
      history.push(`/payment`);
      
    })
    .catch((err) => {
      console.log(err);
    });
  }
  const paypalDisable=()=>{
    axios
    .put(`${API}/api/user/payments`,{paypal: {...paypal,ENABLED:false}}, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      const getData=response.data.data;
      //console.log("payment disabled",getData);
      setPaypal(getData.paypal);
      history.push(`/payment`);
      
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const paypalEnable=()=>{
    axios
    .put(`${API}/api/user/payments`,{paypal: {...paypal,ENABLED:true}}, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      const getData=response.data.data;
      //console.log("payment enabled",getData);
      setPaypal(getData.paypal);
      history.push(`/payment`);
      
    })
    .catch((err) => {
      console.log(err);
    });

  }
 
  const updatePayment=(formData)=>{
    console.log("newformdata",formData);
    axios
      .put(`${API}/api/user/payments`,formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const getData=response.data.data;
        console.log("everything done",getData);
        setPaypal(getData.paypal)
        history.push(`/payment`);
        
      })
      .catch((err) => {
        console.log(err);
      });

  }
  const linkPaypal=()=>{
    if(!currency || !country || (feesMonth==0 && feesyear==0)){
      alert("First update all info like currency ,country and amount");
      return;
    }
    axios
      .get(`${API}/api/user/paypal/getActionUrl`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const getData=response.data.links;
        console.log("paypal link to submit data",getData);
        //setPaypal(getData.paypal);
        window.location.href=getData[1].href;
        // window.open(getData[1].href,"","width=200,height=100");
        //var myWindow = window.open(getData[1].href, "_blank", "width=800,height=600");
        //let params = new URLSearchParams(window.location.search);
        
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const handleStripeClick=()=>{
    if(!currency || !country || (feesMonth==0 && feesyear==0)){
      alert("First update all info like currency ,country and amount");
      return;
    }
    // let url="";
    // if(!stripe.charges_enabled || !stripe.details_submitted){
    //     url=`${API}/api/user/stripe/onboard-user`
    // }
    axios
      .get(`${API}/api/user/stripe/onboard-user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const getData=response.data.url;
        console.log("payment",getData);
        window.location.href=getData;
        // console.log(response);
        
        
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(()=>{
    axios
    .get(`${API}/api/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response)=>{
      console.log("user data response",response);
      setCurrency(response.data.data.settings.currency)
      setCountry(response.data.data.settings.country)
      setcCurrCountry(getParamByParam('currency', response.data.data.settings.currency, 'countryName'))
      if(response.data.data.feesPerMonth==0 && response.data.data.feesPerYear==0){
        setShowSubscription(false);
        setfeesyear(response.data.data.feesPerYear);
        setfeesMonth(response.data.data.feesPerMonth)
        
      }
      if(response.data.data.feesPerMonth || response.data.data.feesPerYear){
        setShowSubscription(true);
        setfeesyear(response.data.data.feesPerYear);
        setfeesMonth(response.data.data.feesPerMonth)
      }
    })
    .catch((err) => {
      console.log(err);
    });
  },[success]);
  useEffect(() => {
    axios
      .get(`${API}/api/user/payments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        //setFeatured(response);
        const getData=response.data.data;
        //console.log("token",token);
        console.log("payment",getData);
        setPaypal(getData.paypal);
        setStripe(getData.stripe);
        
        //console.log(params);
        console.log(window.location);
        let link=window.location.href.split("?")[1];
        let params = new URLSearchParams(link);
        let jsobject={};
        for(let pair of params.entries()){
          jsobject[pair[0]]=pair[1];
        }
        console.log("jsobjecthere",jsobject);
        const newObject = {paypal: {...jsobject,ENABLED:true}}
        //let formData = new FormData();
        console.log("here new object",newObject);
        let count=0;
        for (let pair of params.entries()) {
          //formData.append(pair[0],pair[1]);
          count++;
        }
        //console.log(formData);
        console.log(count,newObject);
        if(count>0){
          updatePayment(newObject);
        } 
      })
      .catch((err) => {
        console.log(err);
      });
  },[success]);

  const handleCurrency = e => {
    setCurrency(getParamByParam('countryName', e.target.value, 'currency'))
    setcCurrCountry(e.target.value)
  }

  return (
    <>
      <div
        className="modal fade"
        // id={(enablePayment==="#razorpay")?"razorpay":(enablePayment==="#paypal")?"paypal":"stripe"}
        id="razorpay"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content popup-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Connect your Bank Account Details
              </h5>
              <button
                type="button"
                className="close close-b"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span>x</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group mb-15">
                    <label for="basicpill-phoneno-input" className="label-100">
                      Full Name
                    </label>
                    <input className="form-control input-field" />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group mb-15">
                    <label for="basicpill-phoneno-input" className="label-100">
                      Email
                    </label>
                    <input className="form-control input-field" />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group mb-15">
                    <label for="basicpill-phoneno-input" className="label-100">
                      Select your Business Type
                    </label>

                    <select
                      name="currency"
                      value=""
                      className="form-control input-field"
                    >
                      <option value="">--select--</option>
                      <option value="" >
                        Individual
                      </option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-12">
                  <h2 className="account-details">Account Details</h2>
                </div>
                <div className="col-lg-12">
                  <div className="form-group mb-15">
                    <label for="basicpill-phoneno-input" className="label-100">
                      Name of the Account Holder
                    </label>
                    <input className="form-control input-field" />
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="form-group mb-15">
                    <label for="basicpill-phoneno-input" className="label-100">
                      ISFC Code
                    </label>
                    <input className="form-control input-field" />
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="form-group mb-15">
                    <label for="basicpill-phoneno-input" className="label-100">
                      Account Number
                    </label>
                    <input className="form-control input-field" />
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="form-group mb-15">
                    <label for="basicpill-phoneno-input" className="label-100">
                      Select your account type
                    </label>
                    <select
                      name="currency"
                      value=""
                      className="form-control input-field"
                    >
                      <option value="">--select--</option>
                      <option value="" selected="">
                        Savings
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary save-btn">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <div id="layout-wrapper">
        <Header />
        <Sidebar />

        </div> */}
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div
                  className="
                    page-title-box
                    d-flex
                    align-items-center
                    justify-content-between
                  "
                >
                  <h4 className="mb-0">Payment Settings</h4>

                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <Link to="/dashboard">TellyTell</Link>
                      </li>
                      <li className="breadcrumb-item active">Payment Settings</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-12 col-lg-6 col-xl-6">
                        <h1 className="text-left head-small">Payment Settings</h1>

                        <form>
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="form-group">
                                <label
                                  for="basicpill-phoneno-input"
                                  className="label-100"
                                >
                                  Choose your Country
                                </label>
                                <select
                                  name="currency"
                                  value={country}
                                  className="form-control input-field"
                                  onChange={(e)=>setCountry(e.target.value)}
                                >
                                  {country==="" && <option value="">--select--</option>}
                                  {contCurr.map(item => (
                                    <option key={item.iso} value={item.currency}>
                                      {item.countryName}
                                    </option>
                                  ))}
                                  {/* {!(country==="") && <option value="">{country}</option>}
                                  <option value="INR" selected>
                                    India
                                  </option>
                                  <option value="USD">
                                    United States of America
                                  </option>
                                  <option value="AED">Argentina</option>
                                  <option value="AUD">United Kingdon</option> */}
                                </select>
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-lg-12">
                              <div className="form-group">
                                <label
                                  for="basicpill-phoneno-input"
                                  className="label-100"
                                >
                                  Select the currency in which you would like to
                                  accept your payments
                                </label>
                                
                                <select
                                  name="currency"
                                  value={currCountry}
                                  className="form-control input-field"
                                  onChange={handleCurrency}
                                >
                                  {currency==="" && <option value="">--select--</option>}
                                  {contCurr.map(item => (
                                    <option key={item.iso} value={item.countryName}>
                                      {item.countryName} ({item.currency})
                                    </option>
                                  ))}
                                  {/* {currency==="" && <option value="">--select--</option>}
                                  {!(currency==="") && <option value="">{currency}</option>}
                                  <option value="INR" selected>
                                    INR
                                  </option>
                                  <option value="USD">USD</option>
                                  <option value="AED">AED</option>
                                  <option value="AUD">AUD</option>
                                  <option value="CAD">CAD</option>
                                  <option value="EUR">EUR</option>
                                  <option value="GBP">GBP</option>
                                  <option value="HKD">HKD</option>
                                  <option value="INR">INR</option>
                                  <option value="JPY">JPY</option>
                                  <option value="SGD">SGD</option> */}
                                </select>
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-lg-12">
                              <div className="form-group text-left">
                                {/* <a href="index.html"> */}
                                  <button
                                    type="button"
                                    onClick={updateinfo}
                                    className="
                                      btn btn-success btn-login
                                      waves-effect waves-light
                                      mr-3
                                    "
                                  >
                                    Update
                                  </button>
                                {/* </a> */}
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>

                    {/* <!-- end table-responsive --> */}
                  </div>
                </div>
              </div>
{/* <!-- Begining of Table subscription settings--> */}
	<div className="col-lg-12">
		<div className="card">
			<div className="card-body">
				<div className="row">
					<div className="col-md-12 col-lg-6 col-xl-6">
					<h1 className="text-left head-small">Subscription Settings</h1>
					<form>
					<div className="row">
						<div className="col-lg-12">
						<div className="form-group">
						<label for="basicpill-phoneno-input" className="label-100">Enable Subscription for the Subscribers</label><br/>If yes, is selected. Display the amounts for 1 and 12 months
						<div className="full-w">
              <span className="custom-control custom-radio mb-3 d-inline-block mr-5">
							{showSubscription && 
              <input type="radio" checked="checked" id="customRadio1" name="customRadio" className="custom-control-input" onClick={()=>setShowSubscription(true)}/>
              }
              {!showSubscription && 
              <input type="radio" id="customRadio1" name="customRadio" className="custom-control-input" onClick={()=>setShowSubscription(true)}/>
              }
							<label className="custom-control-label" for="customRadio1">Yes</label>
							</span>
              <span className="custom-control custom-radio mb-3 d-inline-block  mr-5">
							{!showSubscription && 
              <input type="radio" checked="checked" id="customRadio2" name="customRadio" className="custom-control-input" onClick={()=>setShowSubscription(false)}/>
              }
              {showSubscription && 
              <input type="radio" id="customRadio2" name="customRadio" className="custom-control-input" onClick={()=>{setShowSubscription(false)}}/>
              }
							<label className="custom-control-label" for="customRadio2">No</label>
							</span>
						</div>
						</div>
						</div>
					</div>					
					{showSubscription && 
          <div className="row">
          <div className="col-lg-12">
          <div className="form-group">
          <label for="basicpill-phoneno-input" className="label-100">Subscription Amount for 1 month</label>
          <input className="form-control input-field" value={feesMonth} onChange={(e)=>setfeesMonth(e.target.value)}/>
          </div>
          </div>
        </div>
          }
					{showSubscription && 
          <div className="row">
          <div className="col-lg-12">
          <div className="form-group">
          <label for="basicpill-phoneno-input" className="label-100">Subscription Amount for 12 months</label>
          <input className="form-control input-field" value={feesyear} onChange={(e)=>setfeesyear(e.target.value)}/>
          </div>
          </div>
        </div>
          }					

					<div className="row">
						<div className="col-lg-12">
							<div className="form-group text-left">
							{/* <a href="index.html"> */}
							<button type="button" className="btn btn-success btn-login waves-effect waves-light mr-3" onClick={handleSubcription}>Update</button>
							{/* </a> */}
							</div>
						</div>
					</div>
					</form>
					</div>
				</div>
			{/* <!-- end table-responsive --> */}
			</div>
		</div>
	</div>
	{/* <!-- End of Table subcription settings--> */}

              <div className="col-lg-12">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-12 col-lg-8 col-xl-8">
                        <h1 className="text-left head-small">Payment Methods</h1>

                        <div className="row">
                          <div className="col-lg-12">
                            {/* <div className="method-row">
                              <span className="method-icon">
                                <img src="assets/images/icons/pay-pal-icon.png" />
                              </span>
                              <span className="method-text">
                                <h1>PayPal</h1>
                                <p>
                                  Accept credit cards and PayPal balance. Paid
                                  out to your PayPal instantly.
                                </p>
                              </span>
                              <span className="method-btn">
                                
                                {(!paypal.permissionsGranted || !paypal.ENABLED) &&
                                <button className="btn btn-info" 
                                data-toggle="modal"
                                onClick={linkPaypal}
                                >Link
                                </button>

                                }
                                {paypal.ENABLED && paypal.permissionsGranted && 
                                <button className="btn btn-info" 
                                style={{backgroundColor:"red"}}
                                onClick={paypalDisable}
                                >Disable
                                </button>
                                }
                                
                                
                              </span>
                            </div> */}

                            <div className="method-row">
                              <span className="method-icon">
                                <img src="assets/images/icons/stripe-icon.png" alt=""/>
                              </span>
                              <span className="method-text">
                                <h1>Stripe</h1>
                                <p>
                                  Accept credit cards, Apple Pay and Google Pay.
                                  Paid out to your bank account.
                                </p>
                              </span>

                              <span className="method-btn">
                              {(!stripe.details_submitted || !stripe.ENABLED) &&
                                <button className="btn btn-info" 
                                data-toggle="modal"
                                onClick={handleStripeClick}
                                >Link
                                </button>

                                }
                                {stripe.ENABLED && stripe.details_submitted && 
                                <button className="btn btn-info" 
                                style={{backgroundColor:"red"}}
                                onClick={stripeDisable}
                                >Disable
                                </button>
                                }
                                {/* {!stripe.ENABLED && stripe.details_submitted &&
                                 <button className="btn btn-info" 
                                 data-toggle="modal"
                                 onClick={stripeEnable}
                                 >Enable
                                 </button>
                                } */}
                              {/* {!(Object.keys(stripe).length === 0 && stripe.constructor === Object) && 
                                <button className="btn btn-info" 
                                disabled 
                                style={{backgroundColor:"red"}}
                                >Disable
                                </button>
                                } */}
                                {/* {(Object.keys(stripe).length === 0 && stripe.constructor === Object) &&
                                 <button className="btn btn-info" 
                                 data-toggle="modal"
                                 onClick={handleStripeClick}
                                 >Enable
                                 </button>
                                } */}
                                {/* <div className="dropdown"> */}
                                  {/* <button
                                    className="btn btn-info"
                                    type="button"
                                    id="dropdownMenuButton"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                    onClick={handleStripeClick}
                                  >
                                    Enable
                                  </button> */}

                                  {/* <div
                                    className="dropdown-menu"
                                    aria-labelledby="dropdownMenuButton"
                                  >
                                    <a
                                      className="dropdown-item"
                                      href="/payment/stripe"
                                      target="_blank"
                                    >
                                      I Already have a Stripe account
                                    </a>
                                    <a
                                      className="dropdown-item"
                                      href="konsult-stripe.html"
                                      target="_blank"
                                    >
                                      I don't have a Stripe account
                                    </a>
                                  </div> */}
                                {/* </div> */}
                              </span>
                            </div>

                            <div className="method-row">
                              <span className="method-icon">
                                {/* <img src="assets/images/icons/razorpay-icon.png" /> */}
                              </span>
                              <span className="method-text">
                                {/* <h1>Razorpay</h1> */}
                                {/* <p>
                                  Accept debit / credit cards, UPI, and
                                  Netbanking, Pait out to your bank account in 4
                                  days
                                </p> */}
                              </span>
                              <span className="method-btn">
                                {/* {!(Object.keys(razorpay).length === 0 && razorpay.constructor === Object) &&
                                   <button
                                   data-toggle="modal"
                                   data-target="#razorpay"
                                   className="btn btn-info"
                                   onClick={(e)=>{setEnablePayment("#razorpay");console.log("hello here",enablePayment)}}
                                   disabled
                                   style={{backgroundColor:"red"}}
                                 >
                                   Disable
                                 </button>
                                } */}
                                {/* {(Object.keys(razorpay).length === 0 && razorpay.constructor === Object) &&
                                   <button
                                   data-toggle="modal"
                                   data-target={enablePayment}
                                   className="btn btn-info"
                                   onClick={(e)=>{setEnablePayment("#razorpay");console.log("hello here",enablePayment)}}
            
                                 >
                                   Enable
                                 </button>
                                } */}
                                
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <footer className="footer">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12">
                <script>document.write(new Date().getFullYear());</script>©
                TellyTell.
              </div>
            </div>
          </div>
        </footer> */}
        <Footer/>
      </div>
    </>
  );
}
