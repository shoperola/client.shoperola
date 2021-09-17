import React, { useEffect, useState, useCallback } from "react";
import getSymbolFromCurrency from "currency-symbol-map";
import Tags from "@yaireo/tagify/dist/react.tagify";
import "@yaireo/tagify/dist/tagify.css";

const Variants = (props) => {
  const {
    currency,
    setTotalVariants,
    originalVariants,
    optionList,
    setOptionList,
    variantEdited,
    setVariantEdited,
  } = props;
  const [variants, setVariants] = useState([]);
  const [optionLimit, setOptionLimit] = useState(2);

  useEffect(() => {
    if (optionList.length > 0) setOptionLimit(3 - optionList.length);
  }, [optionList]);

  const addOptions = () => {
    if (optionLimit === 0) {
      alert("Cannot add more than 3 options");
      return;
    }
    const n = optionList.length;
    if (optionList[n - 1].name === "") {
      alert("Name Cannot be empty");
      return;
    }

    for (let i = 0; i < n - 1; i++) {
      if (optionList[n - 1].name === optionList[i].name) {
        alert("Two option cannot have same name");
        return;
      }
    }

    let temp = optionList;
    temp = [...temp, { name: "", value: [] }];
    setOptionList(temp);
    setOptionLimit((prev) => prev - 1);
  };

  const editName = (event, idx) => {
    let temp = optionList.map((item) => ({
      name: item.name,
      value: [...item.value],
    }));
    temp[idx].name = event.target.value;
    setOptionList(temp);
  };

  const editValues = (e, index) => {
    setOptionList((prev) => {
      prev[index].value = e.detail.tagify
        .getCleanValue()
        .map((item) => item.value);
      calculateVariants(prev);
      return prev;
    });
  };

  const deleteOption = (idx) => {
    if (optionList.length === 1) {
      setOptionList([{ name: "", value: [] }]);
      setVariants([]);
      setOptionLimit(2);
      return;
    }
    let newOptions = [...optionList];
    newOptions = newOptions.filter((item, index) => index !== idx);
    setOptionList(newOptions);
    calculateVariants(newOptions);
    setOptionLimit((prev) => prev + 1);
  };

  const calculateVariants = (options) => {
    let countVariants = 1;
    options.map((item) => {
      countVariants *= item.value.length;
    });
    if (countVariants > 100) {
      alert(
        "Cannot add more than 100 variants! Pleas remove one or more values from options."
      );
      return;
    }

    if (countVariants === 0) {
      setVariants([]);
      return;
    }

    let newVariants = [];

    options.map((item) => {
      if (newVariants.length < 1) {
        newVariants = [...item.value];
      } else {
        let temp = [...newVariants];
        newVariants = [];
        item.value.map((value) => {
          temp.map((ele) => {
            newVariants = [...newVariants, ele + "/" + value];
          });
        });
      }
    });

    const newVariantsObject = newVariants.map((item, index) => {
      if (index < variants.length) {
        return {
          variant: item,
          price: variants[index].price,
          quantity: variants[index].quantity,
          SKU: variants[index].SKU,
          image: variants[index].image,
          id: index,
        };
      }
      return {
        variant: item,
        price: "",
        quantity: "",
        SKU: "",
        image: "",
        id: index,
      };
    });

    setVariants(newVariantsObject);
    setTotalVariants(newVariantsObject);
  };

  const editVariant = (e, index, type) => {
    e.persist();
    const value = e.target.value;
    setVariants((prev) => {
      let temp = prev.map((item) => ({
        ...item,
      }));
      switch (type) {
        case "price":
          temp[index].price = value;
          break;
        case "quantity":
          temp[index].quantity = value;
          break;
        case "SKU":
          temp[index].SKU = value;
          break;
        case "image":
          const file = e.target.files[0];
          if (file && file["type"].split("/")[0] === "image") {
            temp[index].image = file;
          } else {
            alert("Please upload a valid image");
          }
          break;
      }
      setTotalVariants(temp);
      return temp;
    });
  };

  return (
    <div>
      <hr />
      <div>
        <div className="row">
          <div className="col-lg-10">
            <label className="label-100">Options</label>
          </div>
        </div>
        {optionList.map((item, index) => (
          <div key={index} className="row">
            <div className="d-flex justify-content-between">
              <p className="text-sm mb-1 mt-2">{`Option ${index + 1}`}</p>
              <a
                onClick={() => deleteOption(index)}
                href="javascript:void(0)"
                className="text-sm mb-1 mt-2"
              >
                Remove
              </a>
            </div>
            <div className="col-lg-4">
              <input
                placeholder="Name"
                name="variant_name"
                list="variant_name"
                onChange={(e) => editName(e, index)}
                type="text"
                className="form-control input-field"
                value={optionList[index].name}
              />
              <datalist id="variant_name">
                <option value={"Color"} />
                <option value={"Size"} />
                <option value={"Material"} />
                <option value={"Style"} />
                <option value={"Weight"} />
                <option value={"Custom"} />
              </datalist>
            </div>
            <div className="col-lg-8">
              <Tags
                placeholder="Values"
                onChange={(e) => editValues(e, index)}
                value={optionList[index].value.join(",")}
                className=" input-field"
              />
            </div>
          </div>
        ))}
        {optionLimit > 0 && (
          <div className="row mt-4">
            <div className="col-lg-4">
              <button
                type="button"
                className="btn btn-light"
                onClick={addOptions}
              >
                Add another option
              </button>
            </div>
          </div>
        )}
      </div>
      <hr />

      {!variantEdited && originalVariants.length !== 0 && (
        <div>
          <div className="row">
            <div className="col-lg-8">
              <label className="label-100">Preview</label>
            </div>
          </div>
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
                    <td className="col-lg-3 text-center">{item.variant}</td>
                    <td className="col-lg-2 text-center">{item.price}</td>
                    <td className="col-lg-2 text-center">{item.quantity}</td>
                    <td className="col-lg-2 text-center">{item.SKU}</td>
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
          <div className="row mt-4">
            <div className="col-lg-4">
              <button
                type="button"
                className="btn btn-light"
                onClick={() => setVariantEdited(true)}
              >
                Edit Variants
              </button>
            </div>
          </div>
        </div>
      )}

      {variantEdited && variants.length !== 0 && (
        <div>
          <div className="row">
            <div className="col-lg-8">
              <label className="label-100">Preview</label>
            </div>
          </div>
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
                {variants.map((item, variantIndex) => (
                  <tr key={item.id} className="row">
                    <td className="col-lg-3 text-center">{item.variant}</td>
                    <td className="col-lg-2">
                      <div className="input-group ">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            {currency ? getSymbolFromCurrency(currency) : "$"}
                          </span>
                        </div>
                        <input
                          type="number"
                          name="price"
                          onChange={(e) =>
                            editVariant(e, variantIndex, "price")
                          }
                          className="form-control"
                          value={item.price}
                          min="0.00"
                        />
                      </div>
                    </td>
                    <td className="col-lg-2">
                      <div className="input-group">
                        <input
                          type="number"
                          name="quantity"
                          onChange={(e) =>
                            editVariant(e, variantIndex, "quantity")
                          }
                          className="form-control"
                          value={item.quantity}
                        />
                      </div>
                    </td>
                    <td className="col-lg-2">
                      <div className="input-group">
                        <input
                          type="number"
                          name="SKU"
                          onChange={(e) => editVariant(e, variantIndex, "SKU")}
                          className="form-control"
                          value={item.SKU}
                        />
                      </div>
                    </td>
                    <td className="col-lg-3">
                      <div className="input-group">
                        <input
                          type="file"
                          onChange={(e) =>
                            editVariant(e, variantIndex, "image")
                          }
                          className="form-control input-field"
                          accept="image/*"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="row mt-4">
            <div className="col-lg-4">
              <button
                type="button"
                className="btn btn-light"
                onClick={() => setVariantEdited(false)}
              >
                Cancel Editing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Variants;
