import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import swal from "sweetalert";
import { API } from "../../../../API";
import { isAutheticated } from "../../../auth/authhelper";
import ClipLoader from "react-spinners/ClipLoader";
import Footer from "../../Footer";

function AddCoupon() {
  const { token } = isAutheticated();
  const { id } = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const [allCategory, setAllCategory] = useState([]);
  const [name, setName] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [promotionType, setPromotionType] = useState("percentage_off");
  const [promotionAmmount, setPromotionAmmount] = useState("");
  const [appliesTo, setAppliesTo] = useState("");
  const [appliesToPrice, setAppliesToPrice] = useState(0);
  const [appliesToProduct, setAppliesToProduct] = useState("");
  const [appliesToCategory, setAppliesToCategory] = useState("");
  const [limitedUser, setLimitedUser] = useState("");
  const [customerLimit, setCustomerLimit] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [status, setStatus] = useState("");
  const [neverExpire, setNeverExpire] = useState(false);

  const wordLimit = {
    name: 50,
    couponCode: 50,
    promotionAmmount: 50,
    appliesToPrice: 50,
    appliesToProduct: 50,
  };

  const [nameLen, setNameLen] = useState(wordLimit.name);
  const [couponCodeLen, setCouponCodeLen] = useState(wordLimit.couponCode);
  const [promotionAmmountLen, setPromotionAmmountLen] = useState(
    wordLimit.promotionAmmount
  );
  const [appliesToPriceLen, setAppliesToPriceLen] = useState(
    wordLimit.appliesToPrice
  );
  const [appliesToProductLen, setAppliesToProductLen] = useState(
    wordLimit.appliesToProduct
  );

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`${API}/api/category`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setAllCategory(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchData();
  }, [token]);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`${API}/api/coupons/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setName(res.data.data.coupon_name);
          setCouponCode(res.data.data.coupon_code);
          setPromotionType(res.data.data.promotion);
          setAppliesTo(res.data.data.applies_to);
          setLimitedUser(res.data.data.limit);
          setCustomerLimit(res.data.data.limit_one_person);
          setNeverExpire(res.data.data.never_expire);
          setStatus(res.data.data.status);
          setStartDate(res.data.data.start_date);
          setEndDate(res.data.data.end_date);

          setNameLen(wordLimit.name - res.data.data.coupon_name.length);
          setCouponCodeLen(
            wordLimit.couponCode - res.data.data.coupon_code.length
          );

          switch (res.data.data.applies_to) {
            case "orders-over":
              setAppliesToPrice(res.data.data.price);
              setAppliesToPriceLen(
                wordLimit.appliesToPrice - res.data.data.price.length
              );
              break;
            case "single_product":
              setAppliesToProduct(res.data.data.product_name);
              setAppliesToProductLen(
                wordLimit.appliesToProduct - res.data.data.product_name
              );
              break;
            case "product_by_category":
              setAppliesToCategory(res.data.data.product_category);
              break;
          }

          switch (promotionType) {
            case "percentage_off":
              setPromotionAmmount(res.data.data.percentage_off);
              setPromotionAmmountLen(
                wordLimit.promotionAmmount -
                  res.data.data.percentage_off.toString().length
              );
              break;
            case "amount_off":
              setPromotionAmmount(res.data.data.amount_off);
              setPromotionAmmountLen(
                wordLimit.promotionAmmount -
                  res.data.data.amount_off.toString().length
              );
              break;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchData();
  }, [token, allCategory]);

  const saveHandler = () => {
    setIsLoading(true);
    let data = {
      coupon_name: name,
      coupon_code: couponCode,
      promotion: promotionType,
      applies_to: appliesTo,
      limit: limitedUser,
      limit_one_person: customerLimit,
      never_expire: neverExpire,
      status: status,
      start_date: startDate,
      end_date: endDate,
    };

    switch (appliesTo) {
      case "orders-over":
        data = { ...data, price: appliesToPrice };
        break;
      case "single_product":
        data = { ...data, product_name: appliesToProduct };
        break;
      case "product_by_category":
        data = { ...data, product_category: appliesToCategory };
        break;
    }

    switch (promotionType) {
      case "percentage_off":
        data = { ...data, percentage_off: promotionAmmount };
        break;
      case "amount_off":
        data = { ...data, amount_off: promotionAmmount };
        break;
    }

    console.log(data);
    axios
      .put(`${API}/api/coupons/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(async (res) => {
        const done = await swal({
          title: "Saved Successfully!",
          icon: "success",
          buttons: {
            Done: {
              text: "Done",
              value: "Done",
            },
          },
        });
        setIsLoading(false);

        if (done === "Done") {
          history.push("/allCoupons");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        alert("Saving data failed");
        console.log(error);
      });
  };

  const editHandler = (e, type) => {
    const value = e.target.value;
    const length = value.length;

    switch (type) {
      case "name":
        if (wordLimit.name - length !== -1) {
          setName(value);
          setNameLen(wordLimit.name - length);
        }
        break;
      case "couponCode":
        if (wordLimit.couponCode - length !== -1) {
          setCouponCode(value);
          setCouponCodeLen(wordLimit.couponCode - length);
        }
        break;
      case "appliesToProduct":
        if (wordLimit.appliesToProduct - length !== -1) {
          setAppliesToProduct(value);
          setAppliesToProductLen(wordLimit.appliesToProduct - length);
        }
        break;
      case "promotionAmount":
        if (
          e.target.value === "" ||
          (!isNaN(value) && wordLimit.promotionAmmount - length !== -1)
        ) {
          setPromotionAmmount(value);
          setPromotionAmmountLen(wordLimit.promotionAmmount - length);
        }
        break;
      case "appliesToPrice":
        if (
          e.target.value === "" ||
          (!isNaN(value) && wordLimit.appliesToPrice - length !== -1)
        ) {
          setAppliesToPrice(value);
          setAppliesToPriceLen(wordLimit.appliesToPrice - length);
        }
        break;
      default:
        console.log("Incorrect Type");
    }
  };

  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          =
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0">Content Management - Edit Coupon</h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">TellyTell</Link>
                    </li>
                    <li className="breadcrumb-item">
                      Content Management - Edit Coupon
                    </li>
                    <li className="breadcrumb-item">Edit Coupon</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="form-group text-right">
                <button
                  type="button"
                  className="btn btn-success btn-login waves-effect waves-light mr-3"
                  onClick={saveHandler}
                >
                  <ClipLoader loading={isLoading} size={18} />
                  {!isLoading && "Save"}
                </button>
                <Link to="/allCoupons">
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
                              <label
                                for="basicpill-phoneno-input"
                                className="label-100"
                              >
                                Name
                              </label>
                              <input
                                type="text"
                                className="form-control input-field"
                                value={name}
                                onChange={(e) => editHandler(e, "name")}
                              />
                              <div className="d-flex justify-content-between">
                                <label
                                  for="basicpill-phoneno-input"
                                  className="label-100"
                                >
                                  This name is shown to customers at checkout.
                                </label>
                                <label
                                  for="basicpill-phoneno-input"
                                  className="label-100"
                                >
                                  Remaining words : {nameLen}
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group">
                              <label
                                for="basicpill-phoneno-input"
                                className="label-100"
                              >
                                Coupon Code
                              </label>
                              <input
                                type="text"
                                className="form-control input-field"
                                value={couponCode}
                                onChange={(e) => editHandler(e, "couponCode")}
                              />
                              <div className="d-flex justify-content-between">
                                <label
                                  for="basicpill-phoneno-input"
                                  className="label-100"
                                >
                                  Customers enter this code at checkout.
                                </label>
                                <label
                                  for="basicpill-phoneno-input"
                                  className="label-100"
                                >
                                  Remaining words : {couponCodeLen}
                                </label>
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
                              <label
                                for="basicpill-phoneno-input"
                                className="label-100"
                              >
                                Status
                              </label>
                              <select
                                name="currency"
                                value={status}
                                className="form-control  input-field"
                                onChange={(e) => setStatus(e.target.value)}
                              >
                                <option value="">--select--</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>

                    <div className="row">
                      <div className="col-lg-12">
                        <label className="col-md-12 control-label">
                          This coupon never expires
                        </label>
                        <div className="col-md-8">
                          <div className="custom-control custom-radio mb-2">
                            <input
                              type="radio"
                              className="custom-control-input"
                              checked={neverExpire}
                              onClick={() => setNeverExpire((prev) => !prev)}
                            />
                            <label
                              className="custom-control-label"
                              onClick={() => setNeverExpire((prev) => !prev)}
                            >
                              Yes
                            </label>
                          </div>
                        </div>
                      </div>
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
                    <div className="col-lg-12">
                      <label className="col-md-4 control-label">
                        Promotion
                      </label>
                      <div className="col-md-8">
                        <div className="custom-control custom-radio mb-2">
                          <input
                            type="radio"
                            className="custom-control-input"
                            checked={promotionType === "percentage_off"}
                            onClick={() => setPromotionType("percentage_off")}
                          />
                          <label
                            className="custom-control-label"
                            for="age1"
                            onClick={() => setPromotionType("percentage_off")}
                          >
                            Percentage Off
                          </label>
                          <input
                            type="text"
                            className="form-control input-field"
                            value={
                              promotionType === "percentage_off"
                                ? promotionAmmount
                                : ""
                            }
                            onChange={(e) => editHandler(e, "promotionAmount")}
                            disabled={promotionType !== "percentage_off"}
                          />
                          {promotionType === "percentage_off" && (
                            <label
                              for="basicpill-phoneno-input"
                              className="label-100"
                            >
                              Remaining words : {promotionAmmountLen}
                            </label>
                          )}
                        </div>

                        <div className="custom-control custom-radio mb-2">
                          <input
                            type="radio"
                            className="custom-control-input"
                            checked={promotionType === "amount_off"}
                            onClick={() => setPromotionType("amount_off")}
                          />
                          <label
                            className="custom-control-label"
                            for="age2"
                            onClick={() => setPromotionType("amount_off")}
                          >
                            Amount Off
                          </label>
                          <input
                            type="text"
                            className="form-control input-field"
                            value={
                              promotionType === "amount_off"
                                ? promotionAmmount
                                : ""
                            }
                            onChange={(e) => editHandler(e, "promotionAmount")}
                            disabled={promotionType !== "amount_off"}
                          />
                          {promotionType === "amount_off" && (
                            <label
                              for="basicpill-phoneno-input"
                              className="label-100"
                            >
                              Remaining words : {promotionAmmountLen}
                            </label>
                          )}
                        </div>

                        <div className="custom-control custom-radio mb-2">
                          <input
                            type="radio"
                            className="custom-control-input"
                            checked={promotionType === "free_shipping"}
                            onClick={() => setPromotionType("free_shipping")}
                          />
                          <label
                            onClick={() => setPromotionType("free_shipping")}
                            className="custom-control-label"
                          >
                            Free Shipping
                          </label>
                        </div>
                      </div>
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
                              <label
                                for="basicpill-phoneno-input"
                                className="label-100"
                              >
                                Applies to
                              </label>
                              <select
                                className="form-control  input-field"
                                value={appliesTo}
                                onChange={(e) => {
                                  setAppliesTo(e.target.value);
                                }}
                              >
                                <option value="">--select--</option>
                                <option value="any_order">Any Order</option>
                                <option value="orders-over">Orders Over</option>
                                <option value="single_product">
                                  Single Product
                                </option>
                                <option value="product_by_category">
                                  Products by Category
                                </option>
                              </select>
                            </div>
                            {appliesTo === "orders-over" && (
                              <div className="form-group">
                                <label
                                  for="basicpill-phoneno-input"
                                  className="label-100"
                                >
                                  Price
                                </label>
                                <input
                                  placeholder="$"
                                  type="text"
                                  className="form-control input-field"
                                  value={appliesToPrice}
                                  onChange={(e) =>
                                    editHandler(e, "appliesToPrice")
                                  }
                                />
                                <label
                                  for="basicpill-phoneno-input"
                                  className="label-100"
                                >
                                  Remaining words : {appliesToPriceLen}
                                </label>
                              </div>
                            )}
                            {appliesTo === "single_product" && (
                              <div className="form-group">
                                <label
                                  for="basicpill-phoneno-input"
                                  className="label-100"
                                >
                                  Name of the Product
                                </label>
                                <input
                                  placeholder="Enter Product Name"
                                  type="text"
                                  className="form-control input-field"
                                  value={appliesToProduct}
                                  onChange={(e) =>
                                    editHandler(e, "appliesToProduct")
                                  }
                                />
                                <label
                                  for="basicpill-phoneno-input"
                                  className="label-100"
                                >
                                  Remaining words : {appliesToProductLen}
                                </label>
                              </div>
                            )}
                            {appliesTo === "product_by_category" && (
                              <div className="form-group">
                                <label
                                  for="basicpill-phoneno-input"
                                  className="label-100"
                                >
                                  Select the Product by Category
                                </label>
                                <select
                                  name="products"
                                  className="form-control  input-field"
                                  value={appliesToCategory}
                                  onChange={(e) => {
                                    setAppliesToCategory(e.target.value);
                                  }}
                                >
                                  {allCategory.length > 0 &&
                                    allCategory.map((item) => (
                                      <option key={item._id} value={item._id}>
                                        {item.category}
                                      </option>
                                    ))}
                                </select>
                              </div>
                            )}
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <form>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group">
                              <label
                                for="basicpill-phoneno-input"
                                className="label-100"
                              >
                                Limit Total User
                              </label>
                              <select
                                className="form-control  input-field"
                                value={limitedUser}
                                onChange={(e) => setLimitedUser(e.target.value)}
                              >
                                <option value="">--select--</option>
                                <option value="unlimited">Unlimited</option>
                                <option value="limited">Limited Users</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-12">
                      <label className="col-md-4 control-label">
                        Customer limit
                      </label>
                      <div className="col-md-8">
                        <div className="custom-control custom-radio mb-2">
                          <input
                            type="radio"
                            className="custom-control-input"
                            checked={customerLimit}
                            onClick={() => setCustomerLimit((prev) => !prev)}
                          />
                          <label
                            className="custom-control-label"
                            onClick={() => setCustomerLimit((prev) => !prev)}
                          >
                            Limit one per customer
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label
                          for="basicpill-phoneno-input"
                          className="label-100"
                        >
                          Start Date
                        </label>
                        <div className="input-group">
                          <input
                            type="date"
                            className="form-control input-field"
                            ddata-provide="datepicker"
                            data-date-autoclose="true"
                            defaultValue={
                              new Date(startDate).getDate().toString() +
                              "-" +
                              (new Date(startDate).getMonth() + 1) +
                              "-" +
                              new Date(startDate).getFullYear().toString() +
                              ","
                            }
                            onChange={(e) => {
                              setStartDate(e.target.value);
                            }}
                          />
                          {/* <div className="input-group-append">
                            <span className="input-group-text">
                              <i
                                className="fa fa-calendar"
                                aria-hidden="true"
                              ></i>
                            </span>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label
                          for="basicpill-phoneno-input"
                          className="label-100"
                        >
                          End Date
                        </label>
                        <div className="input-group">
                          <input
                            type="date"
                            className="form-control input-field"
                            ddata-provide="datepicker"
                            data-date-autoclose="true"
                            defaultValue={
                              new Date(endDate).getDate().toString() +
                              "-" +
                              (new Date(endDate).getMonth() + 1) +
                              "-" +
                              new Date(endDate).getFullYear().toString() +
                              ","
                            }
                            onChange={(e) => {
                              setEndDate(e.target.value);
                            }}
                          />
                          {/* <div className="input-group-append">
                            <span className="input-group-text">
                              <i
                                className="fa fa-calendar"
                                aria-hidden="true"
                              ></i>
                            </span>
                          </div> */}
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

export default AddCoupon;
