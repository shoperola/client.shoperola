import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { API } from "../../../API";
import { isAutheticated } from "../../auth/authhelper";
import Footer from "../Footer";
import axios from "axios";
import swal from "sweetalert";
import ClipLoader from "react-spinners/ClipLoader";
import getSymbolFromCurrency from "currency-symbol-map";

const Order = () => {
  const { token } = isAutheticated();
  const { status } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [currency, setCurrency] = useState();

  useEffect(() => {
    async function fetchData() {
      await axios
        .get(`${API}/api/user`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setCurrency(res.data.data.settings.currency);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    fetchData();
  }, [token]);

  useEffect(() => {
    const fetchData = () => {
      setIsLoading(true);
      axios
        .get(`${API}/api/user/view_order`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const newData = res.data;

          switch (status) {
            case "new":
              setData(newData.filter((item) => item.is_new === true));
              break;
            case "processing":
              setData(newData.filter((item) => item.is_processing === true));
              break;
            case "delivered":
              setData(newData.filter((item) => item.is_delivered === true));
              break;
            case "dispatched":
              setData(newData.filter((item) => item.is_dispatched === true));
              break;
            case "cancelled":
              setData(newData.filter((item) => item.is_cancelled === true));
              break;
            case "returned":
              setData(newData.filter((item) => item.is_returned === true));
              break;
            default:
              console.log("Wrong Status");
          }
          setIsLoading(false);
        });
    };

    fetchData();
  }, [token, status]);

  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0">Order Management</h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <a href="javascript: void(0);">TellyTell</a>
                    </li>
                    <li className="breadcrumb-item active">
                      Order Management - Orders
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
                  <div className="row ml-0 mr-0  mb-10">
                    <div className="col-sm-12 col-md-12">
                      <div className="dataTables_length">
                        <label className="w-100">
                          Show{" "}
                          <select
                            name=""
                            className="select-w custom-select custom-select-sm form-control form-control-sm"
                          >
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                          </select>{" "}
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
                          <th>Name</th>
                          <th>Amount</th>
                          <th>Placed On</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tr style={{ textAlign: "center" }}>
                        <td colspan="6">
                          <ClipLoader loading={isLoading} size={24} />
                        </td>
                      </tr>
                      <tbody>
                        {!isLoading &&
                          data?.map((item) => (
                            <tr key={item._id}>
                              <td>{item._id}</td>
                              <td>{item.address.Name}</td>
                              <td>
                                {getSymbolFromCurrency(currency)} {item.amount}
                              </td>
                              <td>
                                {new Date(item.updatedAt)
                                  .toDateString(item.updatedAt)
                                  .split(" ")
                                  .slice(1)
                                  .join(" ")}
                              </td>
                              <td>
                                <span className="badge badge-pill badge-success font-size-12">
                                  {status.charAt(0).toUpperCase() +
                                    status.slice(1)}
                                </span>
                              </td>
                              <td>
                                <Link to={`/orders/${status}/${item._id}`}>
                                  <button
                                    type="button"
                                    className="btn btn-primary btn-sm  waves-effect waves-light btn-table ml-2"
                                  >
                                    Edit
                                  </button>
                                </Link>
                              </td>
                            </tr>
                          ))}
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
                      <div className="dataTables_paginate paging_simple_numbers float-right">
                        <ul className="pagination">
                          <li className="paginate_button page-item previous disabled">
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

                          <li className="paginate_button page-item ">
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

                          <li className="paginate_button page-item ">
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

      <Footer />
    </div>
  );
};

export default Order;
