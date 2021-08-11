import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import { API } from '../../../../API';
import { isAutheticated } from '../../../auth/authhelper';
import ClipLoader from "react-spinners/ClipLoader";
import Footer from '../../Footer';
function AddVideoCatagory() {

    const [inputText, setinputText] = useState({
        name: "",
        type: "",
    });
    //let history=useHistory();
    const [loading, setLoading] = useState(false);

    const { token } = isAutheticated();
    const handleInputText = (e) => {
        setinputText({
            ...inputText,
            [e.target.name]: (e.target.value).charAt(0).toUpperCase() + e.target.value.slice(1)
        })
    }
    console.log(inputText)

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        let res = await axios.post(`${API}/api/categories/add_categories`, {
            name: inputText.name,
            type: inputText.type
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        if (res.data) {
            // console.log(res);
            window.location = "/categories";
            // history.push("/categories");
        }
        //     axios
        //   .post(`${API}/api/category/`, {category: inputText}, {
        //     headers: {
        //       Authorization: `Bearer ${token}`,
        //     },
        //   })
        //   .then((response) => {
        //     setLoading(false);
        //     swal( {
        //       title: "Category added Successfully!",

        //       icon: "success",
        //       buttons: true,
        //       successMode: true,
        //       dangerMode: false,
        //     }).then((value) => {
        //         history.push("/comcatagory");
        //     });
        //   })
        //   .catch((err) => {
        //     setLoading(false);
        //     let message = "errror";
        //     swal({
        //       title: "Error",
        //       text: { message },
        //       icon: "error",
        //       buttons: true,
        //       dangerMode: true,
        //     });
        //     console.log(err);
        //   });
    }

    return (
        <div className="main-content">

            <div className="page-content">
                <div className="container-fluid">

                    {/* <!-- start page title --> */}

                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-flex align-items-center justify-content-between">
                                <h4 className="mb-0">Content Management - Categories
                                </h4>

                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><Link to="/dashboard">TellyTell</Link></li>
                                        <li className="breadcrumb-item">Content Management - Categories</li>
                                        <li className="breadcrumb-item">Add New Category</li>
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


                                    <div className="row">

                                        <div className="col-md-12 col-lg-6 col-xl-6">

                                            <h1 className="text-left head-small">Add New Category </h1>


                                            <form>


                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className="form-group">
                                                            <label for="basicpill-phoneno-input" className="label-100">Enter Category Name</label>
                                                            <input name="name" type="text" onChange={handleInputText} className="form-control input-field" id="basicpill-phoneno-input" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className="form-group">
                                                            <label for="basicpill-phoneno-input"
                                                                className="label-100">Select Type</label>
                                                            <select className="form-control input-field" id="basicpill-phoneno-input" onChange={handleInputText} name="type">
                                                                <option>Select</option>
                                                                <option>Individual Videos</option>
                                                                <option>Series</option>
                                                            </select>
                                                            <label for="basicpill-phoneno-input"
                                                                className="label-100">Example of individual videos is a
                                                                movie. Example of Series is a collection of
                                                                videos</label>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className="form-group text-left">
                                                            <button onClick={submitHandler} type="button" className="btn btn-success btn-login waves-effect waves-light mr-3">
                                                                <ClipLoader loading={loading} size={18} />
                                                                {!loading && "Save"}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>


                                            </form>


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
                            <script>document.write(new Date().getFullYear())</script> © SHOTT.
                        </div>

                    </div>
                </div>
            </footer> */}
            <Footer />
        </div>
    );
}

export default AddVideoCatagory;