import React, { useEffect, useState } from "react";
import getSymbolFromCurrency from "currency-symbol-map";

const Variants = (props) => {
  const { currency } = props;
  const [optionList, setOptionList] = useState([{ name: "", value: [] }]);
  const [variants, setVariants] = useState([]);

  const addOptions = () => {
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
  };

  const editOption = (e, idx) => {
    let temp = [...optionList];

    if (e.target.name === "name") {
      temp[idx].name = e.target.value;
    } else {
      temp[idx].value = e.target.value.split(",").map((item) => item.trim());
      totalVariants(temp);
    }

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

    setVariants(newVariants);
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
                name="name"
                onChange={(e) => editOption(e, index)}
                type="text"
                className="form-control input-field"
                value={optionList[index].name}
              />
            </div>
            <div className="col-lg-8">
              <input
                placeholder="Values"
                name="value"
                onChange={(e) => editOption(e, index)}
                type="text"
                className="form-control input-field"
                value={optionList[index].value.join(", ")}
              />
            </div>
          </div>
        ))}
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
                {variants.map((item) => (
                  <tr className="row">
                    <td className="col-lg-3 text-center">{item}</td>
                    <td className="col-lg-2">
                      <div className="input-group ">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            {currency ? getSymbolFromCurrency(currency) : "$"}
                          </span>
                        </div>
                        <input
                          type="number"
                          name="sale_price"
                          //   onChange={(e) => editHandler(e, "salePrice")}
                          className="form-control"
                          //   value={state.sale_price}
                          min="0.00"
                        />
                      </div>
                    </td>
                    <td className="col-lg-2">
                      <div className="input-group">
                        <input
                          type="number"
                          name="sale_price"
                          //   onChange={(e) => editHandler(e, "salePrice")}
                          className="form-control"
                          //   value={state.sale_price}
                          min="0.00"
                        />
                      </div>
                    </td>
                    <td className="col-lg-2">
                      <div className="input-group">
                        <input
                          type="number"
                          name="sale_price"
                          //   onChange={(e) => editHandler(e, "salePrice")}
                          className="form-control"
                          //   value={state.sale_price}
                          min="0.00"
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
