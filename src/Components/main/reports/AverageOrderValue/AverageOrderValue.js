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
  const totalMonths = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December",
  };
  const [months, setMonths] = useState(totalMonths);
  const [month, setMonth] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [showData, setShowData] = useState(data);
  const [totalData, setTotalData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`${API}/api/order/view_order`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setTotalData(res.data.data);
        });
    };

    fetchData();
  }, [token]);

  useEffect(() => {
    const loadData = () => {
      let finalObj = {};
      totalData.forEach((item) => {
        const currMonth = new Date(item.createdAt).getMonth();
        const currYear = new Date(item.createdAt).getFullYear();
        const choosenDate = month.split(" ");
        if (currMonth == choosenDate[0] && currYear == choosenDate[1]) {
          const date = item.createdAt.split("T")[0];
          if (finalObj[date]) {
            finalObj[date].push(item);
          } else {
            finalObj[date] = [item];
          }
        }
      });
      let newObject = {};
      Object.keys(finalObj).map((key) => {
        let s = 0;
        finalObj[key].map((item) => (s += parseInt(item.amount)));
        newObject[key] = s / finalObj[key].length;
      });
      setData(newObject);
    };

    loadData();
  }, [totalData, month]);

  useEffect(() => {
    const loadData = () => {
      let finalMonths = {};
      totalData.forEach((item) => {
        const currMonth = new Date(item.createdAt).getMonth();
        const currYear = new Date(item.createdAt).getFullYear();
        finalMonths = {
          ...finalMonths,
          [currMonth + " " + currYear]: totalMonths[currMonth] + " " + currYear,
        };
      });
      setMonths(finalMonths);

      if (!(new Date().getMonth() + " " + new Date().getFullYear() in months)) {
        setMonth(new Date().getMonth() + " " + new Date().getFullYear());
      }
    };

    loadData();
  }, [totalData]);

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
                        <option value="">Select month</option>
                        {Object.keys(months).map((key) => (
                          <option key={key} value={key}>
                            {months[key]}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="col-lg-12 mb-10">
                        <AverageOrderValueChart
                          labels={Object.keys(data)}
                          orders={Object.keys(data).map((item) => data[item])}
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
      <Footer />
    </div>
  );
}

export default AverageOrderValue;
