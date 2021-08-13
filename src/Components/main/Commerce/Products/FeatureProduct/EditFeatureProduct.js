import axios from "axios";
import React, { useState,useEffect } from "react";
import { Link ,useHistory } from "react-router-dom";
import {useParams} from "react-router"
import { API } from "../../../../../API";
import { isAutheticated } from "../../../../auth/authhelper";
import Footer from "../../../Footer";
import ClipLoader from "react-spinners/ClipLoader";
import swal from "sweetalert";

function Products(props) {
  const {id}=useParams();
  const [isLoadding,setIsLoadding]=useState(null);
  const history = useHistory();
  const [editProduct, setEditProduct] = useState(null);
  const [status,setStatus]=useState("active");
  const [file,setFile]=useState(null);
  const { token } = isAutheticated();
  useEffect( () => {
    const getEditData=async()=>{
      let res = await axios.get(`${API}/api/feature_product/view_featured_product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data.data)
      setEditProduct(res.data.data);
    }
    getEditData()
  }, [token,id]);
const addProductHandler = async(e) => {
    console.log("Api Callling...");
    setIsLoadding(true)
	const formData =new FormData();
	formData.append("image", file);
	let res = await axios({
		url:`${API}/api/feature_product/update_featured_product/${id}?status=${status}`, 
		data:formData,
		method:"PATCH",
		headers: {
			Authorization: `Bearer ${token}`,
		}
    });
    console.log(res)
    const done=await swal({
		title: "Edit Successfully!",
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
                <h4 className="mb-0">Edit Featured Product</h4>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">TellyTell</Link>
                    </li>{" "}
                    <li className="breadcrumb-item active">Commerce</li>
                    <li className="breadcrumb-item active">Edit Featured Product</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        
          <div className="row">
        <div className="col-12">
				<div className="form-group text-right">
					<button type="button" className="btn btn-success btn-login waves-effect waves-light mr-3" onClick={addProductHandler} disabled={!(file&&status)}><ClipLoader loading={isLoadding} size={18} />
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
                                    {editProduct&&
									<div className="col-lg-12">
										<div className="form-group">
										<label for="basicpill-phoneno-input" className="label-100">
										Product Name
										</label>
										<input type="text" className="form-control input-field" placeholder="Title" disabled={true} value={editProduct.feautred_product.title}
										/>
										</div>
									</div>	
								}</div>

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
									<label for="basicpill-phoneno-input" className="label-100">
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
										<label for="basicpill-phoneno-input" className="label-100">
										Upload Image
										</label>
										</div>
									</div>	
								</div>
								<div className="row">
									<div className="col-lg-12">
										<div className="form-group mb-30 width-100 row">
										<label className="col-md-3 control-label">Upload<br/> 
										<span className="size">(1920 x 800 px)</span></label>
                                        <div className="col-md-3">
                                        {editProduct&& <img src={editProduct.feautred_image} alt="" height="70px"/>}
                                        </div>
										<div className="col-md-6">
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
