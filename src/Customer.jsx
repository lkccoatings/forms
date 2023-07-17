import React, { useState, useEffect } from "react";
import "./Form.css"; // Import the CSS file
import { saveFormData, saveFormData1 } from "./backend.js";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Customer = () => {


  const nav = useNavigate();

  const [m, Sm] = useState({});
  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");
  const [keyword, setkeyword] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    function getKey() {
      const id = localStorage.getItem("key");
      const data = id ? JSON.parse(id) : "";
      Sm(data.id);
    }
    getKey();
  }, []);

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleKeywordChange = (event) => {
    setkeyword(event.target.value);
  };

  const handleCustomerChange = (event) => {
    setCustomer(event.target.value);
  };

  const handleIdChange = (event) => {
    setId(event.target.value);
  };

  const handleSubmit = (event) => {
    saveFormData1(customer, address, keyword, id);
    setCustomer("");
    setAddress("");
    setkeyword("");
    setId("");
    toast.success("Customer created successfully!");
  };

  return m ? (
    <div className='form-container'>
      <h1>LKC COATINGS PVT LTD</h1>
      <h1 className='form-title'>Customer Data</h1>
      <form onSubmit={handleSubmit}>
        <div className='form-section'>
          <label htmlFor='customerName' className='form-label'>
            Customer Name
          </label>
          <input
            id='customerName'
            type='text'
            className='form-input'
            value={customer}
            onChange={handleCustomerChange}
          />
        </div>
        <div className='form-section'>
          <label htmlFor='address' className='form-label'>
            Address
          </label>
          <input
            id='address'
            type='text'
            className='form-input'
            value={address}
            onChange={handleAddressChange}
          />
        </div>
        <div className='form-section'>
          <label htmlFor='keyword' className='form-label'>
            Keyword
          </label>
          <input
            id='keyword'
            type='text'
            className='form-input'
            value={keyword}
            onChange={handleKeywordChange}
          />
        </div>
        <div className='form-section'>
          <label htmlFor='customerid' className='form-label'>
            Customer ID
          </label>
          <input
            id='cid'
            type='text'
            className='form-input'
            value={id}
            onChange={handleIdChange}
          />
        </div>
        <button type='submit' className='submit-button'>
          Submit
        </button>
        <Toaster />
      </form>
    </div>
  ) : (
      <h1>No Access { nav('/')}</h1>
  );
};

export default Customer;
