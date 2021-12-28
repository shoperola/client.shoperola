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
        .get(`${API}/api/logo`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res);
          if (res.data.data[0].logo) {
            setLogo(res.data.data[0].logo);
          }
        });
    };

    fetchData();
  }, [token]);

  return (
    <div className="vertical-menu">
      <div className="navbar-brand-box text-center">
        <Link to="/dashboard" className="logo logo-dark">
          <span className="logo-sm">
            <img src={logo} alt="" height="25" width="50" />
          </span>
          <span className="logo-lg">
            <img src={logo} alt="" height="40" style={{ paddingRight: 25 }} />
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
              <Link to="/customers">
                <img alt="" src="/assets/images/icons/viewer-icon.png" />
                <span>Customers</span>
              </Link>
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
                  <Link to="/categories">Categories</Link>
                </li>
                <li>
                  <Link to="/allCoupons">Coupons</Link>
                </li>
                <li>
                  <Link to="/bag">Bag</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="#/" className="has-arrow">
                <img alt="" src="/assets/images/icons/cms-icon.png" />
                <span>Vending Machine</span>
              </Link>
              <ul className="sub-menu" aria-expanded={false}>
                <li>
                  <Link to="/racks">Racks</Link>
                </li>
                <li>
                  <Link to="/access-details">Access Details</Link>
                </li>
                <li>
                  <Link to="/videos">Videos</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="#/" className="has-arrow">
                <img alt="" src="/assets/images/icons/cms-icon.png" />
                <span>Reports</span>
              </Link>
              <ul className="sub-menu" aria-expanded={false}>
                <li>
                  <Link to="/reports/footfalls">Footfalls</Link>
                </li>
                <li>
                  <Link to="/reports/footfalls_by_age">Footfalls by Age</Link>
                </li>
                <li>
                  <Link to="/reports/footfalls_by_gender">
                    Footfalls by Gender
                  </Link>
                </li>
                <li>
                  <Link to="/reports/least_product_sold">
                    Least Product Sold
                  </Link>
                </li>
                <li>
                  <Link to="/reports/most_product_sold">Most Product Sold</Link>
                </li>
                <li>
                  <Link to="/reports/sales">Sales</Link>
                </li>
                <li>
                  <Link to="/reports/orders">Orders</Link>
                </li>
                <li>
                  <Link to="/reports/average_order_value">
                    Average Order Value
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/orders">
                <img alt="" src="/assets/images/icons/revenue-icon.png" />
                <span>Orders Management</span>
              </Link>
            </li>

            <li>
              <Link to="/abondend_cart">
                <img alt="" src="/assets/images/icons/revenue-icon.png" />
                <span>Abandoned Cart</span>
              </Link>
            </li>

            <li>
              <Link to="/contact-requests">
                <img alt="" src="/assets/images/icons/revenue-icon.png" />
                <span>Contact Requests</span>
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

            {/* <li>
              <Link to="/profile">
                <img src="/assets/images/icons/site-preference.png" alt="" />
                <span>Profile</span>
              </Link>
            </li> */}

            <li>
              <Link to="#/" className="has-arrow">
                <img alt="" src="/assets/images/icons/cms-icon.png" />
                <span>Settings</span>
              </Link>
              <ul className="sub-menu" aria-expanded={false}>
                <li>
                  <Link to="/payment">Payments</Link>
                </li>
                <li>
                  <Link to="/tax-rates">Tax Rates</Link>
                </li>
                <li>
                  <Link to="/settings/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/settings/text">Text</Link>
                </li>
                <li>
                  <Link to="/settings/address"> Address</Link>
                </li>
                <li>
                  <Link to="/settings/logo">Logo</Link>
                </li>
                <li>
                  <Link to="/settings/apps">Apps</Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
