import React from "react";
import { Link } from "react-router-dom";
import { API } from "../../../../API";
import axios from "axios";
import swal from "sweetalert";

const ShowTVShow = (props) => {
  const { data, token, success, setSuccess } = props;
  return (
    <tr key={data._id}>
      <td>{data.title}</td>
      <td>
        <img alt="" src={data.thumbnail} width="110" height="60" />
      </td>
      <td>TV Shows</td>
      <td>{new Date(data.date).toDateString()}</td>
      <td>
        {data.status ? (
          <span className="badge badge-pill badge-primary font-size-12">
            Live
          </span>
        ) : (
          <span className="badge badge-pill badge-soft-success font-size-12">
            Scheduled
          </span>
        )}
      </td>
      <td>
        {data.status && (
          <button
            type="button"
            className="btn btn-success btn-sm  waves-effect waves-light btn-table"
            onClick={(e) => {
              console.log("suspend");
              e.preventDefault();

              axios
                .patch(
                  `${API}/api/tvshow/metadata/${data._id}`,
                  { status: false },
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
                    title: "TvShow suspend Successfully!",

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
        )}
        {!data.status && (
          <button
            type="button"
            className="btn btn-success btn-sm  waves-effect waves-light btn-table"
            onClick={(e) => {
              console.log("suspend");
              e.preventDefault();

              axios
                .patch(
                  `${API}/api/tvshow/makelive/${data._id}`,
                  { status: true },
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
                    title: "TvShow Live!",

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
        )}
        <Link to={`/language/tvshow/${data._id}`}>
          <button
            type="button"
            className="btn btn-info btn-sm  waves-effect waves-light btn-table ml-2"
          >
            Seasons
          </button>
        </Link>
        <Link to={`/edit-schedule-video/view_tvshow/${data._id}`}>
          <button
            type="button"
            className="btn btn-primary btn-sm  waves-effect waves-light btn-table ml-2"
          >
            Edit
          </button>
        </Link>

        <Link to="#">
          <button
            type="button"
            className="btn btn-danger btn-sm  waves-effect waves-light btn-table ml-2"
            id="sa-params"
            onClick={(e) => {
              e.preventDefault();
              let status = window.confirm("Do you want to delete");
              if (!status) {
                return;
              } else {
                axios
                  .delete(`${API}/api/tvshow/delete_tvshow/${data._id}`, {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  })
                  .then((res) => {
                    setSuccess(!success);
                    swal({
                      title: "Video deleted Successfully!",

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
            Delete
          </button>
        </Link>
      </td>
    </tr>
  );
};

export default ShowTVShow;
