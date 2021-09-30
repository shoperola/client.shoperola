import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../../../../API";
import { isAutheticated } from "../../../auth/authhelper";
import ClipLoader from "react-spinners/ClipLoader";
import { Link, useParams } from "react-router-dom";
import Footer from "../../Footer";
import getSymbolFromCurrency from "currency-symbol-map";

function ViewProducts(props) {
  const { productId } = useParams();

  const { token } = isAutheticated();
  const [taxs, setTax] = useState([]);
  const [Categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCategory, setShowCategory] = useState("");

  const [currency, setCurrency] = useState();
  const [images, setImages] = useState({
    image1: "",
    image2: "",
    image3: "",
    image4: "",
    image5: "",
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

  const [variantChecked, setVariantChecked] = useState(false);
  const [optionList, setOptionList] = useState([{ name: "", value: [] }]);
  const [variants, setVariants] = useState([]);
  const [variantId, setVariantId] = useState("");
  const [variantEdited, setVariantEdited] = useState(false);
  const [originalVariants, setOriginalVariants] = useState([]);

  const wordLimit = {
    title: 40,
    description: 1000,
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

  const createVariants = (variants) => {
    const totalVariants = variants.variant_title.length;
    let tempVariants = [];
    for (let i = 0; i < totalVariants; i++) {
      tempVariants = [
        ...tempVariants,
        {
          variant: variants.variant_title[i],
          price: variants.variant_price[i],
          quantity: variants.variant_quantity[i],
          SKU: variants.variant_sku[i],
          image: variants.variant_image[i],
        },
      ];
    }

    return tempVariants;
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
      const temp = response.data.filter(
        (category) => category._id !== res.data?.data?.category
      );
      const category = response.data.find(
        (category) => category._id === res.data?.data?.category
      );
      setCategories(temp);
      let taxes = await axios.get(`${API}/api/tax_rates/view_taxs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let tax = null;
      console.log(res.data.data.variants);
      if (res.data?.data?.variants) {
        setVariantChecked(true);
        setVariantId(res.data?.data?.variants._id);
        const tempVariants = createVariants(res.data?.data?.variants);
        setVariants(JSON.parse(JSON.stringify(tempVariants)));
        setOriginalVariants(JSON.parse(JSON.stringify(tempVariants)));
        const values = res.data?.data?.variants.value;
        const tempOptionList = res.data?.data?.variants.options.map(
          (item, index) => ({
            name: item,
            value: values[index].split(","),
          })
        );
        setOptionList(tempOptionList);

        const filtertax = taxes.data.data.filter(
          (tax) => tax._id !== res.data?.data?.variants.tax
        );
        setTax(filtertax);

        tax = taxes.data.data.find(
          (tax) => tax._id === res.data?.data?.variants.tax
        );
      } else {
        const filtertax = taxes.data.data.filter(
          (tax) => tax._id !== res.data?.data?.tax._id
        );
        setTax(filtertax);

        tax = taxes.data.data.find(
          (tax) => tax._id === res.data?.data?.tax._id
        );
      }
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
        category: category?.category,
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
        image5: "",
      };

      for (let i = 1; i < 6; i++) {
        if (res.data?.data[`image${i}`] !== "") {
          newImagesUrl = [...newImagesUrl, res.data?.data[`image${i}`]];
          newImages[`image${i}`] = res.data?.data[`image${i}`];
        }
      }
      setImagesUrl(newImagesUrl);
      setImages(newImages);

      setImageUrl(res.data?.data?.image);

      if (!res.data?.data?.variants) {
        setTitleLen(wordLimit.title - res.data?.data?.title.length);
        setDescriptionLen(
          wordLimit.description - res.data?.data?.description.length
        );
        setPriceLen(wordLimit.price - res.data?.data?.price.toString().length);
        setSalePriceLen(
          wordLimit.salePrice - res.data?.data?.sale_price.toString().length
        );
        setSKULen(wordLimit.SKU - res.data?.data?.sku.toString().length);
        if (res.data?.data?.track_quantity) {
          setQuantityLen(
            wordLimit.quantity - res.data?.data?.quantity.toString().length
          );
        } else {
        }
      }
    };
    getData();
  }, [token, props.match.params.productId]);

  useEffect(() => {
    if (state.quantity === "") {
      setstate((prev) => ({ ...prev, quantity: "0" }));
    }
  });

  const openImage = (image, variant = false, featured = false) => {
    let newImageId = 0;

    if (featured === true) {
      setImageId(0);
      setImageTitle(`Featured Product Image`);
      setCurrentImage(image);
      setOpenModal(true);
      return;
    }

    if (variant) {
      setImageId(0);
      setImageTitle(`${variant} Image`);
      setCurrentImage(image);
      setOpenModal(true);
      return;
    }

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

  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          {/* <!-- start page title --> */}
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0">View Product</h4>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">TellyTell</Link>
                    </li>
                    <li className="breadcrumb-item active">Commerce</li>
                    <li className="breadcrumb-item active">View Product</li>
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
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label
                              htmlFor="basicpill-phoneno-input"
                              className="label-100"
                            >
                              Product Details
                            </label>
                            <label className="col-md-4 control-label">
                              Title :{" "}
                              <span className="font-weight-normal">
                                {state.title}
                              </span>
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
                            <p>{state.description}</p>
                          </div>
                        </div>
                      </div>
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
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label
                              htmlFor="basicpill-phoneno-input"
                              className="label-100"
                            >
                              Tax & Categories
                            </label>
                            <label className="col-md-8 control-label">
                              Tax :{" "}
                              <span className="font-weight-normal">
                                {state.tax.tax_name}
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label className="col-md-8 control-label">
                              Category :{" "}
                              <span className="font-weight-normal">
                                {state.category}
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label className="col-md-8 control-label">
                              Status :{" "}
                              <span className="font-weight-normal">
                                {state.status ? "Active" : "Inactive"}
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
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
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label
                              htmlFor="basicpill-phoneno-input"
                              className="label-100"
                            >
                              Images
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="form-group mb-30 width-100 row">
                            <label className="col-md-3 control-label">
                              Featured Product Image
                            </label>
                            <div className="col-md-3">
                              <img
                                src={imageUrl}
                                style={{
                                  width: "100px",
                                  height: "113px",
                                  cursor: "pointer",
                                }}
                                alt="360x459"
                                onClick={() => openImage(imageUrl, false, true)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="form-group mb-30 width-100 row">
                            <label className="col-md-3 control-label">
                              Product Images
                            </label>
                            <div className="col-md-8">
                              {imagesUrl.length > 0 &&
                                imagesUrl.map((image) => (
                                  <img
                                    className="img-fluid mt-2 pr-2"
                                    style={{
                                      width: "75px",
                                      height: "100px",
                                      cursor: "pointer",
                                    }}
                                    alt="200x200"
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
                                          alt="200x200"
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
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- Left Column Ends --> */}
          </div>

          {/* <!-- Row 2 Ends -->  */}

          {/* <!-- Row 3 Ends -->  */}

          {/* <!-- Row 4 Begins -->                */}
          {!variantChecked && (
            <div className="row">
              {/* <!--Left Column Begins--> */}
              <div className="col-lg-8">
                <div className="card">
                  <div
                    className="card-body"
                    style={
                      variantChecked ? { backgroundColor: "#d4d4d4" } : null
                    }
                  >
                    <div className="row">
                      <div className="col-md-12">
                        <div className="row">
                          <div className="col-lg-4">
                            <div className="form-group">
                              <label
                                htmlFor="basicpill-phoneno-input"
                                className="label-100"
                              >
                                Prices, SKU & Quantity
                              </label>
                              <label className="col-md-8 control-label">
                                Price :{" "}
                                <span className="font-weight-normal">
                                  {state.price}
                                </span>
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-4">
                            <div className="form-group">
                              <label className="col-md-8 control-label">
                                Sale Price :{" "}
                                <span className="font-weight-normal">
                                  {state.sale_price}
                                </span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="row">
                          <div className="col-lg-4">
                            <div className="form-group">
                              <label className="col-md-8 control-label">
                                SKU :{" "}
                                <span className="font-weight-normal">
                                  {state.sku}
                                </span>
                              </label>
                            </div>
                          </div>
                        </div>
                        {/* <div className="row">
                          <div className="col-lg-4">
                            <div className="custom-control custom-checkbox mb-2">
                              <input
                                name="track_quantity"
                                checked={state.track_quantity}
                                onChange={handleChangeCheckBox}
                                type="checkbox"
                                className="custom-control-input"
                                id="genre1"
                                disabled={variantChecked}
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="genre1"
                              >
                                Track Quantity
                              </label>
                            </div>
                          </div>
                        </div> */}
                        {/* <div className="row">
                          <div className="col-lg-4">
                            <div className="custom-control custom-checkbox mb-2">
                              <input
                                name="continue_selling"
                                type="checkbox"
                                className="custom-control-input"
                                id="genre2"
                                onChange={handleChangeCheckBox}
                                disabled={variantChecked}
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="genre2"
                              >
                                Continue sellng when out of stock
                              </label>
                            </div>
                          </div>
                        </div> */}
                        {/* {state.track_quantity && (
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
                                  disabled={variantChecked}
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
                        )} */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- Left Column Ends --> */}
            </div>
          )}

          {variantChecked && (
            <div className="row">
              {/* <!--Left Column Begins--> */}
              <div className="col-lg-8">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group">
                              <label
                                htmlFor="basicpill-phoneno-input"
                                className="label-700"
                              >
                                Variants
                              </label>
                            </div>
                          </div>
                        </div>
                        {/* <!--Left Column Begins--> */}
                        <div className="row">
                          <div className="col-md-12">
                            <div className="row">
                              <table className="table">
                                <thead>
                                  <tr className="row">
                                    <th
                                      className="col-lg-3 text-center"
                                      scope="col"
                                    >
                                      Variant
                                    </th>
                                    <th
                                      className="col-lg-2 text-center"
                                      scope="col"
                                    >
                                      Price
                                    </th>
                                    <th
                                      className="col-lg-2 text-center"
                                      scope="col"
                                    >
                                      Quantity
                                    </th>
                                    <th
                                      className="col-lg-2 text-center"
                                      scope="col"
                                    >
                                      SKU
                                    </th>
                                    <th
                                      className="col-lg-3 text-center"
                                      scope="col"
                                    >
                                      Image
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {originalVariants.map((item) => (
                                    <tr key={item.id} className="row">
                                      <td className="col-lg-3 text-center">
                                        {item.variant}
                                      </td>
                                      <td className="col-lg-2 text-center">
                                        {item.price}
                                      </td>
                                      <td className="col-lg-2 text-center">
                                        {item.quantity}
                                      </td>
                                      <td className="col-lg-2 text-center">
                                        {item.SKU}
                                      </td>
                                      <td className="col-lg-3 text-center">
                                        <img
                                          src={item.image}
                                          alt={item.variant}
                                          className="img-fluid mt-2 pr-2"
                                          style={{
                                            width: "60px",
                                            height: "80px",
                                            cursor: "pointer",
                                          }}
                                          onClick={() =>
                                            openImage(item.image, item.variant)
                                          }
                                        />
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                          {/* <!-- Left Column Ends --> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- Left Column Ends --> */}
            </div>
          )}
        </div>
        {/* <!-- container-fluid --> */}
      </div>
      {/* <!-- End Page-content --> */}

      {/* <footer className="footer">
				<div className="container-fluid">
					<div className="row">
						<div className="col-sm-12">
							<script>document.write(new Date().getFullYear())</script> © TellyTell.
						</div>

					</div>
				</div>
			</footer> */}
      <Footer />
    </div>
  );
}

export default ViewProducts;
