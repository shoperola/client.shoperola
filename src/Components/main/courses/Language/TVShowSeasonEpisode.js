import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import { API } from '../../../../API';
import { isAutheticated } from '../../../auth/authhelper';
import Footer from '../../Footer';

function TVShowSeasonEpisode(props) {
  const { seasonIdparams } = useParams();
  const { token } = isAutheticated();
  const [episode, setEpisode] = useState([])
  const [success, setSuccess] = useState(false)
  console.log(seasonIdparams);
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
  }, [success])
  return (
    <div className="main-content">

      <div className="page-content">
        <div className="container-fluid">

          {/* <!-- start page title --> */}
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0">Content Management - TV Shows - Seasons</h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item"><Link to="/dashboard">TellyTell</Link></li>
                    <li className="breadcrumb-item">Content Management - TV Shows - Seasons - Episodes </li>


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

                  <div className="row ml-0 mr-0  mb-10">
                    <div className="col-sm-12 col-md-6">
                      <div className="dataTables_length">
                        <label className="w-100">Show <select name="" className="select-w custom-select custom-select-sm form-control form-control-sm">
                          <option value="10">10</option>
                          <option value="25">25</option>
                          <option value="50">50</option>
                          <option value="100">100</option>
                        </select> entries</label></div></div>
                    <div className="col-sm-12 col-md-6">


                      <div className="dropdown d-block">
                        <Link to={`/season/episode/add/${seasonIdparams}`}>
                          <button type="button" className="btn btn-primary add-btn waves-effect waves-light float-right">
                            <i className="fa fa-plus" aria-hidden="true"></i> Add New Episode
                          </button>
                        </Link>
                      </div>


                    </div>
                  </div>
                  <div className="table-responsive table-shoot">
                    <table className="table table-centered table-nowrap mb-0">
                      <thead className="thead-light">
                        <tr>
                          <th>Video</th>
                          <th>Episode</th>
                          <th>Action</th>
                        </tr>
                      </thead>

                      <tbody>
                        {
                          episode.map((data) =>
                            <tr key={data._id}>

                              <td>

                                <video width="67" height="50" loop controls>
                                  <source src={data.video.slice(0, 5) === 'https' ? data.video : `https://${data.video}`} type="video/mp4" />
                                  <source src="img/movie.ogg" type="video/ogg" />
                                  Your browser does not support the video tag.
                                </video>
                              </td>

                              <td>Episode {data.episodeNumber}</td>
                              <td>
                                <Link>
                                  <button type="button"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      let status = window.confirm("Do you want to delete");
                                      if (!status) {
                                        return;
                                      } else {

                                        axios
                                          .delete(
                                            `${API}/api/tvshow/delete_episode/${seasonIdparams}/${data._id}`,
                                            {
                                              headers: {
                                                Authorization: `Bearer ${token}`,
                                              },
                                            }
                                          )
                                          .then((res) => {
                                            setSuccess(!success);
                                            swal({
                                              title:
                                                "Video deleted Successfully!",

                                              icon: "success",
                                              buttons: true,
                                              successMode: true,
                                              dangerMode: false,
                                            });
                                            // console.log(res);
                                          })
                                          .catch((err) => {
                                            console.log(err);
                                            setSuccess(!success);
                                          });

                                      }


                                    }}
                                    className="btn btn-danger btn-sm  waves-effect waves-light btn-table ml-2"
                                    id="sa-params"
                                  >
                                    Delete</button>
                                </Link>
                              </td>
                            </tr>

                          )
                        }


                      </tbody>
                    </table>
                  </div>


                  <div className="row mt-20">
                    <div className="col-sm-12 col-md-6 mb-20">
                      <div className="dataTables_info" id="datatable_info" role="status" aria-live="polite">Showing 1 to 10 of 57 entries</div>
                    </div>

                    <div className="col-sm-12 col-md-6">
                      <div className="dataTables_paginate paging_simple_numbers float-right">
                        <ul className="pagination">

                          <li className="paginate_button page-item previous disabled">
                            <a href="#" aria-controls="datatable" data-dt-idx="0" tabIndex="0" className="page-link">Previous</a>
                          </li>

                          <li className="paginate_button page-item active">
                            <a href="#" aria-controls="datatable" data-dt-idx="1" tabIndex="0" className="page-link">1</a>
                          </li>

                          <li className="paginate_button page-item ">
                            <a href="#" aria-controls="datatable" data-dt-idx="2" tabIndex="0" className="page-link">2</a>
                          </li>

                          <li className="paginate_button page-item ">
                            <a href="#" aria-controls="datatable" data-dt-idx="3" tabIndex="0" className="page-link">3</a>
                          </li>


                          <li className="paginate_button page-item next">
                            <a href="#" tabIndex="0" className="page-link">Next</a>
                          </li>

                        </ul>
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
  );
}

export default TVShowSeasonEpisode;