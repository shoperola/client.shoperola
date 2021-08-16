import React, { useEffect, useState } from "react";
import Sidebar from "../../Sidebar";
import Header from "../../Header";
import { Player } from "video-react";
import axios from "axios";
import { API } from "../../../../API";
import { isAutheticated } from "../../../auth/authhelper";
import { useParams } from "react-router-dom";
import Footer from "../../Footer";
export default function ViewLession() {
  const { token } = isAutheticated();
  const { lessionId } = useParams();
  const [lession, setLession] = useState({
    madeBy: null,
    title: "",
    description: "",
    subject: "",
    language: "",
    live: false,
    thumbnail: "",
    banner: "",
    launchDate: new Date(),
    video: "",
  });
  useEffect(() => {
    axios
      .get(`${API}/api/lesson/${lessionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // console.log(response);
        setLession({
          ...response.data.data,
          subject: response.data.data.subject,
          language: response.data.data.language,
          launchDate: new Date(response.data.data.launchDate),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0">Courses - Lessons</h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <a href="javascript: void(0);">TellyTell</a>
                    </li>
                    <li className="breadcrumb-item">Courses - Lessons</li>

                    <li className="breadcrumb-item">View Lesson</li>
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
                      <h1 className="text-left head-small">View Lesson </h1>

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

                        <li className="nav-item waves-effect waves-light">
                          <a
                            className="nav-link"
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
                            className="nav-link"
                            data-toggle="tab"
                            href="#launch"
                            role="tab"
                          >
                            <span className="d-block d-sm-none">
                             <img alt="" src="assets/images/icons/date-icon.png" />
                            </span>
                            <span className="d-none d-sm-block">Launch Date</span>
                          </a>
                        </li>

                        <li className="nav-item waves-effect waves-light">
                          <a
                            className="nav-link"
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
                      </ul>

                      <div className="tab-content video-tab p-3 text-muted">
                        <div className="tab-pane active" id="title" role="tabpanel">
                          <div className="panel-body p-20">
                            <div className="form-group mb-30 width-100 row">
                              <label className="col-md-4 control-label">
                                Title
                              </label>
                              <div className="col-md-8">{lession.title}</div>
                            </div>

                            <div className="form-group mb-30 width-100 row">
                              <label className="col-md-4 control-label">
                                Descritpion
                              </label>
                              <div className="col-md-8">{lession.description}</div>
                            </div>

                            <div className="form-group mb-30 width-100 row">
                              <label className="col-md-4 control-label">
                                Subject
                              </label>
                              <div className="col-md-8">
                                {lession &&
                                  lession.subject &&
                                  lession.subject.name}
                              </div>
                              {/* {console.log(lession)} */}
                            </div>

                            <div className="form-group mb-30 width-100 row">
                              <label className="col-md-4 control-label">
                                Language
                              </label>
                              <div className="col-md-8">
                                {lession &&
                                  lession.language &&
                                  lession.language.name}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="tab-pane" id="images" role="tabpanel">
                          <div className="panel-body p-20">
                            <div className="form-group mb-30 width-100 row">
                              <label className="col-md-4 control-label">
                                Thumbnail Image
                                <br />
                              </label>
                              <div className="col-md-8">
                                <div className="col-md-12 p-0 mt-20">
                                 <img alt="" src={lession.thumbnail} height="100" />
                                </div>
                              </div>
                            </div>

                            <div className="form-group mb-30 width-100 row">
                              <label className="col-md-4 control-label">
                                Banner Image
                                <br />
                              </label>
                              <div className="col-md-8">
                                <div className="col-md-12 p-0 mt-20">
                                 <img alt="" src={lession.banner} height="100" />
                                </div>
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
                                  {`${lession.launchDate}`}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="tab-pane" id="video" role="tabpanel">
                          <div className="panel-body p-20">
                            <div className="form-group mb-30 width-100 row">
                              <label className="col-md-4 control-label">
                                Video
                                <br />
                              </label>
                              <div className="col-md-8">
                                <div className="col-md-12 p-0 mt-20">
                                  <Player key={lession.video}>
                                    <source src={lession.video} />
                                  </Player>
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
          </div>
        </div>
      </div>

      {/* <footer className="footer">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <script>document.write(new Date().getFullYear())</script> © TellyTell.
            </div>
          </div>
        </div>
      </footer> */}
      <Footer />
    </div>
  );
}
