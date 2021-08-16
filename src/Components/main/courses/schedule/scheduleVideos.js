import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../../../../API";
import axios from "axios";

import Pagination from "../../../pagination";
import swal from "sweetalert";
import Footer from "../../Footer";
import { isAutheticated } from "../../../auth/authhelper";


export default function ScheduleVideos() {

    const { token } = isAutheticated();
    const [data, setData] = useState([]);
    const [Currentpage, setCurrentpage] = useState(1);
    const [success, setSuccess] = useState(false);
    const [Viewerperpage, setViewerperpage] = useState(10);
    const [tvshow, setTvshow] = useState([]);

    useEffect(() => {
        axios
            .get(`${API}/api/tvshow/viewall_Tvshow`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                const userdata = response.data.show;
                console.log(response.data);
                setTvshow(userdata);
                //console.log(response.data.show);
                //setLanguages(userdata.languages);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

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
                    setData([...response.data.data]);
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        fetchData()
    }, [success, !success]);

    const lastindex = Currentpage * Viewerperpage;
    const firstindex = lastindex - Viewerperpage;

    const currentviewer = data.slice(firstindex, lastindex);

    const paginate = (pageNumber) => setCurrentpage(pageNumber);

    const pagechange = (e) => {
        e.preventDefault();

        setViewerperpage(e.target.value);
    };

    const handledeleteMovie = (id) => {
        axios.patch(`${API}/api/lesson/metadata/${id}`, {
            "Id": "",
            "directors": "",
            "type": "",
            "year": "",
            "image": ""
            , "genres": "",
            "Languages": "",
            "RuntimeStr": "",
            "Plot": ""
            , "Actors_list": "",
            "Writers": "",
            "Ratings": "",
            "launchDate": null,
            "launch_flag": false,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                console.log("here sub,it response", res);
                window.location.reload()
            })
            .catch((err) => {
                window.location.reload()
            });
    }

    return (


        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-flex align-items-center justify-content-between">
                                <h4 className="mb-0">Content Management - Schedule
                                </h4>

                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item">
                                            <Link to="/dashboard">TellyTell</Link>
                                        </li>
                                        <li className="breadcrumb-item">Content Management - Schedule
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
                                    <div className="row ml-0 mr-0  mb-10">
                                        <div className="col-sm-12 col-md-6">
                                            <div className="dataTables_length">
                                                <label className="w-100">
                                                    Show{" "}
                                                    <select
                                                        style={{ width: "60px" }}
                                                        name=""
                                                        onChange={pagechange}
                                                        className="select-w custom-select custom-select-sm form-control form-control-sm"
                                                    >
                                                        <option value="10">10</option>
                                                        <option value="25">25</option>
                                                        <option value="50">50</option>
                                                        <option value="100">100</option>
                                                    </select>{" "}
                                                    entries
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-sm-12 col-md-6">
                                            <div className="dropdown d-block">
                                                <Link to="/add-schedule-video">
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary add-btn waves-effect waves-light float-right"
                                                    >
                                                        <i className="fa fa-plus" aria-hidden="true"></i> Add
                                                        New
                                                    </button>
                                                </Link>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="table-responsive table-shoot">
                                        <table className="table table-centered table-nowrap mb-0">
                                            <thead className="thead-light">
                                                <tr>
                                                    <th>Title</th>
                                                    <th>Thumbnail</th>
                                                    <th>Category</th>
                                                    <th>Launch Date</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data.length != 0 &&
                                                    currentviewer.map((lession) => {
                                                        return (
                                                            lession.Id !== "" &&
                                                            <>
                                                                <tr key={lession._id}>
                                                                    <td>{lession.title}</td>
                                                                    <td>
                                                                        <img alt=""
                                                                            src={lession.thumbnail ? lession.thumbnail : "https://sgp1.digitaloceanspaces.com/storage.tellytell.com/thumbnail-default.png"}
                                                                            style={{ width: "67px", height: "67px" }}
                                                                        />
                                                                    </td>
                                                                    <td>Movies</td>
                                                                    <td>{new Date(lession.launchDate).toDateString()}</td>
                                                                    {/* <td>{lession?.subject?.name}</td> */}
                                                                    <td>
                                                                        {!lession.launch_flag && lession.launchDate && lession.live &&
                                                                            <span className="badge badge-pill badge-primary font-size-12">
                                                                                Scheduled
                                                                            </span>

                                                                        }
                                                                        {lession.live && !lession.launchDate &&
                                                                            <span className="badge badge-pill badge-primary font-size-12">
                                                                                Live
                                                                            </span>
                                                                        }
                                                                        {lession.launch_flag && lession.live &&
                                                                            <span className="badge badge-pill badge-primary font-size-12">
                                                                                Live
                                                                            </span>
                                                                        }
                                                                        {!lession.live && <span className="badge badge-pill badge-soft-success font-size-12">
                                                                            Suspended
                                                                        </span>

                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {lession.live &&
                                                                            <button
                                                                                type="button"
                                                                                onClick={(e) => {
                                                                                    e.preventDefault();

                                                                                    axios
                                                                                        .patch(
                                                                                            `${API}/api/lesson/${lession._id}`, {},
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
                                                                                                    "Video suspend Successfully!",

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
                                                                                }}
                                                                                className="btn btn-success btn-sm  waves-effect waves-light btn-table"
                                                                            >
                                                                                Suspend
                                                                            </button>
                                                                        }
                                                                        {!lession.live &&
                                                                            <button
                                                                                type="button"
                                                                                onClick={(e) => {
                                                                                    e.preventDefault();

                                                                                    axios
                                                                                        .patch(
                                                                                            `${API}/api/lesson/makelive/${lession._id}`, {},
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
                                                                                                    "Video is live!",

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
                                                                                }}
                                                                                className="btn btn-success btn-sm  waves-effect waves-light btn-table"
                                                                            >
                                                                                Make Live
                                                                            </button>
                                                                        }
                                                                        <Link to={`/lessions/edit/${lession._id}`}>
                                                                            <button
                                                                                type="button"
                                                                                className="btn btn-primary btn-sm  waves-effect waves-light btn-table ml-2"
                                                                            >
                                                                                Edit
                                                                            </button>
                                                                        </Link>
                                                                        <button
                                                                            onClick={() => handledeleteMovie(lession._id)}
                                                                            type="button"
                                                                            className="btn btn-danger btn-sm  waves-effect waves-light btn-table ml-2"
                                                                            id="sa-params"
                                                                        >
                                                                            Delete
                                                                        </button>
                                                                        <Link to={`/lessions/add-studio/${lession._id}`}>
                                                                            <button
                                                                                type="button"
                                                                                className="btn btn-primary btn-sm  waves-effect waves-light btn-table ml-2"
                                                                            >
                                                                                Studio
                                                                            </button>
                                                                        </Link>
                                                                    </td>
                                                                </tr>


                                                            </>
                                                        );
                                                    })}
                                                {
                                                    tvshow?.map(data => (
                                                        <tr>
                                                            <td>{data.title}</td>
                                                            <td>
                                                                <img alt="" src={data.thumbnail} style={{ width: "67px", height: "67px" }} />
                                                            </td>
                                                            <td>TV Shows</td>
                                                            <td>{new Date(data.date).toDateString()}</td>
                                                            <td>{data.status ? <span className="badge badge-pill badge-primary font-size-12">Live</span> :
                                                                <span className="badge badge-pill badge-soft-success font-size-12">Scheduled</span>}</td>
                                                            <td>
                                                                {data.status &&
                                                                    <button type="button" className="btn btn-success btn-sm  waves-effect waves-light btn-table"
                                                                        onClick={(e) => {
                                                                            console.log("suspend");
                                                                            e.preventDefault();

                                                                            axios
                                                                                .patch(
                                                                                    `${API}/api/tvshow/metadata/${data._id}`, { status: false },
                                                                                    {
                                                                                        headers: {
                                                                                            Authorization: `Bearer ${token}`,
                                                                                            "Content-Type": "application/json",
                                                                                        },
                                                                                    }
                                                                                )
                                                                                .then((res) => {
                                                                                    setSuccess(!success);
                                                                                    swal({
                                                                                        title:
                                                                                            "TvShow suspend Successfully!",

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
                                                                        }}
                                                                    >
                                                                        Suspend
                                                                    </button>
                                                                }
                                                                {!data.status &&
                                                                    <button type="button" className="btn btn-success btn-sm  waves-effect waves-light btn-table"
                                                                        onClick={(e) => {
                                                                            console.log("suspend");
                                                                            e.preventDefault();

                                                                            axios
                                                                                .patch(
                                                                                    `${API}/api/tvshow/makelive/${data._id}`, { status: true },
                                                                                    {
                                                                                        headers: {
                                                                                            Authorization: `Bearer ${token}`,
                                                                                            "Content-Type": "application/json",
                                                                                        },
                                                                                    }
                                                                                )
                                                                                .then((res) => {
                                                                                    setSuccess(!success);
                                                                                    swal({
                                                                                        title:
                                                                                            "TvShow Live!",

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
                                                                        }}
                                                                    >
                                                                        MakeLive
                                                                    </button>
                                                                }
                                                                <Link to={`/language/tvshow/${data._id}`}>
                                                                    <button type="button" className="btn btn-info btn-sm  waves-effect waves-light btn-table ml-2">
                                                                        Seasons</button>
                                                                </Link>
                                                                <Link to={`/languages/edit/${data._id}`}>
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-primary btn-sm  waves-effect waves-light btn-table ml-2"
                                                                    >
                                                                        Edit
                                                                    </button>
                                                                </Link>

                                                                <Link to="#">
                                                                    <button type="button"
                                                                        className="btn btn-danger btn-sm  waves-effect waves-light btn-table ml-2"
                                                                        id="sa-params"
                                                                        onClick={(e) => {
                                                                            e.preventDefault();
                                                                            let status = window.confirm("Do you want to delete");
                                                                            if (!status) {
                                                                                return;
                                                                            } else {
                                                                                axios
                                                                                    .delete(
                                                                                        `${API}/api/tvshow/delete_tvshow/${data._id}`,
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
                                                                    >
                                                                        Delete</button>
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }

                                            </tbody>
                                        </table>
                                    </div>

                                    <Pagination
                                        User={data}
                                        postsPerPage={Viewerperpage}
                                        totalPosts={data.length}
                                        paginate={paginate}
                                    />

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