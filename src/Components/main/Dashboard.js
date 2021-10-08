import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../../API";
import { isAutheticated } from "../auth/authhelper";
import SalesChart from "./SalesChart";
import Footer from "./Footer";
import OrdersChart from "./OrdersChart";
import AverageOrdersChart from "./AverageOrdersChart";
// import Header from "./Header";
// import Sidebar from "./Sidebar";

export default function Dashboard() {
  const [data, setData] = useState({
    picture: "",
    facebookLink: "",
    twitterLink: "",
    websiteLink: "",
    linkedinLink: "",
    fees: "",
    username: "",
  });

  const [paypal, setPaypal] = useState({});
  const [stripe, setStripe] = useState({});
  const [totalOrders, setTotalOrders] = useState(0);
  const [subscribers, setSubscribers] = useState("");
  const [product, setProduct] = useState("");
  const [totalSales, setTotalSales] = useState(0);
  const [paypalDataLoaded, setPaypalDataLoaded] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [orders, setOrders] = useState([]);
  const [month, setMonth] = useState(1);
  const [salesData, setSalesData] = useState([]);
  const [ordersData, setOrdersData] = useState([]);
  const [averageOrdersData, setAverageOrdersData] = useState([]);
  const { token } = isAutheticated();
  //console.log(token);
  useEffect(() => {
    axios
      .get(`${API}/api/user/payments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const getData = response.data.data;
        //console.log("payment",getData);
        setPaypal(getData.paypal);
        setStripe(getData.stripe);
        setPaypalDataLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`${API}/api/user/details`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const getData = response.data.data;
        console.log("deatails", getData);
        setProduct(getData.productsCount);
        setSubscribers(getData.subscriberCount);
        // setTvShow(getData.tvshowsCount);
        // setVideo(getData.videosCount);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    // $("#summernote").summernote();

    axios
      .get(`${API}/api/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const userdata = response.data.data;
        setData({
          ...data,
          picture: userdata.picture,
          twitterLink: userdata.twitterLink,
          linkedinLink: userdata.linkedinLink,
          facebookLink: userdata.facebookLink,
          fees: userdata.fees,
        });
        setDataLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    // $("#summernote").summernote();

    axios
      .get(`${API}/api/order/view_order`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTotalOrders(response.data.total_orders);
        setTotalSales(response.data.total_sales);
        setOrders(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const setData = () => {
      const data = orders.filter(
        (item) => new Date(item.createdAt).getMonth() == month
      );
      let dates = [];
      for (let i = 0; i < 31; i++) dates = [...dates, { amount: 0, orders: 0 }];
      data.map((item) => {
        dates[new Date(item.createdAt).getDate() - 1].amount += item.amount;
        dates[new Date(item.createdAt).getDate() - 1].orders += 1;
      });
      setSalesData(
        dates.map((item, idx) => ({
          x: idx + 1,
          y: item.amount,
        }))
      );

      setOrdersData(
        dates.map((item, idx) => ({
          x: idx + 1,
          y: item.orders,
        }))
      );

      setAverageOrdersData(
        dates.map((item, idx) => ({
          x: idx + 1,
          y: item.amount / item.orders,
        }))
      );
    };

    setData();
  }, [data, month]);

  return (
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
                <h4 className="mb-0">Dashboard</h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="#">Shoperola</Link>
                    </li>
                    <li className="breadcrumb-item active">Dashboard</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12 mb-30">
              <div className="card dashboard-box">
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-4 mb-0">
                      <div className="media statistics">
                        <span>
                          <img
                            src="assets/images/icons/earning-icon2.png"
                            alt=""
                          />
                        </span>
                        <div className="media-body align-self-center overflow-hidden">
                          <div className="text-left">
                            <h4 className="text-truncate">Total Products</h4>
                            <h1>
                              {/* <i className="fa fa-usd" aria-hidden="true"></i> */}
                              {product}
                            </h1>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-4 mb-10">
                      <div className="media statistics">
                        <span>
                          <img
                            src="assets/images/icons/reviews-icon.png"
                            alt=""
                          />
                        </span>
                        <div className="media-body align-self-center overflow-hidden">
                          <div className="text-left">
                            <h4 className="text-truncate">Total Customers</h4>
                            <h1>{subscribers}</h1>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-4 mb-10">
                      <div className="media statistics">
                        <span>
                          <img
                            src="assets/images/icons/reviews-icon.png"
                            alt=""
                          />
                        </span>
                        <div className="media-body align-self-center overflow-hidden">
                          <div className="text-left">
                            <h4 className="text-truncate">Total Sales</h4>
                            <h1>{totalSales}</h1>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-4 mb-10">
                      <div className="media statistics">
                        <span>
                          <img
                            src="assets/images/icons/reviews-icon.png"
                            alt=""
                          />
                        </span>
                        <div className="media-body align-self-center overflow-hidden">
                          <div className="text-left">
                            <h4 className="text-truncate">Total Orders</h4>
                            <h1>{totalOrders}</h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12 mb-30">
              <div className="card dashboard-box">
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-12 mb-30">
                      <label
                        htmlFor="basicpill-phoneno-input"
                        className="label-100"
                      >
                        Select Month
                      </label>
                      <select
                        name="month"
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        className="form-control input-field"
                      >
                        <option value="0">January</option>
                        <option value="1">February</option>
                        <option value="2">March</option>
                        <option value="3">April</option>
                        <option value="4">May</option>
                        <option value="5">June</option>
                        <option value="6">July</option>
                        <option value="7">August</option>
                        <option value="8">September</option>
                        <option value="9">October</option>
                        <option value="10">November</option>
                        <option value="11">December</option>
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <SalesChart
                        title="Sales"
                        ordersData={salesData}
                        month={month}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12 mt-5">
                      <OrdersChart month={month} ordersData={ordersData} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 mt-5">
                      <AverageOrdersChart
                        month={month}
                        ordersData={averageOrdersData}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="row">
            {paypalDataLoaded &&
              (!paypal.permissionsGranted || !paypal.ENABLED) &&
              (!stripe.details_submitted || !stripe.ENABLED) && (
                <div className="col-lg-4 mb-30">
                  <div className="card dashboard-box">
                    <div className="card-body">
                      <div className="media">
                        <div className="media-body align-self-center overflow-hidden">
                          <div className="text-center">
                            <img
                              src="assets/images/icons/payout-icon.png"
                              alt=""
                              className="avatar-md"
                            />
                            <h5 className="text-truncate">
                              Connect a payout method
                            </h5>
                            <p>
                              Your page is currently private. Connect your
                              PayPal or Stripe account to start receiving
                              payments.
                            </p>
                            <div className="form-group m-0">
                              <Link to="/payment">
                                <button
                                  type="button"
                                  className="
                                  btn btn-dashboard
                                  waves-effect waves-light
                                "
                                  style={{ backgroundColor: "blueviolet" }}
                                >
                                  Connect
                                </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            {dataLoaded && data.picture == "" && (
              <div className="col-lg-4 mb-30">
                <div className="card dashboard-box">
                  <div className="card-body">
                    <div className="media">
                      <div className="media-body align-self-center overflow-hidden">
                        <div className="text-center">
                          <img
                            src="assets/images/icons/profile-page-icon.png"
                            alt=""
                            className="avatar-md"
                          />
                          <h5 className="text-truncate">Complete your page</h5>
                          <p>
                            Add a photo, one-liner, and a little bit about you.
                            See some beautiful examples here, here, and here.
                          </p>
                          <div className="form-group m-0">
                            <a href="profile.html">
                              <button
                                type="button"
                                className="
                                  btn btn-dashboard
                                  waves-effect waves-light
                                "
                              >
                                Connect
                              </button>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {dataLoaded && data.fees == 0 && (
              <div className="col-lg-4 mb-30">
                {console.log(data.fees)}
                <div className="card dashboard-box">
                  <div className="card-body">
                    <div className="media">
                      <div className="media-body align-self-center overflow-hidden">
                        <div className="text-center">
                          <img
                            src="assets/images/icons/setgoal-icon.png"
                            alt=""
                            className="avatar-md"
                          />
                          <h5 className="text-truncate">
                            Set a goal - Set price for consulting
                          </h5>
                          <p>
                            Pages with goals consistently attract more
                            supporters. Add some goals and let them be a part of
                            your creative journey.
                          </p>

                          <div className="form-group m-0">
                            <a href="payment-setting.html">
                              <button
                                type="button"
                                className="
                                  btn btn-dashboard
                                  waves-effect waves-light
                                "
                              >
                                Connect
                              </button>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {data.facebookLink == "" &&
              data.linkedinLink == "" &&
              data.websiteLink &&
              data.twitterLink == "" && (
                <div className="col-lg-4 mb-30">
                  <div className="card dashboard-box">
                    <div className="card-body">
                      <div className="media">
                        <div className="media-body align-self-center overflow-hidden">
                          <div className="text-center">
                            <img
                              src="assets/images/icons/social-iocn.png"
                              alt=""
                              className="avatar-md"
                            />
                            <h5 className="text-truncate">
                              Link from your social bio and descriptions
                            </h5>
                            <p>
                              Keep your BMC link where your followers can find
                              them. Most creators add it as their primary bio
                              link on Twitter, Instagram, Linktree, Youtube
                              description, etc.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
          </div> */}
        </div>
      </div>

      <Footer />
    </div>
  );
}
