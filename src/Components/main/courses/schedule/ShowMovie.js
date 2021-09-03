import React from "react";
import { Link } from "react-router-dom";
import { API } from "../../../../API";
import axios from "axios";
import swal from "sweetalert";

const ShowMovie = (props) => {
  const { lession, handledeleteMovie, token, success, setSuccess } = props;
  return (
    <tr key={lession._id}>
      <td>{lession.title}</td>
      <td>
        <img
          alt=""
          src={
            lession.thumbnail
              ? lession.thumbnail
              : "https://sgp1.digitaloceanspaces.com/storage.tellytell.com/thumbnail-default.png"
          }
          width="110"
          height="60"
        />
      </td>
      <td>Movies</td>
      <td>
        {lession.launchDate
          ? new Date(lession.launchDate).toDateString(lession.launchDate)
          : "Not Declared"}
      </td>
      {/* <td>{lession?.subject?.name}</td> */}
      <td>
        {!lession.launch_flag && lession.launchDate && lession.live && (
          <span className="badge badge-pill badge-primary font-size-12">
            Scheduled
          </span>
        )}
        {lession.live && !lession.launchDate && (
          <span className="badge badge-pill badge-primary font-size-12">
            Live
          </span>
        )}
        {lession.launch_flag && lession.live && (
          <span className="badge badge-pill badge-primary font-size-12">
            Live
          </span>
        )}
        {!lession.live && (
          <span className="badge badge-pill badge-soft-success font-size-12">
            Suspended
          </span>
        )}
      </td>
      <td>
        {lession.live && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();

              axios
                .patch(
                  `${API}/api/lesson/${lession._id}`,
                  {},
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                )
                .then((res) => {
                  setSuccess(!success);
                  swal({
                    title: "Video suspend Successfully!",

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
        )}
        {!lession.live && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();

              axios
                .patch(
                  `${API}/api/lesson/makelive/${lession._id}`,
                  {},
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                )
                .then((res) => {
                  setSuccess(!success);
                  swal({
                    title: "Video is live!",

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
        )}
        <Link to={`/edit-schedule-video/lesson/${lession._id}`}>
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
  );
};

export default ShowMovie;
