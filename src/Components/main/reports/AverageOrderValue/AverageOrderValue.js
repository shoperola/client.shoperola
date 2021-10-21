import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../../../../API";
import { isAutheticated } from "../../../auth/authhelper";
import Footer from "../../Footer";
import AverageOrderValueChart from "./AverageOrderValueChart";

function AverageOrderValue(props) {
  const { token } = isAutheticated();
  const [image, setImage] = useState("");
  const [month, setMonth] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [showData, setShowData] = useState(data);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`${API}/api/logo`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.data.data[0].logo) {
            setImage(res.data.data[0].logo);
          }
        });
    };

    fetchData();
  }, [token]);

  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0">Reports - Average Order Value</h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">Shoperola</Link>
                    </li>
                    <li className="breadcrumb-item">
                      Reports - Average Order Value
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12 mb-30">
              <div className="card dashboard-box">
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-12 mb-30">
                      <label
                        htmlFor="basicpill-phoneno-input"
                        className="label-100"
                      >
                        Select Month
                      </label>
                      <select
                        name="month"
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        className="form-control input-field"
                      >
                        <option value="0">January</option>
                        <option value="1">February</option>
                        <option value="2">March</option>
                        <option value="3">April</option>
                        <option value="4">May</option>
                        <option value="5">June</option>
                        <option value="6">July</option>
                        <option value="7">August</option>
                        <option value="8">September</option>
                        <option value="9">October</option>
                        <option value="10">November</option>
                        <option value="11">December</option>
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="col-lg-12 mb-10">
                        <AverageOrderValueChart />
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

export default AverageOrderValue;
