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

const SetUpPage2 = () => {
  const { token } = isAutheticated();
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);
  const [compName, setCompName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");
  const [pincode, setPincode] = useState("");
  const [contNumber, setContNumber] = useState("");

  const validatePhoneNumber = (s) => {
    const phoneValid =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    if (s.match(phoneValid)) {
      return true;
    }
    return false;
  };

  const onSave = () => {
    if (!validatePhoneNumber(contNumber)) {
      alert("Please check contact number");
      return;
    }

    axios
      .put(
        `${API}/api/user/update_address`,
        {
          company_name: compName,
          AdminAddress: address,
          city: city,
          state: region,
          country: country,
          pincode: pincode,
          contact_number: contNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(async (res) => {
        setIsLoading(false);
        history.push("/setup-page-3");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = (e, type) => {
    const length = e.target.value.length;
    const value = e.target.value;

    switch (type) {
      case "compName":
        setCompName(value);
        break;
      case "address":
        setAddress(value);

        break;
      case "city":
        setCity(value);

        break;
      case "pincode":
        if (value === "" || !isNaN(value)) {
          setPincode(value);
        }
        break;
      case "contNumber":
        setContNumber(value);

        break;
      default:
        console.log("Incorrect Type");
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
                  <h4 className="mb-0">Add an address so you can get paid</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="javascript: void(0);">Step 2 of 3</a>
                      </li>
                    </ol>
                  </div>
                </div>
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <p>
                    This will be used as your default business address. You can
                    always change this later.
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
                    {!isLoading && "Save and Proceed"}
                  </button>
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
                            <div className="col-lg-6">
                              <div className="form-group">
                                <label
                                  for="basicpill-phoneno-input"
                                  className="label-100"
                                >
                                  Company Name
                                </label>
                                <input
                                  type="text"
                                  className="form-control input-field"
                                  value={compName}
                                  onChange={(e) => handleEdit(e, "compName")}
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
                                  Country
                                </label>
                                <CountryDropdown
                                  defaultOptionLabel="Select Country"
                                  className="form-control  input-field"
                                  value={country}
                                  onChange={(val) => setCountry(val)}
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
                                  State
                                </label>
                                <RegionDropdown
                                  blankOptionLabel="No Country Selected"
                                  className="form-control  input-field"
                                  country={country}
                                  value={region}
                                  disableWhenEmpty
                                  onChange={(val) => setRegion(val)}
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
                                  City
                                </label>
                                <input
                                  type="text"
                                  className="form-control input-field"
                                  value={city}
                                  onChange={(e) => handleEdit(e, "city")}
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
                                  Address
                                </label>
                                <textarea
                                  className="form-control input-field"
                                  rows="5"
                                  value={address}
                                  onChange={(e) => handleEdit(e, "address")}
                                ></textarea>
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
                                  Pincode
                                </label>
                                <input
                                  type="text"
                                  className="form-control input-field"
                                  value={pincode}
                                  onChange={(e) => handleEdit(e, "pincode")}
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
                                  Contact Number
                                </label>
                                <input
                                  type="text"
                                  className="form-control input-field"
                                  value={contNumber}
                                  onChange={(e) => {
                                    handleEdit(e, "contNumber");
                                  }}
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

export default SetUpPage2;
