import React, { useEffect, useState } from "react";
import Sidebar from "../../Sidebar";
import Header from "../../Header";
import { Link } from "react-router-dom";
import { API } from "../../../../API";
import { isAutheticated } from "../../../auth/authhelper";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import Footer from "../../Footer";
export default function Subjects() {
  const [subjects, setsubjects] = useState([]);
  const [loading, setloading] = useState(false);
  // const [onSuspend,setOnSuspend]=useState(false);

  const { token } = isAutheticated();
  useEffect(() => {
    // $("#summernote").summernote();

    axios
      .get(`${API}/api/banner/viewbanner
      `, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        const userdata = response.data.data;
        setsubjects(userdata);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loading, !loading]);

  const onDelete = (id) => {
    let status = window.confirm("Do you want to delete");
    if (!status) {
      return;
    } else {

      setloading(true);
      axios
        .delete(`${API}/api/banner/delete_banner/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setloading(false);
          //console.log(response);
        })
        .catch((err) => {
          setloading(false);
          console.log(err);
        });

    }

  };

  return (
    <div className="main-content">

      <div className="page-content">
        <div className="container-fluid">

          {/* <!-- start page title --> */}
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0">Content Management - Banners</h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item"><a href="">TellyTell</a></li>
                    <li className="breadcrumb-item">Content Management - Banners</li>


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

                        <Link to="/subjects/add">
                          <button type="button" className="btn btn-primary add-btn waves-effect waves-light float-right">
                            <i className="fa fa-plus" aria-hidden="true"></i> Add New Banner
                          </button>

                        </Link>
                      </div>


                    </div>
                  </div>
                  <div className="table-responsive table-shoot">
                    <table className="table table-centered table-nowrap mb-0">
                      <thead className="thead-light">
                        <tr>
                          <th>Thumbnail of Banner	</th>
                          <th>Title</th>
                          <th>Category</th>
                          <th>Start date</th>
                          <th>End Date</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>

                        {subjects.map((subjects) =>
                          <tr key={subjects._id}>
                            <td><img src={subjects.bannerimage ? subjects.bannerimage : "https://sgp1.digitaloceanspaces.com/storage.tellytell.com/banner-default.png"} width="110" height="60" alt=""/></td>
                            <td>{subjects.title}</td>
                            <td>{subjects.category}</td>
                            <td>{(new Date(subjects.startdate)).toDateString()}</td>
                            <td>{(new Date(subjects.enddate)).toDateString()}</td>
                            <td>{subjects.status ? <span className="badge badge-pill badge-primary font-size-12">Live</span>
                              : <span className="badge badge-pill badge-soft-success font-size-12">Live</span>
                            }</td>
                            <td>
                              {subjects.status &&
                                <button type="button"
                                  className="btn btn-success btn-sm  waves-effect waves-light btn-table"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    let data = new FormData();
                                    data.set("status", false)
                                    axios
                                      .patch(`${API}/api/banner/edit_banner/${subjects._id}`, data, {
                                        headers: {
                                          Authorization: `Bearer ${token}`,
                                          "Content-Type": "multipart/formdata",
                                        },
                                      })
                                      .then((response) => {
                                        //console.log(response);
                                        setloading(!loading);
                                        // console.log(response);

                                      })
                                      .catch((err) => {

                                        console.log(err);
                                      });
                                  }}
                                >
                                  Suspend
                                </button>
                              }
                              {!subjects.status &&
                                <button type="button"
                                  className="btn btn-success btn-sm  waves-effect waves-light btn-table"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    let data = new FormData();
                                    data.set("status", true)
                                    axios
                                      .patch(`${API}/api/banner/makelive/${subjects._id}`, data, {
                                        headers: {
                                          Authorization: `Bearer ${token}`,
                                          "Content-Type": "multipart/formdata",
                                        },
                                      })
                                      .then((response) => {
                                        console.log(response);
                                        setloading(!loading);
                                        // console.log(response);

                                      })
                                      .catch((err) => {

                                        console.log(err);
                                      });
                                  }}
                                >
                                  MakeLive
                                </button>
                              }
                              <Link to={`/subjects/edit/${subjects._id}`}>
                                <button type="button"
                                  className="btn btn-primary btn-sm  waves-effect waves-light btn-table ml-2">
                                  Edit</button>
                              </Link>
                              <Link to="#">
                                <button type="button"
                                  onClick={() => {
                                    onDelete(subjects._id);
                                  }}
                                  className="btn btn-danger btn-sm  waves-effect waves-light btn-table ml-2">
                                  Delete</button>
                              </Link>
                            </td>
                          </tr>
                        )}

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
