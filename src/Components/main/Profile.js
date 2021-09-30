import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import axios from "axios";
import { API } from "../../API";
import { isAutheticated } from "../auth/authhelper";
import { Link } from "react-router-dom";
import { data } from "jquery";
import Featured from "./Featured";
import Footer from "./Footer";

export default function Profile() {
  const { user, token } = isAutheticated();

  const [urlSuccess, setUrlSuccess] = useState("");
  const [urlError, setUrlError] = useState("");
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    about: "",
    services: "",
    bannerImage: "",
    profession: "",
    location: "",
    fees: 0,
    picture: "",
    publicUrl: "",
    websiteLink: "",
    twitterLink: "",
    linkedinLink: "",
    facebookLink: "",
  });
  const [file, setFiles] = useState(null);
  const [newUserProfile, setNewUserProfile] = useState({});
  const [success, setSuccess] = useState(false);
  const [link, setLink] = useState({});
  //API CALL
  useEffect(() => {
    axios
      .get(`${API}/api/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data.data;
        setUserData({
          ...userData,
          firstName: response.data.data.firstName,
          lastName: data.lastName,
          profession: data.profession,
          bannerImage: data.bannerImage,
          currency: data.currency,
          picture: data.picture,
          location: data.location,
          about: data.about,
          services: data.services,
          fees: data.fees,
          publicUrl: data.publicUrl,
          linkedinLink: data.linkedinLink,
          facebookLink: data.facebookLink,
          websiteLink: data.websiteLink,
          twitterLink: data.twitterLink,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [success]);

  const onProfileChange = (e) => {
    e.preventDefault();
    const { name } = e.target;
    let value = e.target.files[0];
    setFiles(e.target.files[0]);
    setNewUserProfile(URL.createObjectURL(value));
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    setUserData({
      ...userData,
      picture: newUserProfile,
    });
    let formData = new FormData();
    formData.set("picture", file);
    // console.log(formData);
    axios
      .put(`${API}/api/user/profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // console.log(response);
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUrlChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleURLSubmit = (e) => {
    e.preventDefault();

    axios
      .put(
        `${API}/api/user`,
        {
          linkedinLink: userData.linkedinLink,
          twitterLink: userData.twitterLink,
          facebookLink: userData.facebookLink,
          websiteLink: userData.websiteLink,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setUrlSuccess("URL updated successfully!");
      })
      .catch((err) => {
        console.log(err);
        setUrlError("URL not updated!");
      });
  };

  return (
    <>
      <div
        className="modal fade"
        id="website"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content popup-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add / Edit Website
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
              <div className="form-group mt-20 mb-20">
                <label for="basicpill-phoneno-input" className="label-100">
                  Add or Edit Website Url
                </label>
                <input
                  className="form-control input-field"
                  value={userData.websiteLink}
                  name="websiteLink"
                  onChange={handleUrlChange}
                />
                <span className="text-success"> {urlSuccess}</span>
                <span className="text-danger"> {urlError}</span>
              </div>
            </div>
            <div className="modal-footer">
              <button
                onClick={handleURLSubmit}
                type="button"
                className="btn btn-primary save-btn"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="facebook"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content popup-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add / Edit Facebook
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
              <div className="form-group mt-20 mb-20">
                <label for="basicpill-phoneno-input" className="label-100">
                  Add or Edit Facebook Url
                </label>
                <input
                  className="form-control input-field"
                  value={userData.facebookLink}
                  name="facebookLink"
                  onChange={handleUrlChange}
                />
                <span className="text-success"> {urlSuccess}</span>
                <span className="text-danger"> {urlError}</span>
              </div>
            </div>
            <div className="modal-footer">
              <button
                onClick={handleURLSubmit}
                type="button"
                className="btn btn-primary save-btn"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="linkedin"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content popup-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add / Edit Linkedin
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
              <div className="form-group mt-20 mb-20">
                <label for="basicpill-phoneno-input" className="label-100">
                  Add or Edit Linkedin Url
                </label>
                <input
                  className="form-control input-field"
                  value={userData.linkedinLink}
                  name="linkedinLink"
                  onChange={handleUrlChange}
                />
                <span className="text-success"> {urlSuccess}</span>
                <span className="text-danger"> {urlError}</span>
              </div>
            </div>
            <div className="modal-footer">
              <button
                onClick={handleURLSubmit}
                type="button"
                className="btn btn-primary save-btn"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="twitter"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content popup-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add / Edit Twitter
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
              <div className="form-group mt-20 mb-20">
                <label for="basicpill-phoneno-input" className="label-100">
                  Add or Edit Twitter Url
                </label>
                <input
                  className="form-control input-field"
                  value={userData.twitterLink}
                  name="twitterLink"
                  onChange={handleUrlChange}
                />
                <span className="text-success"> {urlSuccess}</span>
                <span className="text-danger"> {urlError}</span>
              </div>
            </div>
            <div className="modal-footer">
              <button
                onClick={handleURLSubmit}
                type="button"
                className="btn btn-primary save-btn"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="website"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content popup-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add / Edit Website
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
              <div className="form-group mt-20 mb-20">
                <label for="basicpill-phoneno-input" className="label-100">
                  Add or Edit Website Url
                </label>
                <input className="form-control input-field" />
              </div>
            </div>
            <div className="modal-footer">
              <button
                onClick={handleURLSubmit}
                type="button"
                className="btn btn-primary save-btn"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="addprofileimg"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content popup-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add Profile Image
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
                      name="picture"
                      onChange={onProfileChange}
                      className="form-control"
                    />
                    <label
                      id="upload-label"
                      for="upload"
                      className="font-weight-light text-muted"
                    >
                      Add Profile Image
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
                    Please use image with size less than 3 MB and dimensions 1x1
                    ratio (200 x 200 Pixels)
                  </p>
                  <div className="image-area mt-4">
                    <img
                      id="imageResult"
                      src={newUserProfile}
                      alt=""
                      className="img-fluid rounded shadow-sm mx-auto d-block"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                onClick={handleProfileSubmit}
                type="button"
                className="btn btn-primary save-btn"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* BEGIN PAGE */}

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
                  <h4 className="mb-0">Profile</h4>

                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <Link to="/dashboard">TellyTell</Link>
                      </li>
                      <li className="breadcrumb-item active">Profile</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-body">
                    <div className="profile-area">
                      <div className="form-group text-right">
                        <Link to="/edit/profile">
                          <button
                            type="button"
                            className="btn btn-profile waves-effect waves-light"
                          >
                            Edit Profile
                          </button>
                        </Link>
                      </div>

                      <div
                        className="profile-banner"
                        style={{
                          background: `url(${userData.bannerImage})top center no-repeat`,
                          backgroundSize: "cover",
                        }}
                      >
                        <div className="media profile-konsult">
                          {/* <div className="mr-4">
                            <img
                              key={userData.picture}
                              src={userData.picture}
                              alt=""
                              className="avatar-profile"
                            />
                            <span
                              className="profile-img-upload"
                              data-toggle="modal"
                              data-target="#addprofileimg"
                            >
                              <i
                                className="fa fa-pencil-square-o"
                                aria-hidden="true"
                              ></i>
                            </span>
                          </div> */}
                          <div className="media-body align-self-center overflow-hidden">
                            <div>
                              <h5 className="text-truncate">
                                {userData.firstName} {userData.lastName}
                              </h5>
                              {/* <p className="data">
                                {userData.profession
                                  ? userData.profession
                                  : "Your designation is displayed here"}
                              </p>
                              <p className="location">
                                <i
                                  className="fa fa-map-marker"
                                  aria-hidden="true"
                                ></i>
                                {userData.location
                                  ? userData.location
                                  : "Your location is displayed here"}
                              </p> */}

                              <div className="form-group text-left m-0">
                                {/* <a href="#">
                                  <button
                                    type="button"
                                    className="
                                      btn btn-profile
                                      waves-effect waves-light
                                    "
                                  >
                                    {userData.fees != 0
                                      ? `Ask a question for $${userData.fees}`
                                      : "Add question price here"}
                                  </button>
                                </a> */}
                              </div>

                              <p className="mt-2 user-profile">
                                <i
                                  className="fa fa-user-circle"
                                  aria-hidden="true"
                                ></i>
                                {userData.publicUrl
                                  ? userData.publicUrl
                                  : "Your Public URL will come here"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="profile-data">
                        <h4>About</h4>
                        {userData.about ? (
                          <p>{userData.about}</p>
                        ) : (
                          <h6>
                            Please <Link to="/edit/profile"> click </Link> here
                            to add information
                          </h6>
                        )}
                      </div>

                      <div className="profile-data">
                        <h4>Team</h4>
                        {userData.services ? (
                          <p>{userData.services}</p>
                        ) : (
                          <h6>
                            Please <Link to="/edit/profile"> click </Link> here
                            to add information
                          </h6>
                        )}
                      </div>

                      <Featured />

                      <div className="profile-data">
                        <div className="row">
                          <div className="col-md-3">
                            <div
                              className="social-link"
                              data-toggle="modal"
                              data-target="#website"
                            >
                              <i className="fa fa-globe" aria-hidden="true"></i>
                              <br />
                              Add Website
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div
                              className="social-link"
                              data-toggle="modal"
                              data-target="#facebook"
                            >
                              <i
                                className="fa fa-address-book"
                                aria-hidden="true"
                              ></i>
                              <br />
                              Add Facebook
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div
                              className="social-link"
                              data-toggle="modal"
                              data-target="#linkedin"
                            >
                              <i
                                className="fa fa-address-book"
                                aria-hidden="true"
                              ></i>
                              <br />
                              Add Linkedin
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div
                              className="social-link"
                              data-toggle="modal"
                              data-target="#twitter"
                            >
                              <i
                                className="fa fa-address-book"
                                aria-hidden="true"
                              ></i>
                              <br />
                              Add Twitter
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
        <Footer />
      </div>
    </>
  );
}
