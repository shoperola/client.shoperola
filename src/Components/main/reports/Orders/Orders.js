import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../../../../API";
import { isAutheticated } from "../../../auth/authhelper";
import Footer from "../../Footer";
import OrdersChart from "./OrdersChart";

function Orders(props) {
  const { token } = isAutheticated();
  const [image, setImage] = useState("");
  const totalMonths = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December",
  };
  const [months, setMonths] = useState(totalMonths);
  const [month, setMonth] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [showData, setShowData] = useState([]);
  const [totalData, setTotalData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`${API}/api/order/view_order`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setTotalData(res.data.data);
        });
    };

    fetchData();
  }, [token]);

  useEffect(() => {
    const loadData = () => {
      let finalObj = {};
      totalData.forEach((item) => {
        const currMonth = new Date(item.createdAt).getMonth();
        if (currMonth == month) {
          const date = item.createdAt.split("T")[0];
          if (finalObj[date]) {
            finalObj[date].push(item);
          } else {
            finalObj[date] = [item];
          }
        }
      });
      setData(finalObj);
    };

    loadData();
  }, [totalData, month]);

  useEffect(() => {
    const loadData = () => {
      let finalMonths = {};
      totalData.forEach((item) => {
        const currMonth = new Date(item.createdAt).getMonth();
        finalMonths = {
          ...finalMonths,
          [currMonth]: totalMonths[currMonth],
        };
      });
      setMonths(finalMonths);

      if (!(new Date().getMonth() in months)) {
        setMonth(new Date().getMonth());
      }
    };

    loadData();
  }, [totalData]);

  useEffect(() => {
    const loadData = () => {
      const indexOfLastPost = currentPage * itemPerPage;
      const indexOfFirstPost = indexOfLastPost - itemPerPage;

      let newData = Object.keys(data).map((key) => ({
        date: key,
        orders: data[key].length,
      }));

      setShowData(newData.slice(indexOfFirstPost, indexOfLastPost));
    };

    loadData();
  }, [data, currentPage, itemPerPage]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    let d = date.toDateString(dateStr);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let strTime = hours + ":" + minutes + " " + ampm;
    return d + ", " + strTime;
  };

  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0">Reports - Orders</h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">Shoperola</Link>
                    </li>
                    <li className="breadcrumb-item">Reports - Orders</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12 mb-30">
              <div className="card dashboard-box">
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-12 mb-30">
                      <label
                        htmlFor="basicpill-phoneno-input"
                        className="label-100"
                      >
                        Select Month
                      </label>
                      <select
                        name="month"
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        className="form-control input-field"
                      >
                        <option value="">Select month</option>
                        {Object.keys(months).map((key) => (
                          <option key={key} value={key}>
                            {months[key]}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="col-lg-12 mb-10">
                        <OrdersChart
                          labels={Object.keys(data)}
                          orders={Object.keys(data).map(
                            (item) => data[item].length
                          )}
                        />
                      </div>
                    </div>
                  </div>
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
                            value={itemPerPage}
                            onChange={(e) => setItemPerPage(e.target.value)}
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
                    {/* <div className="col-sm-12 col-md-6">
                      <div className="dropdown d-block">
                        <Link to="/comproducts/add">
                          <button
                            type="button"
                            className="btn btn-primary add-btn waves-effect waves-light float-right"
                          >
                            <i className="fa fa-plus" aria-hidden="true"></i>{" "}
                            Add New Product
                          </button>
                        </Link>
                      </div>
                    </div> */}
                  </div>
                  <div className="table-responsive table-shoot">
                    <table className="table table-centered table-nowrap mb-0">
                      <thead className="thead-light">
                        <tr>
                          <th>Date</th>
                          <th>Number of Orders</th>
                        </tr>
                      </thead>
                      <tbody>
                        {showData.map((item) => (
                          <tr>
                            <td>{formatDate(item.date)}</td>
                            <td>{item.orders}</td>
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
                        Showing {currentPage * itemPerPage - itemPerPage + 1} to{" "}
                        {Math.min(
                          currentPage * itemPerPage,
                          Object.keys(data).length
                        )}{" "}
                        of {Object.keys(data).length} entries
                      </div>
                    </div>

                    <div className="col-sm-12 col-md-6">
                      <div className="dataTables_paginate paging_simple_numbers float-right">
                        <ul className="pagination">
                          <li
                            className={
                              currentPage === 1
                                ? "paginate_button page-item previous disabled"
                                : "paginate_button page-item previous"
                            }
                          >
                            <a
                              href="#"
                              aria-controls="datatable"
                              data-dt-idx="0"
                              tabindex="0"
                              className="page-link"
                              onClick={() => setCurrentPage((prev) => prev - 1)}
                            >
                              Previous
                            </a>
                          </li>

                          {!(currentPage - 1 < 1) && (
                            <li className="paginate_button page-item">
                              <a
                                aria-controls="datatable"
                                data-dt-idx="1"
                                tabindex="0"
                                className="page-link"
                                onClick={(e) =>
                                  setCurrentPage((prev) => prev - 1)
                                }
                              >
                                {currentPage - 1}
                              </a>
                            </li>
                          )}

                          <li className="paginate_button page-item active">
                            <a
                              href="#"
                              aria-controls="datatable"
                              data-dt-idx="2"
                              tabindex="0"
                              className="page-link"
                            >
                              {currentPage}
                            </a>
                          </li>

                          {!(
                            (currentPage + 1) * itemPerPage - itemPerPage >
                            Object.keys(data).length
                          ) && (
                            <li className="paginate_button page-item ">
                              <a
                                href="#"
                                aria-controls="datatable"
                                data-dt-idx="3"
                                tabindex="0"
                                className="page-link"
                                onClick={() => {
                                  setCurrentPage((prev) => prev + 1);
                                }}
                              >
                                {currentPage + 1}
                              </a>
                            </li>
                          )}

                          <li
                            className={
                              !(
                                (currentPage + 1) * itemPerPage - itemPerPage >
                                Object.keys(data).length
                              )
                                ? "paginate_button page-item next"
                                : "paginate_button page-item next disabled"
                            }
                          >
                            <a
                              href="#"
                              tabindex="0"
                              className="page-link"
                              onClick={() => setCurrentPage((prev) => prev + 1)}
                            >
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
}

export default Orders;
