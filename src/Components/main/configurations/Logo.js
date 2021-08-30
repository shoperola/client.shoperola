import React from "react";
import { Link } from "react-router-dom";
import { API } from "../../../API";
import { isAutheticated } from "../../auth/authhelper";
import Footer from "../Footer";

const ConfigLogo = () => {
  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0">Logo</h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">TellyTell</Link>
                    </li>
                    <li className="breadcrumb-item active">Logo</li>
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
                    <div className="col-md-12 col-lg-9 col-xl-7">
                      <form>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group mb-30 width-100 row">
                              <label className="col-md-4 control-label">
                                Upload Logo
                                <br />{" "}
                                <span className="size">(148 x 48 px)</span>
                              </label>
                              <div className="col-md-8">
                                <input
                                  type="file"
                                  className="form-control input-field"
                                  value=""
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group text-left">
                              <a href="footer-social-media.html">
                                <button
                                  type="button"
                                  className="btn btn-success btn-login waves-effect waves-light mr-3"
                                >
                                  Save
                                </button>
                              </a>
                              <a href="#">
                                <button
                                  type="button"
                                  className="btn btn-success btn-cancel waves-effect waves-light mr-3"
                                >
                                  Cancel
                                </button>
                              </a>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ConfigLogo;
