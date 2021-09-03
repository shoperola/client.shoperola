import axios from "axios";
// import { data } from "jquery";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../../API";
import { isAutheticated } from "../auth/authhelper";
import Footer from "./Footer";
// import Header from "./Header";
// import Sidebar from "./Sidebar";

export default function Subscribers() {
  const { token } = isAutheticated();
  const [subcriber, setSubcriber] = useState([]);
  const [success, setSuccess] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [showData, setShowData] = useState(subcriber);

  useEffect(() => {
    axios
      .get(`${API}/api/user/subscribers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        let data = response.data.data;
        setSubcriber(data);
        //console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [success]);

  useEffect(() => {
    const loadData = () => {
      const indexOfLastPost = currentPage * itemPerPage;
      const indexOfFirstPost = indexOfLastPost - itemPerPage;
      setShowData(subcriber.slice(indexOfFirstPost, indexOfLastPost));
    };

    loadData();
  }, [subcriber, currentPage, itemPerPage]);

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
                <h4 className="mb-0">Subscribers</h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">TellyTell</Link>
                    </li>
                    <li className="breadcrumb-item active">Subscribers</li>
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
                          Show
                          <select
                            style={{ width: "8%", maxWidth: "60px" }}
                            name=""
                            className="select-w custom-select custom-select-sm form-control form-control-sm"
                            value={itemPerPage}
                            onChange={(e) => setItemPerPage(e.target.value)}
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
                          <th>Email</th>
                          <th>Subscription Amount </th>
                          <th>Joined On</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {showData.map((data) => (
                          <tr key={data._id}>
                            <td>User</td>

                            {/* {data.subscriber && data.subscriber.firstName && 
                            <td> {data.subscriber.firstName}&nbsp;{data.subscriber.lastName}</td>
                          } */}

                            {/* {!data.subscriber?
                          <td>User Email</td>
                          :
                          `
                          <td>${data.subscriber.email}</td>
                          `
                          } */}

                            {data.subscriber && data.subscriber.email && (
                              <td>{data.subscriber.email}</td>
                            )}
                            {!data.subscriber && <td>No email</td>}
                            <td>
                              <i className="fa fa-inr" aria-hidden="true"></i>
                              {data.amount}
                            </td>
                            <td>{new Date(data.createdAt).toDateString()}</td>
                            <td>
                              {data.subscriber && data.subscriber.status && (
                                <span className="badge badge-primary font-size-12">
                                  Active
                                </span>
                              )}
                              {data.subscriber && !data.subscriber.status && (
                                <span className="badge badge-pill badge-soft-success font-size-12">
                                  Active
                                </span>
                              )}
                            </td>
                            {/* {!data.subscriber?
                          <td> <span className="badge badge-primary font-size-12">Nothing</span></td>
                          :
                          `
                          <td>${data.subscriber.status}</td>
                          `
                          } */}
                            <td>
                              {data.subscriber && data.subscriber.status && (
                                <button
                                  type="button"
                                  className="btn btn-success btn-sm  waves-effect waves-light btn-table"
                                  onClick={(e) => {
                                    console.log(data._id);
                                    e.preventDefault();
                                    let statusdata = new FormData();
                                    statusdata.set("status", false);
                                    axios
                                      .patch(
                                        `${API}/api/user/subscribers/suspend/${data.subscriber._id}`,
                                        statusdata,
                                        {
                                          headers: {
                                            Authorization: `Bearer ${token}`,
                                          },
                                        }
                                      )
                                      .then((res) => {
                                        setSuccess(!success);
                                      })
                                      .catch((err) => {
                                        console.log(err);
                                        setSuccess(!success);
                                      });
                                  }}
                                >
                                  Suspend
                                </button>
                              )}
                              {data.subscriber && !data.subscriber.status && (
                                <button
                                  type="button"
                                  className="btn btn-success btn-sm  waves-effect waves-light btn-table"
                                  onClick={(e) => {
                                    console.log(data._id);
                                    e.preventDefault();
                                    let statusdata = new FormData();
                                    statusdata.set("status", true);
                                    axios
                                      .patch(
                                        `${API}/api/user/subscribers/suspend/${data.subscriber._id}`,
                                        statusdata,
                                        {
                                          headers: {
                                            Authorization: `Bearer ${token}`,
                                          },
                                        }
                                      )
                                      .then((res) => {
                                        setSuccess(!success);
                                      })
                                      .catch((err) => {
                                        console.log(err);
                                        setSuccess(!success);
                                      });
                                  }}
                                >
                                  MakeLive
                                </button>
                              )}
                              {data && (
                                <Link to={`/subscriber/history/${data._id}`}>
                                  <button
                                    type="button"
                                    className="btn btn-info btn-sm
                                waves-effect waves-light
                                btn-table
                                ml-2"
                                    // onClick={(e) => {
                                    //   console.log(data._id)
                                    //   e.preventDefault();
                                    //   let statusdata = new FormData();
                                    //   statusdata.set("status", false)
                                    //   axios
                                    //     .patch(
                                    //       `${API}/api/user/subscribers/suspend/${data.subscriber?._id}`, statusdata,
                                    //       {
                                    //         headers: {
                                    //           Authorization: `Bearer ${token}`,
                                    //         },
                                    //       }
                                    //     )
                                    //     .then((res) => {
                                    //       setSuccess(!success);

                                    //     })
                                    //     .catch((err) => {
                                    //       console.log(err);
                                    //       setSuccess(!success);
                                    //     });
                                    // }}
                                  >
                                    View
                                  </button>
                                </Link>
                              )}
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
                        Showing {currentPage * itemPerPage - itemPerPage + 1} to{" "}
                        {Math.min(currentPage * itemPerPage, subcriber.length)}{" "}
                        of {subcriber.length} entries
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
                            subcriber.length
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
                                subcriber.length
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
