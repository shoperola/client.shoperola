import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/authhelper";
import Modal from "react-bootstrap/Modal";
// import "../../../node_modules/video-react/dist/video-react.full"
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import ClipLoader from "react-spinners/ClipLoader";
import { API } from "../../API";
import { Player } from "video-react";
import "bootstrap/dist/css/bootstrap.min.css";
export default function Featured(props) {
  console.log("public url",props);
  
  const [featured, setFeatured] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isAddFeatureModalOpen, setIsAddFeatureModalOpen] = useState(false);
  const [formData, setFormData] = useState(new FormData());
  const [newFeature, setNewFeature] = useState("");
  const [featureType,setFeatureType]= useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedFile,setSelectedFile]=useState(null);
  const [handleResponse,setHandleResponse]=useState(null);
  const [imageUrl,setImageUrl]=useState(null);
  const [invalidImage,setInvalidImage]=useState(null);
  
  var showdata;
  

  const [currentFeature, setCurrentFeature] = useState({
    _id: null,
    url: "",
  });
  const { token } = isAutheticated();

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  const showFeatureModal = () => {
    setIsAddFeatureModalOpen(true);
  };

  const hideFeatureModal = () => {
    setIsAddFeatureModalOpen(false);
  };

  useEffect(() => {
    axios
      .get(`${API}/api/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setFeatured(response.data.data.featured);
        //console.log("setFeatured",featured);
        
      })
      .catch((err) => {
        console.log(err);
      });
  }, [success, !success]);

  const handleChange = (e) => {
    // e.preventDefault();
    // let value = e.target.files[0];
    // if(value.type=="video/mp4"){
    //   setFeatureType("video");
    // }else{
    //   setFeatureType("image");
    // }
    // //console.log('feater image',value);
    // formData.set("featured", e.target.files[0]);
    // setNewFeature(URL.createObjectURL(e.target.files[0]));
    const imageFile = e.target.files[0];
 
    if (!imageFile) {
      //this.setState({ invalidImage: 'Please select image.' });
      setInvalidImage("Please select image.")
      return false;
    }
 
    if (!imageFile.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      setInvalidImage("Please select a valid image.")
      return false;
    }
    setFeatureType("image");
    formData.set("featured", e.target.files[0]);
    setNewFeature(URL.createObjectURL(e.target.files[0]));
    setInvalidImage(null)
 
    // reader.onload = (e) => {
    //   const img = new Image();
    //   img.onload = () => {
    //     //this.setState({ selectedFile: imageFile, invalidImage: null });
    //     setSelectedFile(imageFile)
    //     setInvalidImage(null)
    //   };
    //   img.onerror = () => {
    //     //this.setState({ invalidImage: 'Invalid image content.' });
    //     setInvalidImage("Invalid image content.")
    //     return false;
    //   };
    //   debugger
    //   img.src = e.target.result;
    // };
    // reader.readAsDataURL(imageFile);
    
  };

  const updateChange = (e) => {
    e.preventDefault();
    setCurrentFeature({
      ...currentFeature,
      url: URL.createObjectURL(e.target.files[0]),
    });
    formData.set("featured", e.target.files[0]);
  };

  //UPDATE SUBMISSION METHOD
  const updateSubmit = (e) => {
    e.preventDefault();

    // console.log(currentFeature._id);
    setLoading(true);
    axios
      .put(`${API}/api/user/featured/${currentFeature._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // console.log(response);
        setLoading(true);

        // window.location.reload();
        hideModal();
        setSuccess(!success);
      })
      .catch((err) => {
        setLoading(false);

        hideModal();
        setSuccess(!success);
        console.log(err);
      });
  };

  const addFeature = (e) => {
    e.preventDefault();
    setLoading(true);
    if(invalidImage){
      alert("please upload a valid image");
      return;
    }
    axios
      .post(`${API}/api/user/featured`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setLoading(false);
        hideFeatureModal();
        setSuccess(!success);
        // window.location.reload();
        // alert("feature added!");
      })
      .catch((err) => {
        setLoading(false);
        hideFeatureModal();
        setSuccess(!success);
        console.log(err);
      });
  };

  const onDelete = (id) => {
    // e.preventDefault();

    axios
      .delete(`${API}/api/user/featured/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // console.log(response);
        // setLoading(true);
        setSuccess(!success);
        // window.location.reload();
        // hideModal();
      })
      .catch((err) => {
        // setLoading(false);
        setSuccess(!success);
        // hideModal();
        console.log(err);
      });
  };

  return (
    <>
    {/* /////////// this will open when click on upload button in feature ///// */}
      <Modal id="addimg" show={isAddFeatureModalOpen}>
        <Modal.Header>
          <h5 className="modal-title" id="exampleModalLabel">
            Add Image
          </h5>
          <button
            type="button"
            onClick={hideFeatureModal}
            className="close close-b"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span>x</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-lg-12 mx-auto">
              <div className="input-group mb-3 px-2 py-1 bg-white file-upload-bdr">
                <input
                  id="upload"
                  type="file"
                  onChange={handleChange}
                  className="form-control"
                />
                <label
                  id="upload-label"
                  for="upload"
                  className="font-weight-light text-muted"
                >
                  Featured Image
                </label>
                <div className="input-group-append">
                  <label
                    for="upload"
                    className="btn btn-light m-0 rounded-pill px-4"
                  >
                    <i className="fa fa-cloud-upload mr-2 text-muted"></i>
                    <small className="text-uppercase font-weight-bold text-muted">
                      Choose Image
                    </small>
                  </label>
                </div>
              </div>
             
              {invalidImage && 
              <p className="error font-size-18">
              {invalidImage}
            </p>
              }
              <p className="error font-size-12">
                Please use image with size less than 3 MB and dimensions 4x3
                ratio (450 x 320 Pixels)
              </p>
              <div className="image-area mt-4">
                {(featureType==="image") && 
                <img
                id="imageResult"
                src={newFeature ? newFeature : "#"}
                alt=""
                className="img-fluid rounded shadow-sm mx-auto d-block"
              />

                }
                
                {(featureType==="video") && <Player key={newFeature}>
                    <source src={newFeature ? newFeature : "#"} />
                </Player> }
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          
          {!invalidImage && 
          <button
          type="button"
          onClick={addFeature}
          className="btn btn-primary save-btn"
        >
          <ClipLoader color="blue" loading={loading} size={20} />
          {!loading && "Save"}
        </button>
          }
          
        </Modal.Footer>
      </Modal>

      {/* <div
        className="modal fade"
        id="addimg"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content popup-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add Image / Video
              </h5>
              <button
                type="button"
                className="close close-b"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span>x</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-lg-12 mx-auto">
                  <div className="input-group mb-3 px-2 py-1 bg-white file-upload-bdr">
                    <input
                      id="upload"
                      type="file"
                      onChange={handleChange}
                      className="form-control"
                    />
                    <label
                      id="upload-label"
                      for="upload"
                      className="font-weight-light text-muted"
                    >
                      Fuatured Image
                    </label>
                    <div className="input-group-append">
                      <label
                        for="upload"
                        className="btn btn-light m-0 rounded-pill px-4"
                      >
                        <i className="fa fa-cloud-upload mr-2 text-muted"></i>
                        <small className="text-uppercase font-weight-bold text-muted">
                          Choose Image
                        </small>
                      </label>
                    </div>
                  </div>

                  <p className="error font-size-12">
                    Please use image with size less than 3 MB and dimensions 4x3
                    ratio (450 x 320 Pixels)
                  </p>
                  <div className="image-area mt-4">
                    <img
                      id="imageResult"
                      src={newFeature ? newFeature : "#"}
                      alt=""
                      className="img-fluid rounded shadow-sm mx-auto d-block"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                onClick={addFeature}
                className="btn btn-primary save-btn"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div> */}

      <div
        className="modal fade"
        id="editimg"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content popup-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Image / Video
              </h5>
              <button
                type="button"
                className="close close-b"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span>x</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-lg-12 mx-auto">
                  <div className="input-group mb-3 px-2 py-1 bg-white file-upload-bdr">
                    <input
                      id="upload"
                      type="file"
                      onchange="readURL(this);"
                      className="form-control"
                    />
                    <label
                      id="upload-label"
                      for="upload"
                      className="font-weight-light text-muted"
                    >
                      Featured Image
                    </label>
                    <div className="input-group-append">
                      <label
                        for="upload"
                        className="btn btn-light m-0 rounded-pill px-4"
                      >
                        <i className="fa fa-cloud-upload mr-2 text-muted"></i>
                        <small className="text-uppercase font-weight-bold text-muted">
                          Choose Image
                        </small>
                      </label>
                    </div>
                  </div>

                  <p className="error font-size-12">
                    Please use image with size less than 3 MB and dimensions 4x3
                    ratio (450 x 320 Pixels)
                  </p>
                  <div className="image-area mt-4">
                    <img
                      id="imageResult"
                      src="#"
                      alt=""
                      className="img-fluid rounded shadow-sm mx-auto d-block"
                    />

                    <img src="assets/images/4-3-ratio.png" className="img-fluid" alt=""/>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary save-btn">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal show={isOpen} onHide={hideModal}>
        <ModalHeader>
          <h5 className="modal-title" id="exampleModalLabel">
            Edit Image / Video
          </h5>
          <button
            type="button"
            className="close close-b"
            onClick={hideModal}
            aria-label="Close"
          >
            <span>x</span>
          </button>
        </ModalHeader>
        <ModalBody>
          {/* {console.log(currentFeature)} */}
          <div className="row">
            <div className="col-lg-12 mx-auto">
              <div className="input-group mb-3 px-2 py-1 bg-white file-upload-bdr">
                <input
                  id="upload"
                  type="file"
                  onChange={updateChange}
                  className="form-control"
                />
                <label
                  id="upload-label"
                  for="upload"
                  className="font-weight-light text-muted"
                >
                  Fuatured Image
                </label>
                <div className="input-group-append">
                  <label
                    for="upload"
                    className="btn btn-light m-0 rounded-pill px-4"
                  >
                    <i className="fa fa-cloud-upload mr-2 text-muted"></i>
                    <small className="text-uppercase font-weight-bold text-muted">
                      Choose Image
                    </small>
                  </label>
                </div>
              </div>

              <p className="error font-size-12">
                Please use image with size less than 3 MB and dimensions 4x3
                ratio (450 x 320 Pixels)
              </p>
              <div className="image-area mt-4">
                <img
                  id="imageResult"
                  src="#"
                  alt=""
                  className="img-fluid rounded shadow-sm mx-auto d-block"
                />

                <img
                  src={currentFeature.url ? currentFeature.url : "#"}
                  className="img-fluid" alt=""
                />
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            onClick={updateSubmit}
            type="button"
            className="btn btn-primary save-btn"
          >
            <ClipLoader color="blue" loading={loading} size={20} />
            {!loading && "Save"}
          </button>
        </ModalFooter>
      </Modal>

      {/* //PAGE */}

      <div className="profile-data">
        {/* <h4>Featured images and Videos</h4> */}

        <div className="row">
          
          {!props.featuredData && featured.length != 0 &&
            featured.map((feature, index) => {
              console.log("feature type video or not",feature);
              /////////////// split string to chech that url is for video or image ///////
              var array=feature.url.split(".");
              var ind=array.length;
              if(array[ind-1]==="mp4"){
                showdata="video";
              }else{
                showdata="image";
              }

              return (
                <div className="col-md-3">
                  <div
                    className="profile-video-image-box"
                    style={{ textAlign: "center", padding: "0" }}
                  >
                    {(showdata==="image")&&
                      <img
                      className="img-fluid"
                      style={{
                        height: "250px",
                        width: "274px",
                        textAlign: "center",
                        verticalAlign: "middle",
                        margin:"15px 0px"
                      }}
                      alt="200x200"
                      src={feature.url}
                    />
                    }
                    {(showdata==="video") &&
                      <Player key={feature.url} fluid={false} height={280} width={220}>
                       <source src={feature.url} />
                       

                     </Player>

                    }
                    <span
                    className={!props.publicUp?"img-delete":""}
                    onClick={(e) => {
                      e.preventDefault();

                      onDelete(feature._id);
                    }}
                  >
                    {!props.publicUp && <i className="fa fa-trash-o" aria-hidden="true"></i>}
  
                    
                      
                    </span>
                    
                    <span
                      className={!props.publicUp?"img-edit":""}
                      data-toggle="modal"
                      onClick={() => {
                        setCurrentFeature({
                          ...currentFeature,
                          _id: feature._id,
                          url: feature.url,
                        });
                        showModal();
                      }}
                    >
                       {!props.publicUp && <i className="fa fa-pencil-square-o" aria-hidden="true"></i>}
                    </span>
                  </div>
                </div>
              );
            })}
            {/* ///////////// public url ////////// */}
            {props.featuredData && props.featuredData.length != 0 &&
            props.featuredData.map((feature, index) => {
              console.log("feature type video or not",feature);
              /////////////// split string to chech that url is for video or image ///////
              var array=feature.url.split(".");
              var ind=array.length;
              if(array[ind-1]==="mp4"){
                showdata="video";
              }else{
                showdata="image";
              }

              return (
                <div className="col-md-3">
                  <div
                    className="profile-video-image-box"
                    style={{ textAlign: "center", padding: "0" }}
                  >
                    {(showdata==="image")&&
                      <img
                      className="img-fluid"
                      style={{
                        height: "250px",
                        width: "274px",
                        textAlign: "center",
                        verticalAlign: "middle",
                        margin:"15px 0px"
                      }}
                      alt="200x200"
                      src={feature.url}
                    />
                    }
                    {(showdata==="video") &&
                      <Player key={feature.url} fluid={false} height={280} width={220}>
                       <source src={feature.url} />
                       

                     </Player>

                    }
                    <span
                    className={!props.publicUp?"img-delete":""}
                    onClick={(e) => {
                      e.preventDefault();

                      onDelete(feature._id);
                    }}
                  >
                    {!props.publicUp && <i className="fa fa-trash-o" aria-hidden="true"></i>}
  
                    
                      
                    </span>
                    
                    <span
                      className={!props.publicUp?"img-edit":""}
                      data-toggle="modal"
                      onClick={() => {
                        setCurrentFeature({
                          ...currentFeature,
                          _id: feature._id,
                          url: feature.url,
                        });
                        showModal();
                      }}
                    >
                       {!props.publicUp && <i className="fa fa-pencil-square-o" aria-hidden="true"></i>}
                    </span>
                  </div>
                </div>
              );
            })}
{/* ///////////////  uploading button     ///////////////// */}
          <div className="col-md-3">
           {!props.publicUp && <div
              className="user-upload img-fluid"
              data-toggle="modal"
              onClick={setIsAddFeatureModalOpen}
              style={{
                height: "250px",
                width: "274px",
                textAlign: "center",
                verticalAlign: "middle",
                margin:"15px 0px"
              }}
            >
              <i className="fa fa-plus" aria-hidden="true"></i>
            </div>
           }
          </div>
        </div>
      </div>
    </>
  );
}
