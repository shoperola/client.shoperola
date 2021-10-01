import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { API } from "../../../../API";
import { isAutheticated } from "../../../auth/authhelper";
import Footer from "../../Footer";
import ClipLoader from "react-spinners/ClipLoader";
import swal from "sweetalert";
function AddTaxRate() {
  const { token } = isAutheticated();
  const [data, setData] = useState([]);
  const history = useHistory();
  useEffect(() => {
    async function fetchData() {
      let res = await axios.get(`${API}/api/tax_rates/view_taxs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(res.data.data);
    }
    fetchData();
  }, [token]);
  const [inputText, setinputText] = useState({
    name: "",
    rate: "",
  });
  //let history=useHistory();
  const [loading, setLoading] = useState(false);
  const validateNameHandler = (e) => {
    let flag = true;
    data.forEach((element) => {
      if (
        element.tax_name.toString() === e.target.value ||
        e.target.value.toString() === "Zero Tax"
      ) {
        setinputText({
          ...inputText,
          [e.target.name]: "",
        });
        document.getElementById("name").innerHTML = "This Name all ready Taken";
        document.getElementById("name").className += " text-danger";
        flag = false;
      }
    });
    if (flag) {
      document.getElementById("name").innerHTML =
        " This name is doe your reference.";
      document.getElementById("name").className = "label-100";
      setinputText({
        ...inputText,
        [e.target.name]:
          e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1),
      });
    }
  };
  const validateTaxHandler = (e) => {
    let flag = true;
    data.forEach((element) => {
      if (
        element.tax_percentage.toString() === e.target.value ||
        e.target.value.toString() === "0"
      ) {
        setinputText({
          ...inputText,
          [e.target.name]: "",
        });
        document.getElementById("tax").innerHTML =
          " This tax is allready available ";
        document.getElementById("tax").className += " text-danger";
        flag = false;
      }
    });
    if (flag) {
      document.getElementById("tax").innerHTML =
        " This tax rate will be applicable to the products you select";
      document.getElementById("tax").className = "label-100";
      setinputText({
        ...inputText,
        [e.target.name]:
          e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1),
      });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    let res = await axios.post(
      `${API}/api/tax_rates/add_tax`,
      {
        tax_name: inputText.name,
        tax_percentage: inputText.rate,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setLoading(false);
    const done = await swal({
      title: "Added Successfully!",
      icon: "success",
      buttons: {
        Done: {
          text: "Done",
          value: "Done",
        },
      },
    });
    if (done === "Done") {
      history.push("/tax-rates");
    }
    //     axios
    //   .post(`${API}/api/category/`, {category: inputText}, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    //   .then((response) => {
    //     setLoading(false);
    //     swal( {
    //       title: "Category added Successfully!",

    //       icon: "success",
    //       buttons: true,
    //       successMode: true,
    //       dangerMode: false,
    //     }).then((value) => {
    //         history.push("/comcatagory");
    //     });
    //   })
    //   .catch((err) => {
    //     setLoading(false);
    //     let message = "errror";
    //     swal({
    //       title: "Error",
    //       text: { message },
    //       icon: "error",
    //       buttons: true,
    //       dangerMode: true,
    //     });
    //     console.log(err);
    //   });
  };

  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          {/* <!-- start page title --> */}

          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0">Add New Tax Rate</h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">Shoperola</Link>
                    </li>
                    <li className="breadcrumb-item">
                      Payment Settings - Add New Tax Rate
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- end page title --> */}
          <div className="row">
            <div className="col-12">
              <div className="form-group text-right">
                <button
                  type="button"
                  className="btn btn-success btn-login waves-effect waves-light mr-3"
                  onClick={submitHandler}
                  disabled={inputText.name === "" || inputText.rate === ""}
                >
                  <ClipLoader loading={loading} size={18} />
                  {!loading && "Save"}
                </button>
                <Link to="/tax-rates">
                  <button
                    type="button"
                    className="btn btn-success btn-cancel waves-effect waves-light mr-3"
                  >
                    Cancel
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12">
                      <form>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group">
                              <label
                                htmlFor="basicpill-phoneno-input"
                                className="label-100"
                              >
                                Name
                              </label>
                              <input
                                type="text"
                                className="form-control input-field"
                                onChange={(e) => validateNameHandler(e)}
                                name="name"
                              />
                              <label
                                htmlhtmlFor="basicpill-phoneno-input"
                                className="label-100"
                                id="name"
                              >
                                This name is doe your reference.
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group">
                              <label
                                htmlFor="basicpill-phoneno-input"
                                className="label-100"
                              >
                                Tax Rate (in %)
                              </label>
                              <input
                                type="number"
                                className="form-control input-field"
                                onChange={(e) => validateTaxHandler(e)}
                                name="rate"
                              />
                              <label
                                htmlFor="basicpill-phoneno-input"
                                className="label-100"
                                id="tax"
                              >
                                This tax rate will be applicable to the products
                                you select.
                              </label>
                            </div>
                          </div>
                        </div>
                      </form>
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
                            <script>document.write(new Date().getFullYear())</script> © SHOTT.
                        </div>

                    </div>
                </div>
            </footer> */}
      <Footer />
    </div>
  );
}

export default AddTaxRate;
