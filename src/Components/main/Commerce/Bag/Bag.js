import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../../../../API";
import { isAutheticated } from "../../../auth/authhelper";
import Footer from "../../Footer";
import getSymbolFromCurrency from "currency-symbol-map";

function Bag(props) {
  const { token } = isAutheticated();
  const [includeBags, setIncludeBags] = useState("No");
  const [paid, setPaid] = useState("Free");
  const [price, setPrice] = useState(0);
  const [currency, setCurrency] = useState("$");

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

  // useEffect(() => {
  //   const fetchData = () => {
  //     axios
  //       .get(`${API}/api/user`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //       .then((res) => {
  //         setTotalData(res.data.data);
  //       });
  //   };

  //   fetchData();
  // }, [token]);

  useEffect(() => {
    if (includeBags === "No") {
      setPaid("Free");
      setPrice(0);
    }
  }, [includeBags]);

  const onSave = () => {
    const data = {
      dispensebag: includeBags,
      dispensecharge: paid,
      dispensepaid: price,
    };
  };

  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          {/* <!-- start page title --> */}
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0">Commerce - Bag</h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">Shoperola</Link>
                    </li>
                    <li className="breadcrumb-item">Commerce - Bag</li>
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
                  <form>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="form-group">
                          <label
                            for="basicpill-phoneno-input"
                            className="label-1"
                          >
                            Dispense Bag for every order?
                          </label>
                          <div className="col-md-8">
                            <div className="custom-control custom-radio mb-2">
                              <input
                                type="radio"
                                className="custom-control-input"
                                checked={includeBags === "Yes"}
                                onClick={() => setIncludeBags("Yes")}
                              />
                              <label
                                className="custom-control-label"
                                for="age1"
                                onClick={() => setIncludeBags("Yes")}
                              >
                                Yes
                              </label>
                            </div>

                            <div className="custom-control custom-radio mb-2">
                              <input
                                type="radio"
                                className="custom-control-input"
                                checked={includeBags === "No"}
                                onClick={() => setIncludeBags("No")}
                              />
                              <label
                                className="custom-control-label"
                                for="age2"
                                onClick={() => setIncludeBags("No")}
                              >
                                No
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {includeBags === "Yes" && (
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label
                              for="basicpill-phoneno-input"
                              className="label-1"
                            >
                              Should the bags to be dispensed be free or paid?
                            </label>
                            <div className="col-md-8">
                              <div className="custom-control custom-radio mb-2">
                                <input
                                  type="radio"
                                  className="custom-control-input"
                                  checked={paid === "Free"}
                                  onClick={() => setPaid("Free")}
                                />
                                <label
                                  className="custom-control-label"
                                  for="age1"
                                  onClick={() => setPaid("Free")}
                                >
                                  Free
                                </label>
                              </div>

                              <div className="custom-control custom-radio mb-2">
                                <input
                                  type="radio"
                                  className="custom-control-input"
                                  checked={paid === "Paid"}
                                  onClick={() => setPaid("Paid")}
                                />
                                <label
                                  className="custom-control-label"
                                  for="age2"
                                  onClick={() => setPaid("Paid")}
                                >
                                  Paid
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {paid === "Paid" && (
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label
                              for="basicpill-phoneno-input"
                              className="label-1"
                            >
                              Enter the Price
                            </label>
                            <div class="input-group has-validation">
                              <div className="input-group">
                                <div className="input-group-prepend">
                                  <span className="input-group-text">
                                    {currency
                                      ? getSymbolFromCurrency(currency)
                                      : "$"}
                                  </span>
                                </div>
                                <input
                                  type="number"
                                  onChange={(e) => setPrice(e.target.value)}
                                  value={price}
                                  min="0.00"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="row">
                      <div className="col-lg-12">
                        <div className="form-group text-left">
                          <button
                            type="button"
                            className="btn btn-success btn-login waves-effect waves-light mr-3"
                            // onClick={saveHandler}
                          >
                            {/* <ClipLoader loading={isLoading} size={18} /> */}
                            {/* {!isLoading && "Save"} */}
                            Save
                          </button>
                          <button
                            type="button"
                            className="btn btn-success btn-cancel waves-effect waves-light mr-3"
                            onClick={() => window.location.reload()}
                          >
                            Cancel
                          </button>
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
      <Footer />
    </div>
  );
}

export default Bag;
