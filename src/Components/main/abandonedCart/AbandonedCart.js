import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { API, orderAPI } from "../../../API";
import { isAutheticated } from "../../auth/authhelper";
import Footer from "../Footer";
import axios from "axios";
import swal from "sweetalert";
import ClipLoader from "react-spinners/ClipLoader";
import getSymbolFromCurrency from "currency-symbol-map";

const AbandonedCart = () => {
  const { token } = isAutheticated();
  const { status } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [currency, setCurrency] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [showData, setShowData] = useState(data);

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

          const tempData = res.data.data.filter(
            (item) => item.txnId.status === 'SUCCESS'
          );
          const sortedData = tempData.sort(function (a, b) {
            var c = new Date(a.createdAt).getTime();
            var d = new Date(b.createdAt).getTime();
            return c < d ? 1 : -1;
          })
          // console.log(tempData);
          setData(sortedData);
          setIsLoading(false)
        });
    };

    fetchData();

  }, [token]);
  console.log(showData);

  useEffect(() => {
    const loadData = () => {
      // console.log(data);
      const indexOfLastPost = currentPage * itemPerPage;
      const indexOfFirstPost = indexOfLastPost - itemPerPage;
      const slicedData = data.slice(indexOfFirstPost, indexOfLastPost);

      setShowData(slicedData);
    };

    loadData();

  }, [data, currentPage, itemPerPage]);
  console.log(showData)

  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0">Abandoned Cart</h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">Shoperola</Link>
                    </li>
                    <li className="breadcrumb-item active">Abandoned Cart</li>
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
                    <div className="col-sm-12 col-md-12">
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
                  </div>

                  <div className="table-responsive table-shoot">
                    <table className="table table-centered table-nowrap mb-0">
                      <thead className="thead-light">
                        <tr>
                          <th>Order ID</th>

                          <th>Amount</th>
                          <th>Placed On</th>

                          <th>Action</th>
                        </tr>
                      </thead>
                      <tr style={{ textAlign: "center" }}>
                        <td colspan="6">
                          <ClipLoader loading={isLoading} size={24} />
                        </td>
                      </tr>
                      <tbody>
                        {!isLoading &&
                          showData?.map(item =>


                          (

                            <tr key={item._id}>
                              <td>{item._id}</td>

                              <td>
                                {getSymbolFromCurrency(currency)}{item.txnId.amount}
                              </td>
                              <td>

                                {new Date(item.createdAt)
                                  .toDateString(item.createdAt)
                                  .split(" ")
                                  .slice(1)
                                  .join(" ")} {new Date(item.createdAt)
                                    .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                }
                              </td>

                              <td>
                                <Link to={`/comproducts/view/${item.products.pid}`}>
                                  <button
                                    type="button"
                                    className="btn btn-primary btn-sm  waves-effect waves-light btn-table ml-2"
                                  >
                                    View
                                  </button>
                                </Link>
                              </td>
                            </tr>
                          ))}
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AbandonedCart;
