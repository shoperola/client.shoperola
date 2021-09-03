import React, { useEffect, useState } from "react";
import Sidebar from "../../Sidebar";
import Header from "../../Header";
import { Link } from "react-router-dom";
import { API } from "../../../../API";
import axios from "axios";

import { isAutheticated } from "../../../auth/authhelper";
import Pagination from "../../../pagination";
import swal from "sweetalert";
// import UserPaypal from "../../../customer/UserPaypal";
import Footer from "../../Footer";

export default function Lessions() {
  const { token } = isAutheticated();
  const [data, setData] = useState([]);
  const [success, setSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [showData, setShowData] = useState(data);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`${API}/api/lesson/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          //console.log(response);
          setData([...response.data.data]);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchData();
  }, [success, !success]);

  useEffect(() => {
    const loadData = () => {
      const indexOfLastPost = currentPage * itemPerPage;
      const indexOfFirstPost = indexOfLastPost - itemPerPage;
      setShowData(data.slice(indexOfFirstPost, indexOfLastPost));
    };

    loadData();
  }, [data, currentPage, itemPerPage]);

  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0">Content Management - Videos</h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">TellyTell</Link>
                    </li>
                    <li className="breadcrumb-item">
                      Content Management - Videos
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
                    <div className="col-sm-12 col-md-6">
                      <div className="dataTables_length">
                        <label className="w-100">
                          Show{" "}
                          <select
                            style={{ width: "60px" }}
                            name=""
                            value={itemPerPage}
                            onChange={(e) => setItemPerPage(e.target.value)}
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
                    <div className="col-sm-12 col-md-6">
                      <div className="dropdown d-block">
                        <Link to="/lessions/add">
                          <button
                            type="button"
                            className="btn btn-primary add-btn waves-effect waves-light float-right"
                          >
                            <i className="fa fa-plus" aria-hidden="true"></i>{" "}
                            Add New
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="table-responsive table-shoot">
                    <table className="table table-centered table-nowrap mb-0">
                      <thead className="thead-light">
                        <tr>
                          <th>Title</th>
                          <th>Thumbnail</th>
                          <th>Uploaded On</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.length !== 0 &&
                          showData.map((lession) => {
                            return (
                              <tr key={lession._id}>
                                <td>{lession.title}</td>
                                <td>
                                  <img
                                    src={
                                      lession.thumbnail
                                        ? lession.thumbnail
                                        : "https://sgp1.digitaloceanspaces.com/storage.tellytell.com/thumbnail-default.png"
                                    }
                                    width="110"
                                    height="60"
                                    alt=""
                                  />
                                </td>
                                {/* <td>{lession?.subject?.name}</td> */}
                                <td>
                                  {new Date(lession.createdAt).toDateString()}
                                </td>
                                {/* <td>
                                  {!lession.launch_flag && lession.launchDate && lession.live &&
                                    <span className="badge badge-pill badge-primary font-size-12">
                                      Scheduled
                                    </span>
                                  }
                                </td> */}

                                <td>
                                  {/* {lession.live &&
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.preventDefault();

                                        axios
                                          .patch(
                                            `${API}/api/lesson/${lession._id}`, {},
                                            {
                                              headers: {
                                                Authorization: `Bearer ${token}`,
                                              },
                                            }
                                          )
                                          .then((res) => {
                                            setSuccess(!success);
                                            swal({
                                              title:
                                                "Video suspend Successfully!",

                                              icon: "success",
                                              buttons: true,
                                              successMode: true,
                                              dangerMode: false,
                                            });
                                            // console.log(res);
                                          })
                                          .catch((err) => {
                                            console.log(err);
                                            setSuccess(!success);
                                          });
                                      }}
                                      className="btn btn-success btn-sm  waves-effect waves-light btn-table"
                                    >
                                      Suspend
                                    </button> */}
                                  {!lession.live && (
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.preventDefault();

                                        axios
                                          .patch(
                                            `${API}/api/lesson/makelive/${lession._id}`,
                                            {},
                                            {
                                              headers: {
                                                Authorization: `Bearer ${token}`,
                                              },
                                            }
                                          )
                                          .then((res) => {
                                            setSuccess(!success);
                                            swal({
                                              title: "Video is live!",

                                              icon: "success",
                                              buttons: true,
                                              successMode: true,
                                              dangerMode: false,
                                            });
                                            // console.log(res);
                                          })
                                          .catch((err) => {
                                            console.log(err);
                                            setSuccess(!success);
                                          });
                                      }}
                                      className="btn btn-success btn-sm  waves-effect waves-light btn-table"
                                    >
                                      Make Live
                                    </button>
                                  )}

                                  {/* <Link to={`/lessions/view/${lession._id}`}>
                                    <button
                                      type="button"
                                      className="btn btn-info btn-sm  waves-effect waves-light btn-table ml-2"
                                    >
                                      View
                                    </button>
                                  </Link> */}
                                  <Link to={`/lessions/edit/${lession._id}`}>
                                    <button
                                      type="button"
                                      className="btn btn-primary btn-sm  waves-effect waves-light btn-table ml-2"
                                    >
                                      Edit
                                    </button>
                                  </Link>

                                  <button
                                    onClick={(e) => {
                                      e.preventDefault();
                                      let status = window.confirm(
                                        "Do you want to delete"
                                      );
                                      if (!status) {
                                        return;
                                      } else {
                                        axios
                                          .delete(
                                            `${API}/api/lesson/${lession._id}`,
                                            {
                                              headers: {
                                                Authorization: `Bearer ${token}`,
                                              },
                                            }
                                          )
                                          .then((res) => {
                                            setSuccess(!success);
                                            swal({
                                              title:
                                                "Video deleted Successfully!",

                                              icon: "success",
                                              buttons: true,
                                              successMode: true,
                                              dangerMode: false,
                                            });
                                            // console.log(res);
                                          })
                                          .catch((err) => {
                                            console.log(err);
                                            setSuccess(!success);
                                          });
                                      }
                                    }}
                                    type="button"
                                    className="btn btn-danger btn-sm  waves-effect waves-light btn-table ml-2"
                                    id="sa-params"
                                  >
                                    Delete
                                  </button>
                                  {/* <Link to={`/lessions/add-studio/${lession._id}`}>
                                    <button
                                      type="button"
                                      className="btn btn-primary btn-sm  waves-effect waves-light btn-table ml-2"
                                    >
                                      Studio
                                    </button>
                                  </Link> */}
                                </td>
                              </tr>
                            );
                          })}
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
                        {Math.min(currentPage * itemPerPage, data.length)} of{" "}
                        {data.length} entries
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
                            data.length
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
                                data.length
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
