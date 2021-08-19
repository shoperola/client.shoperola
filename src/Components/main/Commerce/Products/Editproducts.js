import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../../../../API";
import { isAutheticated } from "../../../auth/authhelper";
import ClipLoader from "react-spinners/ClipLoader";
import { Link, useParams } from "react-router-dom";
import Footer from "../../Footer";
function Editproducts(props) {
  const { productId } = useParams();

  const { token } = isAutheticated();
  // console.log(token)
  const [taxs, setTax] = useState([]);
  const [Categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

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
    track_quantity: null,
    statusState: true,
    initialCategory: "",
    tax: "",
  });
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
    formdata.append("price", state.price);
    formdata.append("sale_price", state.sale_price);
    formdata.append("sku", state.sku);
    formdata.append("quantity", state.quantity);
    formdata.append("continue_selling", state.continue_selling);
	formdata.append("track_quantity", state.track_quantity);
	formdata.append("tax_id", state.tax);
	// formdata.append("track_quantity", state.track_quantity);

    let res = await axios.put(`${API}/api/product/${productId}`, formdata, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res) {
      window.location = "/comproducts";
    }
    setLoading(false);
  };
  useEffect(() => {
    const getData = async () => {
      let response = await axios.get(`${API}/api/category`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data, "This is category res");

      let res = await axios.get(
        `${API}/api/product/${props.match.params.productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data.data, "this is product data");
      const temp = response.data.filter(
        (category) => category._id !== res.data?.data?.category
      );
      const category = response.data.find(
        (category) => category._id === res.data?.data?.category
      );
      setCategories(temp);
      // console.log(res,"this is response");
      let taxes = await axios.get(`${API}/api/tax_rates/view_taxs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const filtertax = taxes.data.data.filter(
        (tax) => tax._id !== res.data?.data?.tax
      );
      setTax(filtertax);
      const tax = taxes.data.data.find(
        (tax) => tax._id === res.data?.data?.tax
	  );
	  console.log(tax,"Thuis us tax")
      setstate({
        title: res.data?.data?.title,
        description: res.data?.data?.description,
        image: res.data?.data?.image,
        price: res.data?.data?.price,
        sale_price: res.data?.data?.sale_price,
        sku: res.data?.data?.sku,
        quantity: res.data?.data?.quantity,
        track_quantity: res.data?.data?.track_quantity,
        statusState: res.data?.data?.status,
        status: res.data?.data?.status ? "Active" : "Inactive",
        continue_selling: res.data?.data?.continue_selling,
        initialCategory: category,
        category: category?._id,
        imageUrl: res.data?.data?.image,
        tax: tax._id,
        initialTax: tax,
      });
    };
    getData();
  }, [token, props.match.params.productId]);

  const onFileChange = (e) => {
    setstate({
      ...state,
      image: e.target.files[0],
      imageUrl: URL.createObjectURL(e.target.files[0]),
    });
  };
  console.log(state);
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
  console.log(state, "this is state");
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
                      <Link to="/dashboard">TellyTell</Link>
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
                                onChange={handleChange}
                                type="text"
                                value={state.title}
                                className="form-control input-field"
                                placeholder="Title"
                              />
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
                                onChange={handleChange}
                                value={state.description}
                                name="description"
                                className="form-control input-field"
                                rows="5"
                                placeholder="Add description"
                              ></textarea>
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
                                  {state.initialTax?.tax_name} - {state.initialTax?.tax_percentage}%
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
                                defaultValue={state.initialCategory._id}
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
                                value={state.status}
                                onChange={handleChange}
                                className="form-control  input-field"
                              >
                                {state.statusState ? (
                                  <>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                  </>
                                ) : (
                                  <>
                                    <option value="Inactive">Inactive</option>
                                    <option value="Active">Active</option>
                                  </>
                                )}
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
                                Upload Image
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group mb-30 width-100 row">
                              <label className="col-md-3 control-label">
                                Upload
                                <br />
                                <span className="size">(320 x 180 px)</span>
                              </label>
                              <div className="col-md-3">
                                <img src={state.imageUrl} width="110" alt="" />
                              </div>
                              <div className="col-md-6">
                                <input
                                  type="file"
                                  onChange={onFileChange}
                                  className="form-control input-field"
                                  value={state?.image?.filename}
                                />
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
                              <input
                                type="text"
                                value={state.price}
                                name="price"
                                onChange={handleChange}
                                className="form-control input-field"
                              />
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
                              <input
                                name="sale_price"
                                value={state.sale_price}
                                onChange={handleChange}
                                type="text"
                                className="form-control input-field"
                              />
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
                                onChange={handleChange}
                                type="text"
                                className="form-control input-field"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-4">
                            <div className="custom-control custom-checkbox mb-2">
                              <input
                                name="track_quantity"
                                value={state.track_quantity}
                                onChange={handleChangeCheckBox}
                                type="checkbox"
                                className="custom-control-input"
                                id="genre1"
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="genre1"
                              >
                                Track Quantity
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-4">
                            <div className="custom-control custom-checkbox mb-2">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="genre1"
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="genre1"
                              >
                                Continue sellng when out of stock
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
                                Quantity Available
                              </label>
                              <input
                                name="quantity"
                                value={state.quantity}
                                onChange={handleChange}
                                type="text"
                                className="form-control input-field"
                              />
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
							<script>document.write(new Date().getFullYear())</script> © TellyTell.
						</div>

					</div>
				</div>
			</footer> */}
      <Footer />
    </div>
  );
}

export default Editproducts;
