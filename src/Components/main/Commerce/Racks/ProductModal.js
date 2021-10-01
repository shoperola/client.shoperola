import React, { useState } from "react";
import axios from "axios";
import { API } from "../../../../API";
import { isAutheticated } from "../../../auth/authhelper";

const ProductModal = (props) => {
  const { token } = isAutheticated();
  const { setOpenModal, rack, col, products, edit } = props;
  const [selectedProduct, setSelectedProductId] = useState("");

  const addProduct = () => {
    if (selectedProduct === "") {
      alert("Please select a product");
      return;
    }
    axios
      .put(
        `${API}/api/rack/update`,
        {
          [`rack${rack}${col}`]: selectedProduct,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setOpenModal(false);
        window.location.reload();
      })
      .catch((error) => {
        alert("Failed adding Product");
        console.log(error);
      });
  };

  return (
    <div
      className="modal fade show"
      id="exampleModalCenter"
      tabindex="-1"
      aria-labelledby="exampleModalCenterTitle"
      aria-modal="true"
      role="dialog"
      style={{ display: "block" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalCenterTitle">
              {edit ? "Edit" : "Add"} Product : {`Rack ${rack} - ${col}`}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => setOpenModal(false)}
            ></button>
          </div>
          <div className="modal-body">
            <div className="d-flex flex-wrap">
              {products.length > 0 &&
                products.map((item) => {
                  return (
                    <div
                      style={
                        item._id === selectedProduct
                          ? { border: "3px solid black" }
                          : { cursor: "pointer" }
                      }
                      onClick={() => setSelectedProductId(item._id)}
                    >
                      <img
                        src={item.image}
                        style={{
                          height: 175,
                          width: 150,
                          paddingRight: 10,
                          paddingLeft: 10,
                        }}
                      />
                      <h6 style={{ textAlign: "center" }}>{item.title}</h6>
                    </div>
                  );
                })}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={addProduct}
              >
                {edit ? "Edit" : "Add"} Product
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setOpenModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
