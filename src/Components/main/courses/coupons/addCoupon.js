import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import { API } from '../../../../API';
import { isAutheticated } from '../../../auth/authhelper';
import ClipLoader from "react-spinners/ClipLoader";
import Footer from '../../Footer';
function AddCoupon() {

    const [inputText, setinputText] = useState({
        name: "",
        type: "",
    });
    const [appliesToText, setappliesToText] = useState();
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


    const handleChange = (e) => {
        console.log(e.target.value);
        setappliesToText(e.target.value);
    }


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
                                <h4 className="mb-0">Content Management - Add Coupon
                                </h4>

                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><Link to="/dashboard">TellyTell</Link></li>
                                        <li className="breadcrumb-item">Content Management - Add Coupon</li>
                                        <li className="breadcrumb-item">Add Coupon</li>
                                    </ol>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* <!-- end page title --> */}



                    <div class="row">
                        <div class="col-12">
                            <div class="form-group text-right">
                                <a href="commerce-coupons.html">
                                    <button type="button"
                                        class="btn btn-success btn-login waves-effect waves-light mr-3">Save</button>
                                </a>
                                <a href="#">
                                    <button type="button"
                                        class="btn btn-success btn-cancel waves-effect waves-light mr-3">Cancel</button>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-8">
                            <div class="card">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <form>
                                                <div class="row">
                                                    <div class="col-lg-12">
                                                        <div class="form-group">
                                                            <label for="basicpill-phoneno-input" class="label-100">
                                                                Name
                                                            </label>
                                                            <input type="text" class="form-control input-field" />
                                                            <label for="basicpill-phoneno-input" class="label-100">
                                                                This name is shown to customers at checkout.
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row">
                                                    <div class="col-lg-12">
                                                        <div class="form-group">
                                                            <label for="basicpill-phoneno-input" class="label-100">
                                                                Coupon Code
                                                            </label>
                                                            <input type="text" class="form-control input-field" />
                                                            <label for="basicpill-phoneno-input" class="label-100">
                                                                Customers enter this code at checkout.
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="card">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <form>
                                                <div class="row">
                                                    <div class="col-lg-12">
                                                        <div class="form-group">
                                                            <label for="basicpill-phoneno-input" class="label-100">
                                                                Status
                                                            </label>
                                                            <select name="currency" value=""
                                                                class="form-control  input-field">
                                                                <option value="">--select--</option>
                                                                <option value="Active">Active</option>
                                                                <option value="Inactive">Inactive</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>

                                        <div class="row">
                                            <div class="col-lg-12">
                                                <label class="col-md-12 control-label">This coupon never expires</label>
                                                <div class="col-md-8">
                                                    <div class="custom-control custom-radio mb-2">
                                                        <input type="radio" id="age1" name="age"
                                                            class="custom-control-input" />
                                                        <label class="custom-control-label" for="age1">Yes</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-lg-8">
                            <div class="card">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <label class="col-md-4 control-label">Promotion</label>
                                            <div class="col-md-8">
                                                <div class="custom-control custom-radio mb-2">
                                                    <input type="radio" id="age1" name="age"
                                                        class="custom-control-input" />
                                                    <label class="custom-control-label" for="age1">Percentage
                                                        Off</label>
                                                    <input type="text" class="form-control input-field" />
                                                </div>

                                                <div class="custom-control custom-radio mb-2">
                                                    <input type="radio" id="age2" name="age"
                                                        class="custom-control-input" />
                                                    <label class="custom-control-label" for="age2">Amount Off</label>
                                                    <input type="text" class="form-control input-field" />
                                                </div>

                                                <div class="custom-control custom-radio mb-2">
                                                    <input type="radio" id="age3" name="age"
                                                        class="custom-control-input" />
                                                    <label class="custom-control-label" for="age3">Free Shipping</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-8">
                            <div class="card">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <form>
                                                <div class="row">
                                                    <div class="col-lg-12">
                                                        <div class="form-group">
                                                            <label for="basicpill-phoneno-input" class="label-100">
                                                                Applies to
                                                            </label>
                                                            <select name="currency" onChange={handleChange}
                                                                class="form-control  input-field">
                                                                <option value="">--select--</option>
                                                                <option >Any Order</option>
                                                                <option >Orders Over</option>
                                                                <option >Single Product</option>
                                                                <option >Products by Category</option>
                                                            </select>
                                                        </div>
                                                        {
                                                            appliesToText === "Orders Over" &&
                                                            < div class="form-group">
                                                                <label for="basicpill-phoneno-input" class="label-100">
                                                                    Price
                                                                </label>
                                                                <input placeholder="$" type="text" class="form-control input-field" />
                                                            </div>
                                                        }
                                                        {
                                                            appliesToText === "Single Product" &&
                                                            < div class="form-group">
                                                                <label for="basicpill-phoneno-input" class="label-100">
                                                                    Name of the Product
                                                                </label>
                                                                <input placeholder="Enter Product Name" type="text" class="form-control input-field" />
                                                            </div>
                                                        }
                                                        {
                                                            appliesToText === "Products by Category" &&
                                                            < div class="form-group">
                                                                <label for="basicpill-phoneno-input" class="label-100">
                                                                    Select the Product by Category
                                                                </label>
                                                                <select name="products"
                                                                    class="form-control  input-field">
                                                                    <option value="">--select--</option>
                                                                    <option >Accessories</option>
                                                                    <option >Essentials</option>
                                                                    <option >Electronics</option>
                                                                    <option >Home Decoration</option>
                                                                </select>
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-md-12">
                                            <form>
                                                <div class="row">
                                                    <div class="col-lg-12">
                                                        <div class="form-group">
                                                            <label for="basicpill-phoneno-input" class="label-100">
                                                                Limit Total User
                                                            </label>
                                                            <select name="currency" value=""
                                                                class="form-control  input-field">
                                                                <option value="">--select--</option>
                                                                <option value="Active">Unlimited</option>
                                                                <option value="Inactive">Limited Users</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-lg-12">
                                            <label class="col-md-4 control-label">Customer limit</label>
                                            <div class="col-md-8">
                                                <div class="custom-control custom-radio mb-2">
                                                    <input type="radio" id="age1" name="age"
                                                        class="custom-control-input" />
                                                    <label class="custom-control-label" for="age1">Limit one per
                                                        customer</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="form-group">
                                                <label for="basicpill-phoneno-input" class="label-100">
                                                    Start Date
                                                </label>
                                                <div class="input-group">
                                                    <input type="text" class="form-control input-field"
                                                        data-provide="datepicker" data-date-format="dd M, yyyy"
                                                        data-date-autoclose="true" />
                                                    <div class="input-group-append">
                                                        <span class="input-group-text"><i class="fa fa-calendar"
                                                            aria-hidden="true"></i></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="form-group">
                                                <label for="basicpill-phoneno-input" class="label-100">
                                                    End Date
                                                </label>
                                                <div class="input-group">
                                                    <input type="text" class="form-control input-field"
                                                        data-provide="datepicker" data-date-format="dd M, yyyy"
                                                        data-date-autoclose="true" />
                                                    <div class="input-group-append">
                                                        <span class="input-group-text"><i class="fa fa-calendar"
                                                            aria-hidden="true"></i></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

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
        </div >
    );
}

export default AddCoupon;