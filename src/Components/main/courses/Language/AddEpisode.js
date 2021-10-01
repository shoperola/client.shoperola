import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import swal from "sweetalert";
import Player from "video-react/lib/components/Player";
import { API } from "../../../../API";
import { isAutheticated } from "../../../auth/authhelper";
import ClipLoader from "react-spinners/ClipLoader";
import Footer from "../../Footer";

function AddEpisode(props) {
  const { seasonIdparams } = useParams();
  const { token } = isAutheticated();
  const [episodeData, setEpisodeData] = useState(new FormData());
  let history = useHistory();
  const [lession, setLession] = useState({
    video: "",
  });
  const [loading, setLoading] = useState(false);
  const [seasonId, setEpisode] = useState([]);

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

  useEffect(() => {
    axios
      .get(`${API}/api/tvshow/view_season/${seasonIdparams}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const userdata = response.data;
        setEpisode(userdata.episode);
        console.log(response);
        //setLanguages(userdata.languages);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${API}/api/tvshow/view_tvshow/${seasonIdparams}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        //setLanguages(userdata.languages);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {};
    fetchData();
  }, []);

  /////// for video episode //////////////////////
  const onUpdateVideo = (e) => {
    e.preventDefault();
    //console.log("seasonid", seasonIdparams)
    setLoading(true);
    // setSuccess(false);
    // if(metaDataTitle){
    //    episodeData.set("title",metaDataTitle)
    // }else{
    //   episodeData.set("title",lession.title)
    // }
    // if(metaDataPlot){
    //    episodeData.set("plot",metaDataPlot)
    // }else{
    //   episodeData.set("plot",lession.plot_show)
    // }
    axios
      .patch(`${API}/api/tvshow/edit_video/${seasonIdparams}`, episodeData, {
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
          history.goBack();
          //   history.push("/alllanguages");
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
                <h4 className="mb-0">TV Shows - Seasons - Add</h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <a href="javascript: void(0);">Shoperola</a>
                    </li>
                    <li className="breadcrumb-item">TV Shows - Seasons</li>

                    <li className="breadcrumb-item">Add New Season</li>
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
                    <div className="col-md-12 col-lg-6 col-xl-6">
                      <form>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group">
                              <label
                                for="basicpill-phoneno-input"
                                className="label-100"
                              >
                                Episode Number
                              </label>
                              <input
                                type="number"
                                className="form-control input-field"
                                name="episodeNumber"
                                onChange={handleChangeEpisode}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-12">
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
                                  onChange={handleChangeEpisode}
                                  name="video"
                                  className="form-control input-field"
                                />
                                <Player key={lession.video}>
                                  <source src={lession.video} />
                                </Player>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group text-left">
                              <Link>
                                <button
                                  type="button"
                                  onClick={onUpdateVideo}
                                  className="btn btn-success btn-login waves-effect waves-light mr-3"
                                >
                                  <ClipLoader loading={loading} size={18} />
                                  {!loading && "Save"}
                                </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </form>
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
  );
}

export default AddEpisode;
