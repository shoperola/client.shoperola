import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import swal from "sweetalert";
import { API } from "../../../../API";
import { isAutheticated } from "../../../auth/authhelper";
import Footer from "../../Footer";

function TVShowSeason(props) {
  const { tvshowId } = useParams();
  const { token } = isAutheticated();
  const [season, setSeason] = useState([]);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    axios
      .get(`${API}/api/tvshow/view_tvshow/${tvshowId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const userdata = response.data;
        console.log("here sss", userdata);
        setSeason(userdata.season);
        console.log(response.data.season);
        //setLanguages(userdata.languages);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [success]);
  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          {/* <!-- start page title --> */}
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0">TV Shows - Seasons</h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <a href="javascript: void(0);">Shoperola</a>
                    </li>
                    <li className="breadcrumb-item">
                      Content Management - TV Shows- Seasons
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- end page title --> */}

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
                    <div className="col-sm-12 col-md-6">
                      <div className="dropdown d-block">
                        <Link to={`/language/season/add/${tvshowId}`}>
                          <button
                            type="button"
                            className="btn btn-primary add-btn waves-effect waves-light float-right"
                          >
                            <i className="fa fa-plus" aria-hidden="true"></i>{" "}
                            Add Season
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="table-responsive table-shoot">
                    <table className="table table-centered table-nowrap mb-0">
                      <thead className="thead-light">
                        <tr>
                          <th>Season</th>
                          {/* <th>Videos</th> */}
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {season.map((data) => (
                          <tr>
                            <td>Season {data.number}</td>
                            {/* <td>{data.video}</td> */}
                            <td>
                              <Link to={`/language/season/view/${data._id}`}>
                                <button
                                  type="button"
                                  className="btn btn-info btn-sm  waves-effect waves-light btn-table ml-2"
                                >
                                  View Episode
                                </button>
                              </Link>
                              <Link to={`/language/season/edit/${data._id}`}>
                                <button
                                  type="button"
                                  className="btn btn-primary btn-sm  waves-effect waves-light btn-table ml-2"
                                >
                                  Edit
                                </button>
                              </Link>
                              <a href="#">
                                <button
                                  type="button"
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
                                          `${API}/api/tvshow/delete_season/${data._id}`,
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
                                              "Season deleted Successfully!",

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
                                  className="btn btn-danger btn-sm  waves-effect waves-light btn-table ml-2"
                                  id="sa-params"
                                >
                                  Delete
                                </button>
                              </a>
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

                  {/* <!-- end table-responsive --> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- container-fluid --> */}
      </div>
      {/* <!-- End Page-content --> */}

      {/* <footer className="footer">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
            {new Date().getFullYear()} © Shoperola.
            </div>

          </div>
        </div>
      </footer> */}
      <Footer />
    </div>
  );
}

export default TVShowSeason;
