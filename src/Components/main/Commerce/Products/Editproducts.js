import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API } from '../../../../API';
import { isAutheticated } from '../../../auth/authhelper';
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from 'react-router-dom';
import Footer from '../../Footer';
function Editproducts(props) {

	const { token } = isAutheticated();
	// const [data, setdata] = useState([]);
	const [Categories, setCategories] = useState([]);
	const [loading,setLoading]=useState(false);

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
	})
	useEffect(() => {
		async function fetchData() {
			let res = await axios.get(`${API}/api/category`, {
				headers: {
					Authorization: `Bearer ${token}`,
				}
			});
			if (res.data.length > 0) {
				setCategories(res.data)
			}
		}
		fetchData();
	}, [])

	const onCancel=(e)=>{
		window.location="/comproducts"
	}

	const handleSubmit = async () => {
		const formdata = new FormData();
		setLoading(true);
		formdata.append("title", state.title);
		formdata.append("description", state.description);
		// formdata.append("category", state.category);
		formdata.append("image", state.image);
		formdata.append("price", state.price);
		formdata.append("sale_price", state.sale_price);
		formdata.append("sku", state.sku);
		formdata.append("quantity", state.quantity);
		formdata.append("continue_selling", state.continue_selling);
		formdata.append("track_quantity", state.track_quantity);

		let res = await axios.put(`${API}/api/product/${props.match.params.productId}`, formdata, {
			headers: {
				Authorization: `Bearer ${token}`,
			}
		});
		console.log(res);
		if (res) {
			window.location = "/comproducts"
		}
		setLoading(false);
	}
	useEffect(async () => {
		let res = await axios.get(`${API}/api/product/${props.match.params.productId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			}
		});
		console.log(res);
		setstate({
			title: res.data?.data?.title,
			description: res.data?.data?.description,
			image: res.data?.data?.image,
			price: res.data?.data?.price,
			sale_price: res.data?.data?.sale_price,
			sku: res.data?.data?.sku,
			quantity: res.data?.data?.quantity,
			track_quantity: res.data?.data?.track_quantity,
			continue_selling: res.data?.data?.continue_selling,
		})
	}, [])
	const onFileChange = (e) => {
		setstate({
			...state, image: e.target.files[0]
		})
	}

	const handleChange = (e) => {
		setstate({
			...state, [e.target.name]: e.target.value
		})
	}
	const handleChangeCheckBox = (e) => {
		setstate({
			...state, [e.target.name]: e.target.checked
		})
	}
	console.log(state);
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
										<li className="breadcrumb-item"><Link to="/dashboard">TellyTell</Link></li>
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

								<button onClick={handleSubmit} type="button" className="btn btn-success btn-login waves-effect waves-light mr-3">
								<ClipLoader loading={loading} size={18} />
                                  {!loading && "Save"}
								</button>
								{/* <Link to="/comproducts"> */}
									<button type="button"
									 onClick={onCancel}
									 className="btn btn-success btn-cancel waves-effect waves-light mr-3">Cancel</button>
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
															<label for="basicpill-phoneno-input" className="label-100">
																Title
															</label>
															<input name="title" onChange={handleChange} type="text" value={state.title} className="form-control input-field" placeholder="Title" />
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
															<label for="basicpill-phoneno-input" className="label-100">
																Select Category
															</label>
															<select name="category" value={state.category} onChange={handleChange} className="form-control  input-field">
																<option value="">--select--</option>
																{Categories?.map(item => (
																	<>
																		<option>{item.category}</option>
																	</>
																))
																}
															</select>
														</div>
													</div>
												</div>
												<div className="row">
													<div className="col-lg-12">
														<div className="form-group">
															<label for="basicpill-phoneno-input" className="label-100">
																Status
															</label>
															<select name="status" value={state.status} onChange={handleChange} className="form-control  input-field">
																<option value="">--select--</option>
																<option value="Active">Active</option>
																<option value="Inactive">Inactive</option>
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
															<label for="basicpill-phoneno-input" className="label-100">
																Upload Image
															</label>
														</div>
													</div>
												</div>
												<div className="row">
													<div className="col-lg-12">
														<div className="form-group mb-30 width-100 row">
															<label className="col-md-4 control-label">Upload<br />
																<span className="size">(320 x 180 px)</span></label>
															<div className="col-md-8">
																<input type="file" onChange={onFileChange} className="form-control input-field" value={state?.image?.filename} />
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
															<label for="basicpill-phoneno-input" className="label-100">
																Price
															</label>
															<input type="text" value={state.price} name="price" onChange={handleChange} className="form-control input-field" />
														</div>
													</div>
												</div>
												<div className="row">
													<div className="col-lg-4">
														<div className="form-group">
															<label for="basicpill-phoneno-input" className="label-100">
																Sale Price
															</label>
															<input name="sale_price" value={state.sale_price} onChange={handleChange} type="text" className="form-control input-field" />
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
															<label for="basicpill-phoneno-input" className="label-100">
																SKU
															</label>
															<input name="sku" value={state.sku} onChange={handleChange} type="text" className="form-control input-field" />
														</div>
													</div>
												</div>
												<div className="row">
													<div className="col-lg-4">
														<div className="custom-control custom-checkbox mb-2">
															<input name="track_quantity" value={state.track_quantity} onChange={handleChangeCheckBox} type="checkbox" className="custom-control-input" id="genre1" />
															<label className="custom-control-label" for="genre1">Track Quantity</label>
														</div>
													</div>
												</div>
												<div className="row">
													<div className="col-lg-4">
														<div className="custom-control custom-checkbox mb-2">
															<input type="checkbox" className="custom-control-input" id="genre1" />
															<label className="custom-control-label" for="genre1">Continue sellng when out of stock</label>
														</div>
													</div>
												</div>
												<div className="row">
													<div className="col-lg-4">
														<div className="form-group">
															<label for="basicpill-phoneno-input" className="label-100">
																Quantity Available
															</label>
															<input name="quantity" value={state.quantity} onChange={handleChange} type="text" className="form-control input-field" />
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
			<Footer/>
		</div>
	);
}

export default Editproducts;