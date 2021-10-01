import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../../../../API";
import { isAutheticated } from "../../../auth/authhelper";
import Footer from "../../Footer";

function EditCategories(props) {
  const { token } = isAutheticated();
  const [data, setdata] = useState("");

  const wordLimit = {
    name: 50,
  };

  const [nameLen, setNameLen] = useState(wordLimit.name);

  const handleSubmit = async () => {
    let res = await axios.patch(
      `${API}/api/category/${props.match.params.catagoryId}`,
      {
        category: data,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res);
    if (res) {
      window.location = "/comcatagory";
    }
  };
  useEffect(async () => {
    let res = await axios.get(
      `${API}/api/category/${props.match.params.catagoryId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setdata(res.data.category);
    setNameLen(wordLimit.name - res.data.category.length);
  }, []);
  const handleChange = (e) => {
    setdata(e.target.value);
  };

  const editHandler = (e, type) => {
    const value = e.target.value;
    const length = value.length;

    switch (type) {
      case "name":
        if (wordLimit.name - length !== -1) {
          handleChange(e);
          setNameLen(wordLimit.name - length);
        }
        break;
      default:
        console.log("Incorrect Type");
    }
  };

  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          {/* <!-- start page title --> */}

          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0">Commerce - Categories</h4>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">Shoperola</Link>
                    </li>
                    <li className="breadcrumb-item">Commerce - Categories</li>
                    <li className="breadcrumb-item">Edit</li>
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
                      <h1 className="text-left head-small">Edit Category</h1>

                      <form>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group">
                              <label
                                for="basicpill-phoneno-input"
                                className="label-100"
                              ></label>
                              <input
                                onChange={(e) => editHandler(e, "name")}
                                value={data}
                                type="text"
                                className="form-control input-field"
                                defaultValue={data}
                              />
                              <label
                                for="basicpill-phoneno-input"
                                className="label-100"
                              >
                                Remaining words : {nameLen}
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group text-left">
                              <button
                                onClick={handleSubmit}
                                type="button"
                                className="btn btn-success btn-login waves-effect waves-light mr-3"
                              >
                                Save
                              </button>
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

      {/* <footer className="footer">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <script>document.write(new Date().getFullYear())</script> © Shoperola.
                        </div>

                    </div>
                </div>
            </footer> */}
      <Footer />
    </div>
  );
}

export default EditCategories;
