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
  const [emailToSend, setEmailToSend] = useState("");
  const [updatedEmailToSend, setUpdatedEmailToSend] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const wordLimit = {
    appName: 40,
    firstName: 40,
    lastName: 40,
  };

  const [wordAppName, setWordAppName] = useState(wordLimit.appName);
  const [wordFirstName, setWordFirstName] = useState(wordLimit.firstName);
  const [wordLastName, setWordLastName] = useState(wordLimit.lastName);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`${API}/api/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res);
          setAppName(res.data.data.username);
          setFirstName(res.data.data.firstName);
          setLastName(res.data.data.lastName);
          setEmail(res.data.data.email);
          setEmailToSend(res.data.data.email_to_send);
          setUpdatedEmailToSend(res.data.data.email_to_send);

          setWordAppName(wordLimit.appName - res.data.data.username.length);
          setWordFirstName(
            wordLimit.firstName - res.data.data.firstName.length
          );
          setWordLastName(wordLimit.lastName - res.data.data.lastName.length);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, [token]);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`${API}/api/sendEmail/get_list`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res);
          setIsVerified(res.data.data);
        });
    };

    fetchData();
  }, [emailToSend]);

  const validateEmail = (s) => {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (s.match(mailformat)) {
      return true;
    }
    return false;
  };

  const sendVerification = (email) => {
    axios
      .post(
        `${API}/api/sendEmail/verify`,
        {
          email: email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const saveHandler = () => {
    console.log(emailToSend);
    if (!validateEmail(email)) {
      alert("Please enter a valid email to login");
      return;
    }

    if (!validateEmail(updatedEmailToSend)) {
      alert("Please enter a valid email to send");
      return;
    }

    setIsLoading(true);
    const formdata = new FormData();
    formdata.append("username", appName);
    formdata.append("firstName", firstName);
    formdata.append("lastName", lastName);
    formdata.append("email", email);
    formdata.append("email_to_send", updatedEmailToSend);

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
        window.location.reload();
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });

    if (updatedEmailToSend !== emailToSend) {
      sendVerification(updatedEmailToSend);
    }
  };

  const handleEdit = (e, type) => {
    const length = e.target.value.length;
    const value = e.target.value;
    switch (type) {
      case "appName":
        if (wordLimit.appName - length !== -1) {
          setAppName(value);
          setWordAppName(wordLimit.appName - length);
        }
        break;
      case "firstName":
        if (wordLimit.firstName - length !== -1) {
          setFirstName(value);
          setWordFirstName(wordLimit.firstName - length);
        }
        break;
      case "lastName":
        if (wordLimit.lastName - length !== -1) {
          setLastName(value);
          setWordLastName(wordLimit.lastName - length);
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
                <h4 className="mb-0">Profile</h4>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">Shoperola</Link>
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
                                First Name
                              </label>
                              <input
                                type="text"
                                className="form-control input-field"
                                value={firstName}
                                onChange={(e) => handleEdit(e, "firstName")}
                              />
                              <p className="pt-1 pl-2 text-secondary">
                                Remaining words : {wordFirstName}
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
                                Last Name
                              </label>
                              <input
                                type="text"
                                className="form-control input-field"
                                value={lastName}
                                onChange={(e) => handleEdit(e, "lastName")}
                              />
                              <p className="pt-1 pl-2 text-secondary">
                                Remaining words : {wordLastName}
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
                                Email to Login
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
