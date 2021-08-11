import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function SubscriptionSettings() {
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
                <h4 className="mb-0">Subscription Settings</h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <a href="javascript: void(0);">TellyTell</a>
                    </li>
                    <li className="breadcrumb-item active">
                      Subscription Settings
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
                    <div className="col-md-12">
                      <h1 className="text-left head-small">Subscription Plans</h1>

                      <div className="row">
                        <div className="col-lg-3 col-md-6 col-sm-6 mb-20">
                          <div className="h-100 p-relative">
                            <div className="cur_plan">
                              <p>Your Current Plan</p>
                            </div>
                            <div className="card pricing-box text-center">
                              <div className="card-body p-4">
                                <div>
                                  <div>
                                    <h5 className="mb-1">Silver</h5>
                                  </div>
                                </div>
                                <ul className="list-unstyled plan-features mt-3">
                                  <li>
                                    Lipsum generator:
                                    <span
                                      className="
                                          text-primary
                                          font-weight-semibold
                                        "
                                    >
                                      1
                                    </span>
                                  </li>
                                  <li>
                                    Lorem Ipsum
                                    <span
                                      className="
                                          text-primary
                                          font-weight-semibold
                                        "
                                    >
                                      01 GB
                                    </span>
                                  </li>
                                  <li>
                                    Lorem Ipsum - All the facts:
                                    <span
                                      className="
                                          text-primary
                                          font-weight-semibold
                                        "
                                    >
                                      No
                                    </span>
                                  </li>
                                </ul>
                                <div className="py-4">
                                  <h3>
                                    <sup>
                                      <small>$</small>
                                    </sup>{" "}
                                    19/
                                    <span className="font-size-13 text-muted">
                                      Per month
                                    </span>
                                  </h3>
                                </div>
                                <div className="text-center plan-btn my-2">
                                  <a
                                    href="#"
                                    className="
                                        btn btn-primary
                                        waves-effect waves-light
                                      "
                                  >
                                    Upgrade Now
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-3 col-md-6 col-sm-6 mb-20">
                          <div className="card pricing-box text-center">
                            <div className="card-body p-4">
                              <div>
                                <div>
                                  <h5 className="mb-1">Gold</h5>
                                </div>
                              </div>
                              <ul className="list-unstyled plan-features mt-3">
                                <li>
                                  Lipsum generator:
                                  <span className="text-primary font-weight-semibold">
                                    1
                                  </span>
                                </li>
                                <li>
                                  Lorem Ipsum
                                  <span className="text-primary font-weight-semibold">
                                    01 GB
                                  </span>
                                </li>
                                <li>
                                  Lorem Ipsum - All the facts:
                                  <span className="text-primary font-weight-semibold">
                                    No
                                  </span>
                                </li>
                              </ul>
                              <div className="py-4">
                                <h3>
                                  <sup>
                                    <small>$</small>
                                  </sup>{" "}
                                  39/
                                  <span className="font-size-13 text-muted">
                                    Per month
                                  </span>
                                </h3>
                              </div>
                              <div className="text-center plan-btn my-2">
                                <a
                                  href="#"
                                  className="
                                      btn btn-primary
                                      waves-effect waves-light
                                    "
                                >
                                  Upgrade Now
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-3 col-md-6 col-sm-6 mb-20">
                          <div className="card pricing-box text-center">
                            <div className="card-body p-4">
                              <div>
                                <div>
                                  <h5 className="mb-1">Dimond</h5>
                                </div>
                              </div>
                              <ul className="list-unstyled plan-features mt-3">
                                <li>
                                  Lipsum generator:
                                  <span className="text-primary font-weight-semibold">
                                    1
                                  </span>
                                </li>
                                <li>
                                  Lorem Ipsum
                                  <span className="text-primary font-weight-semibold">
                                    01 GB
                                  </span>
                                </li>
                                <li>
                                  Lorem Ipsum - All the facts:
                                  <span className="text-primary font-weight-semibold">
                                    No
                                  </span>
                                </li>
                              </ul>
                              <div className="py-4">
                                <h3>
                                  <sup>
                                    <small>$</small>
                                  </sup>{" "}
                                  59/
                                  <span className="font-size-13 text-muted">
                                    Per month
                                  </span>
                                </h3>
                              </div>
                              <div className="text-center plan-btn my-2">
                                <a
                                  href="#"
                                  className="
                                      btn btn-primary
                                      waves-effect waves-light
                                    "
                                >
                                  Upgrade Now
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-3 col-md-6 col-sm-6 mb-20">
                          <div className="card pricing-box text-center">
                            <div className="card-body p-4">
                              <div>
                                <div>
                                  <h5 className="mb-1">Platinum</h5>
                                </div>
                              </div>
                              <ul className="list-unstyled plan-features mt-3">
                                <li>
                                  Lipsum generator:
                                  <span className="text-primary font-weight-semibold">
                                    1
                                  </span>
                                </li>
                                <li>
                                  Lorem Ipsum
                                  <span className="text-primary font-weight-semibold">
                                    01 GB
                                  </span>
                                </li>
                                <li>
                                  Lorem Ipsum - All the facts:
                                  <span className="text-primary font-weight-semibold">
                                    No
                                  </span>
                                </li>
                              </ul>
                              <div className="py-4">
                                <h3>
                                  <sup>
                                    <small>$</small>
                                  </sup>{" "}
                                  99/
                                  <span className="font-size-13 text-muted">
                                    Per month
                                  </span>
                                </h3>
                              </div>
                              <div className="text-center plan-btn my-2">
                                <a
                                  href="#"
                                  className="
                                      btn btn-primary
                                      waves-effect waves-light
                                    "
                                >
                                  Upgrade Now
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12">
                      <h1 className="text-left head-small">Invoices</h1>

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
                              <th>Order ID</th>
                              <th>Order Amount</th>
                              <th>Payment Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>ORDER0001</td>
                              <td>$ 49</td>
                              <td>
                                <span
                                  className="
                                      badge badge-pill badge-soft-success
                                      font-size-12
                                    "
                                >
                                  Success
                                </span>
                              </td>
                              <td>
                                <a href="invoice-view.html">
                                  <button
                                    type="button"
                                    className="
                                        btn btn-info btn-sm
                                        waves-effect waves-light
                                        btn-table
                                        ml-2
                                      "
                                  >
                                    View Invoice
                                  </button>
                                </a>
                              </td>
                            </tr>

                            <tr>
                              <td>ORDER0001</td>
                              <td>$ 49</td>
                              <td>
                                <span
                                  className="
                                      badge badge-pill badge-soft-success
                                      font-size-12
                                    "
                                >
                                  Success
                                </span>
                              </td>
                              <td>
                                <a href="invoice-view.html">
                                  <button
                                    type="button"
                                    className="
                                        btn btn-info btn-sm
                                        waves-effect waves-light
                                        btn-table
                                        ml-2
                                      "
                                  >
                                    View Invoice
                                  </button>
                                </a>
                              </td>
                            </tr>

                            <tr>
                              <td>ORDER0001</td>
                              <td>$ 49</td>
                              <td>
                                <span
                                  className="
                                      badge badge-pill badge-soft-success
                                      font-size-12
                                    "
                                >
                                  Success
                                </span>
                              </td>
                              <td>
                                <a href="invoice-view.html">
                                  <button
                                    type="button"
                                    className="
                                        btn btn-info btn-sm
                                        waves-effect waves-light
                                        btn-table
                                        ml-2
                                      "
                                  >
                                    View Invoice
                                  </button>
                                </a>
                              </td>
                            </tr>

                            <tr>
                              <td>ORDER0001</td>
                              <td>$ 49</td>
                              <td>
                                <span
                                  className="
                                      badge badge-pill badge-soft-success
                                      font-size-12
                                    "
                                >
                                  Success
                                </span>
                              </td>
                              <td>
                                <a href="invoice-view.html">
                                  <button
                                    type="button"
                                    className="
                                        btn btn-info btn-sm
                                        waves-effect waves-light
                                        btn-table
                                        ml-2
                                      "
                                  >
                                    View Invoice
                                  </button>
                                </a>
                              </td>
                            </tr>

                            <tr>
                              <td>ORDER0001</td>
                              <td>$ 49</td>
                              <td>
                                <span
                                  className="
                                      badge badge-pill badge-soft-success
                                      font-size-12
                                    "
                                >
                                  Success
                                </span>
                              </td>
                              <td>
                                <a href="invoice-view.html">
                                  <button
                                    type="button"
                                    className="
                                        btn btn-info btn-sm
                                        waves-effect waves-light
                                        btn-table
                                        ml-2
                                      "
                                  >
                                    View Invoice
                                  </button>
                                </a>
                              </td>
                            </tr>

                            <tr>
                              <td>ORDER0001</td>
                              <td>$ 49</td>
                              <td>
                                <span
                                  className="
                                      badge badge-pill badge-soft-success
                                      font-size-12
                                    "
                                >
                                  Success
                                </span>
                              </td>
                              <td>
                                <a href="invoice-view.html">
                                  <button
                                    type="button"
                                    className="
                                        btn btn-info btn-sm
                                        waves-effect waves-light
                                        btn-table
                                        ml-2
                                      "
                                  >
                                    View Invoice
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
