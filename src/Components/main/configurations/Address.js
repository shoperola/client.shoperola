import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API } from "../../../API";
import { isAutheticated } from "../../auth/authhelper";
import Footer from "../Footer";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import axios from "axios";
import swal from "sweetalert";
import ClipLoader from "react-spinners/ClipLoader";
import PhoneInput from "react-phone-number-input";

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

  const wordLimit = {
    compName: 50,
    address: 100,
    city: 50,
    pincode: 6,
    contNumber: 15,
  };

  const [wordCompName, setWordCompName] = useState(wordLimit.compName);
  const [wordAddress, setWordAddress] = useState(wordLimit.address);
  const [wordCity, setWordCity] = useState(wordLimit.city);
  const [wordPincode, setWordPincode] = useState(wordLimit.pincode);
  const [wordContNumber, setWordContNumber] = useState(wordLimit.contNumber);

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

          setWordCompName(
            wordLimit.compName - res.data.data.company_name.length
          );
          setWordAddress(wordLimit.address - res.data.data.AdminAddress.length);
          setWordCity(wordLimit.city - res.data.data.city.length);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, [token]);

  const validateEmail = (s) => {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (s.match(mailformat)) {
      return true;
    }
    return false;
  };

  const validateURL = (s) => {
    const urlFormat =
      /(http(s)?:\/\/.)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    if (s.match(urlFormat)) {
      return true;
    }
    return false;
  };

  const validatePhoneNumber = (s) => {
    const phoneValid =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    if (s.match(phoneValid)) {
      return true;
    }
    return false;
  };

  const saveHandler = () => {
    if (!validateEmail(email)) {
      alert("Please enter a valid email");
      return;
    }

    if (!validateURL(website)) {
      alert("Please enter a valid URL");
      return;
    }

    if (!validatePhoneNumber(contNumber)) {
      alert("Please enter a valid Contact Number");
      return;
    }

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

  const handleEdit = (e, type) => {
    const length = e.target.value.length;
    const value = e.target.value;

    switch (type) {
      case "compName":
        if (wordLimit.appName - length !== -1) {
          setCompName(value);
          setWordCompName(wordLimit.compName - length);
        }
        break;
      case "address":
        if (wordLimit.address - length !== -1) {
          setAddress(value);
          setWordAddress(wordLimit.address - length);
        }
        break;
      case "city":
        if (wordLimit.city - length !== -1) {
          setCity(value);
          setWordCity(wordLimit.city - length);
        }
        break;
      case "pincode":
        if (
          value === "" ||
          (!isNaN(value) && wordLimit.pincode - length !== -1)
        ) {
          setPincode(value);
          setWordPincode(wordLimit.pincode - length);
        }
        break;
      case "contNumber":
        if (wordLimit.contNumber - length !== -1) {
          setContNumber(value);
          setWordContNumber(wordLimit.contNumber - length);
        }
        break;
      default:
        console.log("Incorrect Type");
    }
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
                                onChange={(e) => handleEdit(e, "compName")}
                              />
                              <p className="pt-1 pl-2 text-secondary">
                                Remaining words : {wordCompName}
                              </p>
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
                              <textarea
                                className="form-control input-field"
                                rows="3"
                                value={address}
                                onChange={(e) => handleEdit(e, "address")}
                              ></textarea>
                              <p className="pt-1 pl-2 text-secondary">
                                Remaining words : {wordAddress}
                              </p>
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
                                onChange={(e) => handleEdit(e, "city")}
                              />
                              <p className="pt-1 pl-2 text-secondary">
                                Remaining words : {wordCity}
                              </p>
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
                                onChange={(e) => handleEdit(e, "pincode")}
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
                                type="tel"
                                className="form-control input-field"
                                value={contNumber}
                                onChange={(e) => handleEdit(e, "contNumber")}
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
