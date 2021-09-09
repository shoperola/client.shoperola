import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../../API";
import { isAutheticated } from "../auth/authhelper";
import Footer from "./Footer";
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
  const [video, setVideo] = useState("");
  const [subscribers, setSubscribers] = useState("");
  const [product, setProduct] = useState("");
  const [tvShow, setTvShow] = useState("");
  const [paypalDataLoaded, setPaypalDataLoaded] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

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
        //console.log("deatails",getData);
        setProduct(getData.productsCount);
        setSubscribers(getData.subscriberCount);
        setTvShow(getData.tvshowsCount);
        setVideo(getData.videosCount);
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
                      <Link to="#">TellyTell</Link>
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
                            src="assets/images/icons/views-icon.png"
                            alt=""
                          />
                        </span>
                        <div className="media-body align-self-center overflow-hidden">
                          <div className="text-left">
                            <h4 className="text-truncate">Total Videos</h4>
                            <h1>{video}</h1>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 mb-10">
                      <div className="media statistics">
                        <span>
                          <img
                            src="assets/images/icons/views-icon.png"
                            alt=""
                          />
                        </span>
                        <div className="media-body align-self-center overflow-hidden">
                          <div className="text-left">
                            <h4 className="text-truncate">Total TV Shows</h4>
                            <h1>{tvShow}</h1>
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
                            <h4 className="text-truncate">Total Subscribers</h4>
                            <h1>{subscribers}</h1>
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

            {/* <div className="col-lg-4 mb-30">
              <div className="card dashboard-box">
                <div className="card-body">
                  <div className="media">
                    <div className="media-body align-self-center overflow-hidden">
                      <div className="text-center">
                        <img
                          src="assets/images/icons/announce-page-icon.png"
                          alt=""
                          className="avatar-md"
                        />

                        <h5 className="text-truncate">Announce your page</h5>
                        <p>
                          This is usually how creators earn their first set of
                          supporters. Make it unique, and maybe even offer
                          something in return. See some examples here.
                        </p>
                        <div className="form-group text-left m-0">
                          <a href="#">
                            <button
                              type="button"
                              className="
                                  btn btn-dashboard
                                  waves-effect waves-light
                                "
                            >
                              Tweet
                            </button>
                          </a>
                          <a href="#">
                            <button
                              type="button"
                              className="
                                  btn btn-dashboard
                                  waves-effect waves-light
                                "
                            >
                              Share
                            </button>
                          </a>

                          <a href="#">
                            <button
                              type="button"
                              className="
                                  btn btn-dashboard
                                  waves-effect waves-light
                                "
                            >
                              Gifs
                            </button>
                          </a>

                          <a href="#">
                            <button
                              type="button"
                              className="
                                  btn btn-dashboard
                                  waves-effect waves-light
                                "
                            >
                              Download Creator Kit
                            </button>
                          </a>
                        </div>

                        <div className="form-group text-left mt-3">
                          <div className="input-group mb-3">
                            <input
                              type="text"
                              className="form-control input-field"
                              placeholder="Url Of user"
                            />
                            <div className="input-group-append">
                              <button className="btn btn-primary" type="button">
                                Copy
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
