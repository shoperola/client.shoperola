import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import swal from "sweetalert";
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
      .post("https://mantur-server.herokuapp.com/signin", { ...user })
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
    <div class="authentication-bg h-100">
      <div class="account-pages pt-sm-5">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="text-center">
                <a href="https://tellytell.com" class="mb-5 d-block auth-logo">
                  <img
                    src="assets/images/logo-dark.png"
                    alt=""
                    height="25"
                    class="logo logo-dark"
                  />
                  <img
                    src="assets/images/logo-light.png"
                    alt=""
                    height="25"
                    class="logo logo-light"
                  />
                </a>
              </div>
            </div>
          </div>
          <div class="row align-items-center justify-content-center">
            <div class="col-md-8 col-lg-6 col-xl-5">
              <div class="card">
                <div class="card-body p-4">
                  <div class="text-center mt-2">
                    <h5 class="text-primary welcome-text">Welcome Back !</h5>
                    <p class="text-muted">Sign In to TellyTell</p>
                  </div>
                  <div class="p-2 mt-4">
                    <form>
                      <div class="form-group">
                        <label for="username">Email</label>
                        <input
                          type="email"
                          onChange={handleChange}
                          name="email"
                          value={user.email}
                          required
                          class="form-control input-field"
                          placeholder="Enter Email ID"
                        />
                      </div>

                      <div class="form-group">
                        <label for="userpassword">Password</label>
                        <input
                          type="password"
                          value={user.password}
                          name="password"
                          onChange={handleChange}
                          required
                          class="form-control input-field"
                          placeholder="Enter password"
                        />
                      </div>

                      {/* <div class="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          class="custom-control-input"
                          id="auth-remember-check"
                        />
                        <label
                          class="custom-control-label"
                          for="auth-remember-check"
                        >
                          Remember me
                        </label>
                      </div> */}

                      <div class="mt-3 text-right">
                        <a href="/dashboard">
                          <button
                            onClick={handleSubmit}
                            class="
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
