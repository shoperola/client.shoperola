import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../../../../../API";
import { isAutheticated } from "../../../../auth/authhelper";
import Footer from "../../../Footer";
import FootfallsChart from "./FootfallsChart";

function FootFallsByGender(props) {
  const { token } = isAutheticated();
  const [image, setImage] = useState("");
  const [month, setMonth] = useState("");
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
  let men = 0;
  let women = 0
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [showData, setShowData] = useState(data);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`${API}/api/getphoto`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.data[0].logo) {
            setImage(res.data.data[0].logo);

          }
          setTotalData(res.data.data)
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

      setData(finalObj);
    };

    loadData();
  }, [totalData, month]);
  console.log(data);

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
  useEffect(() => {
    const loadData = () => {
      const indexOfLastPost = currentPage * itemPerPage;
      const indexOfFirstPost = indexOfLastPost - itemPerPage;

      let newData = [];
      Object.keys(data).map((key) => {
        const temp = data[key].map((item) => ({
          id: item._id,
          date: item.createdAt,
          photo: item.photo,
          age: item.age,
          emotion: item.emotion,
          gender: item.gender,
        }));

        newData = [...newData, ...temp];
      });
      setShowData(newData.slice(indexOfFirstPost, indexOfLastPost));
    };

    loadData();
  }, [data, currentPage, itemPerPage]);
  console.log(showData)

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    let d = date.toDateString(dateStr);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let strTime = hours + ":" + minutes + " " + ampm;
    return d + ", " + strTime;
  };



  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0">Reports - FootFalls by Gender</h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">Shoperola</Link>
                    </li>
                    <li className="breadcrumb-item">
                      Reports - FootFalls by Gender
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
                        <FootfallsChart dates={Object.keys(data)}
                          labels={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]}
                          men={Object.keys(data).map(item => {
                            let men = 0;


                            data[item].map(user => {

                              if (user.gender === "male") {
                                men = men + 1;


                              }


                            })
                            console.log(men, women)
                            return men
                          })}
                          women={Object.keys(data).map(item => {

                            let women = 0;

                            data[item].map(user => {

                              if (user.gender === "female") {
                                women = women + 1;

                              }

                            })
                            console.log(men, women)
                            return women
                          })} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <div className="row ml-0 mr-0  mb-10">
                    <div className="col-sm-12 col-md-12">
                      <div className="dataTables_length">
                        <label className="w-100">
                          Show{" "}
                          <select
                            name=""
                            className="select-w custom-select custom-select-sm form-control form-control-sm"
                            value={itemPerPage}
                            onChange={(e) => setItemPerPage(e.target.value)}
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
                    {/* <div className="col-sm-12 col-md-6">
                      <div className="dropdown d-block">
                        <Link to="/comproducts/add">
                          <button
                            type="button"
                            className="btn btn-primary add-btn waves-effect waves-light float-right"
                          >
                            <i className="fa fa-plus" aria-hidden="true"></i>{" "}
                            Add New Product
                          </button>
                        </Link>
                      </div>
                    </div> */}
                  </div>
                  <div className="table-responsive table-shoot">
                    <table className="table table-centered table-nowrap mb-0">
                      <thead className="thead-light">
                        <tr>
                          <th>Date</th>
                          <th>Men</th>
                          <th>Women</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.keys(data).map(item => {
                          let men = 0;
                          let women = 0;
                          return <tr>
                            <td>{item}</td>
                            {data[item].map((user) => {

                              if (user.gender === "male") {
                                men = men + 1;

                              }
                              else if (user.gender === "female") {
                                women = women + 1;
                              }

                            })}
                            <><td>{men}</td>
                              <td>{women}</td></>

                          </tr>
                        }

                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* {showData.map((item, idx) => ( */}
                  {/* <tr key={item.id}> */}
                  {/* <td>{formatDate(item.date)}</td> */}
                  {/* <td>{item.gender}</td> */}


                  {/* <td></td> */}

                  {/* </tr> */}
                  {/* ))} */}

                  <div className="row mt-20">
                    <div className="col-sm-12 col-md-6 mb-20">
                      <div
                        className="dataTables_info"
                        id="datatable_info"
                        role="status"
                        aria-live="polite"
                      >
                        Showing {currentPage * itemPerPage - itemPerPage + 1} to{" "}
                        {Math.min(currentPage * itemPerPage, data.length)} of{" "}
                        {data.length} entries
                      </div>
                    </div>

                    <div className="col-sm-12 col-md-6">
                      <div className="dataTables_paginate paging_simple_numbers float-right">
                        <ul className="pagination">
                          <li
                            className={
                              currentPage === 1
                                ? "paginate_button page-item previous disabled"
                                : "paginate_button page-item previous"
                            }
                          >
                            <a
                              href="#"
                              aria-controls="datatable"
                              data-dt-idx="0"
                              tabindex="0"
                              className="page-link"
                              onClick={() => setCurrentPage((prev) => prev - 1)}
                            >
                              Previous
                            </a>
                          </li>

                          {!(currentPage - 1 < 1) && (
                            <li className="paginate_button page-item">
                              <a
                                aria-controls="datatable"
                                data-dt-idx="1"
                                tabindex="0"
                                className="page-link"
                                onClick={(e) =>
                                  setCurrentPage((prev) => prev - 1)
                                }
                              >
                                {currentPage - 1}
                              </a>
                            </li>
                          )}

                          <li className="paginate_button page-item active">
                            <a
                              href="#"
                              aria-controls="datatable"
                              data-dt-idx="2"
                              tabindex="0"
                              className="page-link"
                            >
                              {currentPage}
                            </a>
                          </li>

                          {!(
                            (currentPage + 1) * itemPerPage - itemPerPage >
                            data.length
                          ) && (
                              <li className="paginate_button page-item ">
                                <a
                                  href="#"
                                  aria-controls="datatable"
                                  data-dt-idx="3"
                                  tabindex="0"
                                  className="page-link"
                                  onClick={() => {
                                    setCurrentPage((prev) => prev + 1);
                                  }}
                                >
                                  {currentPage + 1}
                                </a>
                              </li>
                            )}

                          <li
                            className={
                              !(
                                (currentPage + 1) * itemPerPage - itemPerPage >
                                data.length
                              )
                                ? "paginate_button page-item next"
                                : "paginate_button page-item next disabled"
                            }
                          >
                            <a
                              href="#"
                              tabindex="0"
                              className="page-link"
                              onClick={() => setCurrentPage((prev) => prev + 1)}
                            >
                              Next
                            </a>
                          </li>
                        </ul>
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

export default FootFallsByGender;
