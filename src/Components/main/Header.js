import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../../API";
import { isAutheticated, signout } from "../auth/authhelper";

export default function Header() {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    picture: "",
  });

  const { token } = isAutheticated();
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
          firstName: userdata.firstName,
          lastName: userdata.lastName,
          picture: userdata.picture,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <header id="page-topbar">
      <div className="navbar-header">
        <div className="d-flex">
          <div className="navbar-brand-box">
            <a href="index.html" className="logo logo-dark">
              <span className="logo-sm">
                <img src="assets/images/logo-sm.png" alt="" height="50" />
              </span>
              <span className="logo-lg">
                <img src="assets/images/logo-dark.png" alt="" height="20" />
              </span>
            </a>

            <a href="index.html" className="logo logo-light">
              <span className="logo-sm">
                <img src="assets/images/logo-sm.png" alt="" height="40" />
              </span>
              <span className="logo-lg">
                <img src="assets/images/logo-light.png" alt="" height="20" />
              </span>
            </a>
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
        </div>

        <div className="d-flex">
          {/* <div className="dropdown d-inline-block">
            <button
              type="button"
              className="btn header-item noti-icon waves-effect"
              id="page-header-notifications-dropdown"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fa fa-bell-o" aria-hidden="true"></i>
              <span className="badge badge-danger badge-pill">3</span>
            </button>
            <div
              className="dropdown-menu dropdown-menu-lg dropdown-menu-right p-0"
              aria-labelledby="page-header-notifications-dropdown"
            >
              <div className="p-3">
                <div className="row align-items-center">
                  <div className="col">
                    <h5 className="m-0 font-size-16">Notifications</h5>
                  </div>
                </div>
              </div>
              <div data-simplebar style={{ maxHeight: "230px" }}>
                <a href="#" className="text-reset notification-item">
                  <div className="media">
                    <div className="avatar-xs mr-3">
                      <span
                        className="
                            avatar-title
                            bg-primary
                            rounded-circle
                            font-size-16
                          "
                      >
                        <i className="uil-shopping-basket"></i>
                      </span>
                    </div>
                    <div className="media-body">
                      <h6 className="mt-0 mb-1">Your order is placed</h6>
                      <div className="font-size-12 text-muted">
                        <p className="mb-1">
                          If several languages coalesce the grammar
                        </p>
                        <p className="mb-0">
                          <i className="mdi mdi-clock-outline"></i> 3 min ago
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
                <a href="#" className="text-reset notification-item">
                  <div className="media">
                    <img
                      src="assets/images/users/avatar-3.jpg"
                      className="mr-3 rounded-circle avatar-xs"
                      alt="user-pic"
                    />
                    <div className="media-body">
                      <h6 className="mt-0 mb-1">James Lemire</h6>
                      <div className="font-size-12 text-muted">
                        <p className="mb-1">
                          It will seem like simplified English.
                        </p>
                        <p className="mb-0">
                          <i className="mdi mdi-clock-outline"></i> 1 hours ago
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
                <a href="#" className="text-reset notification-item">
                  <div className="media">
                    <div className="avatar-xs mr-3">
                      <span
                        className="
                            avatar-title
                            bg-success
                            rounded-circle
                            font-size-16
                          "
                      >
                        <i className="uil-truck"></i>
                      </span>
                    </div>
                    <div className="media-body">
                      <h6 className="mt-0 mb-1">Your item is shipped</h6>
                      <div className="font-size-12 text-muted">
                        <p className="mb-1">
                          If several languages coalesce the grammar
                        </p>
                        <p className="mb-0">
                          <i className="mdi mdi-clock-outline"></i> 3 min ago
                        </p>
                      </div>
                    </div>
                  </div>
                </a>

                <a href="#" className="text-reset notification-item">
                  <div className="media">
                    <img
                      src="assets/images/users/avatar-4.jpg"
                      className="mr-3 rounded-circle avatar-xs"
                      alt="user-pic"
                    />
                    <div className="media-body">
                      <h6 className="mt-0 mb-1">Salena Layfield</h6>
                      <div className="font-size-12 text-muted">
                        <p className="mb-1">
                          As a skeptical Cambridge friend of mine occidental.
                        </p>
                        <p className="mb-0">
                          <i className="mdi mdi-clock-outline"></i> 1 hours ago
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div> */}

          <div className="dropdown d-inline-block">
            <button
              type="button"
              className="profile-drop btn header-item waves-effect"
              id="page-header-user-dropdown"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img
                className="rounded-circle header-profile-user"
                src={data.picture}
                alt="Header Avatar"
              />
              <span
                className="
                    d-none d-xl-inline-block
                    ml-1
                    font-weight-medium font-size-15
                  "
              >
                {data.firstName && data.lastName
                  ? `${data.firstName + " " + data.lastName}`
                  : "firstname"}
              </span>
              <i className="uil-angle-down d-none d-xl-inline-block font-size-15"></i>
            </button>
            <div className="dropdown-menu dropdown-menu-right">
              <Link className="dropdown-item" to="/change/password">
                <span className="align-middle">Change Password</span>
              </Link>

              {isAutheticated() && (
                <span onClick={signout}>
                  <Link className="dropdown-item" to="/">
                    <span className="align-middle">Sign out</span>
                  </Link>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
