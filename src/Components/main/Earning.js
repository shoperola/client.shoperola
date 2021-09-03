import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../../API";
import { isAutheticated } from "../auth/authhelper";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import Plupload from "react-plupload";
import Footer from "./Footer";

export default function Earning() {
  //   var uploader = new window.plupload.Uploader({
  //     runtimes : 'html5,flash,silverlight,html4',

  //     browse_button : 'pickfiles', // you can pass in id...
  //     container: document.getElementById('container'), // ... or DOM Element itself

  //     url : "/examples/upload",

  //     filters : {
  //         max_file_size : '10mb',
  //         mime_types: [
  //             {title : "Image files", extensions : "jpg,gif,png"},
  //             {title : "Zip files", extensions : "zip"}
  //         ]
  //     },

  //     // Flash settings
  //     flash_swf_url : '/plupload/js/Moxie.swf',

  //     // Silverlight settings
  //     silverlight_xap_url : '/plupload/js/Moxie.xap',

  //     init: {
  //         PostInit: function() {
  //             document.getElementById('filelist').innerHTML = '';

  //             document.getElementById('uploadfiles').onclick = function() {
  //                 uploader.start();
  //                 return false;
  //             };
  //         },

  //         FilesAdded: function(up, files) {
  //             window.plupload.each(files, function(file) {
  //                 document.getElementById('filelist').innerHTML += '<div id="' + file.id + '">' + file.name + ' (' + window.plupload.formatSize(file.size) + ') <b></b></div>';
  //             });
  //         },

  //         UploadProgress: function(up, file) {
  //             document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
  //         },

  //         Error: function(up, err) {
  //             document.getElementById('console').innerHTML += "\nError #" + err.code + ": " + err.message;
  //         }
  //     }
  // });

  // uploader.init();

  const { token } = isAutheticated();
  const [subcriber, setSubcriber] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [showData, setShowData] = useState(subcriber);

  useEffect(() => {
    axios
      .get(`${API}/api/user/transaction`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        let data = response.data.data;
        setSubcriber(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
              <div
                className="
                    page-title-box
                    d-flex
                    align-items-center
                    justify-content-between
                  "
              >
                <h4 className="mb-0">Earnings</h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">TellyTell</Link>
                    </li>
                    <li className="breadcrumb-item active">Earnings</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <div className="row ml-0 mr-0 mb-10">
                    <div className="col-sm-12 col-md-12">
                      <div className="dataTables_length">
                        <label className="w-100">
                          Show
                          <select
                            name=""
                            className="
                                select-w
                                custom-select custom-select-sm
                                form-control form-control-sm
                              "
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
                          <th>User Name</th>
                          <th>Subscription Type</th>
                          <th>Amount</th>
                          <th>Date</th>
                          <th>Order ID</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {showData.map((data) => (
                          <tr key={data._id}>
                            {data.client ? (
                              <td>
                                {data.client.firstName}&nbsp;
                                {data.client.lastName}
                              </td>
                            ) : (
                              <td>Name not defined here</td>
                            )}
                            <td>{data.paymentType} </td>
                            <td>{data.amount}</td>
                            <td>{new Date(data.createdAt).toDateString()}</td>
                            <td>{data._id}</td>
                            <td>
                              <Link to={`/order/view/${data._id}`}>
                                <button
                                  type="button"
                                  className="
                                    btn btn-info btn-sm
                                    waves-effect waves-light
                                    btn-table
                                    ml-2
                                  "
                                >
                                  View
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

      {/* //////////////  plup load /////// */}
      {/* <Plupload 
      id="plupload"
      runtimes="flash"
      multipart
      chunk_size="1mb"
      url="/"
      flash_swf_url="plupload-2.1.8/js/Moxie.swf"
      
      /> */}
      {/* <div id="filelist">Your browser doesn't have Flash, Silverlight or HTML5 support.</div>
<br />
 
<div id="container">
    <a id="pickfiles" href="javascript:;">[Select files]</a>
    <a id="uploadfiles" href="javascript:;">[Upload files]</a>
</div>
 
<br />
<pre id="console"></pre> */}

      <Footer />
    </div>
  );
}
