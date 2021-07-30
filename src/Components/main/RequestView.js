import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function RequestView() {
  return (
    <div id="layout-wrapper">
      <Header />
      <Sidebar />
      <div class="main-content">
        <div class="page-content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-12">
                <div class="page-title-box d-flex align-items-center justify-content-between">
                  <h4 class="mb-0">View Request</h4>

                  <div class="page-title-right">
                    <ol class="breadcrumb m-0">
                      <li class="breadcrumb-item">
                        <a href="javascript: void(0);">TellyTell</a>
                      </li>
                      <li class="breadcrumb-item active">Requests</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-lg-12">
                <div class="card">
                  <div class="card-body">
                    <div class="row ml-0 mr-0  mb-10">
                      <div class="col-sm-12 col-md-6"></div>

                      <div class="col-sm-12 col-md-6">
                        <div class="dropdown d-block">
                          <a href="/requests">
                            <button
                              type="button"
                              class="btn btn-primary add-btn waves-effect waves-light float-right"
                            >
                              Back
                            </button>
                          </a>
                        </div>
                      </div>
                    </div>

                    <div class="table-responsive table-shoot">
                      <table class="table table-centered table-nowrap mb-0">
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
                              <div class="answer-video">
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

              <div class="col-lg-12">
                <div class="card">
                  <div class="card-body">
                    <div class="table-responsive table-shoot">
                      <table class="table table-centered table-nowrap mb-0">
                        <tbody>
                          <tr>
                            <td width="20%" style={{ verticalAlign: "top" }}>
                              {" "}
                              <h4 class="answer">My Answer</h4>
                            </td>
                            <td style={{ verticalAlign: "top" }}>
                              {" "}
                              <div class="answer-video">
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

      {/* <footer class="footer">
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-12">
              <script>document.write(new Date().getFullYear())</script> © TellyTell.
            </div>
          </div>
        </div>
      </footer> */}
      <Footer/>
    </div>
  );
}
