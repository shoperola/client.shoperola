import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { API } from "../../../../API";
import { isAutheticated } from "../../../auth/authhelper";
import swal from "sweetalert";
import ClipLoader from "react-spinners/ClipLoader";
import { useHistory, Link } from "react-router-dom";
import Footer from "../../Footer";
import { useParams } from "react-router-dom";

export default function AddScheduleVideo() {
  let { id, typevideo } = useParams();
  const { token } = isAutheticated();
  const [radioBtn, setRadioBtn] = useState("");
  const tab1 = useRef(null);
  const tab2 = useRef(null);
  const tab3 = useRef(null);
  const tab4 = useRef(null);
  const tab5 = useRef(null);
  const [lession, setLession] = useState({
    madeBy: null,
    title: "",
    description: "",
    // subject: "",
    languageid: "",
    SeasonNum: "",
    live: false,
    thumbnail: "",
    banner: "",
    bannerImage: "",
    launch: false,
    launchDate: "",
    video: "",
    bannerImageUrl:""
  });
  const [video,setVideo]=useState(null)
  const [loading, setLoading] = useState(false);
  const [searchMovie, setSearchMovie] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [metaformData, setMetaformData] = useState({});
  const [SeasonLength, setSeasonLength] = useState(0);
  const [error, setError] = useState(false);
  const [lessionId, setLessionId] = useState(null);
  const [success, setSuccess] = useState(false);
  const [currentTab, setcurrentTab] = useState(2);
  const [metaDataTitle, setmetaDataTitle] = useState("");
  const [metaDataPlot, setmetaDataPlot] = useState("");
  const [metaDataDirector, setmetaDataDirector] = useState("");
  const [metaDataWriter, setmetaDataWriter] = useState("");
  const [metaDataCrew, setmetaDataCrew] = useState([]);
  // var metaformData={}

  const history = useHistory();

  const [data, setdata] = useState([]);
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideo] = useState([]);
  const [booltoshowSelectedMoview, setbooltoshowSelectedMoview] = useState(
    false
  );
  const [SelectedMovieData, setSelectedMovieData] = useState();

  useEffect(() => {
    async function fetchData() {
      let res = await axios.get(`${API}/api/categories/view_all_categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    //   console.log(res.data,"This is all Category");
      setdata(res.data);
    }
    fetchData();
  }, [token]);
  useEffect(() => {
    async function fetchData() {
        let temp=typevideo==="lesson"?"lesson":"tvshow/view_tvshow"
        let res = await axios.get(`${API}/api/${temp}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data,"this is single video");
      typevideo==="lesson"?setLession({...lession,bannerImageUrl:res.data.data.banner,launchDate:res.data.data.launchDate}):setLession({...lession,bannerImageUrl:res.data.bannerimage,launchDate:res.data.date})
      typevideo==="lesson"?setVideo(res.data.data):setVideo(res.data)
      if(typevideo==="lesson"){
        setmetaDataTitle(res.data.data.title);
        setmetaDataPlot(res.data.data.Plot);
        setmetaDataDirector(res.data.data.directors);
        setmetaDataWriter(res.data.data.Writers);
        setmetaDataCrew(res.data.data.Actors_list);
        setMetaformData({
          Id: res.data.data.Id,
          directors: res.data.data.directors,
          type: res.data.data.type,
          year: res.data.data.year,
          image: res.data.data.image,
          genres: res.data.data.genres,
          Languages: res.data.data.Languages,
          RuntimeStr: res.data.data.RuntimeStr,
          Plot: res.data.data.Plot,
          Actors_list: res.data.data.Actors_list,
          Writers: res.data.data.Writers,
          Ratings: res.data.data.Ratings,
        });
      }else{
        setmetaDataTitle(res.data.title);
        setmetaDataPlot(res.data.Plot);
        setmetaDataDirector(res.data.directors);
        setmetaDataWriter(res.data.Writers);
        setmetaDataCrew(res.data.Actors_list);
        setMetaformData({
          Id: res.data.Id,
          directors: res.data.directors,
          type: res.data.type,
          year: res.data.year,
          image: res.data.image,
          genres: res.data.genres,
          Languages: res.data.Languages,
          RuntimeStr: res.data.RuntimeStr,
          Plot: res.data.Plot,
          Actors_list: res.data.Actors_list,
          Writers: res.data.Writers,
          Ratings: res.data.Ratings,
        });
      }
    }
    fetchData();
  }, [token,typevideo,id]);

  const handleRadioChange = (e) => {
    setRadioBtn(e.target.value);
  };
  useEffect(() => {
    const fetchData = () => {
        let temp=typevideo==="lesson"?"lesson":"tvshow/viewall_Tvshow"
      axios
        .get(`${API}/api/${temp}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response.data.show, "this is data");
          typevideo==="lesson"?setVideos([...response.data.data]):setVideos([...response.data.show])
          
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, [token, id, typevideo]);
  const handleFilter = (e) => {
    if (e.target.value !== "") {
      let res = videos?.filter((item) => {
        return (
          item &&
          item.title.toLowerCase().includes(e.target.value.toLowerCase())
        );
      });
      setFilteredVideo(res);
    } else {
      setFilteredVideo([]);
    }
  };
  const handleClickOnMovie = (movieImage, movieTitle, id) => {
    setLessionId(id);
    setSelectedMovieData({
      movieImage: movieImage,
      movieTitle: movieTitle,
    });
    setbooltoshowSelectedMoview(true);
    setFilteredVideo([]);
  };
  const handleSubmitOne = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .get(`${API}/api/lesson/${lessionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        setLoading(false);
        // console.log(response);
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
              history.push("/lessions");
              break;

            case "SaveAndContinue":
              if (currentTab >= 1 && currentTab <= 4) {
                switch (currentTab) {
                  case 1:
                    tab2.current.click();
                    break;
                  // case 2:
                  //     tab3.current.click();
                  //     break;
                  // case 3:
                  //     tab4.current.click();
                  //     break;
                  // case 4:
                  //     tab5.current.click();
                  //     break;
                  default:
                    console.log("");
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
  const handleSubmitTvShows = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(
        `${API}/api/tvshow/addtvshow`,
        {
          title: lession.title,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        setLoading(false);
        // console.log(response);
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
                  // case 3:
                  //     tab4.current.click();
                  //     break;
                  // case 4:
                  //     tab5.current.click();
                  //     break;
                  default:
                    console.log("");
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

  const handleChangetitle = (e) => {
    setLession({
      ...lession,
      title: e.target.value,
    });
  };
  const handleChange = (e) => {
      setLession({
        ...lession,
        bannerImage: e.target.files[0],
        bannerImageUrl: URL.createObjectURL(e.target.files[0]),
      });
  };

  const handleSubmitBannerImage=(e)=>{
    setLoading(true);
    if(typevideo==="lesson"){
      const formData = new FormData();
      formData.append("banner", lession.bannerImage);
      axios
        .put(`${API}/api/lesson/${id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/formdata",
          },
        })
        .then((response) => {
          console.log("updated object", response);
          setLoading(false);
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
                history.push("/scheduleVideos");
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
                  default:
                      console.log("");
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
    else{
      const formData = new FormData();
    formData.append("bannerImage", lession.bannerImage);
    axios
      .patch(`${API}/api/tvshow/edit_banner/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/formdata",
        },
      })
      .then((response) => {
        console.log("updated object", response);
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
              history.push("/scheduleVideos");
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
                default:
                    console.log("");
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

  }
  const postMetaData = () => {
    if (typevideo!=="lesson") {
      axios
        .patch(`${API}/api/tvshow/metadata/${id}`, metaformData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setLoading(false);
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
                history.push("/scheduleVideos");
                break;

              case "SaveAndContinue":
                console.log(currentTab,"this is currentTab")
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
                    default:
                    console.log("");
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
    } else {
      axios
      .patch(`${API}/api/lesson/metadata/${id}`, metaformData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
          setLoading(false);
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
                    default:
                    console.log("");
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
  };
  const handleSearchMovie = (searchText) => {
    if (typevideo!=="lesson") {
      axios
        .post(
          `${API}/api/tvshow/search_tv/${searchText}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data.data);
          const userdata = response.data.data;
          setMovieList(userdata.results);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .post(
          `${API}/api/lesson/search_metadata/${searchText}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          const userdata = response.data;
          setMovieList(userdata.results);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const fillMetadata = (id) => {
    setMovieList([]);
    axios
      .post(
        `${API}/api/lesson/search_metadata_id/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("here meta data", response);
        const data = response.data;
        setmetaDataTitle(data.title);
        setmetaDataPlot(data.plot);
        setmetaDataDirector(data.directors);
        setmetaDataWriter(data.writers);
        setmetaDataCrew(data.actorList);
        setSeasonLength(data.tvSeriesInfo?.seasons?.length);
        setMetaformData({
          ...metaformData,
          Id: data.id,
          directors: data.directors,
          type: data.type,
          year: data.year,
          image: data.image,
          genres: data.genres,
          Languages: data.languages,
          RuntimeStr: data.runtimeStr,
          Plot: data.plot,
          Actors_list: data.actorList,
          Writers: data.writers,
          Ratings: data.ratings,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onUpdatelast = (e) => {
    e.preventDefault();
    if (typevideo!=="lesson") {
      setLoading(true);
      //console.log(lessionId);
      // setSuccess(false);
      axios
        .patch(
          `${API}/api/tvshow/edit_season/${id}`,
          {
            number: Number(lession.SeasonNum),
            launchDate: lession.launchDate,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/formdata",
            },
          }
        )
        .then((response) => {
          setLoading(false);
          swal({
            title: "Video added Successfully!",
            icon: "success",
            buttons: true,
            successMode: true,
            dangerMode: false,
          }).then((value) => {
            history.push("/scheduleVideos");
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
    } else {
      setLoading(true);
      const formData = new FormData();
      formData.set("launchDate", lession.launchDate);
      axios
        .put(`${API}/api/lesson/${id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/formdata",
          },
        })
        .then((response) => {
          setLoading(false);
          swal({
            title: "Video Edited Successfully!",
            icon: "success",
            buttons: true,
            successMode: true,
            dangerMode: false,
          }).then((value) => {
            history.push("/scheduleVideos");
          });
        })
        .catch((err) => {
          setLoading(false);
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
  };

  console.log(lession);

  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0">Content Management - Schedule launch</h4>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">TellyTell</Link>
                    </li>
                    <li className="breadcrumb-item">
                      Content Management - Schedule launch
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
                    <div className="col-md-12 col-lg-9 col-xl-8">
                      <h1 className="text-left head-small">Edit Schedule</h1>
                      {/* <h3>{new Date("2021-07-30T15:13:00.000+00:00").toLocaleString()}</h3> */}

                      <ul className="nav nav-tabs" role="tablist">
                        <li className="nav-item waves-effect waves-light">
                          <a
                            role="tab"
                            onClick={() => {
                              setcurrentTab(2);
                            }}
                            ref={tab2}
                            className="nav-link active"
                            data-toggle="tab"
                            href="#images"
                          >
                            <span className="d-block d-sm-none">
                              <img
                                alt=""
                                src="assets/images/icons/img-icon.png"
                              />
                            </span>
                            <span className="d-none d-sm-block">
                              Banner image
                            </span>
                          </a>
                        </li>
                        <li className="nav-item waves-effect waves-light">
                          <a
                            role="tab"
                            onClick={() => {
                              setcurrentTab(3);
                            }}
                            ref={tab3}
                            className="nav-link"
                            data-toggle="tab"
                            href="#meta-data"
                          >
                            <span className="d-block d-sm-none">
                              <img
                                alt=""
                                src="assets/images/icons/info-icon.png"
                              />
                            </span>
                            <span className="d-none d-sm-block">
                              Meta Information (Optional)
                            </span>
                          </a>
                        </li>
                        <li className="nav-item waves-effect waves-light">
                          <a
                            role="tab"
                            onClick={() => {
                              setcurrentTab(4);
                            }}
                            ref={tab4}
                            className="nav-link"
                            data-toggle="tab"
                            href="#launch"
                          >
                            <span className="d-block d-sm-none">
                              <img
                                alt=""
                                src="assets/images/icons/date-icon.png"
                              />
                            </span>
                            <span className="d-none d-sm-block">Launch</span>
                          </a>
                        </li>
                      </ul>

                      <div className="tab-content video-tab p-3 text-muted">
                        <div className="tab-pane active" id="images" role="tabpanel">
                          <div className="panel-body p-20">
                            <div className="form-group mb-30 width-100 row">
                              <label className="col-md-3 control-label">
                                Upload Banner Image
                                <br />
                                <span className="size">(1125 x 451 px)</span>
                              </label>
                              <div className="col-md-3">
                              <img src={lession?.bannerImageUrl} alt="" width="110" height="60" />
                              </div>
                              <div className="col-md-6">
                                <input
                                  onChange={handleChange}
                                  type="file"
                                  className="form-control input-field"
                                />
                              </div>
                            </div>
                            <div className="form-group mb-30 width-100 row">
                              <label className="col-md-6 control-label"></label>
                              <div className="col-md-6">
                                <button
                                  onClick={
                                    handleSubmitBannerImage
                                  }
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

                        <div
                          className="tab-pane"
                          id="meta-data"
                          role="tabpanel"
                        >
                          <div className="panel-body p-20">
                            <div className="form-group mb-30 width-100 row">
                              <label className="col-md-4 control-label">
                                Search Title
                              </label>
                              <div className="col-md-8">
                                <input
                                  type="text"
                                  className="form-control input-field"
                                  defaultValue={searchMovie}
                                  onChange={(e) => {
                                    handleSearchMovie(e.target.value);
                                    setSearchMovie(e.target.value);
                                  }}
                                />
                              </div>
                            </div>
                            <div className="searchedList">
                              {movieList?.map((movie) => (
                                <span
                                  style={{ height: "7vh", display: "block" }}
                                  onClick={() => fillMetadata(movie.id)}
                                  key={movie._id}
                                >
                                  <img
                                    alt=""
                                    src={movie.image}
                                    style={{
                                      height: "90%",
                                      width: "6vw",
                                      marginRight: "8vw",
                                    }}
                                  />
                                  <span>{movie.title}</span>
                                  <span>{movie.description}</span>
                                </span>
                              ))}
                            </div>

                            <div className="form-group mb-30 width-100 row">
                              <label className="col-md-4 control-label">
                                Title
                              </label>
                              <div className="col-md-8">{metaDataTitle}</div>
                            </div>

                            <div className="form-group mb-30 width-100 row">
                              <label className="col-md-4 control-label">
                                Plot
                              </label>
                              <div className="col-md-8">{metaDataPlot}</div>
                            </div>

                            <div className="form-group mb-30 width-100 row">
                              <label className="col-md-4 control-label">
                                Director
                              </label>
                              <div className="col-md-8">
                                <div className="table-responsive table-shoot">
                                  <table className="table">
                                    <tbody>
                                      <tr>
                                        {/* <td><img alt="" src="assets/images/avatar-2.jpg" className="img-circle" height="50"/></td> */}
                                        <td>{metaDataDirector}</td>
                                        <td></td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>

                            <div className="form-group mb-30 width-100 row">
                              <label className="col-md-4 control-label">
                                Writer
                              </label>
                              <div className="col-md-8">
                                <div className="table-responsive table-shoot">
                                  <table className="table">
                                    <tbody>
                                      <tr>
                                        {/* <td><iimg alt="" src="assets/images/avatar-2.jpg" className="img-circle" height="50"/></td> */}
                                        <td>{metaDataWriter}</td>
                                        <td></td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>

                            <div className="form-group mb-30 width-100 row">
                              <label className="col-md-4 control-label">
                                Crew
                              </label>
                              <div className="col-md-8">
                                <div className="table-responsive table-shoot">
                                  <table className="table">
                                    <tbody>
                                      {metaDataCrew &&
                                        metaDataCrew.map((actor) => (
                                          <tr key={actor._id}>
                                            <td>
                                              <img
                                                alt=""
                                                src={actor.image}
                                                className="img-circle"
                                                height="50"
                                              />
                                            </td>
                                            <td>{actor.name}</td>
                                            <td>Actor</td>
                                          </tr>
                                        ))}

                                      {/* <tr>
<td><iimg alt="" src="assets/images/avatar-2.jpg" className="img-circle" height="50"/></td>
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
                                  <button
                                    type="button"
                                    onClick={() => postMetaData(lessionId)}
                                    className="btn btn-success btn-login waves-effect waves-light mr-3"
                                  >
                                      <ClipLoader loading={loading} size={18} />
                                      {!loading && "Save"}
                                  </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="tab-pane" id="crew" role="tabpanel">
                          <div className="panel-body p-20">
                            <div className="form-group row">
                              <label className="col-md-4 control-label">
                                Crew
                              </label>
                              <div className="col-md-8">
                                <table
                                  className="table table-hover"
                                  id="participantTable"
                                >
                                  <tbody>
                                    <tr className="participantRow">
                                      <td>
                                        <div className="crew_box">
                                          <div className="checkbox">
                                            <div className="input-group mb-3">
                                              <input
                                                type="text"
                                                className="form-control input-field"
                                                placeholder="Search"
                                              />
                                              <div className="input-group-append">
                                                <button
                                                  className="btn add_btn"
                                                  type="button"
                                                >
                                                  Add
                                                </button>
                                              </div>
                                            </div>
                                          </div>

                                          <div className="checkbox">
                                            <table className="table">
                                              <tbody>
                                                <tr>
                                                  <td>
                                                    <img
                                                      alt=""
                                                      src="assets/images/avatar-2.jpg"
                                                      className="img-circle"
                                                      height="50"
                                                    />
                                                  </td>
                                                  <td className="v-mid">
                                                    Anil Ravipudi
                                                  </td>
                                                  <td></td>
                                                </tr>

                                                <tr>
                                                  <td>
                                                    <img
                                                      alt=""
                                                      src="assets/images/avatar-2.jpg"
                                                      className="img-circle"
                                                      height="50"
                                                    />
                                                  </td>
                                                  <td className="v-mid">
                                                    Sunkara Ramabrahmam
                                                  </td>
                                                  <td></td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td></td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="tab-pane" id="launch" role="tabpanel">
                          <div className="panel-body p-20">
                            <div className="form-group mb-30 width-100 row">
                              <label className="col-md-4 control-label">
                                Date
                              </label>
                              <div className="col-md-8">
                                {radioBtn === "TV Shows" && (
                                  <div className="form-group width-100">
                                    <label className="pl-0 color-b label-d">
                                      Season Number
                                    </label>
                                    <span>
                                      {error && "Not a Valid Season!"}
                                    </span>
                                    <input
                                      type="text"
                                      defaultValue={lession.SeasonNum}
                                      onChange={handleChange}
                                      name="SeasonNum"
                                      className="form-control input-field"
                                      placeholder="Enter Season Name"
                                    />
                                  </div>
                                )}

                                <div className="form-group width-100">
                                  <label className="pl-0 color-b label-d">
                                    Launch Date
                                  </label>
                                  {/* {console.log(new Date(lession.launchDate).toIsoString(),"this is date")} */}
                                  <input
                                    type="datetime-local"
                                    defaultValue={(new Date(lession?.launchDate).getDate()).toString()+"-"+(new Date(lession?.launchDate).getMonth()+1)+"-"+new Date(lession?.launchDate).getFullYear().toString()+","}
                                    name="launchDate"
                                    onChange={(e) => {
                                      console.log(e.target.value);
                                      setLession({
                                        ...lession,
                                        launchDate: e.target.value,
                                      });
                                    }}
                                    className="form-control input-field"
                                    ddata-provide="datepicker"
                                    data-date-autoclose="true"
                                    placeholder="Pick Launch Date"
                                  />
                                </div>
                                {/* <div className="form-group width-100">
                                                                    <div className="input-group">

                                                                        <input
                                                                            type="datetime-local"
                                                                            // value={lession.launchDate}
                                                                            name="launchDate"
                                                                            onChange={(e) => {
                                                                                console.log(e.target.value)
                                                                                setLession({
                                                                                    ...lession,
                                                                                    launchDate: e.target.value,
                                                                                });

                                                                            }} />

                                                                    </div>
                                                                </div> */}
                              </div>
                            </div>

                            <div className="form-group m-b-0 row">
                              <div className="col-md-4"></div>
                              <div className="col-md-8">
                                <button
                                  onClick={onUpdatelast}
                                  style={{ width: "120px" }}
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
                              <label className="col-md-4 control-label">
                                Upload Video
                                <br />
                                <span className="size">
                                  (mp4 file format only)
                                </span>
                              </label>
                              <div className="col-md-8">
                                <input
                                  type="file"
                                  className="form-control input-field"
                                  defaultValue=""
                                />
                              </div>
                            </div>
                            <div className="form-group m-b-0 row">
                              <div className="col-md-4"></div>
                              <div className="col-md-8">
                                <a href="#/">
                                  <button
                                    type="button"
                                    className="btn btn-success btn-login waves-effect waves-light mr-3"
                                  >
                                    <ClipLoader loading={loading} size={18} />
                                  {!loading && "Save"}
                                  </button>
                                </a>
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

          <Footer />
        </div>
      </div>
    </div>
  );
}
