import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { API } from "../../../../API";
import { isAutheticated } from "../../../auth/authhelper";
import ClipLoader from "react-spinners/ClipLoader";
import Footer from "../../Footer";
import { Link, useHistory } from "react-router-dom";
import getSymbolFromCurrency from "currency-symbol-map";

function AddVideo() {
    //   let EditorRef = useRef();
    //   const history = useHistory();
    //   const [tax, setTax] = useState([]);
    //   const { token } = isAutheticated();
    //   const [state, setstate] = useState({
    //     title: "",
    //     description: "",
    //     tax: "",
    //     category: "",
    //     status: true,
    //     image: "",
    //     price: "",
    //     sale_price: "",
    //     sku: "",
    //     quantity: "",
    //     continue_selling: false,
    //     track_quantity: false,
    //   });
    //   const [Categories, setCategories] = useState([]);
    //   const [loading, setLoading] = useState(false);
    //   const [currency, setCurrency] = useState();
    //   const [images, setImages] = useState({
    //     image1: "",
    //     image2: "",
    //     image3: "",
    //     image4: "",
    //   });
    //   const [imageUrl, setImageUrl] = useState();
    //   const [imagesUrl, setImagesUrl] = useState([]);
    //   const [openModal, setOpenModal] = useState(false);
    //   const [currentImage, setCurrentImage] = useState("");
    //   const [imageTitle, setImageTitle] = useState("");
    //   const [imageId, setImageId] = useState(0);
    //   const [clickedSave, setClickedSave] = useState(false);

    //   const [variantChecked, setVariantChecked] = useState(false);
    //   const [optionList, setOptionList] = useState([{ name: "", value: [] }]);
    //   const [variants, setVariants] = useState([]);

    //   const [dispenseFree, setDispenseFree] = useState(false);
    //   const [sampleAlong, setSampleAlong] = useState(false);
    //   const [selectedProduct, setSelectedProduct] = useState("");
    //   const [sampleLimit, setSampleLimit] = useState(true);
    //   const [collectData, setCollectData] = useState({
    //     name: false,
    //     mobile: false,
    //     email: false,
    //   });
    //   const [featureSample, setFeatureSample] = useState(false);
    //   const [message, setMessage] = useState("");
    //   const [products, setProducts] = useState([]);

    //   const wordLimit = {
    //     title: 40,
    //     description: 200,
    //     price: 12,
    //     salePrice: 12,
    //     SKU: 10,
    //     quantity: 10,
    //     message: 100,
    //   };

    //   const [titleLen, setTitleLen] = useState(wordLimit.title);
    //   const [descriptionLen, setDescriptionLen] = useState(wordLimit.description);
    //   const [priceLen, setPriceLen] = useState(wordLimit.price);
    //   const [salePriceLen, setSalePriceLen] = useState(wordLimit.salePrice);
    //   const [SKULen, setSKULen] = useState(wordLimit.SKU);
    //   const [quantityLen, setQuantityLen] = useState(wordLimit.quantity);
    //   const [messageLen, setMessageLen] = useState(wordLimit.message);

    //   useEffect(() => {
    //     async function fetchData() {
    //       await axios
    //         .get(`${API}/api/user`, {
    //           headers: {
    //             "Content-Type": "application/json",
    //             Authorization: `Bearer ${token}`,
    //           },
    //         })
    //         .then((res) => {
    //           setCurrency(res.data.data.settings.currency);
    //         })
    //         .catch((error) => {
    //           console.log(error);
    //         });
    //     }

    //     fetchData();
    //   }, [token]);

    //   useEffect(() => {
    //     async function fetchData() {
    //       let res = await axios.get(`${API}/api/tax_rates`, {
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //         },
    //       });
    //       setTax(res.data.data);
    //     }
    //     fetchData();
    //   }, [token]);

    //   useEffect(() => {
    //     async function fetchData() {
    //       let res = await axios.get(`${API}/api/category`, {
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //         },
    //       });
    //       if (res.data.length > 0) {
    //         setCategories(res.data);
    //       }
    //     }
    //     fetchData();
    //   }, [token]);

    //   useEffect(() => {
    //     const getData = async () => {
    //       let res = await axios.get(`${API}/api/product`, {
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //         },
    //       });
    //       setProducts(res.data.data);
    //     };
    //     getData();
    //   }, [token]);

    //   const handleVariants = () => {
    //     if (!variantChecked) {
    //       return handleProduct("");
    //     }
    //     const formdata = new FormData();

    //     formdata.append("tax", state.tax);

    //     optionList.map((item) => {
    //       formdata.append("options", item.name);
    //     });
    //     optionList.map((item) => {
    //       formdata.append("value", item.value);
    //     });

    //     variants.map((item) => {
    //       formdata.append("variant_title", item.variant);
    //       formdata.append("variant_price", parseInt(item.price));
    //       formdata.append("variant_quantity", parseInt(item.quantity));
    //       formdata.append("variant_sku", parseInt(item.SKU));
    //       formdata.append("file", item.image);
    //     });

    //     axios
    //       .post(`${API}/api/product/add_variant`, formdata, {
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //         },
    //       })
    //       .then((res) => {
    //         return handleProduct(res.data[0]._id);
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //       });
    //   };

    //   const handleProduct = (variantId) => {
    //     let formdata = new FormData();
    //     formdata.append("title", state.title);
    //     formdata.append("description", state.description);

    //     formdata.append("image", state.image);
    //     formdata.append("quantity", state.quantity);
    //     formdata.append("continue_selling", state.continue_selling);
    //     formdata.append("track_quantity", state.track_quantity);

    //     if (variantChecked) {
    //       formdata.append("variants", variantId);
    //       formdata.append("variant_flag", true);
    //     } else {
    //       formdata.append("variant_flag", false);
    //     }

    //     if (!dispenseFree) {
    //       formdata.append("price", state.price);
    //       formdata.append("sale_price", state.sale_price);
    //       formdata.append("sku", state.sku);
    //       formdata.append("tax", state.tax);
    //       formdata.append("category", state.category);
    //       formdata.append("status", state.status);
    //     }

    //     if (dispenseFree) {
    //       formdata.append("sku", state.sku);
    //       formdata.append("sample_free", dispenseFree);
    //       formdata.append("sample_paid", sampleAlong);
    //       if (sampleAlong) {
    //       }

    //       formdata.append("one_per_person", sampleLimit);
    //       formdata.append("name", collectData.name);
    //       formdata.append("number", collectData.mobile);
    //       formdata.append("email", collectData.email);
    //       formdata.append("message", message);
    //       formdata.append("featured", featureSample);
    //     }

    //     for (let i = 1; i < 5; i++) {
    //       formdata.append(`image${i}`, images[`image${i}`]);
    //     }

    //     axios
    //       .post(`${API}/api/product`, formdata, {
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //         },
    //       })
    //       .then((res) => {
    //         setLoading(false);
    //         history.push("/comproducts");
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //       });
    //   };

    //   const handleSubmit = () => {
    //     if (
    //       state.title.length === 0 ||
    //       (!dispenseFree && state.category === "") ||
    //       !state.image ||
    //       state.quantity.length === 0 ||
    //       !state.status
    //     ) {
    //       setClickedSave(true);
    //       setLoading(false);
    //       setOpenModal(true);
    //       return;
    //     }
    //     handleVariants();
    //     setLoading(true);

    //   };

    //   const handleChange = (e) => {
    //     setstate({
    //       ...state,
    //       [e.target.name]: e.target.value,
    //     });
    //   };
    //   const onFileChange = (e) => {
    //     setstate({
    //       ...state,
    //       image: e.target.files[0],
    //     });
    //   };
    //   const handleChangeEditor = (e) => {
    //     setstate({
    //       ...state,
    //       description: e.target.innerText,
    //     });
    //   };
    //   const handleChangeCheckBox = (e) => {
    //     if (variantChecked) {
    //       return;
    //     }

    //     setstate({
    //       ...state,
    //       [e.target.name]: e.target.checked,
    //     });
    //   };

    //   const editHandler = (e, type) => {
    //     const value = e.target.value;
    //     const length = value.length;

    //     switch (type) {
    //       case "title":
    //         if (wordLimit.title - length !== -1) {
    //           handleChange(e);
    //           setTitleLen(wordLimit.title - length);
    //         }
    //         break;
    //       case "description":
    //         if (wordLimit.description - length !== -1) {
    //           handleChange(e);
    //           setDescriptionLen(wordLimit.description - length);
    //         }
    //         break;
    //       case "price":
    //         if (
    //           e.target.value === "" ||
    //           (!isNaN(value) && wordLimit.price - length !== -1)
    //         ) {
    //           handleChange(e);
    //           setPriceLen(wordLimit.price - length);
    //         }
    //         break;
    //       case "salePrice":
    //         if (
    //           e.target.value === "" ||
    //           (!isNaN(value) && wordLimit.salePrice - length !== -1)
    //         ) {
    //           handleChange(e);
    //           setSalePriceLen(wordLimit.salePrice - length);
    //         }
    //         break;
    //       case "SKU":
    //         if (wordLimit.SKU - length !== -1) {
    //           handleChange(e);
    //           setSKULen(wordLimit.SKU - length);
    //         }
    //         break;
    //       case "quantity":
    //         if (
    //           e.target.value === "" ||
    //           (!isNaN(value) && wordLimit.quantity - length !== -1)
    //         ) {
    //           handleChange(e);
    //           setQuantityLen(wordLimit.quantity - length);
    //         }
    //         break;
    //       case "message":
    //         if (wordLimit.message - length !== -1) {
    //           setMessage(value);
    //           setMessageLen(wordLimit.message - length);
    //         }
    //         break;
    //       default:
    //         console.log("Incorrect Type");
    //     }
    //   };

    //   const handleSingleImage = (event) => {
    //     let file = event.target.files[0];
    //     if (file && file["type"].split("/")[0] === "image") {
    //       setstate({ ...state, image: file });
    //       setImageUrl(URL.createObjectURL(file));
    //     } else {
    //       alert("Please upload a valid image");
    //     }
    //   };

    //   // const imageHandler = (e) => {
    //   //   const imagesLength = Array.from(e.target.files).length;
    //   //   if (imagesLength > 5) {
    //   //     alert("Cannot upload more than 5 images");
    //   //     return;
    //   //   }
    //   //   let newImages = [];
    //   //   let prev = {
    //   //     image1: "",
    //   //     image2: "",
    //   //     image3: "",
    //   //     image4: "",
    //   //     image5: "",
    //   //   };
    //   //   for (let i = 0; i < imagesLength; i++) {
    //   //     if (
    //   //       e.target.files[i] &&
    //   //       e.target.files[i]["type"].split("/")[0] === "image"
    //   //     ) {
    //   //       prev[`image${i + 1}`] = e.target.files[i];
    //   //       newImages = [...newImages, URL.createObjectURL(e.target.files[i])];
    //   //     } else {
    //   //       alert("Please upload a valid image");
    //   //     }
    //   //   }
    //   //   setImagesUrl(newImages);
    //   //   setImages(prev);
    //   // };

    //   const imageHandler = (e) => {
    //     const imagesLength = Array.from(e.target.files).length;
    //     const currentLength = imagesUrl.length;
    //     if (imagesLength + currentLength > 5) {
    //       alert("Cannot upload more than 5 images");
    //       return;
    //     }
    //     let newImages = [...imagesUrl];
    //     let prev = { ...images };
    //     for (let i = 0; i < imagesLength; i++) {
    //       if (
    //         e.target.files[i] &&
    //         e.target.files[i]["type"].split("/")[0] === "image"
    //       ) {
    //         let file = e.target.files[i];
    //         newImages = [...newImages, URL.createObjectURL(file)];
    //         prev[`image${i + currentLength + 1}`] = file;
    //       } else {
    //         alert("Please upload a valid image");
    //       }
    //     }

    //     // let prev = {
    //     //   image1: "",
    //     //   image2: "",
    //     //   image3: "",
    //     //   image4: "",
    //     //   image5: "",
    //     // };
    //     // for (let i = 0; i < newImages.length; i++) {
    //     //   prev[`image${i + 1}`] = newImages[i];
    //     // }

    //     setImages(prev);
    //     setImagesUrl(newImages);
    //   };

    //   const openImage = (image) => {
    //     let newImageId = 0;
    //     for (let i = 0; i < imagesUrl.length; i++) {
    //       if (imagesUrl[i] === image) {
    //         newImageId = i;
    //         break;
    //       }
    //     }
    //     setImageId(newImageId);
    //     setImageTitle(`image${newImageId + 1}`);
    //     setCurrentImage(imagesUrl[newImageId]);
    //     setOpenModal(true);
    //   };

    //   const deleteImage = () => {
    //     let newImagesUrl = [];
    //     let newImagesList = [];
    //     for (let i = 0; i < imagesUrl.length; i++) {
    //       if (i !== imageId) {
    //         newImagesUrl = [...newImagesUrl, imagesUrl[i]];
    //         newImagesList = [...newImagesList, images[`image${i + 1}`]];
    //       }
    //     }

    //     setImagesUrl(newImagesUrl);

    //     let newImages = {
    //       image1: "",
    //       image2: "",
    //       image3: "",
    //       image4: "",
    //     };
    //     for (let i = 0; i < newImagesList.length; i++) {
    //       newImages[`image${i + 1}`] = newImagesList[i];
    //     }

    //     setImages(newImages);
    //     setOpenModal(false);
    //   };

    //   const handleStatus = (e) => {
    //     if (e.target.value === "active") {
    //       setstate({ ...state, status: true });
    //     } else {
    //       setstate({ ...state, status: false });
    //     }
    //   };

    //   const checkSubmitButton = () => {
    //     if (!variantChecked && state.price && state.sku && state.sale_price) {
    //       return true;
    //     }

    //     if (variantChecked) {
    //       return true;
    //     }

    //     return false;
    //   };

    return (
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">
                    {/* <!-- start page title --> */}
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-flex align-items-center justify-content-between">
                                <h4 className="mb-0">Add New Video</h4>
                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item">
                                            <Link to="/dashboard">Shoperola</Link>
                                        </li>
                                        <li className="breadcrumb-item active">Vending Machine</li>
                                        <li className="breadcrumb-item active">Add New Video</li>
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
                                <button
                                    //   onClick={handleSubmit}
                                    type="button"
                                    className="btn btn-success btn-login waves-effect waves-light mr-3"
                                >
                                    {/* <ClipLoader loading={loading} size={18} /> */}
                                    {/* {!loading && "Save"} */}
                                    Save
                                </button>
                                <Link to="/comproducts">
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
                    {/* <!-- Save options Ends-->             */}

                    <div className="row">
                        {/* <!--Left Column Begins--> */}
                        <div className="col-lg-8">


                            <div className="row">
                                {/* <!--Left Column Begins--> */}
                                <div>
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
                                                                        Title*
                                                                    </label>
                                                                    <div class="input-group has-validation">
                                                                        <input
                                                                            type="text"
                                                                            name="title"
                                                                            className={
                                                                                // clickedSave && state.title.length === 0
                                                                                // "form-control input-field is-invalid"
                                                                                "form-control input-field"
                                                                            }
                                                                            // onChange={(e) => editHandler(e, "title")}
                                                                            placeholder="Title"
                                                                        // value={state.title}
                                                                        />
                                                                        <div class="invalid-feedback">
                                                                            Please add a valid title.
                                                                        </div>
                                                                    </div>

                                                                    <label
                                                                        for="basicpill-phoneno-input"
                                                                        className="label-100"
                                                                    >
                                                                        {/* Remaining words : {titleLen} */}
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

                            <div className="row">
                                {/* <!--Left Column Begins--> */}
                                <div>
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
                                                                        Upload Thumbnail Image*
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-lg-12">
                                                                <div className="form-group mb-30 width-100 row">
                                                                    <label className="col-md-4 control-label">
                                                                        Upload One Image Only
                                                                        <br />
                                                                        <span className="size">(360 x 459 px)</span>
                                                                    </label>
                                                                    <div className="col-md-8">
                                                                        <input
                                                                            type="file"
                                                                            // onChange={handleSingleImage}
                                                                            className="form-control input-field"
                                                                            // value={state?.image?.filename}
                                                                            accept="image/*"
                                                                        />
                                                                        {/* {imageUrl && (
                                                                            <img
                                                                                className="img-fluid mt-2"
                                                                                style={{
                                                                                    width: "95px",
                                                                                    height: "126px",
                                                                                }}
                                                                                alt="360x459"
                                                                                src={imageUrl}
                                                                            />
                                                                        )} */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- Left Column Ends --> */}
                            </div>

                            <div className="row">
                                {/* <!--Left Column Begins--> */}
                                <div>
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
                                                                        Upload Video MP4 Format
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-lg-12">
                                                                <div className="form-group mb-30 width-100 row">
                                                                    <label className="col-md-4 control-label">
                                                                        Upload One Video Only*
                                                                        <br />
                                                                        <span className="size">(360 x 459 px)</span>
                                                                    </label>
                                                                    <div className="col-md-8">
                                                                        <input
                                                                            type="file"
                                                                            // onChange={imageHandler}
                                                                            className="form-control input-field"
                                                                            accept="video/*"
                                                                            multiple
                                                                        />
                                                                        {/* {imagesUrl.length > 0 &&
                                                                            imagesUrl.map((image) => (
                                                                                <img
                                                                                    className="img-fluid mt-2 pr-2"
                                                                                    style={{
                                                                                        width: "75px",
                                                                                        height: "100px",
                                                                                        cursor: "pointer",
                                                                                    }}
                                                                                    alt="360x459"
                                                                                    src={image}
                                                                                    onClick={() => openImage(image)}
                                                                                />
                                                                            ))} */}
                                                                        {/* {openModal && (
                                                                            <div
                                                                                className="modal fade show"
                                                                                id="exampleModalCenter"
                                                                                tabindex="-1"
                                                                                aria-labelledby="exampleModalCenterTitle"
                                                                                aria-modal="true"
                                                                                role="dialog"
                                                                                style={{ display: "block" }}
                                                                            >
                                                                                <div className="modal-dialog modal-dialog-centered">
                                                                                    <div className="modal-content">
                                                                                        <div className="modal-header">
                                                                                            <h5
                                                                                                className="modal-title"
                                                                                                id="exampleModalCenterTitle"
                                                                                            >
                                                                                                {imageTitle}
                                                                                            </h5>
                                                                                            <button
                                                                                                type="button"
                                                                                                className="btn-close"
                                                                                                data-bs-dismiss="modal"
                                                                                                aria-label="Close"
                                                                                                onClick={() =>
                                                                                                    setOpenModal(false)
                                                                                                }
                                                                                            ></button>
                                                                                        </div>
                                                                                        <div className="modal-body">
                                                                                            <img
                                                                                                className="img-fluid mt-2 pr-2"
                                                                                                style={{
                                                                                                    width: "360px",
                                                                                                    height: "45px",
                                                                                                }}
                                                                                                alt="360x459"
                                                                                                src={currentImage}
                                                                                            // onClick={() => openImage(image)}
                                                                                            />
                                                                                        </div>
                                                                                        <div className="modal-footer">
                                                                                            <button
                                                                                                type="button"
                                                                                                className="btn btn-secondary"
                                                                                                data-bs-dismiss="modal"
                                                                                                onClick={() =>
                                                                                                    setOpenModal(false)
                                                                                                }
                                                                                            >
                                                                                                Close
                                                                                            </button>
                                                                                            <button
                                                                                                type="button"
                                                                                                className="btn btn-danger"
                                                                                                onClick={() => deleteImage()}
                                                                                            >
                                                                                                Delete
                                                                                            </button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        )} */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- Left Column Ends --> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!--Right Column Ends --> */}



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

export default AddVideo;
