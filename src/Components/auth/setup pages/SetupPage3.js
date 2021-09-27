import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import swal from "sweetalert";
import { API } from "../../../API";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";
import { isAutheticated } from "../authhelper";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";

import Header from "./Header";
import Footer from "../../main/Footer";

const SetUpPage3 = () => {
  const { token } = isAutheticated();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [creditCard, setCreditCard] = useState("");
  const [date, setDate] = useState("");
  const [cvv, setCvv] = useState("");

  const onSave = () => {
    axios
      .put(
        `${API}/api/user`,
        {
          name_on_card: name,
          card_number: creditCard,
          expiry: date,
          cvv: cvv,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(async (res) => {
        setIsLoading(false);
        history.push("/dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    switch (name) {
      case "name":
        setName(value);
        break;
      case "creditCard":
        setCreditCard(value);
        break;
      case "date":
        setDate(value);
        break;
      case "cvv":
        setCvv(value);
        break;
      default:
        console.log("Please enter a correct value");
    }
  };

  return (
    <div>
      <Header />

      <div className="main-content d-inline">
        <div className="page-content">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">Validate your payment method</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="javascript: void(0);">Step 3 of 3</a>
                      </li>
                    </ol>
                  </div>
                </div>
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <p>
                    We will deduct a small amount to validate your payment
                    method.
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="form-group text-right">
                  <button
                    type="button"
                    className="btn btn-success btn-login waves-effect waves-light mr-3"
                    onClick={onSave}
                  >
                    <ClipLoader loading={isLoading} size={18} />
                    {!isLoading && "Validate Now"}
                  </button>
                  <Link to="/dashboard">
                    <button
                      type="button"
                      className="btn btn-success btn-cancel waves-effect waves-light mr-3"
                    >
                      Skip
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-12">
                        <form>
                          <div className="row">
                            <div className="col-lg-4">
                              <div className="form-group">
                                <label
                                  for="basicpill-phoneno-input"
                                  className="label-100"
                                >
                                  Name
                                </label>
                                <input
                                  type="text"
                                  className="form-control input-field"
                                  name="name"
                                  value={name}
                                  onChange={editHandler}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-lg-4">
                              <div className="form-group">
                                <label
                                  for="basicpill-phoneno-input"
                                  className="label-100"
                                >
                                  Credit Card Number
                                </label>
                                <input
                                  type="text"
                                  className="form-control input-field"
                                  name="creditCard"
                                  value={creditCard}
                                  onChange={editHandler}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-lg-2">
                              <div className="form-group">
                                <label
                                  for="basicpill-phoneno-input"
                                  className="label-100"
                                >
                                  Expiry Date
                                </label>
                                <input
                                  type="month"
                                  className="form-control input-field"
                                  value={date}
                                  name="date"
                                  onChange={editHandler}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-lg-1">
                              <div className="form-group">
                                <label
                                  for="basicpill-phoneno-input"
                                  className="label-100"
                                >
                                  CVV Number
                                </label>
                                <input
                                  type="text"
                                  className="form-control input-field"
                                  name="cvv"
                                  value={cvv}
                                  onChange={editHandler}
                                />
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
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SetUpPage3;
