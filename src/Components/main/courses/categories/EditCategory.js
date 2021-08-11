import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API } from '../../../../API';
import { isAutheticated } from '../../../auth/authhelper';
import Footer from '../../Footer';

function EditVideoCatagory(props) {

    const { token } = isAutheticated();
    const [inputText, setinputText] = useState({
        name: "",
        type: "",
    });
    console.log(props.match.params.id)
    const handleInputText = (e) => {
        setinputText({
            ...inputText,
            [e.target.name]: (e.target.value).charAt(0).toUpperCase() + e.target.value.slice(1)
        })
    }
    const handleSubmit = async () => {
        let res = await axios.patch(`${API}/api/categories/update_categories/${props.match.params.id}`, {
            name: inputText.name,
            type: inputText.type
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        if (res) {
            window.location = "/categories";
        }
    }
    useEffect(async () => {
        let res = await axios.get(`${API}/api/categories/view_by_id_categories/${props.match.params.id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        console.log(res);
        setinputText({
            name: res.data?.name,
            type: res.data?.type,
        })
    }, [])

    console.log(inputText);

    return (
        <div className="main-content">

            <div className="page-content">
                <div className="container-fluid">

                    {/* <!-- start page title --> */}

                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-flex align-items-center justify-content-between">
                                <h4 className="mb-0">Commerce - Categories
                                </h4>
                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><Link to="/dashboard">TellyTell</Link></li>
                                        <li className="breadcrumb-item">Commerce - Categories</li>
                                        <li className="breadcrumb-item">Edit</li>
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

                                            <h1 className="text-left head-small">Edit Category</h1>


                                            <form>


                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className="form-group">
                                                            <label for="basicpill-phoneno-input" className="label-100"></label>
                                                            <input name="name" onChange={handleInputText} type="text" className="form-control input-field" defaultValue={inputText.name} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className="form-group">
                                                            <label for="basicpill-phoneno-input"
                                                                className="label-100">Select Type</label>
                                                            <select value={inputText.type} className="form-control input-field" id="basicpill-phoneno-input" onChange={handleInputText} name="type">
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
                                                            <button onClick={handleSubmit} type="button" className="btn btn-success btn-login waves-effect waves-light mr-3">Save</button>
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
                            <script>document.write(new Date().getFullYear())</script> © TellyTell.
                        </div>

                    </div>
                </div>
            </footer> */}
            <Footer />
        </div>
    );
}

export default EditVideoCatagory;