import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../../../../API";
import { isAutheticated } from "../../../auth/authhelper";
import Footer from "../../Footer";
import getSymbolFromCurrency from "currency-symbol-map";

function AllShippings(props) {
  const { token } = isAutheticated();
  const [data, setdata] = useState([]);
  const [currency, setCurrency] = useState("");

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
    async function fetchData() {
      await axios
        .get(`${API}/api/shipment/view_shipments`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setdata(res.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchData();
  }, [token, data]);

  const handleDelete = async (id) => {
    let delShipment = window.confirm("Do you want to delete");
    if (!delShipment) {
      return;
    }
    let res = await axios.delete(`${API}/api/shipment/delete_shipment/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res) {
      window.location.reload();
    }
  };

  const handleSuspend = async (id, status) => {
    let sus = null;

    if (status === "active") {
      sus = window.confirm("Do you want to suspend the shipment?");

      if (!sus) {
        return;
      }

      await axios
        .get(`${API}/api/shipment/change_status/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          // window.location.reload()
        })
        .catch((error) => {
          console.log(error);
          // window.alert("Suspending of the current shipment failed");
        });
    } else {
      sus = window.confirm("Do you want to activate the shipment?");

      if (!sus) {
        return;
      }

      await axios
        .get(`${API}/api/shipment/change_status/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
          window.alert("Activation of the current shipment failed");
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
                <h4 className="mb-0">Commerce - Shipping</h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">TellyTell</Link>
                    </li>
                    <li className="breadcrumb-item">Commerce - Shipping</li>
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
                    <div className="col-sm-12 col-md-6">&nbsp;</div>
                    <div className="col-sm-12 col-md-6">
                      <div className="dropdown d-block">
                        <a href="/shipping_add">
                          <button
                            type="button"
                            className="btn btn-primary add-btn waves-effect waves-light float-right"
                          >
                            <i className="fa fa-plus" aria-hidden="true"></i>{" "}
                            Add New Shipping Rate
                          </button>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="table-responsive table-shoot">
                    <table className="table table-centered table-nowrap mb-0">
                      <thead className="thead-light">
                        <tr>
                          <th>Name</th>
                          <th>Price</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.length > 0
                          ? data.map((item) => (
                              <tr key={item._id}>
                                <td>{item.shipping_name}</td>
                                <td>
                                  {getSymbolFromCurrency(currency)}{" "}
                                  {item.shipping_rate}
                                </td>
                                <td>
                                  {item.status === "active" ? (
                                    <span className="badge badge-pill badge-success font-size-12">
                                      Live
                                    </span>
                                  ) : (
                                    <span className="badge badge-pill badge-danger font-size-12">
                                      Suspended
                                    </span>
                                  )}
                                </td>
                                <td>
                                  {item.status === "active" ? (
                                    <button
                                      type="button"
                                      className="btn btn-danger btn-sm  waves-effect waves-light btn-table"
                                      onClick={() =>
                                        handleSuspend(item._id, item.status)
                                      }
                                    >
                                      Suspend
                                    </button>
                                  ) : (
                                    <button
                                      type="button"
                                      className="btn btn-success btn-sm  waves-effect waves-light btn-table"
                                      onClick={() =>
                                        handleSuspend(item._id, item.status)
                                      }
                                    >
                                      Make Live
                                    </button>
                                  )}
                                  {/* <button
                                    type="button"
                                    className="btn btn-success btn-sm  waves-effect waves-light btn-table"
                                    onClick={() =>
                                      handleSuspend(item._id, item.status)
                                    }
                                  >
                                    {item.status === "active"
                                      ? "Suspend"
                                      : "Make Live"}
                                  </button> */}
                                  <Link to={`/shipping_edit/${item._id}`}>
                                    <button
                                      type="button"
                                      className="btn btn-primary btn-sm  waves-effect waves-light btn-table ml-2"
                                    >
                                      Edit
                                    </button>
                                  </Link>

                                  <button
                                    onClick={() => handleDelete(item._id)}
                                    type="button"
                                    className="btn btn-danger btn-sm  waves-effect waves-light btn-table ml-2"
                                    id="sa-params"
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            ))
                          : ""}
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

      {/* <footer className="footer">
				<div className="container-fluid">
					<div className="row">
						<div className="col-sm-12">
							<script>document.write(new Date().getFullYear())</script> © TellyTell
						</div>

					</div>
				</div>
			</footer> */}
      <Footer />
    </div>
  );
}

export default AllShippings;
