import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../../../../API";
import { isAutheticated } from "../../../auth/authhelper";
import ClipLoader from "react-spinners/ClipLoader";
import { Link, useParams } from "react-router-dom";
import Footer from "../../Footer";
import getSymbolFromCurrency from "currency-symbol-map";
import Variants from "./VariantsEdit";

function VariantView(props) {
  const { id } = useParams();

  const { token } = isAutheticated();
  const [taxs, setTax] = useState([]);
  const [Categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currency, setCurrency] = useState();

  const [variantChecked, setVariantChecked] = useState(false);
  const [optionList, setOptionList] = useState([{ name: "", value: [] }]);
  const [variants, setVariants] = useState([]);
  const [variantId, setVariantId] = useState("");
  const [variantEdited, setVariantEdited] = useState(false);
  const [originalVariants, setOriginalVariants] = useState([]);
  const [productName, setProductName] = useState("");

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

      let res = await axios.get(`${API}/api/product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let taxes = await axios.get(`${API}/api/tax_rates/view_taxs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
      setProductName(res.data?.data?.title);

      const filtertax = taxes.data.data.filter(
        (tax) => tax._id !== res.data?.data?.variants.tax
      );
      setTax(filtertax);

      const tax = taxes.data.data.find(
        (tax) => tax._id === res.data?.data?.variants.tax
      );
    };
    getData();
  }, [token, id]);

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

  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          {/* <!-- start page title --> */}
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0">Variants : {productName}</h4>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">TellyTell</Link>
                    </li>
                    <li className="breadcrumb-item active">Commerce</li>
                    <li className="breadcrumb-item active">Variants</li>
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

          {/* <div className="col-lg-4">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12"></div>
                </div>
              </div>
            </div>
          </div> */}

          <div className="row">
            {/* <!--Left Column Begins--> */}
            <div className="col-lg-8">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="row">
                        <table className="table">
                          <thead>
                            <tr className="row">
                              <th className="col-lg-3 text-center" scope="col">
                                Variant
                              </th>
                              <th className="col-lg-2 text-center" scope="col">
                                Price
                              </th>
                              <th className="col-lg-2 text-center" scope="col">
                                Quantity
                              </th>
                              <th className="col-lg-2 text-center" scope="col">
                                SKU
                              </th>
                              <th className="col-lg-3 text-center" scope="col">
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
                                      width: "90px",
                                      height: "45px",
                                    }}
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
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
							<script>document.write(new Date().getFullYear())</script> © TellyTell.
						</div>

					</div>
				</div>
			</footer> */}
      <Footer />
    </div>
  );
}

export default VariantView;
