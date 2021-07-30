import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { API } from '../../../../API';
import { isAutheticated } from '../../../auth/authhelper';
import Footer from '../../Footer';

function ViewSeason(props) {
    const { seasonIdparams } = useParams();
    const { token } = isAutheticated();
    const [e, setEpisode] = useState({})
    console.log(seasonIdparams);
    useEffect(() => {
        axios
            .get(`${API}/api/tvshow/view_season/${seasonIdparams}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                const userdata = response.data;
                console.log("here ssseason", userdata.episode);
                setEpisode(userdata);
                console.log(response);
                //setLanguages(userdata.languages);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])
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
                                        <li className="breadcrumb-item"><a href="javascript: void(0);">TellyTell</a></li>
                                        <li className="breadcrumb-item">Content Management - TV Shows- Seasons</li>


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
                                                <a href="tv-shows-season-add.html">
                                                    <button type="button" className="btn btn-primary add-btn waves-effect waves-light float-right">
                                                        <i className="fa fa-plus" aria-hidden="true"></i> Add Season
                                                    </button>
                                                </a>
                                            </div>


                                        </div>
                                    </div>
                                    <div className="table-responsive table-shoot">
                                        <table className="table table-centered table-nowrap mb-0">
                                            <thead className="thead-light">
                                                <tr>
                                                    <th>Season</th>
                                                    <th>Videos</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Season 1</td>
                                                    <td>10</td>
                                                    <td>
                                                        <Link to="/language/season/episode">
                                                            <button type="button" className="btn btn-info btn-sm  waves-effect waves-light btn-table ml-2">
                                                                View Episodes</button>
                                                        </Link>
                                                        <a href="tv-shows-season-edit.html">
                                                            <button type="button" className="btn btn-primary btn-sm  waves-effect waves-light btn-table ml-2">
                                                                Edit</button>
                                                        </a>
                                                        <a href="#">
                                                            <button type="button" className="btn btn-danger btn-sm  waves-effect waves-light btn-table ml-2" id="sa-params">
                                                                Delete</button>
                                                        </a>
                                                    </td>
                                                </tr>
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
                                                        <a href="#" aria-controls="datatable" data-dt-idx="0" tabindex="0" className="page-link">Previous</a>
                                                    </li>

                                                    <li className="paginate_button page-item active">
                                                        <a href="#" aria-controls="datatable" data-dt-idx="1" tabindex="0" className="page-link">1</a>
                                                    </li>

                                                    <li className="paginate_button page-item ">
                                                        <a href="#" aria-controls="datatable" data-dt-idx="2" tabindex="0" className="page-link">2</a>
                                                    </li>

                                                    <li className="paginate_button page-item ">
                                                        <a href="#" aria-controls="datatable" data-dt-idx="3" tabindex="0" className="page-link">3</a>
                                                    </li>


                                                    <li className="paginate_button page-item next">
                                                        <a href="#" tabindex="0" className="page-link">Next</a>
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
                        {new Date().getFullYear()} © TellyTell.
                        </div>

                    </div>
                </div>
            </footer> */}
            <Footer/>
        </div>
    );
}

export default ViewSeason;