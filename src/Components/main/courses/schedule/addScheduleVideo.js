import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { API } from "../../../../API";
import { isAutheticated } from "../../../auth/authhelper";
import swal from "sweetalert";
import ClipLoader from "react-spinners/ClipLoader";
import { useHistory, Link } from "react-router-dom";
import Footer from "../../Footer";
// import { Link } from "react-router-dom";

export default function AddScheduleVideo() {
  const { token } = isAutheticated();
  const [radioBtn, setRadioBtn] = useState("");
  const [videoType, setVideoType] = useState("");
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
  });
  const [loading, setLoading] = useState(false);
  const [searchMovie, setSearchMovie] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [metaformData, setMetaformData] = useState({});
  const [SeasonLength, setSeasonLength] = useState(0);
  const [error, setError] = useState(false);
  const [lessionId, setLessionId] = useState(null);
  const [success, setSuccess] = useState(false);
  const [currentTab, setcurrentTab] = useState(1);
  const [metaDataTitle, setmetaDataTitle] = useState("");
  const [metaDataPlot, setmetaDataPlot] = useState("");
  const [metaDataDirector, setmetaDataDirector] = useState("");
  const [metaDataWriter, setmetaDataWriter] = useState("");
  const [metaDataCrew, setmetaDataCrew] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [image, setImage] = useState('');
  // var metaformData={}

  const history = useHistory();

  const [data, setdata] = useState([]);
  const [videos, setVideodata] = useState([]);
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
      console.log("All Cate",res.data)
      setdata(res.data);
    }
    fetchData();
  }, [token]);

  const handleRadioChange = (e) => {
    setRadioBtn(e.target.value);
  };

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`${API}/api/lesson/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setVideodata([...response.data.data]);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchData();
  }, [token]);

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
          category: categoryId,
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
                    console.log("")
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
    if (e.target.name === "SeasonNum") {
      if (SeasonLength >= e.target.value) {
        setLession({
          ...lession,
          [e.target.name]: e.target.value,
        });
        setError(false);
      } else {
        setError(true);
      }
    } else {
      setImage(URL.createObjectURL(e.target.files[0]))
      setLession({
        ...lession,
        [e.target.name]: e.target.files[0],
      });
    }
  };
  const handleSubmitBanner = (e) => {
    e.preventDefault();
    setLoading(true);
    // setSuccess(false);
    console.log(lession);
    const formData = new FormData();
    formData.append("banner", lession.banner);
    axios
      .put(`${API}/api/lesson/${lessionId}`, formData, {
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
  };
  const handleSubmitBannerForTvShows = (e) => {
    e.preventDefault();
    console.log(lession);
    setLoading(true);
    // setSuccess(false);
    const formData = new FormData();
    formData.append("bannerImage", lession.bannerImage);
    axios
      .patch(`${API}/api/tvshow/edit_banner/${lessionId}`, formData, {
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
  };

  const postMetaData = (id) => {
    if (radioBtn === "TV Shows") {
      axios
        .patch(`${API}/api/tvshow/metadata/${id}`, metaformData, {
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
                        console.log("")
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
      console.log("here sending data for movies", metaformData);
      axios
        .patch(`${API}/api/lesson/metadata/${id}`, metaformData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          //console.log("here sub,it response", res);
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
                    console.log("")
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
    //e.preventDefault();
    //await setSearchMovie(e.target.value);
    console.log("namesearch", searchText);
    console.log(radioBtn);
    if (radioBtn === "TV Shows") {
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

          //console.log(userdata);
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

          //console.log(response.data);
          //console.log(userdata);
          setMovieList(userdata.results);
          //console.log("here i;m ",movieList,typeof(movieList))
          //setSubjects([...subjects, ...userdata.subjects]);
          //setLanguages([...languages, ...userdata.languages]);
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
    if (radioBtn === "TV Shows") {
      setLoading(true);
      //console.log(lessionId);
      // setSuccess(false);
      axios
        .patch(
          `${API}/api/tvshow/edit_season/${lessionId}`,
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
        .put(`${API}/api/lesson/${lessionId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/formdata",
          },
        })
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
    }
  };


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
                      <h1 className="text-left head-small">Schedule Launch</h1>
                      {/* <h3>{new Date("2021-07-30T15:13:00.000+00:00").toLocaleString()}</h3> */}

                      <ul className="nav nav-tabs" role="tablist">
                        <li className="nav-item waves-effect waves-light">
                          <a
                            ref={tab1}
                            className="nav-link active"
                            data-toggle="tab"
                            href="#title"
                            role="tab"
                          >
                            <span className="d-block d-sm-none">
                              <img
                                alt=""
                                src="assets/images/icons/title-icon.png"
                              />
                            </span>
                            <span className="d-none d-sm-block">
                              Select Category
                            </span>
                          </a>
                        </li>
                        <li className="nav-item waves-effect waves-light">
                          <a
                            role="tab"
                            onClick={() => {
                              setcurrentTab(2);
                            }}
                            ref={tab2}
                            className="nav-link"
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
                        <div
                          className="tab-pane active"
                          id="title"
                          role="tabpanel"
                        >
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="form-group">
                                <label
                                  htmlFor="basicpill-phoneno-input"
                                  className="label-100"
                                >
                                  Select Category
                                </label>
                                <div className="col-md-8">
                                  {data?.map((item) => (
                                    <div className="custom-control custom-radio mb-2" key={item._id}>
                                      <input
                                        onChange={(e)=>{
                                        handleRadioChange(e);
                                        setVideoType(item.type)
                                        setCategoryId(item._id)}}
                                        type="radio"
                                        id={item._id}
                                        name="age"
                                        className="custom-control-input"
                                        value={item.name}
                                      />
                                      <label
                                        className="custom-control-label"
                                        htmlFor={item._id}
                                      >
                                        {item.name} ({item.type})
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                          {videoType === "Individual Videos" && (
                            <div className="row">
                              <div className="col-lg-12">
                                <div className="form-group">
                                  <label
                                    htmlFor="basicpill-phoneno-input"
                                    className="label-100"
                                  >
                                    Search Video from Video Library
                                  </label>
                                  <input
                                    autoComplete={"Hello"}
                                    // autoSave={false}
                                    onChange={handleFilter}
                                    type="text"
                                    className="form-control input-field"
                                    id="basicpill-phoneno-input"
                                  />
                                  <div className="searchedListVideos">
                                    {filteredVideos &&
                                      filteredVideos?.map((movie) => (
                                        <span
                                          style={{
                                            height: "7vh",
                                            display: "block",
                                          }}
                                          onClick={() =>
                                            handleClickOnMovie(
                                              movie.thumbnail,
                                              movie.title,
                                              movie._id
                                            )
                                          }
                                          key={movie._id}
                                        >
                                          <img
                                            alt=""
                                            src={movie.thumbnail}
                                            style={{
                                              height: "90%",
                                              width: "6vw",
                                              marginRight: "8vw",
                                            }}
                                          />
                                          <span>{movie.title}</span>
                                          {"                  "}
                                          <span>{movie.description}</span>
                                        </span>
                                      ))}
                                  </div>
                                </div>
                              </div>
                              {booltoshowSelectedMoview && (
                                <div className="showData">
                                  <span>
                                    <b>Movie Image</b>
                                    <img
                                      alt=""
                                      src={SelectedMovieData.movieImage}
                                    />
                                  </span>
                                  <span>
                                    <b>Movie Title</b>
                                    <p> {SelectedMovieData.movieTitle}</p>
                                  </span>
                                </div>
                              )}
                            </div>
                          )}
                          {videoType === "Series" && (
                            <div className="row">
                              <div className="col-lg-12">
                                <div className="form-group">
                                  <label
                                    htmlFor="basicpill-phoneno-input"
                                    className="label-100"
                                  >
                                    Add New Title
                                  </label>
                                  <input
                                    type="text"
                                    name="title"
                                    onChange={handleChangetitle}
                                    className="form-control input-field"
                                    id="basicpill-phoneno-input"
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                          <div className="form-group mb-30 width-100 ">
                            <label className="col-md-4 control-label"></label>
                            <div className="col-md-8">
                              <button
                                type="button"
                                onClick={
                                  videoType === "Series"
                                    ? handleSubmitTvShows
                                    : handleSubmitOne
                                }
                                className="btn btn-success btn-login waves-effect waves-light mr-3"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="tab-pane" id="images" role="tabpanel">
                          <div className="panel-body p-20">
                            <div className="form-group mb-30 width-100 row">
                              <label className="col-md-4 control-label">
                                Upload Banner Image
                                <br />
                                <span className="size">(1125 x 451 px)</span>
                              </label>
                              <div className="col-md-8">
                                <input
                                  onChange={handleChange}
                                  type="file"
                                  name={
                                    radioBtn === "TV Shows"
                                      ? "bannerImage"
                                      : "banner"
                                  }
                                  className="form-control input-field"
                                />
                                <img
                                    classNameName="img-fluid mt-2"
                                    style={{
                                      width: "235px",
                                      height: "125px",
                                    }}
                                    alt="200x200"
                                    src={image ? image : "https://sgp1.digitaloceanspaces.com/storage.tellytell.com/banner-default.png"}
                                  />
                              </div>
                            </div>
                            <div className="form-group mb-30 width-100 row">
                              <label className="col-md-4 control-label"></label>
                              <div className="col-md-8">
                                <button
                                  onClick={
                                    radioBtn === "TV Shows"
                                      ? handleSubmitBannerForTvShows
                                      : handleSubmitBanner
                                  }
                                  type="button"
                                  className="btn btn-success btn-login waves-effect waves-light mr-3"
                                >
                                  Save
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
                                  value={searchMovie}
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
                                        {/* <td><iimg alt="" src="assets/images/avatar-2.jpg" className="img-circle" height="50"/></td> */}
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
                                    Save
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
                                  <input
                                    type="datetime-local"
                                    value={lession.launchDate}
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
                                    Save
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
