import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../../../API";
import { isAutheticated } from "../../auth/authhelper";
import Footer from "../Footer";
import swal from "sweetalert";

const Text = () => {
  const { token } = isAutheticated();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`${API}/api/user/viewalltext`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setData(res.data.data);
        });
    };

    fetchData();
  }, [token, data]);

  const handleDelete = (id) => {
    const check = window.confirm("Are you sure you want to delete this?");

    if (check === false) {
      return;
    }

    axios
      .delete(`${API}/api/user/deletetext/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(async (res) => {
        const done = await swal({
          title: "Deleted Successfully!",
          icon: "success",
          buttons: {
            Done: {
              text: "Done",
              value: "Done",
            },
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0">Configuration - Text</h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">TellyTell</Link>
                    </li>
                    <li className="breadcrumb-item">Configuration - Text</li>
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
                    <div className="col-sm-12 col-md-6"></div>
                  </div>
                  <div className="table-responsive table-shoot">
                    <table className="table table-centered table-nowrap mb-0">
                      <thead className="thead-light">
                        <tr>
                          <th>Title</th>
                          <th>Updated On</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data?.map((item) => (
                          <tr key={item._id}>
                            <td>{item.title}</td>
                            <td>
                              {new Date(item.updatedAt)
                                .toDateString(item.updatedAt)
                                .split(" ")
                                .slice(1)
                                .join(" ")}
                            </td>
                            <td>
                              <Link to={`text/textedit/${item._id}`}>
                                <button
                                  type="button"
                                  className="btn btn-primary btn-sm  waves-effect waves-light btn-table ml-2"
                                >
                                  Edit
                                </button>
                              </Link>
                              <button
                                type="button"
                                className="btn btn-danger btn-sm  waves-effect waves-light btn-table ml-2"
                                id="sa-params"
                                onClick={() => handleDelete(item._id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
};

export default Text;
