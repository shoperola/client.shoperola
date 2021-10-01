import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { API } from "../../../../API";
import { isAutheticated } from "../../../auth/authhelper";
import Footer from "../../Footer";
import swal from "sweetalert";

function TaxRates(props) {
  const history = useHistory();
  const { token } = isAutheticated();
  const [data, setdata] = useState([]);
  useEffect(() => {
    async function fetchData() {
      let res = await axios.get(`${API}/api/tax_rates/view_taxs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setdata(res.data.data);
    }
    fetchData();
  }, [token]);
  const handleDelete = async (id) => {
    let res = await axios.post(
      `${API}/api/product/count_delete_tax/${id}`,
      {},
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    const done = await swal({
      title: "Confirm Your Choice!",
      text: `There are ${res.data.data} products with this tax rate. If you delete, Zero Tax Rate (0%) will be applicable to all the products in the future`,
      icon: "warning",
      buttons: {
        Done: {
          text: "Confirm",
          value: "Confirm",
        },
        Cancle: {
          text: "Cancel",
          value: "Cancel",
        },
      },
    });
    if (done === "Confirm") {
      let res = await axios.post(
        `${API}/api/product/count_delete_tax/${id}`,
        {
          flag: "true",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res) {
        window.location.reload();
      }
    }
  };
  const handleEdit = async (id) => {
    history.push(`/edit_taxRate/${id}`);
  };

  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          {/* <!-- start page title --> */}

          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0">Payment Settings - Tax Rates</h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">Shoperola</Link>
                    </li>
                    <li className="breadcrumb-item">
                      Payment Settings - Tax Rates
                    </li>
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
                        <Link to={`/add_taxRate`}>
                          <button
                            type="button"
                            className="btn btn-primary add-btn waves-effect waves-light float-right"
                          >
                            <i className="fa fa-plus" aria-hidden="true"></i>{" "}
                            Add New Tax Rate
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="table-responsive table-shoot">
                    <table className="table table-centered table-nowrap mb-0">
                      <thead className="thead-light">
                        <tr>
                          <th>Name</th>
                          <th>Tax Rate</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data &&
                          data.map((e) => {
                            return (
                              <tr key={e._id}>
                                <td>{e.tax_name}</td>
                                <td>{e.tax_percentage}%</td>
                                <td>
                                  <button
                                    type="button"
                                    className="btn btn-primary btn-sm  waves-effect waves-light btn-table ml-2"
                                    disabled={e.tax_name === "ZERO_TAX"}
                                    onClick={() => handleEdit(e._id)}
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => handleDelete(e._id)}
                                    type="button"
                                    className="btn btn-danger btn-sm  waves-effect waves-light btn-table ml-2"
                                    id="sa-params"
                                    disabled={e.tax_name === "ZERO_TAX"}
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
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
							<script>document.write(new Date().getFullYear())</script> © Shoperola
						</div>

					</div>
				</div>
			</footer> */}
      <Footer />
    </div>
  );
}

export default TaxRates;
