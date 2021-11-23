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
  const [haveImages, setHaveImages] = useState(false);

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
    description: 1000,
    price: 12,
    salePrice: 12,
    SKU: 10,
    quantity: 10,
  };

  const [isSample, setIsSample] = useState(false);
  const [includedWithProduct, setIncludedWithProduct] = useState(true);
  const [includedWith, setIncludedWith] = useState("Test Product");
  const [sampleRule, setSampleRule] = useState(
    "Only one sample of this per person"
  );
  const [sampleFeatured, setSampleFeatured] = useState(false);
  const [sampleMessage, setSampleMessage] = useState("Random text message");
  const [informationColelcted, setInformationCollected] = useState(
    "Name, Mobile Number"
  );

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
      let taxes = await axios.get(`${API}/api/tax_rates`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let tax = null;
      console.log("dsasadsad", taxes);
      const filtertax = taxes.data?.data?.filter(
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
      };

      let count = 0;
      for (let i = 1; i < 5; i++) {
        if (res.data?.data[`image${i}`] !== "") {
          newImagesUrl = [...newImagesUrl, res.data?.data[`image${i}`]];
          newImages[`image${i}`] = res.data?.data[`image${i}`];
          count += 1;
        }
      }

      if (count !== 0) {
        setHaveImages(true);
      }

      setImagesUrl(newImagesUrl);
      setImages(newImages);

      setImageUrl(res.data?.data?.image);
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
                      <Link to="/dashboard">Shoperola</Link>
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
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-group  width-100 row">
                          <label className="col-md-4 control-label">
                            Title :{" "}
                            <span className="font-weight-normal">
                              {state.title}
                            </span>
                          </label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-group  width-100 row">
                          <label className="col-md-6 control-label">
                            Product Id :{" "}
                            <span className="font-weight-normal">
                              {productId}
                            </span>
                          </label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-group  width-100 row">
                          <label className="col-md-6 control-label">
                            Is Sample Product:{" "}
                            <span className="font-weight-normal">
                              {isSample ? "Yes" : "No"}
                            </span>
                          </label>
                        </div>
                      </div>
                      {isSample && (
                        <div className="row">
                          <div className="form-group  width-100 row">
                            <label className="col-md-6 control-label">
                              Is included with product purchase:
                              <span className="font-weight-normal">
                                {includedWithProduct ? "Yes" : "No"}
                              </span>
                            </label>
                          </div>
                        </div>
                      )}
                      {isSample && includedWithProduct && (
                        <div className="row">
                          <div className="form-group  width-100 row">
                            <label className="col-md-6 control-label">
                              Product Name:
                              <span className="font-weight-normal">
                                {includedWith}
                              </span>
                            </label>
                          </div>
                        </div>
                      )}
                      <div className="row">
                        <div className="form-group  width-100 row">
                          <label className="col-md-4 control-label">
                            Description
                          </label>
                          <div>
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
            {!isSample && (
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
                                  {state.tax?.tax_name}
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
            )}

            {isSample && (
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
                                Other information
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group ">
                              <label className="col-md-8 control-label">
                                Rules for this Sample product dispense
                              </label>
                              <div className="col-md-8 control-label">
                                <p>{sampleRule}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group ">
                              <label className="col-md-8 control-label">
                                Information Collected about
                              </label>
                              <div className="col-md-8 control-label">
                                <p>{informationColelcted}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group ">
                              <label className="col-md-8 control-label">
                                Message
                              </label>
                              <div className="col-md-8 control-label">
                                <p>{sampleMessage}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group">
                              <label className="col-md-8 control-label">
                                Is Featured:
                                <span className="font-weight-normal">
                                  {sampleFeatured ? "Yes" : "No"}
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
            )}

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
                      {haveImages && (
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
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

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
            {/* <!-- Left Column Ends --> */}
          </div>

          {/* <!-- Row 2 Ends -->  */}

          {/* <!-- Row 3 Ends -->  */}

          {/* <!-- Row 4 Begins -->                */}
          <div className="row">
            {/* <!--Left Column Begins--> */}
            <div className="col-lg-8">
              <div className="card">
                <div className="card-body">
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
                            {!isSample && (
                              <label className="col-md-8 control-label">
                                Price :{" "}
                                <span className="font-weight-normal">
                                  {state.price}
                                </span>
                              </label>
                            )}
                          </div>
                        </div>
                      </div>
                      {!isSample && (
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
                      )}
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- Left Column Ends --> */}
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

export default ViewProducts;
