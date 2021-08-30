import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API } from "../../../API";
import { isAutheticated } from "../../auth/authhelper";
import Footer from "../Footer";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import axios from "axios";
import swal from "sweetalert";
import ClipLoader from "react-spinners/ClipLoader";
import { set } from "lodash-es";

const Address = () => {
  const { token } = isAutheticated();

  const [isLoading, setIsLoading] = useState(false);
  const [compName, setCompName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");
  const [pincode, setPincode] = useState("");
  const [website, setWebsite] = useState("");
  const [contNumber, setContNumber] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`${API}/api/user/view_address`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setCompName(res.data.data.company_name);
          setAddress(res.data.data.AdminAddress);
          setCity(res.data.data.city);
          setRegion(res.data.data.state);
          setCountry(res.data.data.country);
          setPincode(res.data.data.pincode);
          setWebsite(res.data.data.website);
          setContNumber(res.data.data.contact_number);
          setEmail(res.data.data.email);
          setId(res.data.data._id);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, [token]);

  const saveHandler = () => {
    const formdata = new FormData();
    formdata.append("company_name", compName);
    formdata.append("AdminAddress", address);
    formdata.append("city", city);
    formdata.append("state", region);
    formdata.append("country", country);
    formdata.append("pincode", pincode);
    formdata.append("website", website);
    formdata.append("contact_number", contNumber);
    formdata.append("email", email);

    axios
      .put(
        `${API}/api/user/update_address`,
        {
          id: id,
          company_name: compName,
          AdminAddress: address,
          city: city,
          state: region,
          country: country,
          pincode: pincode,
          website: website,
          contact_number: contNumber,
          email: email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(async (res) => {
        console.log(res);
        const done = await swal({
          title: "Saved Successfully!",
          icon: "success",
          buttons: {
            Done: {
              text: "Done",
              value: "Done",
            },
          },
        });
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-">Address</h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">TellyTell</Link>
                    </li>
                    <li className="breadcrumb-item active">
                      Configuration - Address
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12 col-lg-9 col-xl-7">
                      <form>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group">
                              <label
                                for="basicpill-phoneno-input"
                                className="label-1"
                              >
                                Company Name
                              </label>
                              <input
                                type="text"
                                className="form-control input-field"
                                value={compName}
                                onChange={(e) => setCompName(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group">
                              <label
                                for="basicpill-phoneno-input"
                                className="label-1"
                              >
                                Address
                              </label>
                              <input
                                type="text"
                                className="form-control input-field"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group">
                              <label
                                for="basicpill-phoneno-input"
                                className="label-1"
                              >
                                City
                              </label>
                              <input
                                type="text"
                                className="form-control input-field"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group">
                              <label
                                for="basicpill-phoneno-input"
                                className="label-1"
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
                          <div className="col-lg-12">
                            <div className="form-group">
                              <label
                                for="basicpill-phoneno-input"
                                className="label-1"
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
                          <div className="col-lg-12">
                            <div className="form-group">
                              <label
                                for="basicpill-phoneno-input"
                                className="label-1"
                              >
                                Pincode
                              </label>
                              <input
                                type="text"
                                className="form-control input-field"
                                value={pincode}
                                onChange={(e) => {
                                  setPincode(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group">
                              <label
                                for="basicpill-phoneno-input"
                                className="label-1"
                              >
                                Website
                              </label>
                              <input
                                type="text"
                                className="form-control input-field"
                                value={website}
                                onChange={(e) => setWebsite(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group">
                              <label
                                for="basicpill-phoneno-input"
                                className="label-1"
                              >
                                Contact Number
                              </label>
                              <input
                                type="text"
                                className="form-control input-field"
                                value={contNumber}
                                onChange={(e) => setContNumber(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group">
                              <label
                                for="basicpill-phoneno-input"
                                className="label-1"
                              >
                                Email
                              </label>
                              <input
                                type="text"
                                className="form-control input-field"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group text-left">
                              <button
                                type="button"
                                className="btn btn-success btn-login waves-effect waves-light mr-3"
                                onClick={saveHandler}
                              >
                                <ClipLoader loading={isLoading} size={18} />
                                {!isLoading && "Save"}
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
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Address;
