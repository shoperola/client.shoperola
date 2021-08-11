import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { Collapse } from "react-bootstrap";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  return (
    <div className="vertical-menu">
      <div className="navbar-brand-box">
        <Link to="/dashboard" className="logo logo-dark">
          <span className="logo-sm">
            <img src="/assets/images/logo-sm.png" alt="" height="40" />
          </span>
          <span className="logo-lg">
            <img src="/assets/images/logo-lights.png" alt="" height="20" />
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
                <img src="/assets/images/icons/dashboard-icon.png" />
                <span>Dashboard</span>
              </Link>
            </li>
            {/* <li>
              <Link to="/requests">
                <img src="/assets/images/icons/request-icon.png" />
                <span>Requests</span>
              </Link>
            </li> */}
            <li>
              <Link to="/subscribers">
                <img src="/assets/images/icons/viewer-icon.png" />
                <span>Subscribers</span>
              </Link>
            </li>

            <li>
              <Link to="#" className="has-arrow">
                <img src="/assets/images/icons/cms-icon.png" />
                <span>Content Management</span>
              </Link>

              <ul className="sub-menu" aria-expanded={false}>
                <li>
                  <a href="/lessions">Videos</a>
                </li>
                <li>
                  <a href="/scheduleVideos">Schedule</a>
                </li>
                <li>
                  <Link to="/subjects">Banners
                  </Link>
                </li>
                {/* <li>
                  <Link to="/alllanguages">TV Shows
                  </Link>
                </li> */}
                <li>
                  <Link to="/categories">Categories
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="#" className="has-arrow">
                <img src="/assets/images/icons/cms-icon.png" alt=""/>
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
                  <a href="/comcatagory">Category
                  </a>
                </li>
                <li>
                  <a href="/comcatagory">Coupons
                  </a>
                </li>
              </ul>

            </li>

            <li>
              <Link to="/earning">
                <img src="/assets/images/icons/earning-icon.png" />
                <span>Earnings</span>
              </Link>
            </li>
            <li>
              <Link to="/payment">
                <img src="/assets/images/icons/payment-settings-icon.png" />
                <span>Payment Settings</span>
              </Link>
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
                <img src="/assets/images/icons/site-preference.png" />
                <span>Profile</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
