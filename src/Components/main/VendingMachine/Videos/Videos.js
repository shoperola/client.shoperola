import React from 'react'
import Footer from '../../Footer';
import { Link } from 'react-router-dom';

const Videos = () => {
    return (
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">
                    {/* <!-- start page title --> */}
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-flex align-items-center justify-content-between">
                                <h4 className="mb-0">Vending Machine - Videos</h4>

                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item">
                                            <Link to="/dashboard">Shoperola</Link>
                                        </li>
                                        <li className="breadcrumb-item">Vending Machine - Videos</li>
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
                                    <div className="row ml-0 mr-0  mb-10" id='video-Add'>

                                        <div className="col-sm-12 col-md-6">
                                            <div className="dropdown d-block">
                                                <button
                                                    type="button"
                                                    className="btn btn-primary add-btn waves-effect waves-light float-right"
                                                >
                                                    <i className="fa fa-plus" aria-hidden="true"></i>{" "}
                                                    Add Image
                                                </button>
                                                <Link to="/addvideo">
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary add-btn waves-effect waves-light float-right"
                                                    >
                                                        <i className="fa fa-plus" aria-hidden="true"></i>{" "}
                                                        Add Video
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
                                                    <th>Added On</th>
                                                    <th>Action</th>

                                                </tr>

                                            </thead>

                                            <tbody>
                                                <tr>

                                                    <td>Test</td>
                                                    <td>Thumbnail</td>
                                                    <td>Some date</td>
                                                    <td>
                                                        <button
                                                            type="button"
                                                            className="btn btn-primary btn-sm  waves-effect waves-light btn-table ml-2"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            type="button"
                                                            // onClick={() => handleDelete(item._id)}
                                                            className="btn btn-danger btn-sm  waves-effect waves-light btn-table ml-2"
                                                            id="sa-params"
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>

                                                </tr>
                                            </tbody>
                                        </table>
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

export default Videos
