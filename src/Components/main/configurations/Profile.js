import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API } from "../../../API";
import { isAutheticated } from "../../auth/authhelper";
import Footer from "../Footer";
import axios from "axios";
import swal from "sweetalert";
import ClipLoader from "react-spinners/ClipLoader";

const Profile = () => {
  const { token } = isAutheticated();

  const [isLoading, setIsLoading] = useState(false);
  const [appName, setAppName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`${API}/api/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setAppName(res.data.data.username);
          setFirstName(res.data.data.firstName);
          setLastName(res.data.data.lastName);
          setEmail(res.data.data.email);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, [token]);

  const saveHandler = () => {
    const formdata = new FormData();
    formdata.append("username", appName);
    formdata.append("firstName", firstName);
    formdata.append("lastName", lastName);
    formdata.append("email", email);

    axios
      .put(`${API}/api/user`, formdata, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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

  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0">Profile</h4>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">TellyTell</Link>
                    </li>
                    <li className="breadcrumb-item active">
                      Configuration - Profile
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
                                className="label-100"
                              >
                                Application Name
                              </label>
                              <input
                                type="text"
                                className="form-control input-field"
                                value={appName}
                                onChange={(e) => setAppName(e.target.value)}
                              />
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
                                First Name
                              </label>
                              <input
                                type="text"
                                className="form-control input-field"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                              />
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
                                Last Name
                              </label>
                              <input
                                type="text"
                                className="form-control input-field"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                              />
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

export default Profile;
