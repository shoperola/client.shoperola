import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Requests() {
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
                <h4 className="mb-0">Requests</h4>

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
                  <div className="row ml-0 mr-0 mb-10">
                    <div className="col-sm-12 col-md-12">
                      <div className="dataTables_length">
                        <label className="w-100">
                          Show
                          <select
                            name=""
                            className="
                                select-w
                                custom-select custom-select-sm
                                form-control form-control-sm
                              "
                          >
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                          </select>
                          entries
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="table-responsive table-shoot">
                    <table className="table table-centered table-nowrap mb-0">
                      <thead className="thead-light">
                        <tr>
                          <th>Name</th>
                          <th>Request</th>

                          <th>Requested On</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Aamir Khan</td>
                          <td>
                            Share your feedback on my business powerpoint
                            presentation
                          </td>

                          <td>04 May 2021</td>
                          <td>
                            <span
                              className="
                                  badge badge-pill badge-soft-success
                                  font-size-12
                                "
                            >
                              Replied
                            </span>
                          </td>
                          <td>
                            <button
                              type="button"
                              className="
                                  btn btn-success btn-sm
                                  waves-effect waves-light
                                  btn-table
                                "
                            >
                              View Answer
                            </button>
                            <a href="/requests/view">
                              <button
                                type="button"
                                className="
                                    btn btn-info btn-sm
                                    waves-effect waves-light
                                    btn-table
                                    ml-2
                                  "
                              >
                                View Request
                              </button>
                            </a>
                          </td>
                        </tr>

                        <tr>
                          <td>Akshay Kumar</td>
                          <td>
                            Do you have tips on remembering peoples names?
                          </td>
                          <td>04 May 2021</td>
                          <td>
                            <span
                              className="
                                  badge badge-pill badge-soft-danger
                                  font-size-12
                                "
                            >
                              Pending
                            </span>
                          </td>

                          <td>
                            <button
                              data-toggle="modal"
                              data-target="#record-video"
                              type="button"
                              className="
                                  btn btn-danger btn-sm
                                  waves-effect waves-light
                                  btn-table
                                "
                            >
                              Record
                            </button>
                            <a href="/requests/view">
                              <button
                                type="button"
                                className="
                                    btn btn-info btn-sm
                                    waves-effect waves-light
                                    btn-table
                                    ml-2
                                  "
                              >
                                View Request
                              </button>
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="row mt-20">
                    <div className="col-sm-12 col-md-6 mb-20">
                      <div
                        className="dataTables_info"
                        id="datatable_info"
                        role="status"
                        aria-live="polite"
                      >
                        Showing 1 to 10 of 57 entries
                      </div>
                    </div>

                    <div className="col-sm-12 col-md-6">
                      <div
                        className="
                            dataTables_paginate
                            paging_simple_numbers
                            float-right
                          "
                      >
                        <ul className="pagination">
                          <li
                            className="
                                paginate_button
                                page-item
                                previous
                                disabled
                              "
                          >
                            <a
                              href="#"
                              aria-controls="datatable"
                              data-dt-idx="0"
                              tabindex="0"
                              className="page-link"
                            >
                              Previous
                            </a>
                          </li>

                          <li className="paginate_button page-item active">
                            <a
                              href="#"
                              aria-controls="datatable"
                              data-dt-idx="1"
                              tabindex="0"
                              className="page-link"
                            >
                              1
                            </a>
                          </li>

                          <li className="paginate_button page-item">
                            <a
                              href="#"
                              aria-controls="datatable"
                              data-dt-idx="2"
                              tabindex="0"
                              className="page-link"
                            >
                              2
                            </a>
                          </li>

                          <li className="paginate_button page-item">
                            <a
                              href="#"
                              aria-controls="datatable"
                              data-dt-idx="3"
                              tabindex="0"
                              className="page-link"
                            >
                              3
                            </a>
                          </li>

                          <li className="paginate_button page-item next">
                            <a href="#" tabindex="0" className="page-link">
                              Next
                            </a>
                          </li>
                        </ul>
                      </div>
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
      <Footer/>
    </div>
  );
}
