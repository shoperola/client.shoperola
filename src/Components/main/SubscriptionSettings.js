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
                <h4 class="mb-0">Subscription Settings</h4>

                <div class="page-title-right">
                  <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item">
                      <a href="javascript: void(0);">TellyTell</a>
                    </li>
                    <li class="breadcrumb-item active">
                      Subscription Settings
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-12">
              <div class="card">
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-12">
                      <h1 class="text-left head-small">Subscription Plans</h1>

                      <div class="row">
                        <div class="col-lg-3 col-md-6 col-sm-6 mb-20">
                          <div class="h-100 p-relative">
                            <div class="cur_plan">
                              <p>Your Current Plan</p>
                            </div>
                            <div class="card pricing-box text-center">
                              <div class="card-body p-4">
                                <div>
                                  <div>
                                    <h5 class="mb-1">Silver</h5>
                                  </div>
                                </div>
                                <ul class="list-unstyled plan-features mt-3">
                                  <li>
                                    Lipsum generator:
                                    <span
                                      class="
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
                                      class="
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
                                      class="
                                          text-primary
                                          font-weight-semibold
                                        "
                                    >
                                      No
                                    </span>
                                  </li>
                                </ul>
                                <div class="py-4">
                                  <h3>
                                    <sup>
                                      <small>$</small>
                                    </sup>{" "}
                                    19/
                                    <span class="font-size-13 text-muted">
                                      Per month
                                    </span>
                                  </h3>
                                </div>
                                <div class="text-center plan-btn my-2">
                                  <a
                                    href="#"
                                    class="
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

                        <div class="col-lg-3 col-md-6 col-sm-6 mb-20">
                          <div class="card pricing-box text-center">
                            <div class="card-body p-4">
                              <div>
                                <div>
                                  <h5 class="mb-1">Gold</h5>
                                </div>
                              </div>
                              <ul class="list-unstyled plan-features mt-3">
                                <li>
                                  Lipsum generator:
                                  <span class="text-primary font-weight-semibold">
                                    1
                                  </span>
                                </li>
                                <li>
                                  Lorem Ipsum
                                  <span class="text-primary font-weight-semibold">
                                    01 GB
                                  </span>
                                </li>
                                <li>
                                  Lorem Ipsum - All the facts:
                                  <span class="text-primary font-weight-semibold">
                                    No
                                  </span>
                                </li>
                              </ul>
                              <div class="py-4">
                                <h3>
                                  <sup>
                                    <small>$</small>
                                  </sup>{" "}
                                  39/
                                  <span class="font-size-13 text-muted">
                                    Per month
                                  </span>
                                </h3>
                              </div>
                              <div class="text-center plan-btn my-2">
                                <a
                                  href="#"
                                  class="
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

                        <div class="col-lg-3 col-md-6 col-sm-6 mb-20">
                          <div class="card pricing-box text-center">
                            <div class="card-body p-4">
                              <div>
                                <div>
                                  <h5 class="mb-1">Dimond</h5>
                                </div>
                              </div>
                              <ul class="list-unstyled plan-features mt-3">
                                <li>
                                  Lipsum generator:
                                  <span class="text-primary font-weight-semibold">
                                    1
                                  </span>
                                </li>
                                <li>
                                  Lorem Ipsum
                                  <span class="text-primary font-weight-semibold">
                                    01 GB
                                  </span>
                                </li>
                                <li>
                                  Lorem Ipsum - All the facts:
                                  <span class="text-primary font-weight-semibold">
                                    No
                                  </span>
                                </li>
                              </ul>
                              <div class="py-4">
                                <h3>
                                  <sup>
                                    <small>$</small>
                                  </sup>{" "}
                                  59/
                                  <span class="font-size-13 text-muted">
                                    Per month
                                  </span>
                                </h3>
                              </div>
                              <div class="text-center plan-btn my-2">
                                <a
                                  href="#"
                                  class="
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

                        <div class="col-lg-3 col-md-6 col-sm-6 mb-20">
                          <div class="card pricing-box text-center">
                            <div class="card-body p-4">
                              <div>
                                <div>
                                  <h5 class="mb-1">Platinum</h5>
                                </div>
                              </div>
                              <ul class="list-unstyled plan-features mt-3">
                                <li>
                                  Lipsum generator:
                                  <span class="text-primary font-weight-semibold">
                                    1
                                  </span>
                                </li>
                                <li>
                                  Lorem Ipsum
                                  <span class="text-primary font-weight-semibold">
                                    01 GB
                                  </span>
                                </li>
                                <li>
                                  Lorem Ipsum - All the facts:
                                  <span class="text-primary font-weight-semibold">
                                    No
                                  </span>
                                </li>
                              </ul>
                              <div class="py-4">
                                <h3>
                                  <sup>
                                    <small>$</small>
                                  </sup>{" "}
                                  99/
                                  <span class="font-size-13 text-muted">
                                    Per month
                                  </span>
                                </h3>
                              </div>
                              <div class="text-center plan-btn my-2">
                                <a
                                  href="#"
                                  class="
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

            <div class="col-lg-12">
              <div class="card">
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-12">
                      <h1 class="text-left head-small">Invoices</h1>

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
                                  class="
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
                                    class="
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
                                  class="
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
                                    class="
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
                                  class="
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
                                    class="
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
                                  class="
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
                                    class="
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
                                  class="
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
                                    class="
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
                                  class="
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
                                    class="
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
