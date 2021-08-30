import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API } from "../../../API";
import { isAutheticated } from "../../auth/authhelper";
import Footer from "../Footer";

import axios from "axios";
import swal from "sweetalert";
import ClipLoader from "react-spinners/ClipLoader";

const SocialMedia = () => {
  const { token } = isAutheticated();

  const [isLoading, setIsLoading] = useState(false);
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linkedIn, setLinkedin] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`${API}/api/user/social`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setFacebook(res.data.data.facebook);
          setTwitter(res.data.data.twitter);
          setInstagram(res.data.data.instagram);
          setLinkedin(res.data.data.linkedin);
          setId(res.data.data._id);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, [token]);

  const saveHandler = () => {
    axios
      .put(
        `${API}/api/user/social`,
        {
          id: id,
          facebook: facebook,
          twitter: twitter,
          instagram: instagram,
          linkedin: linkedIn,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
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
                <h4 className="mb-0">Social Media</h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">TellyTell</Link>
                    </li>
                    <li className="breadcrumb-item active">
                      Configuration - Social Media
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
                                Facebook
                              </label>
                              <input
                                type="text"
                                className="form-control input-field"
                                value={facebook}
                                onChange={(e) => setFacebook(e.target.value)}
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
                                Twitter
                              </label>
                              <input
                                type="text"
                                className="form-control input-field"
                                value={twitter}
                                onChange={(e) => setTwitter(e.target.value)}
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
                                Instagram
                              </label>
                              <input
                                type="text"
                                className="form-control input-field"
                                value={instagram}
                                onChange={(e) => setInstagram(e.target.value)}
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
                                Linkedin
                              </label>
                              <input
                                type="text"
                                className="form-control input-field"
                                value={linkedIn}
                                onChange={(e) => setLinkedin(e.target.value)}
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

export default SocialMedia;
