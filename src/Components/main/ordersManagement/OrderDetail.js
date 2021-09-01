import React from "react";
import getSymbolFromCurrency from "currency-symbol-map";

const OrderDetail = (props) => {
  const { data, status, newStatus, setNewStatus, currency } = props;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    let d = date.toDateString(dateStr);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let strTime = hours + ":" + minutes + " " + ampm;
    return d + ", " + strTime;
  };

  const getAddress = (address) => {
    return [
      address.Address_Line_1,
      address.Address_Line_2,
      address.City,
      address.State,
      address.Country,
      address.Pin_Code,
    ].join(", ");
  };
  return (
    <div>
      <div className="row">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-md-12">
                  <table>
                    <tr>
                      <td width="125">
                        <strong>Order Date</strong>
                      </td>
                      <td>{formatDate(data.createdAt)}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Order ID</strong>
                      </td>
                      <td>{data._id}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Items</strong>
                      </td>
                      <td>{data.products.length || 0}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Total Amount</strong>
                      </td>
                      <td>
                        {getSymbolFromCurrency(currency)} {data.amount}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Address</strong>
                      </td>
                      <td>{getAddress(data.address)}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Email</strong>
                      </td>
                      <td>{data.client?.email}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Mobile</strong>
                      </td>
                      <td>{data.address.Contact_Number}</td>
                    </tr>
                  </table>
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
                  <table>
                    <tr>
                      <td>
                        <strong>Order Status: </strong>
                      </td>
                      <td>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </td>
                    </tr>
                    <tr>
                      <td>&nbsp;</td>
                      <td>&nbsp;</td>
                    </tr>
                  </table>
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
                            Change Status
                          </label>
                          <select
                            name="status"
                            value={newStatus}
                            className="form-control  input-field"
                            onChange={(e) => setNewStatus(e.target.value)}
                          >
                            <option>--select--</option>
                            {status === "new" && (
                              <option value="processing">Processing</option>
                            )}
                            {status === "processing" && (
                              <option value="dispatched">Dispatched</option>
                            )}
                            {status === "dispatched" && (
                              <option value="delivered">Delivered</option>
                            )}
                            {status === "new" && (
                              <option value="cancelled">Cancelled</option>
                            )}
                            {status === "delivered" && (
                              <option value="returned">Returned</option>
                            )}
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
                  <table>
                    <tr>
                      <td width="125" align="left">
                        <strong>Product</strong>
                      </td>
                      <td width="75" align="center">
                        <strong>Qty</strong>
                      </td>
                      <td width="125" align="right">
                        <strong>Price</strong>
                      </td>
                      <td width="100" align="center">
                        <strong>Tax (%)</strong>
                      </td>
                      <td width="125" align="right">
                        <strong>Tax (Amount)</strong>
                      </td>
                      <td width="125" align="right">
                        <strong>Total Amount</strong>
                      </td>
                    </tr>
                    {data.products.length !== 0 ? (
                      data.products.map((item) => (
                        <tr key={item._id}>
                          <td width="125" align="left">
                            <img
                              src={item.image}
                              style={{ height: 153, width: 120 }}
                            />
                            <br />
                            {item.title}
                          </td>
                          <td width="75" align="center">
                            {item.quantity}
                          </td>
                          <td width="125" align="right">
                            {getSymbolFromCurrency(currency)} {item.sale_price}
                          </td>
                          <td width="100" align="center">
                            {item.tax.tax_percentage} %
                          </td>
                          <td width="125" align="right">
                            {getSymbolFromCurrency(currency)}{" "}
                            {(item.sale_price / 100) * item.tax.tax_percentage}
                          </td>
                          <td width="125" align="right">
                            {getSymbolFromCurrency(currency)} {item.total_price}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr style={{ textAlign: "center" }}>
                        <td colSpan="6">No Data to Show</td>
                      </tr>
                    )}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
