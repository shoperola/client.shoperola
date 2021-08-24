import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import { API } from '../../../../API';
import { isAutheticated } from '../../../auth/authhelper';
import ClipLoader from "react-spinners/ClipLoader";
import Footer from '../../Footer';
function AddShipping() {
    const history=useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const [shippingName, setShippingName] = useState('');
    const [shippingDescription, setShippingDescription] = useState('')
    const [rate, setRate] = useState(0);
    const [country, setCountry] = useState('')
    const [shippingState, setShippingState] = useState('')
    const [status, setStatus] = useState('')

    const { token } = isAutheticated();

    const addShippingHandler = async (e) => {
        const done = null;

        setIsLoading(true);
        const data = {
            "shipping_name": shippingName,
            "shipping_description": shippingDescription,
            "shipping_rate": rate,
            "shipping_country": country,
            "shipping_state": shippingState,
            "status": status.toLowerCase(),
        }

        await axios.post(`${API}/api/shipment/add_shipment`, data, {
			headers: {
				Authorization: `Bearer ${token}`,
			}
		}).then(async res => {
            const done = await swal({
                title: "Created Successfully!",
                icon: "success",
                buttons: {
                    Done: {
                        text: "Done",
                        value: "Done",
                    },
                }
            })
            setIsLoading(false)

            if (done === 'Done') {
                history.push('/allShippings')
            }
        }).catch(error => {
            setIsLoading(false)
        })
    }

    return (
        <div className="main-content">

            <div className="page-content">
                <div className="container-fluid">

                    {/* <!-- start page title --> */}

                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-flex align-items-center justify-content-between">
                                <h4 className="mb-0">Content Management - Add New Shipping Rate
                                </h4>

                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><Link to="/dashboard">TellyTell</Link></li>
                                        <li className="breadcrumb-item">Content Management - Add new Shipping Rate</li>
                                    </ol>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* <!-- end page title --> */}



                    <div className="row">
                        <div className="col-12">
                            <div className="form-group text-right">
                                {/* <a href="commerce-shipping.html"> */}
                                    <button type="button" onClick={addShippingHandler}
                                        className="btn btn-success btn-login waves-effect waves-light mr-3">
                                            <ClipLoader loading={isLoading} size={18} />
                                            {!isLoading && "Save"}
                                    </button>
                                {/* </a> */}
                                <Link to="/allShippings">
                                    <button type="button"
                                        className="btn btn-success btn-cancel waves-effect waves-light mr-3">Cancel</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <form>
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className="form-group">
                                                            <label for="basicpill-phoneno-input" className="label-100">
                                                                Shipping Method Name
                                                            </label>
                                                            <input type="text" className="form-control input-field" value={shippingName} onChange={e => setShippingName(e.target.value)} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className="form-group">
                                                            <label for="basicpill-phoneno-input" className="label-100">
                                                                Description (Optional)
                                                            </label>
                                                            <textarea className="form-control input-field"
                                                                rows="5" value={shippingDescription} onChange={e => setShippingDescription(e.target.value)} ></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className="form-group">
                                                            <label for="basicpill-phoneno-input" className="label-100">
                                                                Rate
                                                            </label>
                                                            <input type="text" className="form-control input-field" value={rate} onChange={e => setRate(e.target.value)} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <form>
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className="form-group">
                                                            <label for="basicpill-phoneno-input" className="label-100">
                                                                Status
                                                            </label>
                                                            <select name="currency" value={status} onChange={e => setStatus(e.target.value)} 
                                                                className="form-control  input-field">
                                                                <option value="">--select--</option>
                                                                <option value="Active">Active</option>
                                                                <option value="Inactive">Inactive</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-8">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <form>
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className="form-group">
                                                            <label for="basicpill-phoneno-input" className="label-100">
                                                                Select Country
                                                            </label>
                                                            <select name="currency" value={country} onChange={e => setCountry(e.target.value)}
                                                                className="form-control  input-field">
                                                                <option value="">--select--</option>
                                                                <option value="India">India</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <form>
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className="form-group">
                                                            <label for="basicpill-phoneno-input" className="label-100">
                                                                Select State
                                                            </label>
                                                            <select name="currency" value={shippingState} onChange={e => setShippingState(e.target.value)}
                                                                className="form-control  input-field">
                                                                <option value="">--select--</option>
                                                                <option value="Delhi">Delhi</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
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

export default AddShipping;