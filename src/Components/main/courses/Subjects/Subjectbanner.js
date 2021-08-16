import React from "react";
import Sidebar from "../../Sidebar";
import Header from "../../Header";
import Footer from "../../Footer";
export default function Subjectbanner() {
  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0">Courses - Subjects</h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <a href="javascript: void(0);">TellyTell</a>
                    </li>
                    <li className="breadcrumb-item">Courses - Subjects - Banner</li>

                    <li className="breadcrumb-item">Edit</li>
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
                      <h1 className="text-left head-small">Manage Banner</h1>

                      <form>
                        <div className="form-group mb-30 width-100 row">
                          <label className="col-md-4 control-label">
                            Upload Thumbnail Image
                            <br />
                            <span className="size">(1125 x 451 px)</span>
                          </label>
                          <div className="col-md-8">
                            <input
                              type="file"
                              className="form-control input-field"
                              value=""
                            />

                            <div className="col-md-12 p-0 mt-20 img-display">
                              <img
                                src="assets/images/banner-img.png"
                                height="100"
                                alt=""
                              />
                              <span>
                                <button
                                  type="button"
                                  className="btn btn-danger btn-sm  waves-effect waves-light btn-table ml-2"
                                  id="sa-params"
                                >
                                  Delete
                                </button>
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group text-left">
                              <a href="categories.html">
                                <button
                                  type="button"
                                  className="btn btn-success btn-login waves-effect waves-light mr-3"
                                >
                                  Save
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

      {/* <footer className="footer">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <script>document.write(new Date().getFullYear())</script> © TellyTell.
            </div>
          </div>
        </div>
      </footer> */}
      <Footer/>
    </div>
  );
}
