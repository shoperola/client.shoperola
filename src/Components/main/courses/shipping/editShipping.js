import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import swal from "sweetalert";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { API } from "../../../../API";
import { isAutheticated } from "../../../auth/authhelper";
import ClipLoader from "react-spinners/ClipLoader";
import Footer from "../../Footer";
function EditShipping() {
  const history = useHistory();
  const params = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [shippingName, setShippingName] = useState("");
  const [shippingDescription, setShippingDescription] = useState("");
  const [rate, setRate] = useState(0);
  const [country, setCountry] = useState("");
  const [shippingState, setShippingState] = useState("");
  const [status, setStatus] = useState("");
  const [wordsName, setWordsName] = useState(45);
  const [wordsDesc, setWordsDesc] = useState(250);
  const [wordsRate, setWordsRate] = useState(5);

  const { token } = isAutheticated();

  useEffect(() => {
    const getData = async () => {
      await axios
        .get(`${API}/api/shipment/view_shipment/${params.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const data = res.data.data;
          setShippingName(data.shipping_name);
          setShippingDescription(data.shipping_description);
          setRate(data.shipping_rate);
          setCountry(data.shipping_country);
          setShippingState(data.shipping_state);
          setStatus(data.status);
          setWordsName(45 - data.shipping_name.length);
          setWordsDesc(250 - data.shipping_description.length);
          setWordsRate(5 - data.shipping_rate.length);
        });
    };
    getData();
  }, [token, params]);

  const sumbitHandler = async () => {
    setIsLoading(true);
    const data = {
      shipping_name: shippingName,
      shipping_description: shippingDescription,
      shipping_rate: rate,
      shipping_country: country,
      shipping_state: shippingState,
      status: status,
    };
    await axios
      .patch(`${API}/api/shipment/update_shipment/${params.id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(async (res) => {
        const done = await swal({
          title: "Created Successfully!",
          icon: "success",
          buttons: {
            Done: {
              text: "Done",
              value: "Done",
            },
          },
        });
        setIsLoading(false);

        if (done === "Done") {
          history.push("/allShippings");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleNameEdit = (e) => {
    if (45 - e.target.value.length !== -1) {
      setShippingName(e.target.value);
      setWordsName(45 - e.target.value.length);
    }
  };

  const handleDesc = (e) => {
    if (250 - e.target.value.length !== -1) {
      setShippingDescription(e.target.value);
      setWordsDesc(250 - e.target.value.length);
    }
  };

  const handleRate = (e) => {
    if (
      e.target.value === "" ||
      (!isNaN(e.target.value) && 5 - e.target.value.length !== -1)
    ) {
      setRate(e.target.value);
      setWordsRate(5 - e.target.value);
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
                <h4 className="mb-0">
                  Content Management - Edit Shipping Rate
                </h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">TellyTell</Link>
                    </li>
                    <li className="breadcrumb-item">
                      Content Management - Edit Shipping Rate
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- end page title --> */}

          <div className="row">
            <div className="col-12">
              <div className="form-group text-right">
                <button
                  type="button"
                  className="btn btn-success btn-login waves-effect waves-light mr-3"
                  onClick={sumbitHandler}
                >
                  <ClipLoader loading={isLoading} size={18} />
                  {!isLoading && "Save"}
                </button>
                <Link to="/allShippings">
                  <button
                    type="button"
                    className="btn btn-success btn-cancel waves-effect waves-light mr-3"
                  >
                    Cancel
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8">
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
                                Shipping Method Name
                              </label>
                              <input
                                type="text"
                                className="form-control input-field"
                                value={shippingName}
                                onChange={handleNameEdit}
                              />
                              <p className="pt-1 pl-2 text-secondary">
                                Remaining words : {wordsName}
                              </p>
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
                                Description (Optional)
                              </label>
                              <textarea
                                className="form-control input-field"
                                rows="5"
                                value={shippingDescription}
                                onChange={handleDesc}
                              ></textarea>
                              <p className="pt-1 pl-2 text-secondary">
                                Remaining words : {wordsDesc}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group col-sm-2">
                              <label
                                for="basicpill-phoneno-input"
                                className="label-100"
                              >
                                Rate
                              </label>
                              <input
                                type="text"
                                className="form-control input-field .col-sm-*"
                                value={rate}
                                onChange={handleRate}
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
            <div className="col-lg-4">
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
                                Status
                              </label>
                              <select
                                name="currency"
                                value=""
                                className="form-control  input-field"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                              >
                                <option value="">--select--</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
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

          <div className="row">
            <div className="col-lg-8">
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
                                Select Country
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
                      </form>
                    </div>
                  </div>
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
                                Select State
                              </label>
                              <RegionDropdown
                                blankOptionLabel="No Country Selected"
                                defaultOptionLabel="All States"
                                className="form-control  input-field"
                                country={country}
                                value={shippingState}
                                disableWhenEmpty
                                onChange={(val) =>
                                  val === ""
                                    ? setShippingState("All States")
                                    : setShippingState(val)
                                }
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
        {/* <!-- container-fluid --> */}
      </div>
      {/* <!-- End Page-content --> */}

      {/* <footer className="footer">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <script>document.write(new Date().getFullYear())</script> © SHOTT.
                        </div>

                    </div>
                </div>
            </footer> */}
      <Footer />
    </div>
  );
}

export default EditShipping;
