import React, { useEffect, useState, useCallback } from "react";
import getSymbolFromCurrency from "currency-symbol-map";
import Tags from "@yaireo/tagify/dist/react.tagify";
import "@yaireo/tagify/dist/tagify.css";

const Variants = (props) => {
  const { currency } = props;
  const [optionList, setOptionList] = useState([{ name: "", value: [] }]);
  const [variants, setVariants] = useState([]);
  const [optionLimit, setOptionLimit] = useState(2);

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

  const editName = (e, idx) => {
    let temp = [...optionList];
    temp[idx].name = e.target.value;

    setOptionList(temp);
  };

  const deleteOption = (idx) => {
    if (optionList.length === 1) {
      setOptionList([{ name: "", value: [] }]);
      setVariants([]);
      return;
    }
    let newOptions = [...optionList];
    newOptions = newOptions.filter((item, index) => index !== idx);
    setOptionList(newOptions);
    totalVariants(newOptions);
    setOptionLimit((prev) => prev + 1);
  };

  const totalVariants = (options) => {
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
    const newVariantsObject = newVariants.map((item) => ({
      variant: item,
      price: "",
      quantity: "",
      SKU: "",
      image: "",
    }));

    setVariants(newVariantsObject);
  };

  const editValues = (e, index) => {
    let temp = [...optionList];
    const values = e.detail.tagify.getCleanValue();
    temp[index].value = values.map((item) => item.value);
    setOptionList(temp);
    totalVariants(temp);
  };

  const editVariant = (e, index, type) => {
    const value = e.target.value;
    let temp = [...variants];

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
        temp[index].image = value;
    }

    setVariants(temp);
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
          <div key={`option${index}`} className="row">
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

      {variants.length > 0 && (
        <div>
          <div className="row">
            <div className="col-lg-8">
              <label className="label-100">Preview</label>
            </div>
          </div>
          <div className="row">
            <table class="table">
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
                  <tr className="row">
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
                          value={item.value}
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
                          // onChange={handleSingleImage}
                          className="form-control input-field"
                          // value={state?.image?.filename}
                          accept="image/*"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Variants;
