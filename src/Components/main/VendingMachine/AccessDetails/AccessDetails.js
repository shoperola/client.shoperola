import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../../../../API";
import { isAutheticated } from "../../../auth/authhelper";
import ClipLoader from "react-spinners/ClipLoader";
import { Link, useParams } from "react-router-dom";
import Footer from "../../Footer";

function AccessDetails(props) {
  const { token } = isAutheticated();
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`${API}/api/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setEmail(res.data.data.stored_email);
          setPassword(res.data.data.stored_password);
        });
    };

    fetchData();
  }, []);

  const editHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };

  const saveHandle = () => {
    if (!email || !password) {
      alert("Please enter valid values");
      return;
    }
    setLoading(true);

    axios
      .put(
        `${API}/api/user`,
        {
          stored_email: email,
          stored_password: password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        alert("Data Saved Successfully!");
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert("Saving data failed");
        console.log(error);
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
                <h4 className="mb-0">Vending Machine - Access Details</h4>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">Shoperola</Link>
                    </li>
                    <li className="breadcrumb-item active">Vending Machine</li>
                    <li className="breadcrumb-item active">Access Details</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- end page title --> */}

          {/* <!-- Save options Begins--> */}
          <div className="row">
            <div className="col-12">
              <div className="form-group text-right">
                {/* <Link to="/comproducts"> */}
                <button
                  onClick={saveHandle}
                  type="button"
                  className="btn btn-success btn-login waves-effect waves-light mr-3"
                >
                  <ClipLoader loading={loading} size={18} />
                  {!loading && "Save"}
                </button>
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="btn btn-success btn-cancel waves-effect waves-light mr-3"
                >
                  Cancel
                </button>
                {/* </Link> */}
              </div>
            </div>
          </div>
          {/* <!-- Save options Ends-->             */}

          {/* <!-- Row 1 Begins -->                */}
          <div className="row">
            {/* <!--Left Column Begins--> */}
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label
                              htmlFor="basicpill-phoneno-input"
                              className="label-100"
                            >
                              Access Details
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-group mb-30 width-100 row">
                          <label className="col-md-6 control-label">
                            Email
                          </label>
                          <input
                            type="text"
                            name="email"
                            className="form-control input-field"
                            onChange={editHandler}
                            placeholder="email"
                            value={email}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-group mb-30 width-100 row">
                          <label className="col-md-6 control-label">
                            Password
                          </label>
                          <input
                            type="text"
                            name="password"
                            className="form-control input-field col-md-6"
                            onChange={editHandler}
                            placeholder="password"
                            value={password}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
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

export default AccessDetails;
