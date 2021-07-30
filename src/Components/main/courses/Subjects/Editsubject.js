import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import swal from "sweetalert";
import ClipLoader from "react-spinners/ClipLoader";
import { API } from "../../../../API";
import { isAutheticated } from "../../../auth/authhelper";
import DatePicker from "react-datepicker";
import Footer from "../../Footer";

export default function Editsubject() {
  const [data, setData] = useState({
    title: "",
    banner: "",
    category: "",
    startDate: new Date(),
    endDate: new Date()

  });
  const [fetchedData, setFetchedData] = useState([]);
  const [formData, setFormData] = useState(new FormData());
  const [loading, setLoading] = useState(false);
  const { subjectId } = useParams();
  const history = useHistory();
  const { token } = isAutheticated();
  useEffect(() => {
    async function fetchData() {
      let res = await axios.get(`${API}/api/categories/view_all_categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      console.log(res);
      setFetchedData(res.data);
    }
    fetchData();
  }, [])
  useEffect(() => {
    axios
      .get(`${API}/api/banner/view_id/${subjectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        //console.log(response);
        setData({
          title: response.data.data.title,
          banner: response.data.data.bannerimage,
          category: response.data.data.category,
          startDate: new Date(response.data.data.startdate),
          endDate: new Date(response.data.data.enddate)
        });
        formData.set("name", response.data.data.title);
        // formData.set("file", response.data.data.bannerimage);
      })
      .catch((err) => {
        console.log(err);
        history.push("/subjects");
      });
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == "file") {
      formData.set(name, e.target.files[0]);
      setData({ ...data, banner: URL.createObjectURL(e.target.files[0]) });
    } else {
      setData({ ...data, [name]: value });
      formData.set(name, value);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .patch(`${API}/api/banner/edit_banner/${subjectId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/formdata",
        },
      })
      .then((response) => {
        // console.log(response);
        setLoading(false);
        // console.log(response);
        swal({
          title: "Banner updated Successfully!",

          icon: "success",
          buttons: true,
          successMode: true,
          dangerMode: false,
        }).then((value) => {
          history.push("/subjects");
        });
      })
      .catch((err) => {
        setLoading(false);
        let message = err.response.data.message;
        swal({
          title: "Error",
          text: { message },
          icon: "error",
          buttons: true,
          dangerMode: true,
        });
        console.log(err);
      });
  };
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   if (name == "banner") {
  //     formData.set(name, e.target.files[0]);
  //     setData({ ...data, banner: URL.createObjectURL(e.target.files[0]) });
  //   } else {
  //     setData({ ...data, [name]: value });
  //     formData.set(name, value);
  //   }
  // };
  return (
    <div className="main-content">

      <div className="page-content">
        <div className="container-fluid">

          {/* <!-- start page title --> */}

          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0">Content Management - Banners
                </h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item"><a href="javascript: void(0);">TellyTell</a></li>
                    <li className="breadcrumb-item">Content Management - Banners
                    </li>

                    <li className="breadcrumb-item">Edit Banner</li>


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

                      <h1 className="text-left head-small">Edit Banner </h1>


                      <form>


                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group">
                              <label for="basicpill-phoneno-input" className="label-100">Enter Title Name</label>
                              <input type="text"
                                className="form-control input-field"
                                id="basicpill-phoneno-input"
                                name="title"
                                value={data.title}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group">
                              <label for="basicpill-phoneno-input" className="label-100">Upload Banner Image</label>
                              <input type="file" className="form-control input-field"
                                id="basicpill-phoneno-input"
                                type="file"
                                name="file"
                                onChange={handleChange}
                              />
                              <img
                                classNameName="img-fluid mt-2"
                                style={{
                                  height: "125px",
                                  width: "274px",
                                  textAlign: "center",
                                  verticalAlign: "middle",
                                }}
                                alt="200x200"
                                src={data.banner}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group">
                              <label for="basicpill-phoneno-input" className="label-100">Select Category</label>
                              <select className="form-control input-field" value={data.category} name="category" onChange={handleChange}>
                                <option>Select</option>
                                {
                                  fetchedData?.map(item => (
                                    <option>{item.name}</option>
                                  ))
                                }
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group">
                              <label for="basicpill-phoneno-input" className="label-100">Start Date</label>
                              <div className="input-group">
                                <DatePicker
                                  selected={data.startDate}
                                  required
                                  name="startdate"
                                  onChange={(date) => {
                                    setData({
                                      ...data,
                                      startDate: date,
                                    });
                                    formData.set(
                                      "startdate",
                                      date.toISOString()
                                    );
                                  }}
                                />
                                {/* <input type="text" className="form-control input-field" data-provide="datepicker" data-date-format="dd M, yyyy" data-date-autoclose="true"/> */}
                                <div className="input-group-append">
                                  <span className="input-group-text">   <i className="fa fa-calendar" aria-hidden="true"></i></span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>


                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group">
                              <label for="basicpill-phoneno-input" className="label-100">End Date</label>
                              <div className="input-group">
                                <DatePicker
                                  selected={data.endDate}
                                  required
                                  name="startdate"
                                  onChange={(date) => {
                                    setData({
                                      ...data,
                                      endDate: date,
                                    });
                                    formData.set(
                                      "enddate",
                                      date.toISOString()
                                    );
                                  }}
                                />
                                {/* <input type="text" className="form-control input-field" data-provide="datepicker" data-date-format="dd M, yyyy" data-date-autoclose="true"/> */}
                                <div className="input-group-append">
                                  <span className="input-group-text">   <i className="fa fa-calendar" aria-hidden="true"></i></span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group text-left">

                              <Link>
                                <button type="button" className="btn btn-success btn-login waves-effect waves-light mr-3"
                                  onClick={onSubmit}
                                >
                                  <ClipLoader loading={loading} size={18} />
                                  {!loading && "Save"}
                                </button>
                              </Link>

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



      <Footer />
    </div>

  );
}
