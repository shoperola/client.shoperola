import React, { useEffect, useState } from 'react'

import { Link, useParams, useHistory } from "react-router-dom";
import { API } from "../../../API";
import { isAutheticated } from "../../auth/authhelper";
import Footer from "../Footer";
import axios from "axios";
// import swal from "sweetalert";
// import ClipLoader from "react-spinners/ClipLoader";
// import OrderDetail from "./OrderDetail";
import getSymbolFromCurrency from "currency-symbol-map";

const AbandonedCartDetails = () => {
    const { token } = isAutheticated();
    const { id } = useParams();
    const [currency, setCurrency] = useState();
    const [productData, setProductData] = useState({});
    const [pid, setPid] = useState()
    const [data, setData] = useState({});
    const prodId = pid?.find(x => x !== undefined);
    useEffect(() => {
        async function fetchData() {
            await axios
                .get(`${API}/api/user`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {

                    setCurrency(res.data.data.settings.currency);
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        fetchData();
    }, [token]);

    useEffect(() => {
        const fetchData = () => {
            axios
                .get(`${API}/api/order/view_order`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    const orderData = res.data.data.find((data) => {
                        return data._id === id
                    })
                    console.log(orderData);

                    setData(orderData);

                    setPid(orderData?.products?.map(product => product?.pid))
                });
        };

        fetchData();



    }, [token]);
    console.log(data)

    useEffect(() => {
        const fetchData = () => {

            axios
                .get(`${API}/api/product/${prodId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {

                    setProductData(res?.data?.data)

                }).catch(e => console.log(e.message))




        };

        fetchData();

    }, [prodId]);
    console.log(productData);

    console.log(pid)

    return (
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-flex align-items-center justify-content-between">
                                <h4 className="mb-0"> Abandoned Cart Details</h4>
                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item">
                                            <Link to="/dashboard">Shoperola</Link>
                                        </li>
                                        <li className="breadcrumb-item active">Abandoned Cart</li>
                                        <li className="breadcrumb-item active">
                                            Abandoned Cart Details
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            {/* <div className="form-group text-right"> */}
                            {/* <button
                    type="button"
                    className="btn btn-success btn-login waves-effect waves-light mr-3"
                    onClick={saveHandler}
                  >
                    <ClipLoader loading={isLoading} size={18} />
                    {!isLoading && "Save"}
                  </button>
                  <Link to={`/orders/${status}`}>
                    <button
                      type="button"
                      className="btn btn-success btn-cancel waves-effect waves-light mr-3"
                    >
                      Cancel
                    </button>
                  </Link> */}

                            <div className="orderDetails">
                                <div className="orderDetails-heading">
                                    <li>User ID</li>
                                    <li>Merchant Txn ID </li>
                                    <li>Transaction ID</li>
                                    <li>Product Purchased</li>
                                    <li>Product ID</li>
                                    <li>Created At</li>
                                    <li>Updated At</li>
                                    <li>Status</li>
                                    <li>Amount</li>
                                    <li>Checksum</li>
                                </div>
                                <div className="orderDetails-value">

                                    <li>{data?.txnId?.userID}</li>
                                    <li>{data?.txnId?.merchantTxnId}</li>
                                    <li>{data?.txnId?.txnId}</li>
                                    <li>{productData?.title}</li>
                                    <li>{pid}</li>
                                    <li> {new Date(data?.txnId?.createdAt)
                                        .toDateString(data?.txnId?.createdAt)
                                        .split(" ")
                                        .slice(1)
                                        .join(" ")} {new Date(data?.txnId?.createdAt)
                                            .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                        }</li>
                                    <li> {new Date(data?.txnId?.updatedAt)
                                        .toDateString(data?.txnId?.updatedAt)
                                        .split(" ")
                                        .slice(1)
                                        .join(" ")} {new Date(data?.txnId?.updatedAt)
                                            .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                        }</li>
                                    <li>{data?.txnId?.status}</li>
                                    <li> {getSymbolFromCurrency(currency)}{data?.txnId?.amount}</li>
                                    <li>{data?.txnId?.checksum}</li>
                                </div>
                            </div>

                            {/* <tr>
                  
                </tr>
  
                <tr>
                  
                </tr> */}


                            {/* </div> */}
                        </div>
                    </div>
                    {/* {data && currency && (
              <OrderDetail
                status={status}
                data={data}
                newStatus={newStatus}
                setNewStatus={setNewStatus}
                currency={currency}
              />
            )} */}
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default AbandonedCartDetails
