import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../../../../API";
import { isAutheticated } from "../../../auth/authhelper";
import Footer from "../../Footer";

function AllCoupons(props) {
  const { token } = isAutheticated();
  const [data, setdata] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`${API}/api/coupons`, {
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
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    let status = window.confirm("Do you want to delete");
    if (!status) {
      return;
    }
    let res = await axios.delete(`${API}/api/coupons/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res) {
      window.location.reload();
    }
  };

  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0">Commerce - Coupons</h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">TellyTell</Link>
                    </li>
                    <li className="breadcrumb-item">Commerce - Coupons</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <div className="row ml-0 mr-0  mb-10">
                    <div className="col-sm-12 col-md-6">&nbsp;</div>
                    <div className="col-sm-12 col-md-6">
                      <div className="dropdown d-block">
                        <a href="/coupon_add">
                          <button
                            type="button"
                            className="btn btn-primary add-btn waves-effect waves-light float-right"
                          >
                            <i className="fa fa-plus" aria-hidden="true"></i>{" "}
                            Add New
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
                          <th>Code</th>
                          <th>Start Date</th>
                          <th>End Date</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.length > 0
                          ? data.map((item) => (
                              <tr key={item._id}>
                                <td>{item.coupon_name}</td>
                                <td>{item.coupon_code}</td>
                                <td>
                                  {new Date(item.start_date).toDateString()}
                                </td>
                                <td>
                                  {new Date(item.end_date).toDateString()}
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
                                  <Link to={`/coupon_edit/${item._id}`}>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default AllCoupons;
