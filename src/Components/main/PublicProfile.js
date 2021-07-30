import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Featured from "./Featured";
import axios from "axios";
import { API } from "../../API";
import { isAutheticated } from "../auth/authhelper";
import Header from "./Header";
import Sidebar from "./Sidebar";


export default function Profile(props){
    // const { user, token } = isAutheticated();
    const {match}=props;
    const [once,setOnce]=useState(false);
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        about: "",
        services: "",
        featured:[],
        bannerImage: "",
        profession: "",
        location: "",
        fees: 0,
        feesPerMonth:0,
        feesPerYear:0,
        picture: "",
        publicUrl: "",
        websiteLink: "",
        twitterLink: "",
        linkedinLink: "",
        facebookLink: "",
      });
        useEffect(() => {
            axios
              .get(`${API}/profile/${match.params.username}`)
              .then((response) => {
                console.log("public url",response.data.data);
                const data = response.data.data;
                localStorage.setItem(
                  "client_info_id",
                  data._id
                );
                localStorage.setItem(
                  "client_info_usename",
                  data.username
                );
                localStorage.setItem(
                  "client_info",
                   JSON.stringify(data)
                );
                setUserData({
                  ...userData,
                  firstName: response.data.data.firstName,
                  lastName: data.lastName,
                  profession: data.profession,
                  bannerImage: data.bannerImage,
                  currency: data.currency,
                  picture: data.picture,
                  location: data.location,
                  featured:data.featured,
                  about: data.about,
                  feesPerMonth:data.feesPerMonth,
                  feesPerYear:data.feesPerYear,
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
          },[once]);
         // setOnce(true);
      console.log('userdara',userData);
      
    return (
        <>
      <div
        class="modal fade"
        id="website"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content popup-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Add / Edit Website
              </h5>
              <button
                type="button"
                class="close close-b"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span>x</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="form-group mt-20 mb-20">
                <label for="basicpill-phoneno-input" class="label-100">
                  Add or Edit Website Url
                </label>
                {/* <input
                  class="form-control input-field"
                  value={userData.websiteLink}
                  name="websiteLink"
                  onChange={handleUrlChange}
                /> */}
                {/* <span className="text-success"> {urlSuccess}</span>
                <span className="text-danger"> {urlError}</span> */}
              </div>
            </div>
            <div class="modal-footer">
              {/* <button
                on
                click={handleURLSubmit}
                type="button"
                class="btn btn-primary save-btn"
              >
                Save
              </button> */}
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal fade"
        id="facebook"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content popup-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Add / Edit Facebook
              </h5>
              <button
                type="button"
                class="close close-b"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span>x</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="form-group mt-20 mb-20">
                <label for="basicpill-phoneno-input" class="label-100">
                  Add or Edit Facebook Url
                </label>
                {/* <input
                  class="form-control input-field"
                  value={userData.facebookLink}
                  name="facebookLink"
                  onChange={handleUrlChange}
                />
                <span className="text-success"> {urlSuccess}</span>
                <span className="text-danger"> {urlError}</span> */}
              </div>
            </div>
            <div class="modal-footer">
              {/* <button
                on
                click={handleURLSubmit}
                type="button"
                class="btn btn-primary save-btn"
              >
                Save
              </button> */}
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal fade"
        id="linkedin"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content popup-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Add / Edit Linkedin
              </h5>
              {/* <button
                type="button"
                class="close close-b"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span>x</span>
              </button> */}
            </div>
            <div class="modal-body">
              <div class="form-group mt-20 mb-20">
                <label for="basicpill-phoneno-input" class="label-100">
                  Add or Edit Linkedin Url
                </label>
                {/* <input
                  class="form-control input-field"
                  value={userData.linkedinLink}
                  name="linkedinLink"
                  onChange={handleUrlChange}
                />
                <span className="text-success"> {urlSuccess}</span>
                <span className="text-danger"> {urlError}</span> */}
              </div>
            </div>
            <div class="modal-footer">
              {/* <button
                on
                click={handleURLSubmit}
                type="button"
                class="btn btn-primary save-btn"
              >
                Save
              </button> */}
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal fade"
        id="twitter"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content popup-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Add / Edit Twitter
              </h5>
              <button
                type="button"
                class="close close-b"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span>x</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="form-group mt-20 mb-20">
                <label for="basicpill-phoneno-input" class="label-100">
                  Add or Edit Twitter Url
                </label>
                {/* <input
                  class="form-control input-field"
                  value={userData.twitterLink}
                  name="twitterLink"
                  onChange={handleUrlChange}
                /> */}
                {/* <span className="text-success"> {urlSuccess}</span>
                <span className="text-danger"> {urlError}</span> */}
              </div>
            </div>
            <div class="modal-footer">
              {/* <button
                on
                click={handleURLSubmit}
                type="button"
                class="btn btn-primary save-btn"
              >
                Save
              </button> */}
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal fade"
        id="website"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content popup-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Add / Edit Website
              </h5>
              {/* <button
                type="button"
                class="close close-b"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span>x</span>
              </button> */}
            </div>
            <div class="modal-body">
              <div class="form-group mt-20 mb-20">
                <label for="basicpill-phoneno-input" class="label-100">
                  Add or Edit Website Url
                </label>
                {/* <input class="form-control input-field" /> */}
              </div>
            </div>
            <div class="modal-footer">
              {/* <button
                on
                click={handleURLSubmit}
                type="button"
                class="btn btn-primary save-btn"
              >
                Save
              </button> */}
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal fade"
        id="addprofileimg"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content popup-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Add Profile Image
              </h5>
              {/* <button
                type="button"
                class="close close-b"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span>x</span>
              </button> */}
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-lg-12 mx-auto">
                  <div class="input-group mb-3 px-2 py-1 bg-white file-upload-bdr">
                    {/* <input
                      id="upload"
                      type="file"
                      name="picture"
                      onChange={onProfileChange}
                      class="form-control"
                    /> */}
                    <label
                      id="upload-label"
                      for="upload"
                      class="font-weight-light text-muted"
                    >
                      Add Profile Image
                    </label>
                    <div class="input-group-append">
                      <label
                        for="upload"
                        class="btn btn-light m-0 rounded-pill px-4"
                      >
                        <i class="fa fa-cloud-upload mr-2 text-muted"></i>
                        <small class="text-uppercase font-weight-bold text-muted">
                          Choose Image
                        </small>
                      </label>
                    </div>
                  </div>

                  <p class="error font-size-12">
                    Please use image with size less than 3 MB and dimensions 1x1
                    ratio (200 x 200 Pixels)
                  </p>
                  <div class="image-area mt-4">
                    {/* <img
                      id="imageResult"
                      src={newUserProfile}
                      alt=""
                      class="img-fluid rounded shadow-sm mx-auto d-block"
                    /> */}
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              {/* <button
                onClick={handleProfileSubmit}
                type="button"
                class="btn btn-primary save-btn"
              >
                Save
              </button> */}
            </div>
          </div>
        </div>
      </div>

      {/* BEGIN PAGE */}

      {/* <div id="layout-wrapper">
        <Header />
        <Sidebar />
        
      </div> */}
      <div class="main-content">
        <div class="public-page-content">
          {/* <div className="col-12" style={{display:"flex",flexDirection:"row-reverse",backgroundColor:"#75a2eb"}}> 
          <div style={{margin:"3px 5vw 3px 3vw",fontSize: "xx-large"}}><Link>Sign Un</Link></div>
          <div style={{margin:"3px",fontSize: "xx-large"}}><Link>Sign In</Link></div>
          </div> */}
          <div class="container-fluid" style={{backgroundColor:"#e4e8ed"}}>
          <div className="col-12" style={{display:"flex",flexDirection:"row-reverse"}}> 
          <div style={{margin:"3px 3vw 3px 3vw",fontSize: "xx-large"}}><Link to="/register/cognito">Sign Up</Link></div>
          <div style={{margin:"3px 3vw 3px 3vw",fontSize: "xx-large"}}><Link to="/sign/cognito">Sign In</Link></div>
          <div style={{margin:"3px",fontSize: "xx-large"}}><Link to="/subscription">Subscribe</Link></div>
          </div>
            <div class="row">
              <div class="col-12">
                <div
                  class="
                    page-title-box
                    d-flex
                    align-items-center
                    justify-content-between
                  "
                >
                  {/* <h4 class="mb-0">Profile</h4> */}

                  {/* <div class="page-title-right">
                    <ol class="breadcrumb m-0">
                      <li class="breadcrumb-item">
                        <a href="javascript: void(0);">Konsult</a>
                      </li>
                      <li class="breadcrumb-item active">Profile</li>
                    </ol>
                  </div> */}
                </div>
              </div>
            </div>

            <div className="row" style={{backgroundColor:"#e4e8ed"}}>
              <div class="col-lg-12">
                <div class="card">
                  <div class="card-body" style={{backgroundColor:"#b1b3b5"}}>  {/*main bosy here*/}
                    <div class="profile-area">
                      <div class="form-group text-right">
                        {/* <Link to="/edit/profile">
                          <button
                            type="button"
                            class="btn btn-profile waves-effect waves-light"
                          >
                            Edit Profile
                          </button>
                        </Link> */}
                      </div>

                      <div
                        class="profile-banner"
                        style={{
                          background: `url(${userData.bannerImage})top center no-repeat`,
                          backgroundSize: "cover",
                        }}
                      >
                        <div class="media profile-konsult">
                          <div class="mr-4">
                            <img
                              key={userData.picture}
                              src={userData.picture}
                              alt=""
                              className="avatar-profile"
                            />
                            {/* <span
                              class="profile-img-upload"
                              data-toggle="modal"
                              data-target="#addprofileimg"
                            >
                              <i
                                class="fa fa-pencil-square-o"
                                aria-hidden="true"
                              ></i>
                            </span> */}
                          </div>
                          <div class="media-body align-self-center overflow-hidden">
                            <div>
                              <h5 class="text-truncate">
                                {userData.firstName} {userData.lastName}
                              </h5>
                              <p class="data">
                                {userData.profession
                                  ? userData.profession
                                  : "Your designation is displayed here"}
                              </p>
                              <p class="location">
                                <i
                                  class="fa fa-map-marker"
                                  aria-hidden="true"
                                ></i>
                                {userData.location
                                  ? userData.location
                                  : "Your location is displayed here"}
                              </p>

                              <div class="form-group text-left m-0">
                                {/* <a href="#">
                                  <button
                                    type="button"
                                    class="
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

                              <p class="mt-2 user-profile">
                                <i
                                  class="fa fa-user-circle"
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

                      <div class="profile-data">
                        <h4>About me</h4>
                        {userData.about ? (
                          <p>{userData.about}</p>
                        ) : (
                          <h6>
                            {/* Please <Link to="/edit/profile"> click </Link> here
                            to add information */}
                          </h6>
                        )}
                      </div>

                      <div class="profile-data">
                        <h4>Services offered by me</h4>
                        {userData.services ? (
                          <p>{userData.services}</p>
                        ) : (
                          <h6>
                            {/* Please <Link to="/edit/profile"> click </Link> here
                            to add information */}
                          </h6>
                        )}
                      </div>

                      <Featured publicUp={true} featuredData={userData.featured}/>
                      

                      <div class="profile-data">
                        <div class="row">
                          <div class="col-md-3">
                            <div
                              class="social-link"
                              data-toggle="modal"
                              data-target="#website"
                            ><Link>
                              <i class="fa fa-globe" aria-hidden="true"></i>
                              <br />
                              Website
                              </Link>
                            </div>
                          </div>

                          <div class="col-md-3">
                            <div
                              class="social-link"
                              data-toggle="modal"
                              data-target="#facebook"
                            ><Link>
                              <i
                                class="fa fa-facebook-square"
                                aria-hidden="true"
                              ></i>
                              <br />
                              Facebook
                              </Link>
                            </div>
                          </div>

                          <div class="col-md-3">
                            <div
                              class="social-link"
                              data-toggle="modal"
                              data-target="#linkedin"
                            ><Link>
                              <i
                                class="fa fa-linkedin-square"
                                aria-hidden="true"
                              ></i>
                              <br />
                              Linkedin
                              </Link>
                            </div>
                          </div>

                          <div class="col-md-3">
                            <div
                              class="social-link"
                              data-toggle="modal"
                              data-target="#twitter"
                            ><Link>
                              <i
                                class="fa fa-twitter-square"
                                aria-hidden="true"
                              ></i>
                              <br />
                              Twitter
                              </Link>
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

        <footer class="footer" >
          <div class="container-fluid">
            <div class="row">
              <div class="col-sm-12">
                <script>document.write(new Date().getFullYear());</script>©
                TellyTell.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
    );

}