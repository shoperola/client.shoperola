import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../../../../API";
import { isAutheticated } from "../../../auth/authhelper";
import Footer from "../../Footer";
import getSymbolFromCurrency from "currency-symbol-map";

function Products(props) {
  const [data, setData] = useState([]);
  const { token } = isAutheticated();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [showData, setShowData] = useState(data);
  const [currency, setCurrency] = useState();

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
    const getData = async () => {
      let res = await axios.get(`${API}/api/product`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(res.data.data);
    };
    getData();
  }, [token]);

  useEffect(() => {
    const loadData = () => {
      const indexOfLastPost = currentPage * itemPerPage;
      const indexOfFirstPost = indexOfLastPost - itemPerPage;
      setShowData(data.slice(indexOfFirstPost, indexOfLastPost));
    };

    loadData();
  }, [data, currentPage, itemPerPage]);

  const handleDelete = async (id) => {
    let status = window.confirm("Do you want to delete");
    if (!status) {
      return;
    }
    let res = await axios.delete(`${API}/api/product/${id}`, {
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
          {/* <!-- start page title --> */}
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0">Commerce - Products</h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">TellyTell</Link>
                    </li>
                    <li className="breadcrumb-item">Commerce - Products</li>
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
                        <label className="w-100">
                          Show{" "}
                          <select
                            name=""
                            className="select-w custom-select custom-select-sm form-control form-control-sm"
                            value={itemPerPage}
                            onChange={(e) => setItemPerPage(e.target.value)}
                          >
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                          </select>{" "}
                          entries
                        </label>
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                      <div className="dropdown d-block">
                        <Link to="/comproducts/add">
                          <button
                            type="button"
                            className="btn btn-primary add-btn waves-effect waves-light float-right"
                          >
                            <i className="fa fa-plus" aria-hidden="true"></i>{" "}
                            Add New Product
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="table-responsive table-shoot">
                    <table className="table table-centered table-nowrap mb-0">
                      <thead className="thead-light">
                        <tr>
                          <th>Thumbnail</th>
                          <th>Name</th>
                          <th>Stock</th>
                          <th>Price</th>
                          <th>Tax</th>
                          <th>Total Price</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {showData.length > 0
                          ? showData.map(
                              (item) =>
                                item.title && (
                                  <tr key={item._id}>
                                    <td>
                                      <img
                                        src={item.image}
                                        width="75"
                                        height="100"
                                        alt=""
                                      />
                                    </td>
                                    <td>{item.title}</td>
                                    {item.variants ? (
                                      <td colSpan="4" align="center">
                                        Variants exist for this product.
                                      </td>
                                    ) : (
                                      <>
                                        <td>{item.quantity}</td>
                                        <td>
                                          {getSymbolFromCurrency(currency)}{" "}
                                          {item.sale_price}
                                        </td>
                                        <td>{item.tax?.tax_percentage}%</td>
                                        <td>
                                          {getSymbolFromCurrency(currency)}{" "}
                                          {item.total_price}
                                        </td>
                                      </>
                                    )}
                                    <td>
                                      {item.status ? (
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
                                      <button
                                        type="button"
                                        className="btn btn-success btn-sm  waves-effect waves-light btn-table"
                                      >
                                        Suspend
                                      </button>
                                      <Link
                                        to={`/comproducts/edit/${item._id}`}
                                      >
                                        <button
                                          type="button"
                                          className="btn btn-primary btn-sm  waves-effect waves-light btn-table ml-2"
                                        >
                                          Edit
                                        </button>
                                      </Link>
                                      <Link
                                        to={`/comproducts/view/${item._id}`}
                                      >
                                        <button
                                          type="button"
                                          className="btn btn-dark btn-sm  waves-effect waves-light btn-table ml-2"
                                        >
                                          View
                                        </button>
                                      </Link>
                                      <button
                                        type="button"
                                        onClick={() => handleDelete(item._id)}
                                        className="btn btn-danger btn-sm  waves-effect waves-light btn-table ml-2"
                                        id="sa-params"
                                      >
                                        Delete
                                      </button>
                                    </td>
                                  </tr>
                                )
                            )
                          : ""}
                      </tbody>
                    </table>
                  </div>

                  <div className="row mt-20">
                    <div className="col-sm-12 col-md-6 mb-20">
                      <div
                        className="dataTables_info"
                        id="datatable_info"
                        role="status"
                        aria-live="polite"
                      >
                        Showing {currentPage * itemPerPage - itemPerPage + 1} to{" "}
                        {Math.min(currentPage * itemPerPage, data.length)} of{" "}
                        {data.length} entries
                      </div>
                    </div>

                    <div className="col-sm-12 col-md-6">
                      <div className="dataTables_paginate paging_simple_numbers float-right">
                        <ul className="pagination">
                          <li
                            className={
                              currentPage === 1
                                ? "paginate_button page-item previous disabled"
                                : "paginate_button page-item previous"
                            }
                          >
                            <a
                              href="#"
                              aria-controls="datatable"
                              data-dt-idx="0"
                              tabindex="0"
                              className="page-link"
                              onClick={() => setCurrentPage((prev) => prev - 1)}
                            >
                              Previous
                            </a>
                          </li>

                          {!(currentPage - 1 < 1) && (
                            <li className="paginate_button page-item">
                              <a
                                aria-controls="datatable"
                                data-dt-idx="1"
                                tabindex="0"
                                className="page-link"
                                onClick={(e) =>
                                  setCurrentPage((prev) => prev - 1)
                                }
                              >
                                {currentPage - 1}
                              </a>
                            </li>
                          )}

                          <li className="paginate_button page-item active">
                            <a
                              href="#"
                              aria-controls="datatable"
                              data-dt-idx="2"
                              tabindex="0"
                              className="page-link"
                            >
                              {currentPage}
                            </a>
                          </li>

                          {!(
                            (currentPage + 1) * itemPerPage - itemPerPage >
                            data.length
                          ) && (
                            <li className="paginate_button page-item ">
                              <a
                                href="#"
                                aria-controls="datatable"
                                data-dt-idx="3"
                                tabindex="0"
                                className="page-link"
                                onClick={() => {
                                  setCurrentPage((prev) => prev + 1);
                                }}
                              >
                                {currentPage + 1}
                              </a>
                            </li>
                          )}

                          <li
                            className={
                              !(
                                (currentPage + 1) * itemPerPage - itemPerPage >
                                data.length
                              )
                                ? "paginate_button page-item next"
                                : "paginate_button page-item next disabled"
                            }
                          >
                            <a
                              href="#"
                              tabindex="0"
                              className="page-link"
                              onClick={() => setCurrentPage((prev) => prev + 1)}
                            >
                              Next
                            </a>
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
                            <script>document.write(new Date().getFullYear())</script> © TellyTell.
                        </div>

                    </div>
                </div>
            </footer> */}
      <Footer />
    </div>
  );
}

export default Products;
