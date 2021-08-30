import React from "react";
import { Link } from "react-router-dom";
import { API } from "../../../API";
import { isAutheticated } from "../../auth/authhelper";
import Footer from "../Footer";

const MobileTV = () => {
  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0">Mobile and TV Apps</h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">TellyTell</Link>
                    </li>
                    <li className="breadcrumb-item active">
                      Mobile and TV Apps
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
                  <div className="row">
                    <div className="col-md-12 col-lg-9 col-xl-7">
                      <form>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group">
                              <label
                                for="basicpill-phoneno-input"
                                className="label-100"
                              >
                                Android Mobile App Name
                              </label>
                              <input
                                type="text"
                                className="form-control input-field"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group mb-30 width-100 row">
                              <label className="col-md-4 control-label">
                                Upload App Icon for Android Mobile App
                                <br />
                                <span className="size">(512 x 512 px)</span>
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
                            <div className="form-group">
                              <label
                                for="basicpill-phoneno-input"
                                className="label-100"
                              >
                                iOS Mobile App Name
                              </label>
                              <input
                                type="text"
                                className="form-control input-field"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group mb-30 width-100 row">
                              <label className="col-md-4 control-label">
                                Upload App Icon for iOS Mobile App
                                <br />
                                <span className="size">(512 x 512 px)</span>
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
                            <div className="form-group">
                              <label
                                for="basicpill-phoneno-input"
                                className="label-100"
                              >
                                Android TV App Name
                              </label>
                              <input
                                type="text"
                                className="form-control input-field"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group mb-30 width-100 row">
                              <label className="col-md-4 control-label">
                                Upload App Icon for Android TV App
                                <br />
                                <span className="size">(512 x 512 px)</span>
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
                            <div className="form-group">
                              <label
                                for="basicpill-phoneno-input"
                                className="label-100"
                              >
                                Apple TV App Name
                              </label>
                              <input
                                type="text"
                                className="form-control input-field"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group mb-30 width-100 row">
                              <label className="col-md-4 control-label">
                                Upload App Icon for Apple TV App
                                <br />
                                <span className="size">(512 x 512 px)</span>
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
                            <div className="form-group">
                              <label
                                for="basicpill-phoneno-input"
                                className="label-100"
                              >
                                FireOS TV App Name
                              </label>
                              <input
                                type="text"
                                className="form-control input-field"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group mb-30 width-100 row">
                              <label className="col-md-4 control-label">
                                Upload App Icon for FireOS TV App
                                <br />
                                <span className="size">(512 x 512 px)</span>
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

export default MobileTV;
