import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../../../API";
import { isAutheticated } from "../../auth/authhelper";
import Footer from "../Footer";
import swal from "sweetalert";
import ClipLoader from "react-spinners/ClipLoader";

const ConfigLogo = () => {
  const { token } = isAutheticated();

  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`${API}/api/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.data.data.picture !== "") {
            setImageUrl(res.data.data.picture);
          }
        });
    };

    fetchData();
  }, [token]);

  const handleFile = (event) => {
    const file = event.target.files[0];
    if (file && file["type"].split("/")[0] === "image") {
      setImage(file);
      setImageUrl(URL.createObjectURL(file));
    } else {
      alert("Please upload a valid image");
    }
  };

  const handleSave = () => {
    if (image !== imageUrl) {
    }
    setIsLoading(true);
    const formdata = new FormData();
    formdata.append("picture", image);
    axios
      .put(`${API}/api/user/profile`, formdata, {
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
  };

  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0">Logo</h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">TellyTell</Link>
                    </li>
                    <li className="breadcrumb-item active">Logo</li>
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
                            <div className="form-group mb-30 width-100 row">
                              <label className="col-md-4 control-label">
                                Upload Logo
                                <br />{" "}
                                <span className="size">(148 x 48 px)</span>
                              </label>
                              <div className="col-md-8">
                                <input
                                  type="file"
                                  className="form-control input-field"
                                  onChange={handleFile}
                                  accept="image/*"
                                />
                                {imageUrl && (
                                  <img
                                    className="img-fluid mt-2"
                                    style={{
                                      width: "235px",
                                      height: "125px",
                                    }}
                                    alt="200x200"
                                    src={imageUrl}
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group text-left">
                              <button
                                type="button"
                                className="btn btn-success btn-login waves-effect waves-light mr-3"
                                onClick={handleSave}
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

export default ConfigLogo;
