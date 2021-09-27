import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import swal from "sweetalert";
import { API } from "../../../API";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";
import { isAutheticated } from "../authhelper";

import Header from "./Header";
import Footer from "../../main/Footer";

const SetUpPage1 = () => {
  const { token } = isAutheticated();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = () => {
      axios
        .get(`${API}/api/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setEmail(res.data.data.email);
          setUrl(res.data.data.publicUrl);
        });
    };

    getData();
  }, [token]);

  const onSubmit = () => {
    if (name === "") {
      alert("Store name cannot be empty");
      return;
    }

    if (industry === "") {
      alert("Please choose a valid industry");
      return;
    }
    setLoading(true);

    axios
      .put(
        `${API}/api/user`,
        {
          store_name: name,
          industry: industry,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        history.push("/setup-page-2");
      })
      .catch((error) => {
        setLoading(false);
        alert("Saving Data failed!");
      });
  };

  return (
    <div>
      <Header />

      <div className="main-content d-inline">
        <div className="page-content">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div
                  className="
                    page-title-box
                    d-flex
                    align-items-center
                    justify-content-between
                  "
                >
                  <h4 className="mb-0">What is the name of your store?</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="javascript: void(0);">Step 1 of 3</a>
                      </li>
                    </ol>
                  </div>
                </div>
                <div
                  className="
                    page-title-box
                    d-flex
                    align-items-center
                    justify-content-between
                  "
                >
                  <p>Add a business name that is unique</p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="form-group text-right">
                  <button
                    type="button"
                    className="
                        btn btn-success btn-login
                        waves-effect waves-light
                        mr-3
                      "
                    onClick={onSubmit}
                  >
                    <ClipLoader loading={loading} size={18} />
                    {!loading && "Create Store"}
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
                            <div className="col-lg-12">
                              <div className="form-group">
                                <label
                                  for="basicpill-phoneno-input"
                                  className="label-100"
                                >
                                  Store Name
                                </label>
                                <input
                                  type="text"
                                  className="form-control input-field"
                                  value={name}
                                  placeholder="Store Name"
                                  onChange={(e) => setName(e.target.value)}
                                />
                                <label
                                  for="basicpill-phoneno-input"
                                  className="label-100"
                                >
                                  This store will be connected to {email}
                                </label>
                                <label
                                  for="basicpill-phoneno-input"
                                  className="label-100"
                                >
                                  Your site can be accessed from the URL {url}
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="form-group">
                                <label
                                  for="basicpill-phoneno-input"
                                  className="label-100"
                                >
                                  &nbsp;
                                </label>
                                <label
                                  for="basicpill-phoneno-input"
                                  className="label-100"
                                >
                                  Which industry will you be operating in?
                                </label>
                                <select
                                  name="industry"
                                  value={industry}
                                  className="form-control input-field"
                                  onChange={(e) => setIndustry(e.target.value)}
                                >
                                  <option value="">--select--</option>
                                  <option value="BEAUTY">Beauty</option>
                                  <option value="CLOTHING">Clothing</option>
                                  <option value="ELECTRONICS">
                                    Electronics
                                  </option>
                                  <option value="HANDICRAFTS">
                                    Handicrafts
                                  </option>
                                  <option value="JEWELRY">Jewelry</option>
                                  <option value="PAINTING">Painting</option>
                                  <option value="PHOTOGRAPHY">
                                    Photography
                                  </option>
                                </select>
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

export default SetUpPage1;
