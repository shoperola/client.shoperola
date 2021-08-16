import React, { useEffect, useState } from "react";
import Sidebar from "../../Sidebar";
import Header from "../../Header";
import axios from "axios";
import { API } from "../../../../API";
import { isAutheticated } from "../../../auth/authhelper";
import { Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import swal from "sweetalert";
import ClipLoader from "react-spinners/ClipLoader";
import { useHistory, useParams } from "react-router-dom";
import { Player } from "video-react";
import { Link } from "react-router-dom";
import Footer from "../../Footer";
// import DateTime from "react-datetime-picker/dist/DateTimePicker";
// import DatePicker from "react-datetime"
// import "react-datetime/css/react-datetime.css";
// import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
// import { DateTimePicker } from "@syncfusion/ej2-calendars";

export default function EditLession() {
  const { token } = isAutheticated();
  const { lessionId } = useParams();
  const [success, setSuccess] = useState(false);
  const [lession, setLession] = useState({
    madeBy: null,
    title: "",
    description: "",
    subject: "",
    languageid: "",
    live: false,
    thumbnail: "",
    banner: "",
    launchDate: new Date(),
    video: "",
    directors: "",
    Writers: "",
    Actors_list: [],
    Plot: "",

  });

  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [formData, setFormData] = useState(new FormData());
  const [validForm, setvalidForm] = useState(false);
  const [error, setError] = useState("");
  const [metaDataTitle, setmetaDataTitle] = useState("");
  const [metaDataPlot, setmetaDataPlot] = useState("");
  const [metaDataDirector, setmetaDataDirector] = useState("");
  const [metaDataWriter, setmetaDataWriter] = useState("");
  const [metaDataCrew, setmetaDataCrew] = useState([]);
  const [metaformData, setMetaformData] = useState({});
  const [searchMovie, setSearchMovie] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [fill, setFill] = useState(false);

  const fillMetadata = (id) => {
    setMovieList([]);
    axios.post(`${API}/api/lesson/search_metadata_id/${id}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        // console.log("here meta data", response)
        const data = response.data;
        setmetaDataTitle(data.title);
        setmetaDataPlot(data.plot);
        setmetaDataDirector(data.directors);
        setmetaDataWriter(data.writers);
        setmetaDataCrew(data.actorList);
        setFill(true);
        //   setMetaformData({...metaformData,"Id":data.id,"directors":data.directors,"type":data.type,"year":data.year,"image":data.image
        //   ,"genres":data.genres,"Languages":data.languages,"RuntimeStr":data.runtimeStr,"Plot":data.plot
        //   ,"Actors_list":data.actorList,"Writers":data.writers,"Ratings":data.ratings
        //  })
        formData.set("Id", data.id)
        formData.set("directors", data.directors)
        formData.set("type", data.type)
        formData.set("year", data.year)
        formData.set("genres", data.genres)
        formData.set("Languages", data.languages)
        formData.set("RuntimeStr", data.runtimeStr)
        formData.set("Plot", data.plot)
        if (data.actorList) {
          formData.set("Actors_list", data.actorList)
        } else {
          formData.set("Actors_list", [])
        }

        formData.set("Writers", data.writers)
        formData.set("Ratings", data.ratings)
        //data.actorList


      })
      .catch((err) => {
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
      })
      .catch((err) => {
        console.log(err);
      });

  }


  useEffect(() => {
    // $("#summernote").summernote();
    console.log(lession.launchDate);

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

  useEffect(() => {
    axios
      .get(`${API}/api/lesson/${lessionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        //console.log(response);
        setLession({
          ...response.data.data,
          // subject: response.data.data.subject._id,
          languageid: response.data.data.languageid,
          launchDate: new Date(response.data.data.launchDate).toISOString().slice(0, 16),
          // launchDate:new Date("yyyy-MM-dd hh:mm").formate(new Date("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'").parse(response.data.data.launchDate))
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [success, !success]);

  const handleChange = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    //console.log(value,name);

    if (name == "video") {
      setLession({ ...lession, video: URL.createObjectURL(e.target.files[0]) });
      formData.set("video", e.target.files[0]);
    } else if (name == "thumbnail") {
      // console.log(e.target.files);
      setLession({
        ...lession,
        thumbnail: URL.createObjectURL(e.target.files[0]),
      });
      formData.set(name, e.target.files[0]);
    } else if (name == "banner") {
      setLession({
        ...lession,
        [name]: URL.createObjectURL(e.target.files[0]),
      });
      formData.set(name, e.target.files[0]);
    } else {
      setLession({ ...lession, [name]: value });
      // console.log(name, value);
      formData.set(name, value);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    console.log("here sending data", formData)
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
        setSuccess(!success);
        swal({
          title: "Video updated Successfully!",

          icon: "success",
          buttons: true,
          successMode: true,
          dangerMode: false,
        }).then((value) => {
          history.push("/lessions");
        });
      })
      .catch((err) => {
        setLoading(false);
        setSuccess(!success);
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
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0">Content Management - Videos</h4>
                {/* {console.log(subjects)} */}
                {/* {console.log(languages)} */}
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">TellyTell</Link>
                    </li>
                    <li className="breadcrumb-item">Content Management - Videos</li>
                    <li className="breadcrumb-item">Edit Video</li>
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
                      <h1 className="text-left head-small">Edit Video </h1>

                      <ul className="nav nav-tabs" role="tablist">
                        <li className="nav-item waves-effect waves-light">
                          <a
                            className="nav-link active"
                            data-toggle="tab"
                            href="#title"
                            role="tab"
                          >
                            <span className="d-block d-sm-none">
                              <img alt="" src="assets/images/icons/title-icon.png" />
                            </span>
                            <span className="d-none d-sm-block">Title</span>
                          </a>
                        </li>
                        {/* <li className="nav-item waves-effect waves-light">
                          <a className="nav-link"

                            data-toggle="tab"
                            href="#meta-data"
                            role="tab">
                            <span className="d-block d-sm-none">
                              <img alt="" src="assets/images/icons/info-icon.png" />
                            </span>
                            <span className="d-none d-sm-block">Meta Data</span>
                          </a>
                        </li> */}

                        <li className="nav-item waves-effect waves-light">
                          <a
                            className={`nav-link `}
                            data-toggle="tab"
                            href="#images"
                            role="tab"
                          >
                            <span className="d-block d-sm-none">
                              <img alt="" src="assets/images/icons/img-icon.png" />
                            </span>
                            <span className="d-none d-sm-block">Images</span>
                          </a>
                        </li>

                        <li className="nav-item waves-effect waves-light">
                          <a
                            className={`nav-link `}
                            data-toggle="tab"
                            href="#video"
                            role="tab"
                          >
                            <span className="d-block d-sm-none">
                              <img alt="" src="assets/images/icons/video-icon.png" />
                            </span>
                            <span className="d-none d-sm-block">Video</span>
                          </a>
                        </li>
                        {/* <li className="nav-item waves-effect waves-light">
                          <a
                            className={`nav-link ${lession.thumbnail.length != 0 &&
                              lession.video.length != 0
                              ? ""
                              : "disabled"
                              }`}
                            data-toggle="tab"
                            href="#launch"
                            role="tab"
                          >
                            <span className="d-block d-sm-none">
                              {console.log(lession)}
                              <img alt="" src="assets/images/icons/date-icon.png" />
                            </span>
                            <span className="d-none d-sm-block">Launch Date</span>
                          </a>
                        </li> */}
                      </ul>

                      <div className="tab-content video-tab p-3 text-muted">
                        <div className="tab-pane active" id="title" role="tabpanel">
                          <div className="panel-body p-20">
                            <div className="form-group mb-30 width-100 row">
                              <label className="col-md-4 control-label">
                                Title
                              </label>
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
                              <label className="col-md-4 control-label">
                                Description(optional)
                              </label>
                              <div className="col-md-8">
                                <textarea
                                  onChange={handleChange}
                                  value={lession.description}
                                  name="description"
                                  className="form-control input-field"
                                  rows="5"
                                ></textarea>
                              </div>
                            </div>



                            <div className="form-group width-100 mb-30 row">
                              <label className="col-md-4 control-label">
                                Select Language
                              </label>
                              <div className="col-md-8">
                                <select
                                  className="form-control input-field"
                                  // defaultValue=""
                                  name="languageid"
                                  onChange={handleChange}
                                  value={lession.languageid}
                                >

                                  <option value="">
                                    Select Language
                                  </option>
                                  {languages.length != 0 &&
                                    languages.map((lang, index) => {
                                      return (
                                        <option value={lang._id} key={lang._id}>
                                          {lang.name}
                                        </option>
                                      );
                                    })}
                                </select>
                              </div>
                            </div>

                          </div>
                        </div>
                        {/*/////////////////////////////// meta dat start here //////////////////// */}
                        <div className="tab-pane" id="meta-data" role="tabpanel">
                          <div className="panel-body p-20">

                            <div className="form-group mb-30 width-100 row">
                              <label className="col-md-4 control-label">Search Title</label>
                              <div className="col-md-8">
                                <input type="text"
                                  className="form-control input-field"
                                  value={searchMovie}
                                  onChange={(e) => { handleSearchMovie(e.target.value); setSearchMovie(e.target.value) }}
                                />
                              </div>
                            </div>
                            {
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
                                {fill ? metaDataTitle : lession.title}
                              </div>
                            </div>

                            <div className="form-group mb-30 width-100 row">
                              <label className="col-md-4 control-label">Plot</label>
                              <div className="col-md-8">
                                {fill ? metaDataPlot : lession.Plot}
                              </div>
                            </div>

                            <div className="form-group mb-30 width-100 row">
                              <label className="col-md-4 control-label">Director</label>
                              <div className="col-md-8">
                                <div className="table-responsive table-shoot">
                                  <table className="table">
                                    <tbody>
                                      <tr>
                                        {/* <td><img alt="" src="assets/images/avatar-2.jpg" className="img-circle" height="50"/></td> */}
                                        <td>
                                          {fill ? metaDataDirector : lession.directors}
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
                                        {/* <td><img alt="" src="assets/images/avatar-2.jpg" className="img-circle" height="50"/></td> */}
                                        <td>
                                          {fill ? metaDataWriter : lession.Writers}
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
                                      {fill ? metaDataCrew && metaDataCrew.map((actor) =>
                                        <tr>
                                          <td><img alt="" src={actor.image} className="img-circle" height="50" /></td>
                                          <td>
                                            {actor.name}
                                          </td>
                                          <td>Actor</td>
                                        </tr>
                                      ) :
                                        lession.Actors_list && lession.Actors_list.map((actor) =>
                                          <tr key={actor.id}>
                                            <td><img alt="" src={actor.image} className="img-circle" height="50" /></td>
                                            <td>
                                              {actor.name}
                                            </td>
                                            <td>Actor</td>
                                          </tr>
                                        )

                                      }
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>

                            <div className="form-group width-100 mb-30 row">
                              <label className="col-md-4 control-label"></label>
                              <div className="col-md-8">

                                {/* <Link><button type="button"
className="btn btn-success btn-login waves-effect waves-light mr-3">Save</button>
</Link> */}

                              </div>
                            </div>

                          </div>
                        </div>
                        {/*/////////////////////////////// meta dat end here //////////////////// */}

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
                                    className="img-fluid mt-2"
                                    style={{
                                      height: "125px",
                                      width: "235px",
                                    }}
                                    alt="200x200"
                                    src={lession.thumbnail}
                                  />
                                </div>
                              </div>
                            </div>

                            {/* <div className="form-group mb-30 width-100 row">
                              <label className="col-md-4 control-label">
                                Upload Banner Image
                                <br />
                                <span className="size">(1125 x 451 px)</span>
                              </label>
                              <div className="col-md-8">
                                <input
                                  type="file"
                                  name="banner"
                                  onChange={handleChange}
                                  className="form-control input-field"
                                />
                                <div>
                                  <img
                                    className="img-fluid mt-2"
                                    style={{
                                      width: "235px",
                                      height: "125px",
                                    }}
                                    alt="200x200"
                                    src={lession.banner}
                                  />
                                </div>
                              </div>
                            </div> */}

                            {/* <div className="form-group mb-30 width-100 row">
                              <label className="col-md-4 control-label"></label>
                              <div className="col-md-8">
                                <button
                                  disabled={validForm}
                                  type="button"
                                  className="btn btn-success btn-login waves-effect waves-light mr-3"
                                >
                                  Save
                                </button>
                              </div>
                            </div> */}
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
                                      // selected={lession.launchDate}
                                      type="datetime-local"
                                      value={lession.launchDate}
                                      name="launchDate"
                                      onChange={(e) => {
                                        console.log(lession.launchDate)
                                        console.log(e.target.value)
                                        setLession({
                                          ...lession,
                                          launchDate: e.target.value,
                                        });
                                        formData.set(
                                          "launchDate",
                                          e.target.value
                                        );
                                      }}

                                    />
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

                            </div>
                          </div>
                        </div>

                        <div className="tab-pane" id="video" role="tabpanel">
                          <div className="panel-body p-20">
                            <div className="form-group mb-30 width-100 row">
                              <label className="col-md-4 control-label">
                                Upload Video
                                <br />
                                <span className="size">(mp4 file format only)</span>
                              </label>
                              <div className="col-md-8">
                                <input
                                  type="file"
                                  onChange={handleChange}
                                  name="video"
                                  className="form-control input-field"
                                />
                                <Player key={lession.video}>
                                  {/* <source src={lession.video} /> */}
                                  <source src={lession.video.slice(0, 5) === 'https' ? lession.video : `https://${lession.video}`} type="video/mp4" />
                                </Player>
                              </div>
                            </div>

                            <div className="form-group m-b-0 row">
                              <div className="col-md-4"></div>

                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="form-group row ">
                        <div className="col-md-4"></div>
                        <div className="col-md-8 text-left pl-3">
                          <div className="form-group width-100">
                            <span className="text-danger">{error}</span>
                            <br />
                            <br />
                            <button
                              onClick={onSubmit}
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
}
