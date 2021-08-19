import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../../../../../API";
import { isAutheticated } from "../../../../auth/authhelper";
import Footer from "../../../Footer";

function Products(props) {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [pagination,setPagination] = useState(null)
  const { token } = isAutheticated();

  const getFeatureData=async(page=1,size=10)=>{
    let res = await axios.get(`${API}/api/feature_product/view_featured_products?page=${page}&size=${size}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setPagination({size:res.data.size, page:res.data.page})
    setFeaturedProducts(res.data.data);
  }
  
  useEffect( () => {
    
  const getFeaturedData=async(page=1,size=10)=>{
    let res = await axios.get(`${API}/api/feature_product/view_featured_products?page=${page}&size=${size}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setPagination({size:res.data.size, page:res.data.page})
    console.log(res.data)
    setFeaturedProducts(res.data.data);
  }
  getFeaturedData()
  }, [token]);
  const handleDelete = async (id) => {
    let status = window.confirm("Do you want to delete");
    if (!status) {
      return;
    }
    let res = await axios.delete(`${API}/api/feature_product/delete_feature_product/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res) {
      window.location.reload();
    }
  };
  const ChangeSatusHandler=async (id)=>{
    let res = await axios.get(`${API}/api/feature_product/change_status/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res) {
      window.location.reload();
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
                <h4 className="mb-0">Commerce - Featured Products</h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">TellyTell</Link>
                    </li>
                    <li className="breadcrumb-item">
                      Commerce - Featured Products
                    </li>
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
                  <div className="row ml-0 mr-0 mb-10">
                    <div className="col-sm-12 col-md-6"></div>
                    <div className="col-sm-12 col-md-6">
                      <div className="dropdown d-block">
                        <Link to="/add/feature/product">
                          <button
                            type="button"
                            className="btn btn-primary add-btn waves-effect waves-light float-right"
                          >
                            <i className="fa fa-plus" aria-hidden="true"></i> Add
                            Featured Product
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="table-responsive table-shoot">
                    <table className="table table-centered table-nowrap mb-0">
                      <thead className="thead-light">
                        <tr>
                          <th>Thumbnail</th>
                          <th>Product Name</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                          {featuredProducts.length && featuredProducts.map(feature=>
                          <tr key={feature._id}>
                            <td>
                              <img src={`${feature.feautred_image}`} width="110"
                              heigh="60" alt=""/>
                            </td>
                          <td>{feature.feautred_product?.title}</td>
                          <td><span className="badge badge-pill badge-success font-size-12">{feature.status==="active"?"Active":"Inactive"}</span></td><td>
                              <button
                              onClick={()=>ChangeSatusHandler(feature._id)}
                                type="button"
                                className="btn btn-success btn-sm waves-effect waves-light btn-table"
                              >
                                {feature.status.toString()==="active"?"Make Inactive":"Make Active"}
                              </button>
                              <Link to={`/edit/feature/product/${feature._id}`}>
                                <button
                                  type="button"
                                  className="btn btn-primary btn-sm waves-effect waves-light btn-table ml-2"
                                >
                                  Edit
                                </button>
                              </Link>
                                <button
                                onClick={()=>handleDelete(feature._id)}
                                  type="button"
                                  className="btn btn-danger btn-sm waves-effect waves-light btn-table ml-2"
                                  id="sa-params"
                                >
                                  Delete
                                </button>
                            </td>
                          </tr>
                          )}
                        </tbody>
                    </table>
                  </div>
                          {pagination&&
                  <div className="row mt-20">
                    <div className="col-sm-12 col-md-6 mb-20">
                      <div
                        className="dataTables_info"
                        id="datatable_info"
                        role="status"
                        aria-live="polite"
                      >
                        Showing {pagination.size*(pagination.page-1)} to {(pagination.size*(pagination.page-1))+featuredProducts.length} out of {"{total}"} entries
                      </div>
                    </div>

                    <div className="col-sm-12 col-md-6">
                      <div className="dataTables_paginate paging_simple_numbers float-right">
                        <ul className="pagination">
                          {+pagination.page-1?<li className="paginate_button page-item previous disabled">
                            <span
                              onClick={()=>getFeatureData(pagination.page-1)}
                              aria-controls="datatable"
                              data-dt-idx="0"
                              tabIndex="0"
                              className="page-link"
                            >
                              Previous
                            </span>
                          </li>:""}

                          <li className="paginate_button page-item active">
                            <span
                              onClick={()=>getFeatureData(+pagination.page)}
                              aria-controls="datatable"
                              data-dt-idx="1"
                              tabIndex="0"
                              className="page-link"
                            >
                              {+pagination.page}
                            </span>
                          </li>
                            {/* will only diplay if (pagination.page)*size<totalCounts*/}
                          <li className="paginate_button page-item ">
                            <span
                              onClick={()=>getFeatureData(+pagination.page+1)}
                              aria-controls="datatable"
                              data-dt-idx="2"
                              tabIndex="0"
                              className="page-link"
                            >
                              {+pagination.page+1}
                            </span>
                          </li>
                            {/* will only diplay if (pagination.page+1)*size<totalCounts*/}
                          <li className="paginate_button page-item ">
                            <span
                              onClick={()=>getFeatureData(+pagination.page+2)}
                              aria-controls="datatable"
                              data-dt-idx="3"
                              tabIndex="0"
                              className="page-link"
                            >
                              {+pagination.page+2}
                            </span>
                          </li>
                            {/* will only diplay if (pagination.page)*size<totalCounts*/}
                          <li className="paginate_button page-item next">
                            <span onClick={()=>getFeatureData(pagination.page+1)} tabIndex="0" className="page-link">
                              Next
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

}


                  {/* <!-- end table-responsive --> */}
                </div>
              </div>
            </div>
          </div>
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

export default Products;
