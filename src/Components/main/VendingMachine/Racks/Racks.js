import { set } from "lodash-es";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAutheticated } from "../../../auth/authhelper";
import { API } from "../../../../API";
import axios from "axios";
import Footer from "../../Footer";
import ProductModal from "./ProductModal";

const Racks = () => {
  const [openModal, setOpenModal] = useState(false);
  const [rack, setRack] = useState(0);
  const [col, setCol] = useState(0);
  const [products, setProducts] = useState([]);
  const { token } = isAutheticated();

  const [totalRacks, setTotalRacks] = useState({});
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const getData = async () => {
      let res = await axios.get(`${API}/api/product`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(res.data.data);
    };
    getData();
  }, [token]);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`${API}/api/rack/view`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res);
          setTotalRacks(res.data.data);
        });
    };

    fetchData();
  }, []);

  const addProduct = (rack, col) => {
    setRack(rack);
    setCol(col);
    setOpenModal(true);
  };

  const editProduct = (rack, col) => {
    setEdit(true);
    setRack(rack);
    setCol(col);
    setOpenModal(true);
  };

  const getImage = (id) => {
    const product = products.filter((item) => item._id === id);
    console.log("product", product);
    return product[0]?.image;
  };

  const getTitle = (id) => {
    console.log(id);
    const product = products.filter((item) => item._id === id);
    return product[0]?.title;
  };

  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0">Vending Machine - Racks</h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">Shoperola</Link>
                    </li>
                    <li className="breadcrumb-item">Vending Machine - Racks</li>
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
                  <div className="table-responsive table-shoot">
                    <table className="table table-centered table-nowrap mb-0">
                      <thead className="thead-light">
                        <tr>
                          <th>Racks</th>
                          <th>Rows</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[1, 2, 3, 4, 5, 6, 7].map((rack) => (
                          <tr>
                            <td>Rack {rack}</td>
                            <td className="d-flex  align-items-center">
                              {[1, 2, 3, 4, 5].map((col) => (
                                <div className="pr-4">
                                  {totalRacks[`rack${rack}${col}`] ? (
                                    <div>
                                      <img
                                        src={getImage(
                                          totalRacks[`rack${rack}${col}`]._id
                                        )}
                                        style={{ height: 150, width: 125 }}
                                      />
                                      <h6 style={{ textAlign: "center" }}>
                                        {getTitle(
                                          totalRacks[`rack${rack}${col}`]._id
                                        )}
                                      </h6>
                                      <div className="d-flex">
                                        <button
                                          type="button"
                                          onClick={() => editProduct(rack, col)}
                                          class="btn btn-primary btn-sm ml-2"
                                        >
                                          Edit
                                        </button>
                                        <button
                                          type="button"
                                          // onClick={() => addProduct(1, 1)}
                                          class="btn btn-danger btn-sm ml-2"
                                        >
                                          Delete
                                        </button>
                                      </div>
                                    </div>
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={() => addProduct(rack, col)}
                                      class="btn btn-primary btn-sm  waves-effect waves-light ml-2"
                                    >
                                      Add Product
                                    </button>
                                  )}
                                </div>
                              ))}
                            </td>
                          </tr>
                        ))}
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
      {openModal && (
        <ProductModal
          setOpenModal={setOpenModal}
          rack={rack}
          col={col}
          products={products}
          edit={edit}
        />
      )}
      <Footer />
    </div>
  );
};

export default Racks;
