import React, { useState, useRef, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import { isAutheticated } from "../../../auth/authhelper";
import { API } from "../../../../API";
import swal from "sweetalert";
import DatePicker from "react-datepicker";
import $ from "jquery";
import { Player } from "video-react";
import { useHistory, Link } from "react-router-dom";
import Footer from "../../Footer";

export default function AddLanguage() {
  const { token } = isAutheticated();
  const tab1 = useRef(null);
  const tab2 = useRef(null);
  const tab3 = useRef(null);
  const tab4 = useRef(null);
  const tab5 = useRef(null);
  const tab6 = useRef(null);
  const [lession, setLession] = useState({
    madeBy: null,
    title: "",
    plot_show: "",
    // subject: "",
    languageid: "",
    live: false,
    thumbnail: "",
    bannerImage: "",
    SeasonNum: "",
    launch: false,
    number: null,
    seasondate: new Date(),
    launchDate: new Date(),
    video: "",
    episodeNumber: null

  });
  const [loading, setLoading] = useState(false);
  const [searchMovie, setSearchMovie] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [formData, setFormData] = useState(new FormData());
  const [episodeData, setEpisodeData] = useState(new FormData());
  const [metaformData, setMetaformData] = useState({});
  const [simpleformData, setSimpleformData] = useState({});
  const [seasonData, setSeasonData] = useState({});
  const [validForm, setvalidForm] = useState(false);
  const [error, setError] = useState("");
  const [lessionId, setLessionId] = useState(null);
  const [seasonId, setSeasonId] = useState(null);
  const [success, setSuccess] = useState(false);
  const [currentTab, setcurrentTab] = useState(1);
  const [metaDataTitle, setmetaDataTitle] = useState("");
  const [metaDataPlot, setmetaDataPlot] = useState("");
  const [metaDataDirector, setmetaDataDirector] = useState("");
  const [metaDataWriter, setmetaDataWriter] = useState("");
  const [metaDataCrew, setmetaDataCrew] = useState([]);
  // var simpleform={}

  const history = useHistory();
  const fillMetadata = (id) => {
    setMovieList([]);
    axios.post(`${API}/api/lesson/search_metadata_id/${id}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log("here meta data", response)
        const data = response.data;
        setmetaDataTitle(data.title);
        setmetaDataPlot(data.plot);
        setmetaDataDirector(data.directors);
        setmetaDataWriter(data.writers);
        setmetaDataCrew(data.actorList);
        setMetaformData({
          ...metaformData, "Id": data.id, "directors": data.directors, "type": data.type, "year": data.year, "image": data.image
          , "genres": data.genres, "Languages": data.languages, "RuntimeStr": data.runtimeStr, "Plot": data.plot
          , "Actors_list": data.actorList, "Writers": data.writers, "Ratings": data.ratings
        })
      })
      .catch((err) => {
        console.log(err);
      });

  }
  ////////////// for metadata ////////////////////////
  const postMetaData = (id) => {
    //console.log("here sending data", metaformData);
    axios.patch(`${API}/api/tvshow/metadata/${id}`, metaformData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log("here sub,it response", res);
        setLoading(false);
        // console.log(response);
        // setSuccess(!success);
        swal("Chages are saved Successfully!", {
          buttons: {
            SaveAndExit: {
              text: "Save and Exit",
              value: "SaveAndExit",
            },
            SaveAndContinue: {
              text: "Save and Continue",
              value: "SaveAndContinue",
            },
          },
        }).then((value) => {
          switch (value) {
            case "SaveAndExit":
              history.push("/lessions");
              break;

            case "SaveAndContinue":
              if (currentTab >= 1 && currentTab <= 4) {
                switch (currentTab) {
                  case 1:
                    tab2.current.click();
                    break;
                  case 2:
                    tab3.current.click();
                    break;
                  case 3:
                    tab4.current.click();
                    break;
                  case 4:
                    tab5.current.click();
                    break;
                }
              }
              break;

            default:
              history.push("/dashboard");
          }
        });
      })
      .catch((err) => {
        setLoading(false);
        // setSuccess(!success);
        let message = "errror";
        swal({
          title: "Error",
          text: { message },
          icon: "error",
          buttons: true,
          dangerMode: true,
        });
        console.log(err);
      });
  }
  const handleSearchMovie = (searchText) => {
    //e.preventDefault();
    //await setSearchMovie(e.target.value);
    //console.log("namesearch", searchText)
    //console.log("token", token)
    axios.post(`${API}/api/tvshow/search_tv/${searchText}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        const userdata = response.data


        //console.log(response.data);
        //console.log(userdata);
        setMovieList(userdata.results)

      })
      .catch((err) => {
        console.log(err);
      });

  }
  const checkForm = () => {
    if (
      lession.title.length != 0 &&
      // lession.description.length != 0 &&
      lession.languageid.length != 0
      // lession.subject.length != 0
    ) {
      setError("");
      setvalidForm(true);
    } else {
      setError("All fields are must!");
      setvalidForm(false);
    }
  };
  ///////////////// when lession change ////////////////
  useEffect(() => {
    checkForm();
  }, [lession]);

  useEffect(() => {
    // $("#summernote").summernote();

    axios
      .get(`${API}/api/languages`)
      .then((response) => {
        // console.log(response);
        setLanguages(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);



  const handleChange = (e) => {
    e.preventDefault();
    const { value, name } = e.target;

    if (name == "video") {
      setLession({ ...lession, video: URL.createObjectURL(e.target.files[0]) });
      formData.set("video", e.target.files[0]);
    } else if (name == "thumbnail") {
      //console.log("thumnail", e.target.files);
      setLession({
        ...lession,
        thumbnail: URL.createObjectURL(e.target.files[0]),
      });
      formData.set(name, e.target.files[0]);
    } else if (name == "bannerImage") {
      //console.log("banner", e.target.files);
      setLession({
        ...lession,
        [name]: URL.createObjectURL(e.target.files[0]),
      });
      formData.set(name, e.target.files[0]);
    }
    else if (name === "title") {
      setLession({ ...lession, [name]: value });
      setSimpleformData({ ...simpleformData, [name]: value })
    }
    else if (name === "plot_show") {
      setLession({ ...lession, [name]: value });
      setSimpleformData({ ...simpleformData, [name]: value })
    }
    else if (name === "languageid") {
      setLession({ ...lession, [name]: value });
      setSimpleformData({ ...simpleformData, [name]: value })
    }
    else if (name === "number") {
      setLession({ ...lession, [name]: value });
      setSeasonData({ ...seasonData, [name]: value })
    } else {
      setLession({ ...lession, [name]: value });
      // console.log(name, value);
      formData.set(name, value);
    }
  };

  /////// for video episode handle change //////////////////////
  const handleChangeEpisode = (e) => {
    e.preventDefault();
    const { value, name } = e.target;

    if (name == "video") {
      setLession({ ...lession, video: URL.createObjectURL(e.target.files[0]) });
      episodeData.set("video", e.target.files[0]);
    } else {
      episodeData.set(name, value);
      setLession({ ...lession, [name]: value });

    }
  };
  /////////////// for title first tab /////////////////////
  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    //console.log(simpleformData)
    axios
      .post(`${API}/api/tvshow/addtvshow`, simpleformData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        //console.log(response);
        setLoading(false);
        //console.log(response);
        setLessionId(response.data.data._id);
        setSuccess(true);
        swal({
          title: "Created Successfully!",

          icon: "success",
          buttons: {
            SaveAndExit: {
              text: "Save and Exit",
              value: "SaveAndExit",
            },
            SaveAndContinue: {
              text: "Save and Continue",
              value: "SaveAndContinue",
            },
          },
        }).then((value) => {
          switch (value) {
            case "SaveAndExit":
              history.push("/alllanguages");
              break;

            case "SaveAndContinue":
              if (currentTab >= 1 && currentTab <= 4) {
                switch (currentTab) {
                  case 1:
                    tab2.current.click();
                    break;
                  case 2:
                    tab3.current.click();
                    break;
                  case 3:
                    tab4.current.click();
                    break;
                  case 4:
                    tab5.current.click();
                    break;
                }
              }
              break;

            default:
              history.push("/dashboard");
          }
        });
      })
      .catch((err) => {
        setLoading(false);
        let message = err.response.data.message;
        swal({
          title: "Error",
          text: { message },
          icon: "error",
          buttons: true,
          dangerMode: true,
        });
        console.log(err);
      });
  };
  //////////////////// for season //////////////////////////
  const submitSeason = (e) => {
    e.preventDefault();
    setLoading(true);
    // setSuccess(false);
    axios
      .patch(`${API}/api/tvshow/edit_season/${lessionId}`, seasonData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        //console.log("updated object", response);
        setLoading(false);
        setSeasonId(response.data._id);
        // console.log(response);
        // setSuccess(!success);
        swal({
          title: "Changes are saved Successfully!",

          icon: "success",
          buttons: {
            SaveAndExit: {
              text: "Save and Exit",
              value: "SaveAndExit",
            },
            SaveAndContinue: {
              text: "Save and Continue",
              value: "SaveAndContinue",
            },
          },
        }).then((value) => {
          switch (value) {
            case "SaveAndExit":
              history.push("/alllanguages");
              break;

            case "SaveAndContinue":
              if (currentTab >= 1 && currentTab <= 4) {
                switch (currentTab) {
                  case 1:
                    tab2.current.click();
                    break;
                  case 2:
                    tab3.current.click();
                    break;
                  case 3:
                    tab4.current.click();
                    break;
                  case 4:
                    tab5.current.click();
                    break;
                }
              }
              break;

            default:
              history.push("/dashboard");
          }
        });
      })
      .catch((err) => {
        setLoading(false);
        // setSuccess(!success);
        let message = "errror";
        swal({
          title: "Error",
          text: { message },
          icon: "error",
          buttons: true,
          dangerMode: true,
        });
        console.log(err);
      });

  }
  ///////////// for image bannner ////////////////
  const onUpdatebanner = (e) => {
    e.preventDefault();
    setLoading(true);
    // setSuccess(false);
    axios
      .patch(`${API}/api/tvshow/edit_banner/${lessionId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/formdata",
        },
      })
      .then((response) => {
        //console.log("updated object", response);
        setLoading(false);
        // console.log(response);
        // setSuccess(!success);
        swal({
          title: "Changes are saved Successfully!",

          icon: "success",
          buttons: {
            SaveAndExit: {
              text: "Save and Exit",
              value: "SaveAndExit",
            },
            SaveAndContinue: {
              text: "Save and Continue",
              value: "SaveAndContinue",
            },
          },
        }).then((value) => {
          switch (value) {
            case "SaveAndExit":
              history.push("/alllanguages");
              break;

            case "SaveAndContinue":
              if (currentTab >= 1 && currentTab <= 4) {
                switch (currentTab) {
                  case 1:
                    tab2.current.click();
                    break;
                  case 2:
                    tab3.current.click();
                    break;
                  case 3:
                    tab4.current.click();
                    break;
                  case 4:
                    tab5.current.click();
                    break;
                }
              }
              break;

            default:
              history.push("/dashboard");
          }
        });
      })
      .catch((err) => {
        setLoading(false);
        // setSuccess(!success);
        let message = "errror";
        swal({
          title: "Error",
          text: { message },
          icon: "error",
          buttons: true,
          dangerMode: true,
        });
        console.log(err);
      });
  };
  /////// for video episode //////////////////////
  const onUpdateVideo = (e) => {
    e.preventDefault();
    //console.log("seasonid", seasonId)
    setLoading(true);
    // setSuccess(false);
    if (metaDataTitle) {
      episodeData.set("title", metaDataTitle)
    } else {
      episodeData.set("title", lession.title)
    }
    if (metaDataPlot) {
      episodeData.set("plot", metaDataPlot)
    } else {
      episodeData.set("plot", lession.plot_show)
    }
    axios
      .patch(`${API}/api/tvshow/edit_video/${seasonId}`, episodeData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/formdata",
        },
      })
      .then((response) => {
        //console.log("updated object", response);
        setLoading(false);
        // console.log(response);
        // setSuccess(!success);
        swal({
          title: "Video added Successfully!",

          icon: "success",
          buttons: true,
          successMode: true,
          dangerMode: false,
        }).then((value) => {
          history.push("/alllanguages");
        });
      })
      .catch((err) => {
        setLoading(false);
        // setSuccess(!success);
        let message = "errror";
        swal({
          title: "Error",
          text: { message },
          icon: "error",
          buttons: true,
          dangerMode: true,
        });
        console.log(err);
      });
  };

  ///// for launch ///////////////////////
  const onUpdatelast = (e) => {
    e.preventDefault();
    setLoading(true);
    // setSuccess(false);
    axios
      .put(`${API}/api/lesson/${lessionId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/formdata",
        },
      })
      .then((response) => {
        // console.log(response);
        setLoading(false);
        // console.log(response);
        // setSuccess(!success);
        swal({
          title: "Video added Successfully!",

          icon: "success",
          buttons: true,
          successMode: true,
          dangerMode: false,
        }).then((value) => {
          history.push("/alllanguages");
        });
      })
      .catch((err) => {
        setLoading(false);
        // setSuccess(!success);
        let message = "errror";
        swal({
          title: "Error",
          text: { message },
          icon: "error",
          buttons: true,
          dangerMode: true,
        });
        console.log(err);
      });
  };




  return (
    <div className="main-content">

      <div className="page-content">
        <div className="container-fluid">

          {/* <!-- start page title --> */}

          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0">Content Management - TV Shows
                </h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item"><a href="javascript: void(0);">TellyTell</a></li>
                    <li className="breadcrumb-item">Content Management - TV Shows
                    </li>

                    <li className="breadcrumb-item">Add New</li>


                  </ol>
                </div>

              </div>
            </div>
          </div>

          {/* <!-- end page title --> */}



          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">


                  <div className="row">

                    <div className="col-md-12 col-lg-9 col-xl-8">

                      <h1 className="text-left head-small">Add New Video </h1>





                      <ul className="nav nav-tabs" role="tablist">

                        <li className="nav-item waves-effect waves-light">
                          <a className="nav-link active" data-toggle="tab"
                            href="#title"
                            role="tab"
                            ref={tab1}

                          >
                            <span className="d-block d-sm-none">
                             <img alt="" src="assets/images/icons/title-icon.png" />
                            </span>
                            <span className="d-none d-sm-block">Title</span>
                          </a>
                        </li>

                        <li className="nav-item waves-effect waves-light">
                          <a className={`nav-link ${validForm && success ? "" : "disabled"
                            }`}
                            onClick={() => {
                              setcurrentTab(2);
                            }}
                            data-toggle="tab" href="#images" role="tab" ref={tab2}>
                            <span className="d-block d-sm-none">
                             <img alt="" src="assets/images/icons/img-icon.png" />
                            </span>
                            <span className="d-none d-sm-block">Images</span>
                          </a>
                        </li>

                        <li className="nav-item waves-effect waves-light">
                          <a className={`nav-link ${validForm && success ? "" : "disabled"
                            }`}
                            onClick={() => {
                              setcurrentTab(3);
                            }}
                            data-toggle="tab" href="#meta-data" role="tab" ref={tab3}>
                            <span className="d-block d-sm-none">
                             <img alt="" src="assets/images/icons/info-icon.png" />
                            </span>
                            <span className="d-none d-sm-block">Meta Data</span>
                          </a>
                        </li>

                        <li className="nav-item waves-effect waves-light">
                          <a className={`nav-link ${validForm && success ? "" : "disabled"
                            }`}
                            onClick={() => {
                              setcurrentTab(4);
                            }}
                            data-toggle="tab" href="#seasons" role="tab" ref={tab4}>
                            <span className="d-block d-sm-none">
                             <img alt="" src="assets/images/icons/info-icon.png" />
                            </span>
                            <span className="d-none d-sm-block">Seasons</span>
                          </a>
                        </li>
                        <li className="nav-item waves-effect waves-light">
                          <a className={`nav-link ${validForm && success ? "" : "disabled"
                            }`}
                            onClick={() => {
                              setcurrentTab(5);
                            }}
                            data-toggle="tab" href="#video" role="tab" ref={tab5}>
                            <span className="d-block d-sm-none">
                             <img alt="" src="assets/images/icons/video-icon.png" />
                            </span>
                            <span className="d-none d-sm-block">Video</span>
                          </a>
                        </li>

                        {/* <li className="nav-item waves-effect waves-light">
<a className={`nav-link ${
                              validForm &&
                              success &&
                              lession.thumbnail.length != 0 &&
                              lession.video.length != 0
                                ? ""
                                : "disabled"
          }`} 
          onClick={() => {
            setcurrentTab(6);
          }}
data-toggle="tab" href="#launch" role="tab" ref={tab6}>
<span className="d-block d-sm-none">
<img src="assets/images/icons/date-icon.png"/>
</span>
<span className="d-none d-sm-block">Launch</span>   
</a>
</li> */}





                      </ul>

                      <div className="tab-content video-tab p-3 text-muted">

                        <div className="tab-pane active" id="title" role="tabpanel">
                          <div className="panel-body p-20">
                            <div className="form-group mb-30 width-100 row">
                              <label className="col-md-4 control-label">Title</label>
                              <div className="col-md-8">
                                <input
                                  onChange={handleChange}
                                  type="text"
                                  className="form-control input-field"
                                  name="title"
                                  value={lession.title}
                                />
                              </div>
                            </div>

                            <div className="form-group mb-30 width-100 row">
                              <label className="col-md-4 control-label">Plot<br />(Optional)</label>
                              <div className="col-md-8">
                                <textarea onChange={handleChange}
                                  value={lession.plot_show}
                                  name="plot_show"
                                  className="form-control input-field"
                                  rows="5"></textarea>
                              </div>
                            </div>

                            <div className="form-group mb-30 width-100 row">
                              <label className="col-md-4 control-label">Language</label>
                              <div className="col-md-8">
                                <select
                                  className="form-control input-field"
                                  // defaultValue=""
                                  name="languageid"
                                  onChange={handleChange}
                                  value={lession.languageid}
                                >
                                  <option value="" selected>
                                    Select Lanuage
                                  </option>
                                  {languages.length != 0 &&
                                    languages.map((lang, index) => {
                                      return (
                                        <option value={lang._id}>
                                          {lang.name}
                                        </option>
                                      );
                                    })}
                                </select>
                              </div>
                            </div>

                            <div className="form-group mb-30 width-100 row">
                              <label className="col-md-4 control-label"></label>
                              <div className="col-md-8">
                                <button
                                  onClick={onSubmit}
                                  style={{ width: "120px" }}
                                  disabled={!validForm}
                                  type="button"
                                  className="btn btn-success btn-login waves-effect waves-light mr-3"
                                >
                                  <ClipLoader loading={loading} size={18} />
                                  {!loading && "Save"}
                                </button>
                              </div>
                            </div>


                          </div>
                        </div>

                        {/* <div className="tab-pane" id="images" role="tabpanel">
<div className="panel-body p-20"> 

<div className="form-group mb-30 width-100 row">
<label className="col-md-4 control-label">Upload Thumbnail Image<br/> 
<span className="size">(320 x 180 px)</span></label>
<div className="col-md-8">
<input type="file" className="form-control input-field" value=""/>
</div>
</div>

<div className="form-group mb-30 width-100 row">
<label className="col-md-4 control-label">Upload Banner Image<br/> 
<span className="size">(1125 x 451 px)</span></label>
<div className="col-md-8">
<input type="file" className="form-control input-field" value=""/>
</div>
</div>

<div className="form-group mb-30 width-100 row">
<label className="col-md-4 control-label"></label>
<div className="col-md-8">
<a href="#"><button type="button" className="btn btn-success btn-login waves-effect waves-light mr-3">Save</button></a>
</div>
</div>




</div>
</div> */}
                        <div className="tab-pane" id="images" role="tabpanel">
                          <div className="panel-body p-20">
                            <div className="form-group mb-30 width-100 row">
                              <label className="col-md-4 control-label">
                                Upload Thumbnail Image
                                <br />
                                <span className="size">(320 x 180 px)</span>
                              </label>
                              <div className="col-md-8">
                                <input
                                  onChange={handleChange}
                                  name="thumbnail"
                                  type="file"
                                  className="form-control input-field"
                                />
                                <div>
                                  <img
                                    classNameName="img-fluid mt-2"
                                    style={{
                                      height: "125px",
                                      width: "235px",
                                    }}
                                    alt="200x200"
                                    src={lession.thumbnail ? lession.thumbnail : "https://sgp1.digitaloceanspaces.com/storage.tellytell.com/thumbnail-default.png"}
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="form-group mb-30 width-100 row">
                              <label className="col-md-4 control-label">
                                Upload Banner Image
                                <br />
                                <span className="size">(1125 x 451 px)</span>
                              </label>
                              <div className="col-md-8">
                                <input
                                  type="file"
                                  name="bannerImage"
                                  onChange={handleChange}
                                  className="form-control input-field"
                                />
                                <div>
                                  <img
                                    classNameName="img-fluid mt-2"
                                    style={{
                                      width: "235px",
                                      height: "125px",
                                    }}
                                    alt="200x200"
                                    src={lession.bannerImage ? lession.bannerImage : "https://sgp1.digitaloceanspaces.com/storage.tellytell.com/banner-default.png"}
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="form-group mb-30 width-100 row">
                              <label className="col-md-4 control-label"></label>
                              <div className="col-md-8">
                                <button
                                  onClick={onUpdatebanner}
                                  style={{ width: "120px" }}
                                  disabled={!validForm}
                                  type="button"
                                  className="btn btn-success btn-login waves-effect waves-light mr-3"
                                >
                                  <ClipLoader loading={loading} size={18} />
                                  {!loading && "Save"}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* <div className="tab-pane" id="meta-data" role="tabpanel">
<div className="panel-body p-20"> 

<div className="form-group mb-30 width-100 row">
<label className="col-md-4 control-label">Search Title</label>
<div className="col-md-8">
<input type="text" className="form-control input-field" value="Example: Avatar"/>
</div>
</div>

<div className="form-group mb-30 width-100 row">
<label className="col-md-4 control-label">Title</label>
<div className="col-md-8">
Sarileru Nikevvaru
</div>
</div>

<div className="form-group mb-30 width-100 row">
<label className="col-md-4 control-label">Plot</label>
<div className="col-md-8">
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it.
</div>
</div>

<div className="form-group mb-30 width-100 row">
<label className="col-md-4 control-label">Director</label>
<div className="col-md-8">
<div className="table-responsive table-shoot">
<table className="table">
<tbody>
  <tr>
  <td><img src="assets/images/avatar-2.jpg" className="img-circle" height="50"/></td>
  <td>Anil Ravipudi</td>
  <td></td>
  </tr>
</tbody>
</table>
</div>
</div>
</div>

<div className="form-group mb-30 width-100 row">
<label className="col-md-4 control-label">Writer</label>
<div className="col-md-8">
<div className="table-responsive table-shoot">
<table className="table">
<tbody>
  <tr>
  <td><img src="assets/images/avatar-2.jpg" className="img-circle" height="50"/></td>
  <td>Anil Ravipudi</td>
  <td></td>
  </tr>
</tbody>
</table>
</div>
</div>
</div>

<div className="form-group mb-30 width-100 row">
<label className="col-md-4 control-label">Crew</label>
<div className="col-md-8">
<div className="table-responsive table-shoot">
<table className="table">
<tbody>
  <tr>
  <td><img src="assets/images/avatar-2.jpg" className="img-circle" height="50"/></td>
  <td>Anil Ravipudi</td>
  <td>Actor</td>
  </tr>
  <tr>
  <td><img src="assets/images/avatar-2.jpg" className="img-circle" height="50"/></td>
  <td>Anil Ravipudi</td>
  <td>Actor</td>
  </tr>							
</tbody>
</table>
</div>
</div>
</div>									

<div className="form-group width-100 mb-30 row">
<label className="col-md-4 control-label"></label>
<div className="col-md-8">

<a href="#"><button type="button" className="btn btn-success btn-login waves-effect waves-light mr-3">Save</button></a>

</div>
</div>										

</div>
</div> */}
                        {/*/////////////////////////////// meta dat start here //////////////////// */}
                        <div className="tab-pane" id="meta-data" role="tabpanel">
                          <div className="panel-body p-20">

                            <div className="form-group mb-30 width-100 row">
                              <label className="col-md-4 control-label">Search Title</label>
                              <div className="col-md-8">
                                <input type="text"
                                  className="form-control input-field"
                                  value={searchMovie}
                                  onChange={(e) => { handleSearchMovie(e.target.value); setSearchMovie(e.target.value) }} />
                              </div>
                            </div>
                            {movieList &&
                              movieList.map((movie) =>
                                <Link style={{ height: "7vh", display: "block" }}
                                  onClick={() => fillMetadata(movie.id)}
                                >

                                 <img alt="" src={movie.image} style={{ height: "90%", width: "6vw", marginRight: "8vw" }} />
                                  <span>{movie.title}</span>
                                  <span>{movie.description}</span>
                                </Link>
                              )
                            }

                            <div className="form-group mb-30 width-100 row">
                              <label className="col-md-4 control-label">Title</label>
                              <div className="col-md-8">
                                {metaDataTitle}
                              </div>
                            </div>

                            <div className="form-group mb-30 width-100 row">
                              <label className="col-md-4 control-label">Plot</label>
                              <div className="col-md-8">
                                {metaDataPlot}
                              </div>
                            </div>

                            <div className="form-group mb-30 width-100 row">
                              <label className="col-md-4 control-label">Director</label>
                              <div className="col-md-8">
                                <div className="table-responsive table-shoot">
                                  <table className="table">
                                    <tbody>
                                      <tr>
                                        {/* <td><img src="assets/images/avatar-2.jpg" className="img-circle" height="50"/></td> */}
                                        <td>
                                          {metaDataDirector}
                                        </td>
                                        <td></td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>

                            <div className="form-group mb-30 width-100 row">
                              <label className="col-md-4 control-label">Writer</label>
                              <div className="col-md-8">
                                <div className="table-responsive table-shoot">
                                  <table className="table">
                                    <tbody>
                                      <tr>
                                        {/* <td><img src="assets/images/avatar-2.jpg" className="img-circle" height="50"/></td> */}
                                        <td>
                                          {metaDataWriter}
                                        </td>
                                        <td></td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>

                            <div className="form-group mb-30 width-100 row">
                              <label className="col-md-4 control-label">Crew</label>
                              <div className="col-md-8">
                                <div className="table-responsive table-shoot">
                                  <table className="table">
                                    <tbody>
                                      {metaDataCrew && metaDataCrew.map((actor) =>
                                        <tr>
                                          <td><img src={actor.image} className="img-circle" height="50" 
                                          alt=""/></td>
                                          <td>
                                            {actor.name}
                                          </td>
                                          <td>Actor</td>
                                        </tr>
                                      )

                                      }

                                      {/* <tr>
<td><img src="assets/images/avatar-2.jpg" className="img-circle" height="50"/></td>
<td>Anil Ravipudi</td>
<td>Actor</td>
</tr>							 */}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>

                            <div className="form-group width-100 mb-30 row">
                              <label className="col-md-4 control-label"></label>
                              <div className="col-md-8">

                                <Link><button type="button"
                                  onClick={() => postMetaData(lessionId)}
                                  className="btn btn-success btn-login waves-effect waves-light mr-3">Save</button>
                                </Link>

                              </div>
                            </div>

                          </div>
                        </div>
                        {/*/////////////////////////////// meta dat end here //////////////////// */}


                        <div className="tab-pane" id="seasons" role="tabpanel">
                          <div className="panel-body p-20">

                            <div className="form-group mb-30 width-100 row">
                              <label className="col-md-4 control-label">Season Name</label>
                              <div className="col-md-8">
                                <input type="number"
                                  className="form-control input-field"
                                  name="number"
                                  onChange={handleChange}
                                />
                              </div>
                            </div>

                            <div className="form-group mb-30 width-100 row">
                              <label className="col-md-4 control-label">Launch Date & Time</label>
                              <div className="col-md-8">
                                <div className="form-group width-100">
                                  <div className="input-group">
                                    {/* <input type="text" className="form-control input-field" data-provide="datepicker" data-date-format="dd M, yyyy" data-date-autoclose="true"/> */}
                                    <DatePicker
                                      selected={lession.seasondate}
                                      name="date"
                                      onChange={(date) => {
                                        setLession({
                                          ...lession,
                                          seasondate: date,
                                        });
                                        setSeasonData({ ...seasonData, "date": date.toISOString() }

                                        );
                                      }}
                                    />
                                    <div className="input-group-append">
                                      <span className="input-group-text"><i className="fa fa-calendar" aria-hidden="true"></i></span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>



                            <div className="form-group width-100 mb-30 row">
                              <label className="col-md-4 control-label"></label>
                              <div className="col-md-8">

                                <Link><button type="button"
                                  onClick={submitSeason}
                                  className="btn btn-success btn-login waves-effect waves-light mr-3">Save</button></Link>

                              </div>
                            </div>

                          </div>
                        </div>


                        {/* <div className="tab-pane" id="launch" role="tabpanel">
<div className="panel-body p-20"> 
<div className="form-group mb-30 width-100 row">
<label className="col-md-4 control-label">Launch Date & Time</label>
<div className="col-md-8">
<div className="form-group width-100">
<div className="input-group">
<input type="text" className="form-control input-field" data-provide="datepicker" data-date-format="dd M, yyyy" data-date-autoclose="true"/>
<div className="input-group-append">
<span className="input-group-text"><i className="fa fa-calendar" aria-hidden="true"></i></span>
</div>
</div>
</div>
</div>
</div>
            
<div className="form-group m-b-0 row">
<div className="col-md-4"></div>
<div className="col-md-8">
<a href="#"><button type="button" className="btn btn-success btn-login waves-effect waves-light mr-3">Save</button></a>
</div>
</div>									
</div>
</div>
 */}
                        <div className="tab-pane" id="launch" role="tabpanel">
                          <div className="panel-body p-20">
                            <div className="form-group mb-30 width-100 row">
                              <label className="col-md-4 control-label">Date</label>
                              <div className="col-md-8">
                                <div className="form-group width-100">
                                  <div className="input-group">
                                    {/* <input
                                      type="text"
                                      value={lession.launchDate}
                                      name="launchDate"
                                      onChaged={(e) => {
                                        console.log(e);
                                      }}
                                      className="form-control input-field"
                                      data-provide="datepicker"
                                      data-date-format="dd M, yyyy"
                                      data-date-autoclose="true"
                                    /> */}
                                    <DatePicker
                                      selected={lession.launchDate}
                                      name="launchDate"
                                      onChange={(date) => {
                                        setLession({
                                          ...lession,
                                          launchDate: date,
                                        });
                                        formData.set(
                                          "launchDate",
                                          date.toISOString()
                                        );
                                      }}
                                    />

                                    <div className="input-group-append">
                                      <span className="input-group-text">
                                        <i
                                          className="fa fa-calendar"
                                          aria-hidden="true"
                                        ></i>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="form-group m-b-0 row">
                              <div className="col-md-4"></div>
                              <div className="col-md-8">
                                <button
                                  onClick={onUpdatelast}
                                  style={{ width: "120px" }}
                                  disabled={!validForm}
                                  type="button"
                                  className="btn btn-success btn-login waves-effect waves-light mr-3"
                                >
                                  <ClipLoader loading={loading} size={18} />
                                  {!loading && "Save"}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>


                        <div className="tab-pane" id="video" role="tabpanel">
                          <div className="panel-body p-20">
                            <div className="form-group mb-30 width-100 row">
                              <label className="col-md-4 control-label">Episode Name</label>
                              <div className="col-md-8">
                                <input type="number"
                                  className="form-control input-field"
                                  name="episodeNumber"
                                  onChange={handleChangeEpisode}
                                />
                              </div>
                            </div>
                            <div className="form-group mb-30 width-100 row">
                              <label className="col-md-4 control-label">
                                Upload Video
                                <br />
                                <span className="size">(mp4 file format only)</span>
                              </label>
                              <div className="col-md-8">
                                <input
                                  type="file"
                                  onChange={handleChangeEpisode}
                                  name="video"
                                  className="form-control input-field"
                                />
                                <Player key={lession.video}>
                                  <source src={lession.video} />
                                </Player>
                              </div>
                            </div>

                            <div className="form-group m-b-0 row">
                              <div className="col-md-4"></div>
                              <div className="col-md-8">
                                <button
                                  onClick={onUpdateVideo}
                                  style={{ width: "120px" }}
                                  disabled={!validForm}
                                  type="button"
                                  className="btn btn-success btn-login waves-effect waves-light mr-3"
                                >
                                  <ClipLoader loading={loading} size={18} />
                                  {!loading && "Save"}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>



                      </div>
                      <div className="form-group row ">
                        <div classNameName="col-md-4"></div>
                        <div className="col-md-8 text-left pl-3">
                          <div className="form-group width-100">
                            <span classNameName="text-danger">{error}</span>
                            <br />
                            <br />
                          </div>
                        </div>
                      </div>






                    </div>



                  </div>

                  {/* <!-- end table-responsive --> */}
                </div>
              </div>
            </div>
          </div>

        </div>
        {/* <!-- container-fluid --> */}
      </div>
      {/* <!-- End Page-content --> */}



      <Footer />
    </div>
    //   <div className="main-content">
    //     <div className="page-content">
    //       <div className="container-fluid">
    //         <div className="row">
    //           <div className="col-12">
    //             <div className="page-title-box d-flex align-items-center justify-content-between">
    //               <h4 className="mb-0">Courses - Languages</h4>

    //               <div className="page-title-right">
    //                 <ol className="breadcrumb m-0">
    //                   <li className="breadcrumb-item">
    //                     <a href="javascript: void(0);">Kourses</a>
    //                   </li>
    //                   <li className="breadcrumb-item">Courses - Languages</li>
    //                   <li className="breadcrumb-item">Add New Language</li>
    //                 </ol>
    //               </div>
    //             </div>
    //           </div>
    //         </div>

    //         <div className="row">
    //           <div className="col-lg-12">
    //             <div className="card">
    //               <div className="card-body">
    //                 <div className="row">
    //                   <div className="col-md-12 col-lg-6 col-xl-6">
    //                     <h1 className="text-left head-small">Add New Language</h1>

    //                     <form>
    //                       <div className="form-group mb-30 width-100 row">
    //                         <label className="col-md-4 control-label">Language</label>
    //                         <div className="col-md-8">
    //                           {/* <input
    //                             onChange={handleChange}
    //                             value={input}
    //                             type="text"
    //                             className="form-control input-field"
    //                             id="basicpill-phoneno-input"
    //                           />
    //                           {input} */}
    //                           <select
    //                             value={input}
    //                             onChange={handleChange}
    //                             className="select-w custom-select custom-select-sm form-control form-control-sm"
    //                           >
    //                             <option value="">Select Language</option>
    //                             {languages.length != 0 &&
    //                               languages.map((lang) => {
    //                                 return (
    //                                   <option value={lang._id}>
    //                                     {lang.name}{" "}
    //                                   </option>
    //                                 );
    //                               })}
    //                           </select>
    //                         </div>
    //                       </div>

    //                       <div className="row">
    //                         <div className="col-lg-12">
    //                           <div className="form-group text-left">
    //                             <button
    //                               onClick={onSubmit}
    //                               type="button"
    //                               className="btn btn-success btn-login waves-effect waves-light mr-3"
    //                             >
    //                               <ClipLoader loading={loading} size={18} />
    //                               {!loading && "Save"}
    //                             </button>
    //                           </div>
    //                         </div>
    //                       </div>
    //                     </form>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>

    //       <footer className="footer">
    //         <div className="container-fluid">
    //           <div className="row">
    //             <div className="col-sm-12">
    //               <script>document.write(new Date().getFullYear())</script> ©
    //               SHOTT.
    //             </div>
    //           </div>
    //         </div>
    //       </footer>
    //     </div>
    //   </div>
  );
}
