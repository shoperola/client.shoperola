import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../../API";
import { isAutheticated } from "../auth/authhelper";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { data } from "jquery";
import Footer from "./Footer";

export default function OrderView(props) {
  const { id } = props.match.params;
  //console.log(id);
  const { token } = isAutheticated();
  const [order, setOrder] = useState({});
  useEffect(() => {
    axios
      .get(`${API}/api/user/transaction/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        let data = response.data.data;
        setOrder(data);
        //console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
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
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0">Earnings - Order Details</h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <a href="javascript: void(0);">Shoperola</a>
                    </li>
                    <li className="breadcrumb-item">Order ID {order._id}</li>
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
                      <h1 className="text-left head-small">
                        Order ID: {order._id}
                      </h1>

                      <form>
                        <div className="row mt-20">
                          <div className="col-md-4 font-b">User Name</div>
                          {!(
                            Object.keys(order).length === 0 &&
                            order.constructor === Object
                          ) &&
                            order.client && (
                              <div className="col-md-8">
                                {order.client.firstName} {order.client.lastName}
                              </div>
                            )}
                        </div>

                        <div className="row mt-20">
                          <div className="col-md-4 font-b">
                            Subscription Type
                          </div>
                          <div className="col-md-8">{order.paymentType}</div>
                        </div>

                        <div className="row mt-20">
                          <div className="col-md-4 font-b">Status</div>
                          <div className="col-md-8">{order.status}</div>
                        </div>

                        <div className="row mt-20">
                          <div className="col-md-4 font-b">Ordered On</div>
                          {!(
                            Object.keys(order).length === 0 &&
                            order.constructor === Object
                          ) && (
                            <div className="col-md-8">
                              {new Date(order.createdAt).toDateString()}
                            </div>
                          )}
                        </div>

                        <div className="row mt-20">
                          <div className="col-md-4 font-b">Amount</div>
                          {!(
                            Object.keys(order).length === 0 &&
                            order.constructor === Object
                          ) && (
                            <div className="col-md-8">
                              <i className="fa fa-inr" aria-hidden="true"></i>
                              {order.amount}
                            </div>
                          )}
                        </div>

                        <div className="row mt-20">
                          <div className="col-md-4 font-b">Paid Through</div>
                          {!(
                            Object.keys(order).length === 0 &&
                            order.constructor === Object
                          ) && (
                            <div className="col-md-8">{order.processed_by}</div>
                          )}
                        </div>

                        <div className="row mt-20">
                          <div className="col-md-4 font-b">
                            Paypal Confirmation ID
                          </div>
                          {!(
                            Object.keys(order).length === 0 &&
                            order.constructor === Object
                          ) && (
                            <div className="col-md-8">
                              {order.confirmationID}
                            </div>
                          )}
                        </div>

                        <div className="row mt-20">
                          <div className="col-lg-12">
                            <div className="form-group text-left">
                              <a href="/earning">
                                <button
                                  type="button"
                                  className="btn btn-success btn-login waves-effect waves-light mr-3"
                                >
                                  Back
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
}
