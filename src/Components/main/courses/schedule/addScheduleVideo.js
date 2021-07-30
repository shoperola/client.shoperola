import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../../Sidebar";
import Header from "../../Header";
import axios from "axios";
import { API } from "../../../../API";
import { isAutheticated } from "../../../auth/authhelper";
import { Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import DatetimePicker from "react-datetime-picker";
import swal from "sweetalert";
import ClipLoader from "react-spinners/ClipLoader";
import $ from "jquery";
import { Player } from "video-react";
import { useHistory, Link } from "react-router-dom";
import Footer from "../../Footer";
// import { Link } from "react-router-dom";

export default function AddScheduleVideo() {
    const { token } = isAutheticated();
    const [radioBtn, setRadioBtn] = useState("")
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
        live: false,
        thumbnail: "",
        banner: "",
        launch: false,
        launchDate: new Date(),
        video: "",

    });
    const [loading, setLoading] = useState(false);
    const [searchMovie, setSearchMovie] = useState("");
    const [movieList, setMovieList] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [metaformData, setMetaformData] = useState({});
    const [validForm, setvalidForm] = useState(false);
    const [error, setError] = useState("");
    const [lessionId, setLessionId] = useState(null);
    const [success, setSuccess] = useState(false);
    const [currentTab, setcurrentTab] = useState(1);
    const [metaDataTitle, setmetaDataTitle] = useState("");
    const [metaDataPlot, setmetaDataPlot] = useState("");
    const [metaDataDirector, setmetaDataDirector] = useState("");
    const [metaDataWriter, setmetaDataWriter] = useState("");
    const [metaDataCrew, setmetaDataCrew] = useState([]);
    // var metaformData={}

    const history = useHistory();

    const [data, setdata] = useState([]);
    const [videos, setVideodata] = useState([]);
    const [filteredVideos, setFilteredVideo] = useState([]);
    const [booltoshowSelectedMoview, setbooltoshowSelectedMoview] = useState(false);
    const [SelectedMovieData, setSelectedMovieData] = useState();
    useEffect(() => {
        async function fetchData() {
            let res = await axios.get(`${API}/api/categories/view_all_categories`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log(res);
            setdata(res.data);
        }
        fetchData();
    }, [])


    const handleRadioChange = (e) => {
        setRadioBtn(e.target.value)
    }


    useEffect(() => {
        const fetchData = () => {
            axios
                .get(`${API}/api/lesson/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    console.log(response);
                    setVideodata([...response.data.data]);
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        fetchData()
    }, []);

    const handleFilter = (e) => {
        if (e.target.value != "") {
            let res = videos?.filter(item => {
                return item && item.title.toLowerCase().includes(e.target.value.toLowerCase())
            })
            setFilteredVideo(res);
        } else {
            setFilteredVideo([]);
        }
    }
    const handleClickOnMovie = (movieImage, movieTitle, id) => {
        setLessionId(id)
        setSelectedMovieData({
            movieImage: movieImage,
            movieTitle: movieTitle,
        })
        setbooltoshowSelectedMoview(true)
        setFilteredVideo([]);
    }

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
    }


    const handleChange = (e) => {
        setLession({
            ...lession,
            banner: e.target.files[0]
        })
    }
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

    const postMetaData = (id) => {
        console.log("here sending data", metaformData);
        axios.patch(`${API}/api/lesson/metadata/${id}`, metaformData, {
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
        console.log("namesearch", searchText)
        console.log("token", token)
        axios.post(`${API}/api/lesson/search_metadata/${searchText}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                const userdata = response.data

                //console.log(response.data);
                //console.log(userdata);
                setMovieList(userdata.results)
                //console.log("here i;m ",movieList,typeof(movieList))
                //setSubjects([...subjects, ...userdata.subjects]);
                //setLanguages([...languages, ...userdata.languages]);
            })
            .catch((err) => {
                console.log(err);
            });

    }

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

    const onUpdatelast = (e) => {
        e.preventDefault();
        setLoading(true);
        //console.log(lessionId);
        // setSuccess(false);
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
    };

    return (

        <div class="main-content">

            <div class="page-content">
                <div class="container-fluid">

                    <div class="row">
                        <div class="col-12">
                            <div class="page-title-box d-flex align-items-center justify-content-between">
                                <h4 class="mb-0">Content Management - Schedule launch</h4>
                                <div class="page-title-right">
                                    <ol class="breadcrumb m-0">
                                        <li class="breadcrumb-item"><a href="javascript: void(0);">TellyTell</a></li>
                                        <li class="breadcrumb-item">Content Management - Schedule launch</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="row">
                        <div class="col-lg-12">
                            <div class="card">
                                <div class="card-body">
                                    <div class="row">

                                        <div class="col-md-12 col-lg-9 col-xl-8">

                                            <h1 class="text-left head-small">Schedule Launch</h1>
                                            {/* <h3>{new Date("2021-07-30T15:13:00.000+00:00").toLocaleString()}</h3> */}

                                            <ul class="nav nav-tabs" role="tablist">
                                                <li class="nav-item waves-effect waves-light">
                                                    <a
                                                        ref={tab1}
                                                        class="nav-link active" data-toggle="tab" href="#title"
                                                        role="tab">
                                                        <span class="d-block d-sm-none">
                                                            <img src="assets/images/icons/title-icon.png" />
                                                        </span>
                                                        <span class="d-none d-sm-block">Select Category</span>
                                                    </a>
                                                </li>
                                                <li class="nav-item waves-effect waves-light">
                                                    <a
                                                        role="tab"
                                                        onClick={() => {
                                                            setcurrentTab(2);
                                                        }}
                                                        ref={tab2}
                                                        class="nav-link" data-toggle="tab" href="#images" role="tab">
                                                        <span class="d-block d-sm-none">
                                                            <img src="assets/images/icons/img-icon.png" />
                                                        </span>
                                                        <span class="d-none d-sm-block">Banner image</span>
                                                    </a>
                                                </li>
                                                <li class="nav-item waves-effect waves-light">
                                                    <a
                                                        role="tab"
                                                        onClick={() => {
                                                            setcurrentTab(3);
                                                        }}
                                                        ref={tab3}
                                                        class="nav-link" data-toggle="tab" href="#meta-data" role="tab">
                                                        <span class="d-block d-sm-none">
                                                            <img src="assets/images/icons/info-icon.png" />
                                                        </span>
                                                        <span class="d-none d-sm-block">Meta Information
                                                            (Optional)</span>
                                                    </a>
                                                </li>
                                                <li class="nav-item waves-effect waves-light">
                                                    <a
                                                        role="tab"
                                                        onClick={() => {
                                                            setcurrentTab(4);
                                                        }}
                                                        ref={tab4}
                                                        class="nav-link" data-toggle="tab" href="#launch" role="tab">
                                                        <span class="d-block d-sm-none">
                                                            <img src="assets/images/icons/date-icon.png" />
                                                        </span>
                                                        <span class="d-none d-sm-block">Launch</span>
                                                    </a>
                                                </li>
                                            </ul>

                                            <div class="tab-content video-tab p-3 text-muted">

                                                <div class="tab-pane active" id="title" role="tabpanel">
                                                    <div class="row">
                                                        <div class="col-lg-12">
                                                            <div class="form-group">
                                                                <label for="basicpill-phoneno-input"
                                                                    class="label-100">Select Category</label>
                                                                <div class="col-md-8">
                                                                    {
                                                                        data?.map(item => (
                                                                            <div class="custom-control custom-radio mb-2">
                                                                                <input onChange={handleRadioChange} type="radio" id={item.type} name="age"
                                                                                    class="custom-control-input" value={item.name} />
                                                                                <label class="custom-control-label"
                                                                                    for={item.type}>{item.name}</label>
                                                                            </div>
                                                                        ))
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {
                                                        radioBtn === "Movies" &&
                                                        <div class="row">
                                                            <div class="col-lg-12">
                                                                <div class="form-group">
                                                                    <label for="basicpill-phoneno-input"
                                                                        class="label-100">Search Video from Video
                                                                        Library</label>
                                                                    <input autoComplete={"Hello"} autoSave={false} onChange={handleFilter} type="text" class="form-control input-field"
                                                                        id="basicpill-phoneno-input" />
                                                                    <div className="searchedListVideos">
                                                                        {filteredVideos &&
                                                                            filteredVideos?.map((movie) =>
                                                                                <Link style={{ height: "7vh", display: "block" }}
                                                                                    onClick={() => handleClickOnMovie(movie.thumbnail, movie.title, movie._id)}
                                                                                >
                                                                                    <img src={movie.thumbnail} style={{ height: "90%", width: "6vw", marginRight: "8vw" }} />
                                                                                    <span>{movie.title}</span>
                                                                                    <span>{movie.description}</span>
                                                                                </Link>
                                                                            )
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {
                                                                booltoshowSelectedMoview &&
                                                                <div className="showData">
                                                                    <span>
                                                                        <b>Movie Image
                                                                        </b>
                                                                        <img src={SelectedMovieData.movieImage} />
                                                                    </span>
                                                                    <span>
                                                                        <b>Movie Title
                                                                        </b>
                                                                        <p> {SelectedMovieData.movieTitle}</p>
                                                                    </span>
                                                                </div>
                                                            }
                                                        </div>
                                                    }
                                                    {
                                                        radioBtn === "TV Shows" &&
                                                        <div class="row">
                                                            <div class="col-lg-12">
                                                                <div class="form-group">
                                                                    <label for="basicpill-phoneno-input"
                                                                        class="label-100">Add New Title</label>
                                                                    <input type="text" class="form-control input-field"
                                                                        id="basicpill-phoneno-input" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    }
                                                    <div class="form-group mb-30 width-100 ">
                                                        <label class="col-md-4 control-label"></label>
                                                        <div class="col-md-8">
                                                            <button type="button"
                                                                onClick={handleSubmitOne}
                                                                class="btn btn-success btn-login waves-effect waves-light mr-3">Save</button>
                                                        </div>
                                                    </div>
                                                </div>


                                                <div class="tab-pane" id="images" role="tabpanel">
                                                    <div class="panel-body p-20">
                                                        <div class="form-group mb-30 width-100 row">
                                                            <label class="col-md-4 control-label">Upload Banner
                                                                Image<br />
                                                                <span class="size">(1125 x 451 px)</span></label>
                                                            <div class="col-md-8">
                                                                <input onChange={handleChange} type="file" name="banner" class="form-control input-field"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div class="form-group mb-30 width-100 row">
                                                            <label class="col-md-4 control-label"></label>
                                                            <div class="col-md-8">
                                                                <button onClick={handleSubmitBanner} type="button"
                                                                    class="btn btn-success btn-login waves-effect waves-light mr-3">Save</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

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
                                                        <div classNameName="searchedList">
                                                            {movieList &&
                                                                movieList.map((movie) =>

                                                                    <Link style={{ height: "7vh", display: "block" }}
                                                                        onClick={() => fillMetadata(movie.id)}
                                                                    >
                                                                        <img src={movie.image} style={{ height: "90%", width: "6vw", marginRight: "8vw" }} />
                                                                        <span>{movie.title}</span>
                                                                        <span>{movie.description}</span>


                                                                    </Link>
                                                                )
                                                            }
                                                        </div>

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
                                                                                    <td><img src={actor.image} className="img-circle" height="50" /></td>
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

                                                <div class="tab-pane" id="crew" role="tabpanel">
                                                    <div class="panel-body p-20">
                                                        <div class="form-group row">
                                                            <label class="col-md-4 control-label">Crew</label>
                                                            <div class="col-md-8">

                                                                <table class="table table-hover" id="participantTable">

                                                                    <tbody>
                                                                        <tr class="participantRow">
                                                                            <td>

                                                                                <div class="crew_box">



                                                                                    <div class="checkbox">

                                                                                        <div class="input-group mb-3">
                                                                                            <input type="text"
                                                                                                class="form-control input-field"
                                                                                                placeholder="Search" />
                                                                                            <div
                                                                                                class="input-group-append">
                                                                                                <button
                                                                                                    class="btn add_btn"
                                                                                                    type="button">Add</button>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>

                                                                                    <div class="checkbox">
                                                                                        <table class="table">

                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td><img src="assets/images/avatar-2.jpg"
                                                                                                        class="img-circle"
                                                                                                        height="50" />
                                                                                                    </td>
                                                                                                    <td class="v-mid">
                                                                                                        Anil Ravipudi
                                                                                                    </td>
                                                                                                    <td>

                                                                                                    </td>
                                                                                                </tr>


                                                                                                <tr>
                                                                                                    <td><img src="assets/images/avatar-2.jpg"
                                                                                                        class="img-circle"
                                                                                                        height="50" />
                                                                                                    </td>
                                                                                                    <td class="v-mid">
                                                                                                        Sunkara
                                                                                                        Ramabrahmam</td>
                                                                                                    <td>

                                                                                                    </td>
                                                                                                </tr>





                                                                                            </tbody>
                                                                                        </table>
                                                                                    </div>



                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>

                                                                            </td>
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
                                                            <label className="col-md-4 control-label">Date</label>
                                                            <div className="col-md-8">
                                                                <div className="form-group width-100">
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
                                                                        {/* <DatePicker
                      
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
                                    /> */}

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


                                                <div class="tab-pane" id="video" role="tabpanel">
                                                    <div class="panel-body p-20">

                                                        <div class="form-group mb-30 width-100 row">
                                                            <label class="col-md-4 control-label">Upload Video<br />
                                                                <span class="size">(mp4 file format only)</span></label>
                                                            <div class="col-md-8">
                                                                <input type="file" class="form-control input-field"
                                                                    value="" />
                                                            </div>
                                                        </div>

                                                        <div class="form-group m-b-0 row">
                                                            <div class="col-md-4"></div>
                                                            <div class="col-md-8">
                                                                <a href="#"><button type="button"
                                                                    class="btn btn-success btn-login waves-effect waves-light mr-3">Save</button></a>
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
        </div >
    );
}
