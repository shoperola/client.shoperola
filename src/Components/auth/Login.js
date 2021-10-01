import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import swal from "sweetalert";
import { API } from "../../API";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";
import { isAutheticated } from "./authhelper";

export default function Login() {
  const history = useHistory();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const { token } = isAutheticated();

  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: "",
  });
  if (token) {
    history.push("/dashboard");
  }

  const handleChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;

    // switch (name) {
    //   case "email":
    //     setErrors({
    //       ...errors,
    //       emailError: validEmailRegex.test(value) ? "" : "Email is not valid!",
    //     });
    //     break;
    // }

    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(`${API}/signin`, { ...user })
      .then((response) => {
        setLoading(false);
        //console.log("here the response",response);
        localStorage.setItem(
          "auth",
          JSON.stringify({
            user: user.email,
            token: response.data.token,
          })
        );
        history.push("/dashboard");
      })
      .catch((err) => {
        setLoading(false);
        let message = err.response?.data.message;
        swal({
          title: "Error",
          text: message,
          icon: "error",
          buttons: true,
          dangerMode: true,
        });
        //console.log(err.response);
      });
  };

  return (
    <div className="authentication-bg h-100">
      <div className="account-pages pt-sm-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <a
                  href="https://Shoperola.com"
                  className="mb-5 d-block auth-logo"
                >
                  <img
                    src="assets/images/logo-dark.png"
                    alt=""
                    height="25"
                    className="logo logo-dark"
                  />
                  <img
                    src="assets/images/logo-light.png"
                    alt=""
                    height="25"
                    className="logo logo-light"
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="row align-items-center justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-5">
              <div className="card">
                <div className="card-body p-4">
                  <div className="text-center mt-2">
                    <h5 className="text-primary welcome-text">
                      Welcome Back !
                    </h5>
                    <p className="text-muted">Sign In to Shoperola</p>
                  </div>
                  <div className="p-2 mt-4">
                    <form>
                      <div className="form-group">
                        <label for="username">Email</label>
                        <input
                          type="email"
                          onChange={handleChange}
                          name="email"
                          value={user.email}
                          required
                          className="form-control input-field"
                          placeholder="Enter Email ID"
                        />
                      </div>

                      <div className="form-group">
                        <label for="userpassword">Password</label>
                        <input
                          type="password"
                          value={user.password}
                          name="password"
                          onChange={handleChange}
                          required
                          className="form-control input-field"
                          placeholder="Enter password"
                        />
                      </div>

                      {/* <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="auth-remember-check"
                        />
                        <label
                          className="custom-control-label"
                          for="auth-remember-check"
                        >
                          Remember me
                        </label>
                      </div> */}

                      <div className="mt-3 text-right">
                        <a href="/dashboard">
                          <button
                            onClick={handleSubmit}
                            className="
                              btn btn-primary
                              w-sm
                              waves-effect waves-light
                            "
                          >
                            <ClipLoader
                              color="blue"
                              loading={loading}
                              size={20}
                            />
                            {!loading && "Log In"}
                          </button>
                        </a>
                      </div>
                      <div>
                        <h6>
                          Don't have an account?
                          <Link to="/register"> Register</Link>
                        </h6>
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
  );
}
