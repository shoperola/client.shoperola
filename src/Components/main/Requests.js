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
    <div class="main-content">
      <div class="page-content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-12">
              <div
                class="
                    page-title-box
                    d-flex
                    align-items-center
                    justify-content-between
                  "
              >
                <h4 class="mb-0">Requests</h4>

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
                  <div class="row ml-0 mr-0 mb-10">
                    <div class="col-sm-12 col-md-12">
                      <div class="dataTables_length">
                        <label class="w-100">
                          Show
                          <select
                            name=""
                            class="
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

                  <div class="table-responsive table-shoot">
                    <table class="table table-centered table-nowrap mb-0">
                      <thead class="thead-light">
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
                              class="
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
                              class="
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
                                class="
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
                              class="
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
                              class="
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
                                class="
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

                  <div class="row mt-20">
                    <div class="col-sm-12 col-md-6 mb-20">
                      <div
                        class="dataTables_info"
                        id="datatable_info"
                        role="status"
                        aria-live="polite"
                      >
                        Showing 1 to 10 of 57 entries
                      </div>
                    </div>

                    <div class="col-sm-12 col-md-6">
                      <div
                        class="
                            dataTables_paginate
                            paging_simple_numbers
                            float-right
                          "
                      >
                        <ul class="pagination">
                          <li
                            class="
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
                              class="page-link"
                            >
                              Previous
                            </a>
                          </li>

                          <li class="paginate_button page-item active">
                            <a
                              href="#"
                              aria-controls="datatable"
                              data-dt-idx="1"
                              tabindex="0"
                              class="page-link"
                            >
                              1
                            </a>
                          </li>

                          <li class="paginate_button page-item">
                            <a
                              href="#"
                              aria-controls="datatable"
                              data-dt-idx="2"
                              tabindex="0"
                              class="page-link"
                            >
                              2
                            </a>
                          </li>

                          <li class="paginate_button page-item">
                            <a
                              href="#"
                              aria-controls="datatable"
                              data-dt-idx="3"
                              tabindex="0"
                              class="page-link"
                            >
                              3
                            </a>
                          </li>

                          <li class="paginate_button page-item next">
                            <a href="#" tabindex="0" class="page-link">
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

      {/* <footer class="footer">
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-12">
              <script>document.write(new Date().getFullYear());</script>© TellyTell.
            </div>
          </div>
        </div>
      </footer> */}
      <Footer/>
    </div>
  );
}
