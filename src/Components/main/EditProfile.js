import React, { useState, useEffect, useRef } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import swal from "sweetalert";

import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import { isAutheticated } from "../auth/authhelper";
import $ from "jquery";
import Footer from "./Footer";
export default function EditProfile() {
  const { token, user } = isAutheticated();
  // const { data, setData } = useState({});
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    about: "Hello I am about",
    services: "",
    bannerImage: "",
    profession: "",
    location: "",
    fees: 10,
    username: "",
  });

  const [formData, setFormData] = useState(new FormData());
  const [loading, setLoading] = useState(false);
  const [sucess, setSucess] = useState(false);
  const [aboutChars, setAboutChars] = useState(0);
  const [servicesChars, setServicesChars] = useState(0);
  const MAX_CHARS = 500;
  useEffect(() => {
    // $("#summernote").summernote();

    axios
      .get("https://mantur-server.herokuapp.com/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        const userdata = response.data.data;
        setData({
          ...data,
          firstName: userdata.firstName,
          lastName: userdata.lastName,
          picture: userdata.picture,
          username: userdata.username,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [sucess]);

  const handleChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    if (name == "bannerImage") {
      console.log(e.target.files);
      setData({ ...data, bannerImage: URL.createObjectURL(e.target.files[0]) });
      formData.set(name, e.target.files[0]);
    } else if (name == "currency") {
      let settings = {
        currency: value,
        country: "",
      };
      setData({
        ...data,
        settings: settings,
      });
      formData.set(settings, settings);
    } else {
      console.log(name + "  " + value);
      setData({ ...data, [name]: value });
      formData.set(name, value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData.location);
    setLoading(true);
    axios
      .put("https://mantur-server.herokuapp.com/api/user", formData, {
        headers: {
          "content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setLoading(false);
        setSucess(true);
        swal({
          title: "Updated Successfully!",
          text: "",
          icon: "success",
          buttons: true,
          dangerMode: false,
        }).then(() => {
          window.location.reload();
        });
      })

      .catch((err) => {
        setLoading(false);
        swal({
          title: "Not updated successfully",
          text: err.response.data.message,
          icon: "error",
          buttons: true,
          dangerMode: true,
        });
        console.log(err.response.data);
      });
  };
  return (
    <>
      <div
        className="modal fade"
        id="addbanner"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content popup-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add banner / Video
              </h5>
              <button
                type="button"
                className="close close-b"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span>x</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-lg-12 mx-auto">
                  <div className="input-group mb-3 px-2 py-1 bg-white file-upload-bdr">
                    <input
                      id="upload"
                      type="file"
                      onchange="readURL(this);"
                      className="form-control"
                    />
                    <label
                      id="upload-label"
                      for="upload"
                      className="font-weight-light text-muted"
                    >
                      Fuatured Image
                    </label>
                    <div className="input-group-append">
                      <label
                        for="upload"
                        className="btn btn-light m-0 rounded-pill px-4"
                      >
                        <i className="fa fa-cloud-upload mr-2 text-muted"></i>
                        <small className="text-uppercase font-weight-bold text-muted">
                          Choose Image
                        </small>
                      </label>
                    </div>
                  </div>

                  <p className="error font-size-12">
                    Please use image with size less than 3 MB and dimensions 4x3
                    ratio (450 x 320 Pixels)
                  </p>
                  <div className="image-area mt-4">
                    <img
                      id="imageResult"
                      src="#/"
                      alt=""
                      className="img-fluid rounded shadow-sm mx-auto d-block"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary save-btn">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <div id="layout-wrapper">
        <Header />
        <Sidebar />
        
      </div> */}
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
                  <h4 className="mb-0">Edit Profile</h4>

                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="javascript: void(0);">TellyTell</a>
                      </li>
                      <li className="breadcrumb-item">Profile</li>
                      <li className="breadcrumb-item active">Edit Profile</li>
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
                      <div className="col-md-12 col-lg-6 col-xl-6">
                        <h1 className="text-left head-small">
                          Profile Settings
                        </h1>

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
                                  className="form-control input-field"
                                  name="firstName"
                                  onChange={handleChange}
                                  value={data.firstName}
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
                                  className="form-control input-field"
                                  name="lastName"
                                  onChange={handleChange}
                                  value={data.lastName}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-lg-12">
                              <div className="form-group">
                                {/* <label
                                  for="basicpill-phoneno-input"
                                  className="label-100"
                                >
                                  Profession
                                </label>
                                <input
                                  className="form-control input-field"
                                  value={data.profession}
                                  onChange={handleChange}
                                  name="profession"
                                /> */}
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-lg-12">
                              <div className="form-group">
                                {/* <label
                                  for="basicpill-phoneno-input"
                                  className="label-100"
                                >
                                  Address
                                </label>
                                <input
                                  className="form-control input-field"
                                  name="location"
                                  value={data.location}
                                  onChange={handleChange}
                                  placeholder="Massachusetts, United States"
                                /> */}
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-lg-12 mx-auto mb-20">
                              <label
                                for="basicpill-phoneno-input"
                                className="label-100"
                              >
                                Upoad Banner Image / Video
                              </label>
                              <div
                                className="
                                  input-group
                                  mb-3
                                  px-2
                                  py-1
                                  bg-white
                                  file-upload-bdr
                                "
                              >
                                {console.log(data)}
                                <input
                                  id="upload"
                                  type="file"
                                  name="bannerImage"
                                  onChange={handleChange}
                                  className="form-control"
                                />
                                <label
                                  id="upload-label"
                                  for="upload"
                                  className="font-weight-light text-muted"
                                ></label>
                                <div className="input-group-append">
                                  <label
                                    for="upload"
                                    className="btn btn-light m-0 rounded-pill px-4"
                                  >
                                    <i className="fa fa-cloud-upload mr-2 text-muted"></i>
                                    <small
                                      className="
                                        text-uppercase
                                        font-weight-bold
                                        text-muted
                                      "
                                    >
                                      Upoad Banner Image / Video
                                    </small>
                                  </label>
                                </div>
                              </div>

                              <p className="error font-size-12">
                                Please use image with size less than 3 MB and
                                dimensions (1920 x 600 Pixels)
                              </p>
                              <div className="image-area mt-4">
                                <img
                                  id="imageResult"
                                  src={
                                    data.bannerImage ? data.bannerImage : "#"
                                  }
                                  alt=""
                                  className="
                                    img-fluid
                                    rounded
                                    shadow-sm
                                    mx-auto
                                    d-block
                                  "
                                />
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-lg-12">
                              <div className="form-group">
                                {/* <label
                                  for="basicpill-phoneno-input"
                                  className="label-100"
                                >
                                  Asking Question Price
                                </label>
                                <input
                                  className="form-control input-field"
                                  name="fees"
                                  type="number"
                                  value={data.fees}
                                  onChange={handleChange}
                                /> */}
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
                                  Public URL
                                </label>
                                <div className="input-group mb-3">
                                  <div className="input-group-prepend">
                                    <span
                                      className="input-group-text"
                                      id="basic-addon3"
                                    >
                                     https://kourse-53d4f.web.app/#/public
                                    </span>
                                  </div>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    onChange={handleChange}
                                    value={data.username}
                                    id="basic-url"
                                    aria-describedby="basic-addon3"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="row">
                                <div className="col-lg-12">
                                  <div className="form-group">
                                    <label
                                      for="basicpill-phoneno-input"
                                      className="label-100"
                                    >
                                      About
                                    </label>

                                    <textarea
                                      id="textarea"
                                      className="form-control"
                                      name="about"
                                      onChange={(e) => {
                                        handleChange(e);
                                        let temp = e.target.value.length;

                                        setAboutChars(500 - temp);
                                      }}
                                      value={data.about}
                                      maxlength="500"
                                      rows="4"
                                      placeholder="This textarea has a limit of 225 chars."
                                    ></textarea>
                                    <span className="text-danger">
                                      {aboutChars != 0 &&
                                        `${aboutChars} characters are left`}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-lg-12">
                              <div className="row">
                                <div className="col-lg-12">
                                  <div className="form-group">
                                    <label
                                      for="basicpill-phoneno-input"
                                      className="label-100"
                                    >
                                      Team
                                    </label>
                                    <textarea
                                      id="textarea"
                                      className="form-control"
                                      name="services"
                                      onChange={(e) => {
                                        handleChange(e);
                                        let temp = e.target.value.length;

                                        setServicesChars(500 - temp);
                                      }}
                                      value={data.services}
                                      maxlength="225"
                                      rows="4"
                                      placeholder="This textarea has a limit of 225 chars."
                                    ></textarea>
                                    <span className="text-danger">
                                      {servicesChars != 0 &&
                                        `${servicesChars} characters are left`}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-lg-12">
                              <div className="form-group text-left">
                                <a href="/dashboard">
                                  <button
                                    onClick={handleSubmit}
                                    type="button"
                                    className="
                                      btn btn-success btn-login
                                      waves-effect waves-light
                                      mr-3
                                    "
                                  >
                                    <ClipLoader
                                      color="blue"
                                      loading={loading}
                                      size={20}
                                    />
                                    {!loading && " Update"}
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

        {/* <footer className="footer">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12">
                <script>document.write(new Date().getFullYear());</script>©
                TellyTell.
              </div>
            </div>
          </div>
        </footer> */}
        <Footer/>
      </div>
    </>
  );
}

// https://shott.sfo3.digitaloceanspaces.com/bannerImage-693e9af84d3dfcc71e640e005bdc5e2e.jpg
// https://shott.sfo3.digitaloceanspaces.com/bannerImage-693e9af84d3dfcc71e640e005bdc5e2e.jpg
