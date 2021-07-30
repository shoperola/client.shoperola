import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Notification() {
  return (
    // <div id="layout-wrapper">
    //   <Header />
    //   <Sidebar />

    // </div>
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
                <h4 className="mb-0">Notification Settings</h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <a href="javascript: void(0);">Konsult</a>
                    </li>
                    <li className="breadcrumb-item active">
                      Notification Settings
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <div className="box-notify">
                    <h5 className="mb-3 color-b">
                      General Settings
                      <span
                        className="
                            custom-control custom-switch
                            d-inline-block
                            ml-5
                          "
                      >
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="customSwitch1"
                          checked=""
                        />
                        <label
                          className="custom-control-label"
                          for="customSwitch1"
                        ></label>
                      </span>
                    </h5>

                    <div className="custom-control custom-checkbox mb-3">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="horizontal-customCheck1"
                      />
                      <label
                        className="custom-control-label"
                        for="horizontal-customCheck1"
                      >
                        When I get a new supporter
                      </label>
                    </div>

                    <div className="custom-control custom-checkbox mb-3">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="horizontal-customCheck2"
                      />
                      <label
                        className="custom-control-label"
                        for="horizontal-customCheck2"
                      >
                        When a supporter comments on my page
                      </label>
                    </div>

                    <h5 className="mt-5 mb-3 color-b">Limit Email Notifications</h5>

                    <div className="full-w">
                      <span
                        className="
                            custom-control custom-radio
                            mb-3
                            d-inline-block
                            mr-5
                          "
                      >
                        <input
                          type="radio"
                          id="customRadio1"
                          name="customRadio"
                          className="custom-control-input"
                        />
                        <label className="custom-control-label" for="customRadio1">
                          Limited
                        </label>
                      </span>

                      <span
                        className="
                            custom-control custom-radio
                            mb-3
                            d-inline-block
                            mr-5
                          "
                      >
                        <input
                          type="radio"
                          id="customRadio2"
                          name="customRadio"
                          className="custom-control-input"
                        />
                        <label className="custom-control-label" for="customRadio2">
                          5 per day
                        </label>
                      </span>

                      <span
                        className="
                            custom-control custom-radio
                            mb-3
                            d-inline-block
                            mr-5
                          "
                      >
                        <input
                          type="radio"
                          id="customRadio3"
                          name="customRadio"
                          className="custom-control-input"
                        />
                        <label className="custom-control-label" for="customRadio3">
                          10 per day
                        </label>
                      </span>
                    </div>

                    <div className="form-group text-left mt-5">
                      <a href="#">
                        <button
                          type="button"
                          className="
                              btn btn-success btn-login
                              waves-effect waves-light
                              mr-3
                            "
                        >
                          Save Changes
                        </button>
                      </a>
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
              <script>document.write(new Date().getFullYear());</script>© TellyTell.
            </div>
          </div>
        </div>
      </footer> */}
      <Footer />
    </div>
  );
}
