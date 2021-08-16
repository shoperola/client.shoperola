import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API } from "../../../../API";
import { isAutheticated } from "../../../auth/authhelper";
import swal from "sweetalert";
import Footer from "../../Footer";

export default function Languages() {
  const { token } = isAutheticated();
  const [tvshow, setTvshow] = useState([]);
  const [success, setSuccess] = useState(false);
  // var year=;

  useEffect(() => {
    // $("#summernote").summernote();

    axios
      .get(`${API}/api/tvshow/viewall_Tvshow`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const userdata = response.data.show;
        //console.log(userdata);
        setTvshow(userdata);
        //console.log(response.data.show);
        //setLanguages(userdata.languages);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [success, !success]);

  const onDelete = (id) => {
    axios
      .delete(`${API}/api/user/languages/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setSuccess(!success);
        //console.log(response);
      })
      .catch((err) => {
        console.log(err);
        let message = err.response.data.message;
        setSuccess(false);
        swal({
          title: "Error",
          text: { message },
          icon: "error",
          buttons: true,
          dangerMode: true,
        });
      });
  };

  return (
    <div className="main-content">

      <div className="page-content">
        <div className="container-fluid">

          {/* <!-- start page title --> */}
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0">Content Management - TV Shows</h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item"><Link to="/dashboard">TellyTell</Link></li>
                    <li className="breadcrumb-item">Content Management - TV Shows</li>


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
                        <label className="w-100">Show <select name="" className="select-w custom-select custom-select-sm form-control form-control-sm">
                          <option value="10">10</option>
                          <option value="25">25</option>
                          <option value="50">50</option>
                          <option value="100">100</option>
                        </select> entries</label></div></div>
                    <div className="col-sm-12 col-md-6">


                      <div className="dropdown d-block">
                        <Link to="/languages/add">
                          <button type="button" className="btn btn-primary add-btn waves-effect waves-light float-right">
                            <i className="fa fa-plus" aria-hidden="true"></i> Add New Series
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="table-responsive table-shoot">
                    <table className="table table-centered table-nowrap mb-0">
                      <thead className="thead-light">
                        <tr>
                          <th>Series Name</th>
                          {/* <th>Seasons</th> */}
                          <th>Thumbnail</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tvshow.map((data) =>
                          <tr key={data._id}>
                            <td>{data.title}</td>
                            <td>
                              <img alt=""
                                src={data.thumbnail}
                                style={{ width: "67px", height: "67px" }}
                              />
                            </td>
                            {/* <td>10</td> */}
                            <td>{data.status ? <span className="badge badge-pill badge-primary font-size-12">Live</span> :
                              <span className="badge badge-pill badge-soft-success font-size-12">Live</span>}</td>
                            <td>
                              {data.status &&
                                <button type="button" className="btn btn-success btn-sm  waves-effect waves-light btn-table"
                                  onClick={(e) => {
                                    console.log("suspend");
                                    e.preventDefault();

                                    axios
                                      .patch(
                                        `${API}/api/tvshow/metadata/${data._id}`, { status: false },
                                        {
                                          headers: {
                                            Authorization: `Bearer ${token}`,
                                            "Content-Type": "application/json",
                                          },
                                        }
                                      )
                                      .then((res) => {
                                        setSuccess(!success);
                                        swal({
                                          title:
                                            "TvShow suspend Successfully!",

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
                                >
                                  Suspend
                                </button>
                              }
                              {!data.status &&
                                <button type="button" className="btn btn-success btn-sm  waves-effect waves-light btn-table"
                                  onClick={(e) => {
                                    console.log("suspend");
                                    e.preventDefault();

                                    axios
                                      .patch(
                                        `${API}/api/tvshow/makelive/${data._id}`, { status: true },
                                        {
                                          headers: {
                                            Authorization: `Bearer ${token}`,
                                            "Content-Type": "application/json",
                                          },
                                        }
                                      )
                                      .then((res) => {
                                        setSuccess(!success);
                                        swal({
                                          title:
                                            "TvShow Live!",

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
                                >
                                  MakeLive
                                </button>
                              }
                              <Link to={`/language/tvshow/${data._id}`}>
                                <button type="button" className="btn btn-info btn-sm  waves-effect waves-light btn-table ml-2">
                                  Seasons</button>
                              </Link>
                              <Link to={`/languages/edit/${data._id}`}>
                                <button
                                  type="button"
                                  className="btn btn-primary btn-sm  waves-effect waves-light btn-table ml-2"
                                >
                                  Edit
                                </button>
                              </Link>

                              <Link to="#">
                                <button type="button"
                                  className="btn btn-danger btn-sm  waves-effect waves-light btn-table ml-2"
                                  id="sa-params"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    let status = window.confirm("Do you want to delete");
                                    if (!status) {
                                      return;
                                    } else {
                                      axios
                                        .delete(
                                          `${API}/api/tvshow/delete_tvshow/${data._id}`,
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
                                >
                                  Delete</button>
                              </Link>
                            </td>
                          </tr>

                        )
                        }
                      </tbody>
                    </table>
                  </div>
                  <div className="row mt-20">
                    <div className="col-sm-12 col-md-6 mb-20">
                      <div className="dataTables_info" id="datatable_info" role="status" aria-live="polite">Showing 1 to 10 of 57 entries</div>
                    </div>

                    <div className="col-sm-12 col-md-6">
                      <div className="dataTables_paginate paging_simple_numbers float-right">
                        <ul className="pagination">

                          <li className="paginate_button page-item previous disabled">
                            <a href="#" aria-controls="datatable" data-dt-idx="0" tabIndex="0" className="page-link">Previous</a>
                          </li>

                          <li className="paginate_button page-item active">
                            <a href="#" aria-controls="datatable" data-dt-idx="1" tabIndex="0" className="page-link">1</a>
                          </li>

                          <li className="paginate_button page-item ">
                            <a href="#" aria-controls="datatable" data-dt-idx="2" tabIndex="0" className="page-link">2</a>
                          </li>

                          <li className="paginate_button page-item ">
                            <a href="#" aria-controls="datatable" data-dt-idx="3" tabIndex="0" className="page-link">3</a>
                          </li>
                          <li className="paginate_button page-item next">
                            <a href="#" tabIndex="0" className="page-link">Next</a>
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



      <Footer />
    </div>

  );
}
