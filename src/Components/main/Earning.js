import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../../API";
import { isAutheticated } from "../auth/authhelper";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import Plupload from "react-plupload"
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
  const [subcriber,setSubcriber]=useState([]);
  useEffect(()=>{
    axios
    .get(`${API}/api/user/transaction`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response)=>{
      let data=response.data.data;
      setSubcriber(data);
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
  },[]);
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
                        {subcriber.map((data)=>
                        <tr key={data._id}>
                          {data.client?<td>{data.client.firstName}&nbsp;{data.client.lastName}</td>:<td>Name not defined here</td>}
                          <td>{data.paymentType} </td>
                          <td>{data.amount}</td>
                          <td>{(new Date(data.createdAt)).toDateString()}</td>
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
                        )}
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
                      <div
                        className="
                            dataTables_paginate
                            paging_simple_numbers
                            float-right
                          "
                      >
                        <ul className="pagination">
                          <li
                            className="
                                paginate_button
                                page-item
                                previous
                                disabled
                              "
                          >
                            <a
                              href="#"
                              aria-controls="datatable"
                              data-dt-idx="0"
                              tabIndex="0"
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
                              tabIndex="0"
                              className="page-link"
                            >
                              1
                            </a>
                          </li>

                          <li className="paginate_button page-item">
                            <a
                              href="#"
                              aria-controls="datatable"
                              data-dt-idx="2"
                              tabIndex="0"
                              className="page-link"
                            >
                              2
                            </a>
                          </li>

                          <li className="paginate_button page-item">
                            <a
                              href="#"
                              aria-controls="datatable"
                              data-dt-idx="3"
                              tabIndex="0"
                              className="page-link"
                            >
                              3
                            </a>
                          </li>

                          <li className="paginate_button page-item next">
                            <a href="#" tabIndex="0" className="page-link">
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
