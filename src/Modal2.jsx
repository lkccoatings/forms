import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

const Modal2 = ({ data, closeModal, handlesubmit }) => {
  const [productname, Setproductname] = useState(
    data["Product Name"] ? data["Product Name"] : ""
  );
  const [kg, Setkg] = useState(data["KG"] ? data["KG"] : "");
  const [price, setprice] = useState(data["Price"] ? data["Price"] : "");
  const [price1, setprice1] = useState(data["Price 1"] ? data["Price 1"] : "");
  const [price2, setprice2] = useState(data["Price 2"] ? data["Price 2"] : "");

  const handleupdate = () => {
    const data1 = {
      id: data?.id ? data?.id : 0,
      "Product Name": productname,
      KG: kg,
      Price: parseInt(price),
      "Price 1": parseInt(price1),
      "Price 2": parseInt(price2),
    };
    handlesubmit(data1);
    closeModal();
  };

  return (
    <div className='main-div'>
      {/* <div className='order-details-container'> */}
      <h2>Product Details</h2>
      <div className='order-details-row'>
        <p>
          <strong style={{ fontSize: "1.2rem" }} className='form-label'>
            Product Name:
          </strong>
        </p>
        <input
          style={{ width: "30%" }}
          className='form-input'
          value={productname}
          onChange={(e) => Setproductname(e.target.value)}
        />
      </div>
      <div className='order-details-row'>
        <p>
          <strong style={{ fontSize: "1.2rem" }} className='form-label'>
            KG:
          </strong>
        </p>
        <input
          style={{ width: "30%" }}
          className='form-input'
          value={kg}
          type='number'
          onChange={(e) => Setkg(e.target.value)}
        />
      </div>
      <div className='order-details-row'>
        <p>
          <strong style={{ fontSize: "1.2rem" }} className='form-label'>
            Price 1:
          </strong>
        </p>
        <input
          style={{ width: "30%" }}
          className='form-input'
          value={price}
          type='number'
          onChange={(e) => setprice(e.target.value)}
        />
      </div>
      <div className='order-details-row'>
        <p>
          <strong style={{ fontSize: "1.2rem" }} className='form-label'>
            Price 2:
          </strong>
        </p>
        <input
          style={{ width: "30%" }}
          className='form-input'
          value={price1}
          type='number'
          onChange={(e) => setprice1(e.target.value)}
        />
      </div>
      <div className='order-details-row'>
        <p>
          <strong style={{ fontSize: "1.2rem" }} className='form-label'>
            Price 3:
          </strong>
        </p>
        <input
          style={{ width: "30%" }}
          className='form-input'
          value={price2}
          type='number'
          onChange={(e) => setprice2(e.target.value)}
        />
      </div>
      <div
        style={{ display: "flex", width: "100%", justifyContent: "flex-end" }}>
        <button
          onClick={() => {
            handleupdate();
          }}
          style={{ width: "20%" }}
          type='submit'
          className='submit-button'>
          {data.id ? "Update" : "Create"}
        </button>
        <button
          style={{ width: "20%", backgroundColor: "red", marginLeft: "2%" }}
          onClick={closeModal}
          className='submit-button'>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Modal2;
