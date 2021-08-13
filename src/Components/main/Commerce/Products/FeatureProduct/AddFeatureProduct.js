import axios from "axios";
import React, { useState } from "react";
import { Link ,useHistory} from "react-router-dom";
import { API } from "../../../../../API";
import { isAutheticated } from "../../../../auth/authhelper";
import Footer from "../../../Footer";
import ClipLoader from "react-spinners/ClipLoader";
import swal from "sweetalert";

function Products(props) {
	const history = useHistory();
const [isLoadding,setIsLoadding]=useState(null);
  const [featuredProduct, setFeaturedProduct] = useState([]);
  const [feature,setFeature]=useState({name:"",id:""});
  const [status,setStatus]=useState("active");
  const [file,setFile]=useState(null);
  const { token } = isAutheticated();

  const handleFilter = async(e) => {
	  const name=e.target.value
	if (e.target.value !== "") {
		let res = await axios.get(`${API}/api/product`, {
			headers: {
				Authorization: `Bearer ${token}`,
			}
		});
		let filter = res.data.data?.filter(item => {
			return item && item
			.title.toLowerCase().includes(name.toLowerCase())
		})
		setFeaturedProduct(filter);
	} else {
		setFeaturedProduct([]);
	}
}
const addProductHandler = async(e) => {
	const formData =new FormData();
	formData.append("image", file);
	setIsLoadding(true)
	let res = await axios({
		url:`${API}/api/feature_product/add_feautred_product/${feature.id}?status=${status}`, 
		data:formData,
		method:"POST",
		headers: {
			Authorization: `Bearer ${token}`,
		}
	});
	const done=await swal({
		title: "Created Successfully!",
		icon: "success",
		buttons: {
			Done: {
				text: "Done",
				value: "Done",
			},
		}
	})
	setIsLoadding(false);
	if(done==="Done"){
		history.push("/featured/products")
	}
}

  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          {/* <!-- start page title --> */}
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0">Add Featured Product</h4>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">TellyTell</Link>
                    </li>{" "}
                    <li className="breadcrumb-item active">Commerce</li>
                    <li className="breadcrumb-item active">Add Featured Product</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        
          <div className="row">
        <div className="col-12">
				<div className="form-group text-right">
					<button type="button" className="btn btn-success btn-login waves-effect waves-light mr-3" onClick={addProductHandler} disabled={!(file&&status&&feature)}>
					<ClipLoader loading={isLoadding} size={18} />
						{!isLoadding && "Save"}</button>
					<Link to="/featured/products">
					<button type="button" className="btn btn-success btn-cancel waves-effect waves-light mr-3">Cancel</button>
					</Link>
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
										<label htmlFor="basicpill-phoneno-input" className="label-100">
										Search and Add Product
										</label>
										<input type="text" className="form-control input-field" placeholder="Title"
											onChange={(e)=>{handleFilter(e)
												setFeature({name:e.target.value,id:""})
											}} value={feature?.name} 
										/>
										<div className="searchedListVideos">
                                                                        {featuredProduct &&
                                                                            featuredProduct?.map((feature) =>
																				<span style={{ height: "7vh", display: "block" }}
																				key={feature._id}
																					onClick={() => {
																						setFeature({name:feature.title,id:feature._id})
																					setFeaturedProduct([])}}
																					style={{cursor:"pointer"}}
                                                                                >
                                                                                    <img src={feature.image} style={{ height: "90%", width: "6vw", marginRight: "8vw" }} alt="" />
                                                                                    <span>{feature.title}</span><br/>
                                                                                </span>
                                                                            )
                                                                        }
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
		<div className="col-lg-4">
			<div className="card">
				<div className="card-body">
					<div className="row">
						<div className="col-md-12">
							<form>							
								<div className="row">
									<div className="col-lg-12">
									<div className="form-group">
									<label htmlFor="basicpill-phoneno-input" className="label-100">
									Status
									</label>
									<select name="currency" className="form-control  input-field" onClick={(e)=>setStatus(e.target.value)}>
									<option value="active">Active</option>
									<option value="inactive">Inactive</option>
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
										<label htmlFor="basicpill-phoneno-input" className="label-100">
										Upload Image
										</label>
										</div>
									</div>	
								</div>
								<div className="row">
									<div className="col-lg-12">
										<div className="form-group mb-30 width-100 row">
										<label className="col-md-4 control-label">Upload<br/> 
										<span className="size">(1920 x 800 px)</span></label>
										<div className="col-md-8">
										<input type="file" className="form-control input-field" onChange={(e)=>setFile(e.target.files[0])}/>
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
	</div>
    </div>	
    </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Products;
