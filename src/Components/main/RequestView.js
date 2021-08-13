import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function RequestView() {
  return (
    <div id="layout-wrapper">
      <Header />
      <Sidebar />
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">View Request</h4>

                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="javascript: void(0);">TellyTell</a>
                      </li>
                      <li className="breadcrumb-item active">Requests</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-body">
                    <div className="row ml-0 mr-0  mb-10">
                      <div className="col-sm-12 col-md-6"></div>

                      <div className="col-sm-12 col-md-6">
                        <div className="dropdown d-block">
                          <a href="/requests">
                            <button
                              type="button"
                              className="btn btn-primary add-btn waves-effect waves-light float-right"
                            >
                              Back
                            </button>
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="table-responsive table-shoot">
                      <table className="table table-centered table-nowrap mb-0">
                        <tbody>
                          <tr>
                            <td width="20%">
                              <b>Name</b>
                            </td>
                            <td>Aamir Khan</td>
                          </tr>

                          <tr>
                            <td>
                              <b>Request Type</b>
                            </td>
                            <td>Question</td>
                          </tr>

                          <tr>
                            <td>
                              <b>Request</b>
                            </td>
                            <td>
                              Share your feedback on my business powerpoint
                              presentation
                            </td>
                          </tr>

                          <tr>
                            <td style={{ verticalAlign: "top" }}>
                              <b>Video</b>
                            </td>
                            <td style={{ verticalAlign: "top" }}>
                              {" "}
                              <div className="answer-video">
                                <video width="100%" height="100%" autoplay>
                                  <source
                                    src="/assets/images/movie.mp4"
                                    type="video/mp4"
                                  />
                                  <source src="movie.ogg" type="video/ogg" />
                                  Your browser does not support the video tag.
                                </video>
                              </div>
                            </td>
                          </tr>

                          <tr>
                            <td>
                              <b>Attachment</b>
                            </td>
                            <td>
                              <a href="#">View Document Name</a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-12">
                <div className="card">
                  <div className="card-body">
                    <div className="table-responsive table-shoot">
                      <table className="table table-centered table-nowrap mb-0">
                        <tbody>
                          <tr>
                            <td width="20%" style={{ verticalAlign: "top" }}>
                              {" "}
                              <h4 className="answer">My Answer</h4>
                            </td>
                            <td style={{ verticalAlign: "top" }}>
                              {" "}
                              <div className="answer-video">
                                <video width="100%" height="100%" autoplay>
                                  <source
                                    src="/assets/images/movie.mp4"
                                    type="video/mp4"
                                  />
                                  <source src="movie.ogg" type="video/ogg" />
                                  Your browser does not support the video tag.
                                </video>
                              </div>{" "}
                            </td>
                          </tr>
                        </tbody>
                      </table>
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
