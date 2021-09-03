import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../../../../API";
import axios from "axios";

import Pagination from "../../../pagination";
import swal from "sweetalert";
import Footer from "../../Footer";
import { isAutheticated } from "../../../auth/authhelper";
import ShowMovie from "./ShowMovie";
import ShowTVShow from "./ShowTVShow";

export default function ScheduleVideos() {
  const { token } = isAutheticated();
  const [data, setData] = useState([]);
  const [Currentpage, setCurrentpage] = useState(1);
  const [success, setSuccess] = useState(false);
  const [Viewerperpage, setViewerperpage] = useState(10);
  const [tvshow, setTvshow] = useState([]);
  const [totalData, setTotalData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [showData, setShowData] = useState(totalData);

  useEffect(() => {
    axios
      .get(`${API}/api/tvshow/viewall_Tvshow`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const userdata = response.data.show;
        setTvshow(userdata);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);
  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`${API}/api/lesson/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const data = response.data.data.filter((video) => video.launchDate);
          setData([...data]);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchData();
  }, [success, token]);

  useEffect(() => {
    const setData = () => {
      const movieData = data.map((item) => ({
        type: "movie",
        data: item,
      }));
      const tvData = tvshow.map((item) => ({ type: "tvshow", data: item }));

      setTotalData([...movieData, ...tvData]);
    };
    setData();
  }, [tvshow, data]);

  useEffect(() => {
    const loadData = () => {
      const indexOfLastPost = currentPage * itemPerPage;
      const indexOfFirstPost = indexOfLastPost - itemPerPage;
      setShowData(totalData.slice(indexOfFirstPost, indexOfLastPost));
    };

    loadData();
  }, [totalData, currentPage, itemPerPage]);

  const handledeleteMovie = (id) => {
    axios
      .patch(
        `${API}/api/lesson/metadata/${id}`,
        {
          Id: "",
          directors: "",
          type: "",
          year: "",
          image: "",
          genres: "",
          Languages: "",
          RuntimeStr: "",
          Plot: "",
          Actors_list: "",
          Writers: "",
          Ratings: "",
          launchDate: null,
          launch_flag: false,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log("here sub,it response", res);
        window.location.reload();
      })
      .catch((err) => {
        window.location.reload();
      });
  };

  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0">Content Management - Schedule</h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">TellyTell</Link>
                    </li>
                    <li className="breadcrumb-item">
                      Content Management - Schedule
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
                        <Link to="/add-schedule-video">
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
                          <th>Category</th>
                          <th>Launch Date</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {showData.lenght !== 0 &&
                          showData.map((item) => {
                            console.log(item);
                            return item.type === "movie" ? (
                              <ShowMovie
                                lession={item.data}
                                handledeleteMovie={handledeleteMovie}
                                token={token}
                              />
                            ) : (
                              <ShowTVShow
                                data={item.data}
                                token={token}
                                success={success}
                                setSuccess={setSuccess}
                              />
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
                        {Math.min(currentPage * itemPerPage, totalData.length)}{" "}
                        of {totalData.length} entries
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
                            totalData.length
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
                                totalData.length
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
