import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import axios from "axios";
import swal from "sweetalert";
import { API } from "../../API";
import { isAutheticated } from "../auth/authhelper";

export default function ChangePassword() {
  const validPasswordRegex = RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{7,}$/
  );

  const [error, setError] = useState("");

  const { token, user } = isAutheticated();
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    if (name == "newPassword") {
      setError(
        validPasswordRegex.test(value)
          ? ""
          : "Password Shoud Be 8 Characters Long, Atleast One Uppercase, Atleast One Lowercase, Atleast One Digit, Atleast One Special Character"
      );
    }

    setPasswords({ ...passwords, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      passwords.newPassword.toLowerCase() !==
      passwords.confirmPassword.toLowerCase()
    ) {
      swal({
        title: "Error",
        text: "password and confirmed password does not match",
        icon: "error",
        buttons: true,
        dangerMode: true,
      });
    } else {
      axios
        .post(
          `${API}/api/user/password`,
          {
            oldPassword: passwords.oldPassword,
            newPassword: passwords.newPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          swal({
            title: "Password Updated Successfully!",
            text: "",
            icon: "success",
            buttons: true,
            dangerMode: false,
          });
          setPasswords({
            ...passwords,
            newPassword: "",
            oldPassword: "",
            confirmPassword: "",
          });
        })
        .catch((err) => {
          swal({
            title: "Password Not Updated!",
            text: `${err.response.data.message}`,
            icon: "error",
            buttons: true,
            dangerMode: true,
          });
        });
    }
  };

  return (
    // <div id="layout-wrapper">
    //   <Header />
    //   <Sidebar />

    // </div>
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
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
                <h4 className="mb-0">Change Password</h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <a href="javascript: void(0);">Shoperola</a>
                    </li>
                    <li className="breadcrumb-item active">Change Password</li>
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
                    <div className="col-lg-12">
                      <div className="card">
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-12 col-lg-6 col-xl-6">
                              <h1 className="text-left head-small">
                                Update Password
                              </h1>

                              <form>
                                <div className="row">
                                  <div className="col-lg-12">
                                    <div className="form-group">
                                      <label
                                        for="basicpill-phoneno-input"
                                        className="label-100"
                                      >
                                        Old Password
                                      </label>
                                      <input
                                        type="password"
                                        name="oldPassword"
                                        onChange={handleChange}
                                        required
                                        className="form-control input-field"
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
                                        New Password
                                      </label>
                                      <input
                                        name="newPassword"
                                        value={passwords.newPassword}
                                        onChange={handleChange}
                                        type="password"
                                        required
                                        className="form-control input-field"
                                      />

                                      <span classNameName="text-danger">
                                        {error}
                                      </span>
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
                                        Confirm Password
                                      </label>
                                      <input
                                        type="password"
                                        value={passwords.confirmPassword}
                                        name="confirmPassword"
                                        onChange={handleChange}
                                        className="form-control input-field"
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="row">
                                  <div className="col-lg-12">
                                    <div className="form-group text-left">
                                      <a href="/dashboard">
                                        <button
                                          onClick={handleSubmit}
                                          disabled={
                                            !passwords.newPassword.length ||
                                            error.length
                                              ? true
                                              : false
                                          }
                                          type="button"
                                          className="
                                              btn btn-success btn-login
                                              waves-effect waves-light
                                              mr-3
                                            "
                                        >
                                          Save
                                        </button>
                                      </a>
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
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <script>document.write(new Date().getFullYear());</script>©
              Shoperola.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
