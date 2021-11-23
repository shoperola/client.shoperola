import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../../../../API";
import { isAutheticated } from "../../../auth/authhelper";
import ClipLoader from "react-spinners/ClipLoader";
import { Link, useParams } from "react-router-dom";
import Footer from "../../Footer";
import getSymbolFromCurrency from "currency-symbol-map";

function Editproducts(props) {
  const { productId } = useParams();

  const { token } = isAutheticated();
  const [taxs, setTax] = useState([]);
  const [Categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currency, setCurrency] = useState();
  const [images, setImages] = useState({
    image1: "",
    image2: "",
    image3: "",
    image4: "",
  });
  const [imageUrl, setImageUrl] = useState();
  const [imagesUrl, setImagesUrl] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [imageTitle, setImageTitle] = useState("");
  const [imageId, setImageId] = useState(0);

  const [state, setstate] = useState({
    title: "",
    description: "",
    category: "",
    status: "",
    image: "",
    price: "",
    sale_price: "",
    sku: "",
    quantity: "",
    continue_selling: false,
    track_quantity: false,
    statusState: true,
    initialCategory: "",
    tax: "",
  });

  const wordLimit = {
    title: 40,
    description: 200,
    price: 12,
    salePrice: 12,
    SKU: 10,
    quantity: 10,
  };

  const [titleLen, setTitleLen] = useState(wordLimit.title);
  const [descriptionLen, setDescriptionLen] = useState(wordLimit.description);
  const [priceLen, setPriceLen] = useState(wordLimit.price);
  const [salePriceLen, setSalePriceLen] = useState(wordLimit.salePrice);
  const [SKULen, setSKULen] = useState(wordLimit.SKU);
  const [quantityLen, setQuantityLen] = useState(wordLimit.quantity);

  // useEffect(() => {
  // 	async function fetchData() {
  // 		let res = await axios.get(`${API}/api/category`, {
  // 			headers: {
  // 				Authorization: `Bearer ${token}`,
  // 			}
  // 		});
  // 		if (res.data.length > 0) {
  // 			setCategories(res.data)
  // 		}
  // 	}
  // 	fetchData();
  // }, [token])

  useEffect(() => {
    async function fetchData() {
      await axios
        .get(`${API}/api/user`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setCurrency(res.data.data.settings.currency);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    fetchData();
  }, [token]);

  const onCancel = (e) => {
    window.location = "/comproducts";
  };

  const handleSubmit = async () => {
    const formdata = new FormData();
    setLoading(true);
    formdata.append("title", state.title);
    formdata.append("description", state.description);
    formdata.append("category_id", state.category);
    formdata.append("image", state.image);
    formdata.append("quantity", state.quantity);
    formdata.append("continue_selling", state.continue_selling);
    formdata.append("track_quantity", state.track_quantity);
    formdata.append("status", state.status);

    formdata.append("price", state.price);
    formdata.append("sale_price", state.sale_price);
    formdata.append("sku", state.sku);
    formdata.append("tax_id", state.tax);

    for (let i = 1; i < 5; i++) {
      if (images[`image${i}`] !== state[`image${i}`]) {
        formdata.append(`image${i}`, images[`image${i}`]);
      } else {
        formdata.append(`image${i}`, null);
      }
    }

    let res = await axios.put(`${API}/api/product/${productId}`, formdata, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setLoading(false);
  };

  useEffect(() => {
    const getData = async () => {
      let response = await axios.get(`${API}/api/category`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      let res = await axios.get(
        `${API}/api/product/${props.match.params.productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);

      const temp = response.data?.filter(
        (category) => category._id !== res.data?.data?.category
      );
      const category = response.data.find(
        (category) => category._id === res.data?.data?.category
      );
      setCategories(temp);
      let taxes = await axios.get(`${API}/api/tax_rates`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let tax = null;

      const filtertax = taxes.data.data.filter(
        (tax) => tax._id !== res.data?.data?.tax?._id
      );
      setTax(filtertax);

      tax = taxes.data.data.find(
        (tax) => tax?._id === res.data?.data?.tax?._id
      );

      setstate({
        title: res.data?.data?.title,
        description: res.data?.data?.description,
        image: res.data?.data?.image,
        price: res.data?.data?.price,
        sale_price: res.data?.data?.sale_price,
        sku: res.data?.data?.sku,
        track_quantity: res.data?.data?.track_quantity,
        quantity: res.data?.data?.quantity,
        status: res.data?.data?.status,
        continue_selling: res.data?.data?.continue_selling,
        initialCategory: category,
        category: category?._id,
        imageUrl: res.data?.data?.image,
        tax: tax,
        initialTax: tax,
      });
      let newImagesUrl = [];
      let newImages = {
        image1: "",
        image2: "",
        image3: "",
        image4: "",
      };

      for (let i = 1; i < 5; i++) {
        if (res.data?.data[`image${i}`] !== "") {
          newImagesUrl = [...newImagesUrl, res.data?.data[`image${i}`]];
          newImages[`image${i}`] = res.data?.data[`image${i}`];
        }
      }
      setImagesUrl(newImagesUrl);
      setImages(newImages);

      setImageUrl(res.data?.data?.image);

      setTitleLen(wordLimit.title - res.data?.data?.title.length);
      setDescriptionLen(
        wordLimit.description - res.data?.data?.description.length
      );
      setPriceLen(wordLimit.price - res.data?.data?.price?.toString().length);
      setSalePriceLen(
        wordLimit.salePrice - res.data?.data?.sale_price.toString().length
      );
      setSKULen(wordLimit.SKU - res.data?.data?.sku?.toString().length);
      if (res.data?.data?.track_quantity) {
        setQuantityLen(
          wordLimit.quantity - res.data?.data?.quantity.toString().length
        );
      } else {
      }
    };
    getData();
  }, [token, props.match.params.productId]);

  useEffect(() => {
    if (state.quantity === "") {
      setstate((prev) => ({ ...prev, quantity: "0" }));
    }
  });

  const onFileChange = (e) => {
    setstate({
      ...state,
      image: e.target.files[0],
      imageUrl: URL.createObjectURL(e.target.files[0]),
    });
  };
  const handleChange = (e) => {
    setstate({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const handleChangeCheckBox = (e) => {
    setstate({
      ...state,
      [e.target.name]: e.target.checked,
    });
  };

  const editHandler = (e, type) => {
    const value = e.target.value;
    const length = value.length;

    switch (type) {
      case "title":
        if (wordLimit.title - length !== -1) {
          handleChange(e);
          setTitleLen(wordLimit.title - length);
        }
        break;
      case "description":
        if (wordLimit.description - length !== -1) {
          handleChange(e);
          setDescriptionLen(wordLimit.description - length);
        }
        break;
      case "price":
        if (
          e.target.value === "" ||
          (!isNaN(value) && wordLimit.price - length !== -1)
        ) {
          handleChange(e);
          setPriceLen(wordLimit.price - length);
        }
        break;
      case "salePrice":
        if (
          e.target.value === "" ||
          (!isNaN(value) && wordLimit.salePrice - length !== -1)
        ) {
          handleChange(e);
          setSalePriceLen(wordLimit.salePrice - length);
        }
        break;
      case "SKU":
        if (
          e.target.value === "" ||
          (!isNaN(value) && wordLimit.SKU - length !== -1)
        ) {
          handleChange(e);
          setSKULen(wordLimit.SKU - length);
        }
        break;
      case "quantity":
        if (
          e.target.value === "" ||
          (!isNaN(value) && wordLimit.quantity - length !== -1)
        ) {
          handleChange(e);
          setQuantityLen(wordLimit.quantity - length);
        }
        break;
      default:
        console.log("Incorrect Type");
    }
  };

  const handleSingleImage = (event) => {
    const file = event.target.files[0];
    if (file && file["type"].split("/")[0] === "image") {
      setstate({ ...state, image: event.target.files[0] });
      setImageUrl(URL.createObjectURL(file));
    } else {
      alert("Please upload a valid image");
    }
  };

  const imageHandler = (e) => {
    const imagesLength = Array.from(e.target.files).length;
    const currentLength = imagesUrl.length;
    if (imagesLength + currentLength > 4) {
      alert("Cannot upload more than 4 images");
      return;
    }
    let newImages = [...imagesUrl];
    let newImagesList = [];

    for (const key in images) {
      if (images[key] !== "") newImagesList = [...newImagesList, images[key]];
    }
    for (let i = 0; i < imagesLength; i++) {
      if (
        e.target.files[i] &&
        e.target.files[i]["type"].split("/")[0] === "image"
      ) {
        newImages = [...newImages, URL.createObjectURL(e.target.files[i])];
        newImagesList = [...newImagesList, e.target.files[i]];
      } else {
        alert("Please upload a valid image");
      }
    }

    let prev = {
      image1: "",
      image2: "",
      image3: "",
      image4: "",
    };
    for (let i = 0; i < newImagesList.length; i++) {
      prev[`image${i + 1}`] = newImagesList[i];
    }
    setImages(prev);
    setImagesUrl(newImages);
  };

  const openImage = (image) => {
    let newImageId = 0;
    for (let i = 0; i < imagesUrl.length; i++) {
      if (imagesUrl[i] === image) {
        newImageId = i;
        break;
      }
    }
    setImageId(newImageId);
    setImageTitle(`image${newImageId + 1}`);
    setCurrentImage(imagesUrl[newImageId]);
    setOpenModal(true);
  };

  const deleteImage = () => {
    let newImagesUrl = [];
    for (let i = 0; i < imagesUrl.length; i++) {
      if (i !== imageId) {
        newImagesUrl = [...newImagesUrl, imagesUrl[i]];
      }
    }

    setImagesUrl(newImagesUrl);

    let newImages = {
      image1: "",
      image2: "",
      image3: "",
      image4: "",
    };
    for (let i = 0; i < newImagesUrl.length; i++) {
      newImages[`image${i + 1}`] = newImagesUrl[i];
    }

    setImages(newImages);
    setOpenModal(false);
  };

  const deleteSingleImage = () => {
    setstate((prev) => ({ ...prev, image: null }));
    setImageUrl("");
  };

  const handleStatus = (e) => {
    if (e.target.value === "Active") {
      setstate({ ...state, status: true });
    } else {
      setstate({ ...state, status: false });
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
                <h4 className="mb-0">Edit Product</h4>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">Shoperola</Link>
                    </li>
                    <li className="breadcrumb-item active">Commerce</li>
                    <li className="breadcrumb-item active">Edit Product</li>
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
                  onClick={handleSubmit}
                  type="button"
                  className="btn btn-success btn-login waves-effect waves-light mr-3"
                >
                  <ClipLoader loading={loading} size={18} />
                  {!loading && "Save"}
                </button>
                {/* <Link to="/comproducts"> */}
                <button
                  type="button"
                  onClick={onCancel}
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
                                Title
                              </label>
                              <input
                                name="title"
                                onChange={(e) => editHandler(e, "title")}
                                type="text"
                                value={state.title}
                                className="form-control input-field"
                                placeholder="Title"
                              />
                              <label
                                for="basicpill-phoneno-input"
                                className="label-100"
                              >
                                Remaining words : {titleLen}
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="form-group mb-30 width-100 row">
                            <label className="col-md-4 control-label">
                              Description
                            </label>
                            <div className="col-md-13">
                              <textarea
                                onChange={(e) => editHandler(e, "description")}
                                value={state.description}
                                name="description"
                                className="form-control input-field"
                                rows="5"
                                placeholder="Add description"
                              ></textarea>
                              <label
                                for="basicpill-phoneno-input"
                                className="label-100"
                              >
                                Remaining words : {descriptionLen}
                              </label>
                            </div>
                          </div>
                          {/* <div className="col-lg-12">
														<div className="form-group">
															<label for="basicpill-phoneno-input" className="label-100">
																Description
															</label>
															<div id="summernote-editor" className="summernote">Product description</div>
														</div>
													</div> */}
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- Left Column Ends --> */}

            {/* <!--Right Column Begins --> */}
            <div className="col-lg-4">
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
                                Select Tax*
                              </label>
                              <select
                                name="tax"
                                defaultValue={state.initialTax}
                                value={state.tax}
                                onChange={handleChange}
                                className="form-control  input-field"
                              >
                                <option value={state.initialTax?._id}>
                                  {state.initialTax?.tax_name} -{" "}
                                  {state.initialTax?.tax_percentage}%
                                </option>
                                {taxs?.map((tax) => (
                                  <>
                                    <option key={tax._id} value={tax._id}>
                                      {tax.tax_name} - {tax.tax_percentage}%
                                    </option>
                                  </>
                                ))}
                              </select>
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
                                Select Category
                              </label>
                              <select
                                name="category"
                                defaultValue={state.initialCategory?._id}
                                value={state.category}
                                onChange={handleChange}
                                className="form-control  input-field"
                              >
                                <option value={state.initialCategory?._id}>
                                  {state.initialCategory?.category}
                                </option>
                                {Categories?.map((item) => (
                                  <option key={item._id} value={item?._id}>
                                    {item.category}
                                  </option>
                                ))}
                              </select>
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
                                Status
                              </label>
                              <select
                                name="status"
                                value={state.status ? "Active" : "Inactive"}
                                onChange={handleStatus}
                                className="form-control  input-field"
                              >
                                <>
                                  <option value="Active">Active</option>
                                  <option value="Inactive">Inactive</option>
                                </>
                              </select>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!--Right Column Ends --> */}
          </div>
          {/* <!-- Row 1 Ends -->           */}

          {/* <!-- Row 2 Begins -->                */}
          <div className="row">
            {/* <!--Left Column Begins--> */}
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
                                Upload Featured Product Image*
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group mb-30 width-100 row">
                              <label className="col-md-3 control-label">
                                Upload One Image Only
                                <br />
                                <span className="size">(360 x 459 px)</span>
                              </label>
                              <div className="col-md-3">
                                <img
                                  src={imageUrl}
                                  width="100"
                                  height="113"
                                  alt="360x459"
                                />
                              </div>
                              <div className="col-md-6">
                                <input
                                  type="file"
                                  onChange={handleSingleImage}
                                  className="form-control input-field"
                                  value={state?.image?.filename}
                                  accept="image/*"
                                />
                                <button
                                  type="button"
                                  className="btn btn-danger"
                                  onClick={() => deleteSingleImage()}
                                >
                                  Delete
                                </button>
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
                                Upload Product Images (Optional)
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group mb-30 width-100 row">
                              <label className="col-md-4 control-label">
                                Upload Upto 4 Images
                                <br />
                                <span className="size">(360 x 459 px)</span>
                              </label>
                              <div className="col-md-8">
                                <input
                                  type="file"
                                  onChange={imageHandler}
                                  className="form-control input-field"
                                  accept="image/*"
                                  multiple
                                />
                                {imagesUrl.length > 0 &&
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
                                  ))}

                                {openModal && (
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
                                            onClick={() => setOpenModal(false)}
                                          ></button>
                                        </div>
                                        <div className="modal-body">
                                          <img
                                            className="img-fluid mt-2 pr-2"
                                            style={{
                                              width: "360px",
                                              height: "459px",
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
                                            onClick={() => setOpenModal(false)}
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
                                )}
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

          {/* <!-- Row 2 Ends -->  */}

          {/* <!-- Row 3 Begins -->                */}
          <div className="row">
            {/* <!--Left Column Begins--> */}
            <div className="col-lg-8">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12">
                      <form>
                        <div className="row">
                          <div className="col-lg-4">
                            <div className="form-group">
                              <label
                                htmlFor="basicpill-phoneno-input"
                                className="label-100"
                              >
                                Price
                              </label>
                              <div className="input-group">
                                <div className="input-group-prepend">
                                  <span className="input-group-text">
                                    {currency
                                      ? getSymbolFromCurrency(currency)
                                      : "$"}
                                  </span>
                                </div>
                                <input
                                  type="number"
                                  name="price"
                                  onChange={(e) => editHandler(e, "price")}
                                  className="form-control input-field"
                                  value={state.price}
                                  min="0.00"
                                />
                              </div>
                              <label
                                for="basicpill-phoneno-input"
                                className="label-100"
                              >
                                Remaining words : {priceLen}
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-4">
                            <div className="form-group">
                              <label
                                htmlFor="basicpill-phoneno-input"
                                className="label-100"
                              >
                                Sale Price
                              </label>
                              <div className="input-group">
                                <div className="input-group-prepend">
                                  <span className="input-group-text">
                                    {currency
                                      ? getSymbolFromCurrency(currency)
                                      : "$"}
                                  </span>
                                </div>
                                <input
                                  type="number"
                                  name="sale_price"
                                  onChange={(e) => editHandler(e, "salePrice")}
                                  className="form-control input-field"
                                  value={state.sale_price}
                                  min="0.00"
                                />
                              </div>
                              <label
                                for="basicpill-phoneno-input"
                                className="label-100"
                              >
                                Remaining words : {salePriceLen}
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
            {/* <!-- Left Column Ends --> */}
          </div>

          {/* <!-- Row 3 Ends -->  */}

          {/* <!-- Row 4 Begins -->                */}
          <div className="row">
            {/* <!--Left Column Begins--> */}
            <div className="col-lg-8">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12">
                      <form>
                        <div className="row">
                          <div className="col-lg-4">
                            <div className="form-group">
                              <label
                                htmlFor="basicpill-phoneno-input"
                                className="label-100"
                              >
                                SKU
                              </label>
                              <input
                                name="sku"
                                value={state.sku}
                                onChange={(e) => editHandler(e, "SKU")}
                                type="text"
                                className="form-control input-field"
                              />
                              <label
                                for="basicpill-phoneno-input"
                                className="label-100"
                              >
                                Remaining words : {SKULen}
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-4">
                            <div className="form-group">
                              <label
                                for="basicpill-phoneno-input"
                                className="label-100"
                              >
                                Quantity Available*
                              </label>
                              <input
                                name="quantity"
                                onChange={(e) => editHandler(e, "quantity")}
                                value={state.quantity}
                                type="text"
                                className="form-control input-field"
                              />
                              <label
                                for="basicpill-phoneno-input"
                                className="label-100"
                              >
                                Remaining words : {quantityLen}
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
            {/* <!-- Left Column Ends --> */}
          </div>
          {/* <!-- Row 4 Ends -->  */}
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

export default Editproducts;
