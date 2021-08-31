import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { Collapse } from "react-bootstrap";
import { API } from "../../API";
import { isAutheticated, signout } from "../auth/authhelper";

export default function Sidebar() {
  const { token } = isAutheticated();
  const [open, setOpen] = useState(false);
  const [logo, setLogo] = useState("");

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`${API}/api/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.data.data.picture !== "") {
            setLogo(res.data.data.picture);
          }
        });
    };

    fetchData();
  }, [token]);

  return (
    <div className="vertical-menu">
      <div className="navbar-brand-box">
        <Link to="/dashboard" className="logo logo-dark">
          <span className="logo-sm">
            <img src="/assets/images/logo-sm.png" alt="" height="40" />
          </span>
          <span className="logo-lg">
            <img src={logo} alt="" height="20" />
          </span>
        </Link>

        <Link to="index.html" className="logo logo-light">
          <span className="logo-sm">
            <img src="/assets/images/logo-sm.png" alt="" height="40" />
          </span>
          <span className="logo-lg">
            <img src="/assets/images/logo-light.png" alt="" height="20" />
          </span>
        </Link>
      </div>

      <button
        type="button"
        className="
            btn btn-sm
            px-3
            font-size-16
            header-item
            waves-effect
            vertical-menu-btn
          "
      >
        <i className="fa fa-fw fa-bars"></i>
      </button>

      <div data-simplebar className="sidebar-menu-scroll">
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li>
              <Link to="/dashboard">
                <img alt="" src="/assets/images/icons/dashboard-icon.png" />
                <span>Dashboard</span>
              </Link>
            </li>
            {/* <li>
              <Link to="/requests">
                <img alt="" src="/assets/images/icons/request-icon.png" />
                <span>Requests</span>
              </Link>
            </li> */}
            <li>
              <Link to="/subscribers">
                <img alt="" src="/assets/images/icons/viewer-icon.png" />
                <span>Subscribers</span>
              </Link>
            </li>

            <li>
              <Link to="#/" className="has-arrow">
                <img alt="" src="/assets/images/icons/cms-icon.png" />
                <span>Content Management</span>
              </Link>

              <ul className="sub-menu" aria-expanded={false}>
                <li>
                  <Link to="/lessions">Videos</Link>
                </li>
                <li>
                  <Link to="/scheduleVideos">Schedule</Link>
                </li>
                <li>
                  <Link to="/subjects">Banners</Link>
                </li>
                {/* <li>
                  <Link to="/alllanguages">TV Shows
                  </Link>
                </li> */}
                <li>
                  <Link to="/categories">Categories</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="#/" className="has-arrow">
                <img alt="" src="/assets/images/icons/cms-icon.png" />
                <span>Commerce</span>
              </Link>
              <ul className="sub-menu" aria-expanded={false}>
                <li>
                  <Link to="/comproducts">Products</Link>
                </li>
                <li>
                  <Link to="/featured/products">Featured Products</Link>
                </li>
                <li>
                  <Link to="/comcatagory"> Category</Link>
                </li>
                <li>
                  <Link to="/allCoupons">Coupons</Link>
                </li>
                <li>
                  <Link to="/allShippings">Shipping</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/earning">
                <img src="/assets/images/icons/earning-icon.png" alt="" />
                <span>Earnings</span>
              </Link>
            </li>
            <li>
              <Link to="#">
                <img
                  src="/assets/images/icons/payment-settings-icon.png"
                  alt=""
                />
                <span>Payment Settings</span>
              </Link>
              <ul className="sub-menu" aria-expanded={false}>
                <li>
                  <Link to="/payment">Settings</Link>
                </li>
                <li>
                  <Link to="/tax-rates">Tax Rates</Link>
                </li>
              </ul>
            </li>
            {/* <li>
              <Link to="/notification">
                <img src="/assets/images/icons/notification-icon.png" />
                <span>Notification Settings</span>
              </Link>
            </li>

            <li>
              <Link to="/subscription/settings">
                <img src="/assets/images/icons/subscrption-plans-icon.png" />
                <span>Subscription Settings</span>
              </Link>
            </li> */}

            <li>
              <Link to="/profile">
                <img src="/assets/images/icons/site-preference.png" alt="" />
                <span>Profile</span>
              </Link>
            </li>

            <li>
              <Link to="#/" className="has-arrow">
                <img alt="" src="/assets/images/icons/cms-icon.png" />
                <span>Configuration</span>
              </Link>
              <ul className="sub-menu" aria-expanded={false}>
                <li>
                  <Link to="/configuration/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/configuration/text">Text</Link>
                </li>
                <li>
                  <Link to="/configuration/address"> Address</Link>
                </li>
                <li>
                  <Link to="/configuration/social-media">Social Media</Link>
                </li>
                <li>
                  <Link to="/configuration/logo">Logo</Link>
                </li>
                <li>
                  <Link to="/configuration/mobile-tv">Mobile and TV Apps</Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
