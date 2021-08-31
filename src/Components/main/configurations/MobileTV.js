import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API } from "../../../API";
import { isAutheticated } from "../../auth/authhelper";
import Footer from "../Footer";
import axios from "axios";
import swal from "sweetalert";
import ClipLoader from "react-spinners/ClipLoader";

const MobileTV = () => {
  const { token } = isAutheticated();

  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState("");
  const [androidMobName, setAndroidMobName] = useState("");
  const [androidMobIcon, setAndroidMobIcon] = useState();
  const [iosMobName, setIosMobName] = useState("");
  const [iosMobIcon, setIosMobIcon] = useState();
  const [androidTVName, setAndroidTVName] = useState("");
  const [androidTVIcon, setAndroidTVIcon] = useState();
  const [appleTVName, setAppleTVName] = useState("");
  const [appleTVIcon, setAppleTVIcon] = useState();
  const [fireTVName, setFireTVName] = useState("");
  const [fireTVIcon, setFireTVIcon] = useState();

  const [androidMobIconUrl, setAndroidMobIconUrl] = useState();
  const [iosMobIconUrl, setIosMobIconUrl] = useState();
  const [androidTVIconUrl, setAndroidTVIconUrl] = useState();
  const [appleTVIconUrl, setAppleTVIconUrl] = useState();
  const [fireTVIconUrl, setFireTVIconUrl] = useState("");

  const wordLimit = {
    androidMobName: 40,
    iosMobName: 40,
    androidTVName: 40,
    appleTVName: 40,
    fireTVName: 40,
  };

  const [wordAndroidMobName, setWordAndroidMobName] = useState(
    wordLimit.androidMobName
  );
  const [wordIosMobName, setWordIosMobName] = useState(wordLimit.iosMobName);
  const [wordAndroidTVName, setWordAndroidTVName] = useState(
    wordLimit.androidTVName
  );
  const [wordAppleTVName, setWordAppleTVName] = useState(wordLimit.appleTVName);
  const [wordFireTVName, setWordFireTVName] = useState(wordLimit.fireTVName);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`${API}/api/user/apps`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setId(res.data.data._id);
          setAndroidMobName(res.data.data.androidappname);
          setAndroidMobIcon(res.data.data.androidapp);
          setIosMobName(res.data.data.iosappname);
          setIosMobIcon(res.data.data.iosapp);
          setAndroidTVName(res.data.data.androidtvname);
          setAndroidTVIcon(res.data.data.androidtv);
          setAppleTVName(res.data.data.appletvname);
          setAppleTVIcon(res.data.data.appletv);
          setFireTVName(res.data.data.fireostvname);
          setFireTVIcon(res.data.data.fireostv);

          setAndroidMobIconUrl(res.data.data.androidapp);
          setIosMobIconUrl(res.data.data.iosapp);
          setAndroidTVIconUrl(res.data.data.androidtv);
          setAppleTVIconUrl(res.data.data.appletv);
          setFireTVIconUrl(res.data.data.fireostv);

          setWordAndroidMobName(
            wordLimit.androidMobName - res.data.data.androidappname.length
          );
          setWordIosMobName(
            wordLimit.iosMobName - res.data.data.iosappname.length
          );
          setWordAndroidTVName(
            wordLimit.androidTVName - res.data.data.androidtvname.length
          );
          setWordAppleTVName(
            wordLimit.appleTVName - res.data.data.appletvname.length
          );
          setWordFireTVName(
            wordLimit.fireTVName - res.data.data.fireostvname.length
          );
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchData();
  }, [token]);

  const saveHandler = () => {
    setIsLoading(true);
    const formdata = new FormData();
    formdata.append("id", id);
    formdata.append("androidappname", androidMobName);
    formdata.append("androidapp", androidMobIcon);
    formdata.append("iosappname", iosMobName);
    formdata.append("iosapp", iosMobIcon);
    formdata.append("androidtvname", androidTVName);
    formdata.append("androidtv", androidTVIcon);
    formdata.append("appletvname", appleTVName);
    formdata.append("appletv", appleTVIcon);
    formdata.append("fireostvname", fireTVName);
    formdata.append("fireostv", fireTVIcon);

    axios
      .put(`${API}/api/user/apps`, formdata, {
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
        setIsLoading(false);
        console.log(error);
      });
  };

  const handleFile = (event, type) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(event.target.files[0]);

    if (!(file && file["type"].split("/")[0] === "image")) {
      alert("Please upload a valid image");
      return;
    }

    switch (type) {
      case "androidapp":
        setAndroidMobIcon(file);
        setAndroidMobIconUrl(url);
        break;
      case "iosapp":
        setIosMobIcon(file);
        setIosMobIconUrl(url);
        break;
      case "androidtv":
        setAndroidTVIcon(file);
        setAndroidTVIconUrl(url);
        break;
      case "appletv":
        setAppleTVIcon(file);
        setAppleTVIconUrl(url);
        break;
      case "fireostv":
        setFireTVIcon(file);
        setFireTVIconUrl(url);
        break;
      default:
        console.log("Wrong Type");
    }
  };

  const handleEdit = (e, type) => {
    const value = e.target.value;
    const length = e.target.value.length;

    switch (type) {
      case "androidapp":
        if (wordLimit.androidMobName - length !== -1) {
          setAndroidMobName(value);
          setWordAndroidMobName(wordLimit.androidMobName - length);
        }
        break;
      case "iosapp":
        if (wordLimit.iosMobName - length !== -1) {
          setIosMobName(value);
          setWordIosMobName(wordLimit.iosMobName - length);
        }
        break;
      case "androidtv":
        if (wordLimit.androidTVName - length !== -1) {
          setAndroidTVName(value);
          setWordAndroidTVName(wordLimit.androidTVName - length);
        }
        break;
      case "appletv":
        if (wordLimit.appleTVName - length !== -1) {
          setAppleTVName(value);
          setWordAppleTVName(wordLimit.appleTVName - length);
        }
        break;
      case "fireostv":
        if (wordLimit.fireTVName - length !== -1) {
          setFireTVName(value);
          setWordFireTVName(wordLimit.fireTVName - length);
        }
        break;
      default:
        console.log("Wrong Type");
    }
  };

  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0">Mobile and TV Apps</h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">TellyTell</Link>
                    </li>
                    <li className="breadcrumb-item active">
                      Mobile and TV Apps
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
                                Android Mobile App Name
                              </label>
                              <input
                                type="text"
                                className="form-control input-field"
                                value={androidMobName}
                                onChange={(e) => handleEdit(e, "androidapp")}
                              />
                              <p className="pt-1 pl-2 text-secondary">
                                Remaining words : {wordAndroidMobName}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group mb-30 width-100 row">
                              <label className="col-md-4 control-label">
                                Upload App Icon for Android Mobile App
                                <br />
                                <span className="size">(512 x 512 px)</span>
                              </label>
                              <div className="col-md-8">
                                <input
                                  type="file"
                                  className="form-control input-field"
                                  onChange={(e) => handleFile(e, "androidapp")}
                                  accept="image/*"
                                />
                                {androidMobIconUrl && (
                                  <img
                                    className="img-fluid mt-2"
                                    style={{
                                      width: "235px",
                                      height: "125px",
                                    }}
                                    alt="200x200"
                                    src={androidMobIconUrl}
                                  />
                                )}
                              </div>
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
                                iOS Mobile App Name
                              </label>
                              <input
                                type="text"
                                className="form-control input-field"
                                value={iosMobName}
                                onChange={(e) => handleEdit(e, "iosapp")}
                              />
                              <p className="pt-1 pl-2 text-secondary">
                                Remaining words : {wordIosMobName}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group mb-30 width-100 row">
                              <label className="col-md-4 control-label">
                                Upload App Icon for iOS Mobile App
                                <br />
                                <span className="size">(512 x 512 px)</span>
                              </label>
                              <div className="col-md-8">
                                <input
                                  type="file"
                                  className="form-control input-field"
                                  onChange={(e) => handleFile(e, "iosapp")}
                                  accept="image/*"
                                />
                                {iosMobIconUrl && (
                                  <img
                                    className="img-fluid mt-2"
                                    style={{
                                      width: "235px",
                                      height: "125px",
                                    }}
                                    alt="200x200"
                                    src={iosMobIconUrl}
                                  />
                                )}
                              </div>
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
                                Android TV App Name
                              </label>
                              <input
                                type="text"
                                className="form-control input-field"
                                value={androidTVName}
                                onChange={(e) => handleEdit(e, "androidtv")}
                              />
                              <p className="pt-1 pl-2 text-secondary">
                                Remaining words : {wordAndroidTVName}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group mb-30 width-100 row">
                              <label className="col-md-4 control-label">
                                Upload App Icon for Android TV App
                                <br />
                                <span className="size">(512 x 512 px)</span>
                              </label>
                              <div className="col-md-8">
                                <input
                                  type="file"
                                  className="form-control input-field"
                                  onChange={(e) => handleFile(e, "androidtv")}
                                  accept="image/*"
                                />
                                {androidTVIconUrl && (
                                  <img
                                    className="img-fluid mt-2"
                                    style={{
                                      width: "235px",
                                      height: "125px",
                                    }}
                                    alt="200x200"
                                    src={androidTVIconUrl}
                                  />
                                )}
                              </div>
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
                                Apple TV App Name
                              </label>
                              <input
                                type="text"
                                className="form-control input-field"
                                value={appleTVName}
                                onChange={(e) => handleEdit(e, "appletv")}
                              />
                              <p className="pt-1 pl-2 text-secondary">
                                Remaining words : {wordAppleTVName}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group mb-30 width-100 row">
                              <label className="col-md-4 control-label">
                                Upload App Icon for Apple TV App
                                <br />
                                <span className="size">(512 x 512 px)</span>
                              </label>
                              <div className="col-md-8">
                                <input
                                  type="file"
                                  className="form-control input-field"
                                  onChange={(e) => handleFile(e, "appletv")}
                                  accept="image/*"
                                />
                                {appleTVIconUrl && (
                                  <img
                                    className="img-fluid mt-2"
                                    style={{
                                      width: "235px",
                                      height: "125px",
                                    }}
                                    alt="200x200"
                                    src={appleTVIconUrl}
                                  />
                                )}
                              </div>
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
                                FireOS TV App Name
                              </label>
                              <input
                                type="text"
                                className="form-control input-field"
                                value={fireTVName}
                                onChange={(e) => handleEdit(e, "fireostv")}
                              />
                              <p className="pt-1 pl-2 text-secondary">
                                Remaining words : {wordFireTVName}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group mb-30 width-100 row">
                              <label className="col-md-4 control-label">
                                Upload App Icon for FireOS TV App
                                <br />
                                <span className="size">(512 x 512 px)</span>
                              </label>
                              <div className="col-md-8">
                                <input
                                  type="file"
                                  className="form-control input-field"
                                  onChange={(e) => handleFile(e, "fireostv")}
                                  accept="image/*"
                                />
                                {fireTVIconUrl && (
                                  <img
                                    className="img-fluid mt-2"
                                    style={{
                                      width: "235px",
                                      height: "125px",
                                    }}
                                    alt="200x200"
                                    src={fireTVIconUrl}
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

export default MobileTV;
