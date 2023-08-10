import React, { useState, useEffect } from "react";
import "./Form.css"; // Import the CSS file
import Select from "react-select";
import { getCustomers, getProducts, saveFormData } from "./backend.js";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "./services/Usercontext";

const Form = () => {
  const { state, dispatch } = useUserContext();
  const { customersdata } = state;
  const { productsdata } = state;

  const fetchData = () => {
    if (!customersdata) {
      const storedData = localStorage.getItem("customersdata");
      if (storedData) {
        console.log("Local Data");
        const decodedData = atob(storedData);
        setOptions(JSON.parse(decodedData));
        dispatch({
          type: "SET_CUSTOMER_DATA",
          payload: JSON.parse(decodedData),
        });
        setIsLoading(false);
      } else {
        console.log("API Data");
        fetchOptions();
      }
    }
    if (!productsdata) {
      const storedData = localStorage.getItem("productsdata");
      if (storedData) {
        console.log("Local Data");
        const decodedData = atob(storedData);
        setOptions1(JSON.parse(decodedData));
        dispatch({
          type: "SET_PRODUCT_DATA",
          payload: JSON.parse(decodedData),
        });
      } else {
        console.log("API Data");
        fetchOptions1();
      }
    }
  };

  useEffect(() => {
    debugger;
    // console.log(state);
    // console.log(customersdata);
    getKey();
    fetchData();
    setIsLoading(false);
    setIsLoading1(false);
  }, []);

  const nav = useNavigate();

  const [m, Sm] = useState({});
  const [name, Setname] = useState("");
  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");
  const [discount, setDiscount] = useState("");
  const [total, setTotal] = useState(0);
  const [weight, setweight] = useState(0);
  const [dtotal, setDTotal] = useState(0);
  const [gtotal, setGTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoading1, setIsLoading1] = useState(true);
  const [products, setProducts] = useState([
    { name: "", qty: 0, price: 0, amount: 0, tkg: 0, kg: 0 },
  ]);
  const [options, setOptions] = useState([
    { value: "Select Customer", label: "Select Customer" },
  ]);
  const [options1, setOptions1] = useState([
    { value: "Select Product", label: "Select Product" },
  ]);
  function getKey() {
    const id = localStorage.getItem("key");
    const data = id ? JSON.parse(id) : "";
    const id1 = localStorage.getItem("name");
    const data1 = id1 ? JSON.parse(id1) : "";
    Sm(data.id);
    Setname(data1.name);
  }
  async function fetchOptions() {
    debugger;
    setIsLoading(true);
    const res = await getCustomers();
    const optionsData = res.map((doc) => ({
      value: doc["Customer Name"],
      label: doc["Customer Name"],
    }));
    dispatch({ type: "SET_CUSTOMER_DATA", payload: optionsData });
    const encodedData = btoa(JSON.stringify(optionsData));
    localStorage.setItem("customersdata", encodedData);
    setOptions(optionsData);
    setIsLoading(false);
  }
  async function fetchOptions1() {
    setIsLoading1(true);
    const res = await getProducts();
    const optionsData1 = res.map((doc) => ({
      value: doc["Price"],
      label: doc["Product Name"],
      kg: doc["KG"],
    }));
    // console.log(optionsData1);
    dispatch({ type: "SET_PRODUCT_DATA", payload: optionsData1 });
    const encodedData = btoa(JSON.stringify(optionsData1));
    localStorage.setItem("productsdata", encodedData);
    setOptions1(optionsData1);
    setIsLoading1(false);
  }

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleDiscountChange = (event) => {
    setDiscount(event.target.value);
    var dt = total * (parseInt(event.target.value) / 100);
    setDTotal(dt);
    var gt = total - dt;
    setGTotal(gt);
  };

  const handleCustomerChange = (event) => {
    var val;
    if (event == null) {
      val = "";
    } else {
      val = event.value;
    }
    setCustomer(val);
  };

  const handleProductChange = (index, field, e) => {
    var val, pr, kg;
    if (e == null) {
      val = "";
      pr = 0;
      kg = 0;
    } else {
      val = e.label;
      pr = e.value;
      kg = e.kg;
    }

    const updatedProducts = [...products];
    updatedProducts[index][field] = val;
    updatedProducts[index]["price"] = pr;
    updatedProducts[index]["kg"] = kg;
    updatedProducts[index]["amount"] =
      updatedProducts[index]["qty"] * updatedProducts[index]["price"];
    updatedProducts[index]["tkg"] =
      parseInt(updatedProducts[index]["qty"]) * parseInt(kg);
    // console.log(parseInt(kg));
    // console.log(parseInt(updatedProducts[index]["qty"]));
    // console.log(k);
    var total = 0;
    var wei = 0;
    updatedProducts.forEach((p) => {
      total += p.amount;
      wei += parseInt(p.tkg);
    });
    setweight(wei);
    setTotal(total);
    setProducts(updatedProducts);
  };

  const handleQtyChange = (index, field, e) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = e;
    updatedProducts[index]["amount"] =
      updatedProducts[index][field] * updatedProducts[index]["price"];
    updatedProducts[index]["tkg"] =
      parseInt(updatedProducts[index]["qty"]) *
      parseInt(updatedProducts[index]["kg"]);
    var total = 0;
    var wei = 0;
    updatedProducts.forEach((p) => {
      total += p.amount;
      wei += parseInt(p.tkg);
    });
    setweight(wei);
    setTotal(total);
    setProducts(updatedProducts);
    console.log(products);
  };

  const valid = {
    Customer: { error: false, message: "" },
  };
  const pvalid = {
    Name: { error: false, message: "" },
    Qty: { error: false, message: "" },
  };

  const [_validate, _Setvalidate] = useState(valid);
  const [_prodvalidate, _Setprodvalidate] = useState(pvalid);

  const addProductField = () => {
    setProducts([...products, { name: "", qty: 0, price: 0, amount: 0 }]);
    // const val = [];
    // products.map((ele, index) => {
    //   val.push(pvalid);
    // });
    // _Setprodvalidate(val);
  };

  const removeProductField = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    var total = 0;
    var wei = 0;
    updatedProducts.forEach((p) => {
      total += p.amount;
      wei += parseInt(p.tkg);
    });
    setweight(wei);
    setTotal(total);
    // const val = [];
    // updatedProducts.map((ele, index) => {
    //   val.push(pvalid);
    // });
    // _Setprodvalidate(val);
    setProducts(updatedProducts);
  };

  const _validateData = () => {
    var valid = true;
    const obj = Object.assign({}, _validate);
    if (customer === "" || customer === null) {
      obj.Customer.error = true;
      obj.Customer.message = "Required Field";
      valid = false;
    }
    _Setvalidate(obj);
    return valid;
  };

  const _validateProduct = () => {
    var valid = true;
    const obj = Object.assign({}, _prodvalidate);
    products.map((ele, index) => {
      if (ele.name === "" || ele.name === null) {
        valid = false;
        obj.Name.error = true;
        obj.Name.message = "Required Field";
      }
      if (ele.qty === "" || ele.qty === null || ele.qty === 0) {
        valid = false;
        obj.Qty.error = true;
        obj.Qty.message = "Required Field";
      }
    });
    _Setprodvalidate(obj);
    return valid;
  };

  const handleSubmit = (event) => {
    if (_validateData() && _validateProduct()) {
      const res = saveFormData(
        customer,
        address,
        products,
        discount,
        total,
        dtotal,
        gtotal,
        name
      );
      setCustomer("");
      setAddress("");
      setProducts([{ name: "", qty: 0, price: 0, amount: 0 }]);
      setDiscount("");
      setDTotal("");
      setGTotal("");
      setTotal("");
      toast.success("Order created successfully!");
    }

    // Handle form submission logic here
  };

  return m ? (
    <div className='form-container'>
      <h1>LKC COATINGS PVT LTD</h1>
      <h1 className='form-title'>Sales Orders</h1>
      <form>
        <div className='form-section'>
          <label htmlFor='customerName' className='form-label'>
            Customer Name
          </label>
          {/* <input
                        id="customerName"
                        type="text"
                        className="form-input"
                        value={customerName}
                        onChange={handleCustomerNameChange}
                    /> */}
          {isLoading1 ? (
            <p>Loading...</p>
          ) : (
            // options.map((doc) => {
            //     return <p>{doc.label}</p>;
            // })
            <div>
              <Select
                isLoading={isLoading}
                options={options}
                isClearable={true}
                isSearchable={true}
                onChange={(event) => handleCustomerChange(event)}
                placeholder='Select Customer'
              />
              <p style={{ color: "red", fontSize: "12px" }}>
                {_validate.Customer.error ? _validate.Customer.message : ""}
              </p>
            </div>
          )}
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
          <label className='form-label'>Products</label>
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
              justifyContent: "space-between",
            }}>
            {/* <p style={{ width: "230px" }}>Product Name</p> */}
            {/* <p>Qty</p> */}
            {/* <p>Weight</p> */}
            {/* <p>Amount</p> */}
          </div>
          {products.map((product, index) => (
            <div key={index} className='product-field'>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}>
                <div className='select'>
                  <label>Product Name</label>
                  <Select
                    isLoading={isLoading1}
                    options={options1}
                    isClearable={true}
                    isSearchable={true}
                    defaultValue={options1[0].value}
                    onChange={(event) => {
                      handleProductChange(index, "name", event);
                    }}
                    placeholder='Select Product'
                  />
                  <p style={{ color: "red", fontSize: "10px" }}>
                    {_prodvalidate?.Name?.error
                      ? _prodvalidate?.Name?.message
                      : ""}
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}>
                  <label>Qty</label>
                  <input
                    min={"0"}
                    type='number'
                    placeholder='Quantity'
                    className='product-input1'
                    value={product.qty}
                    onChange={(event) =>
                      handleQtyChange(index, "qty", event.target.value)
                    }
                  />
                  <p style={{ color: "red", fontSize: "10px" }}>
                    {_prodvalidate?.Qty?.error
                      ? _prodvalidate?.Qty?.message
                      : ""}
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}>
                  <label>W 𓍝</label>
                  <input
                    // style={{ backgroundColor: "red" }}
                    value={product.tkg}
                    className='product-input1'
                    readOnly
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}>
                  <label>Rs</label>
                  <input
                    value={product.price * product.qty}
                    className='product-input1'
                    readOnly
                  />
                </div>
              </div>
              {index > 0 ? (
                <AiFillMinusCircle
                  size={30}
                  className='remove-product-button'
                  onClick={() => removeProductField(index)}
                />
              ) : (
                <p style={{ paddingRight: "30px" }}></p>
              )}
              <div
                style={{
                  height: "1px",
                  width: "100%",
                  backgroundColor: "grey",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}></div>
            </div>
          ))}
          <AiFillPlusCircle
            size={30}
            className='add-product-button'
            onClick={addProductField}
          />
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
            justifyContent: "space-between",
          }}>
          <p>Total</p>
          <p>{total}</p>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
            justifyContent: "space-between",
          }}>
          <p>Total Weight</p>
          <p>{weight}</p>
        </div>
        <div className='product-field'>
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
              justifyContent: "space-between",
            }}>
            <p>Discount</p>
            <input
              type='number'
              min='0'
              className='product-input2'
              placeholder='%'
              value={discount}
              onChange={handleDiscountChange}
            />
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
              justifyContent: "space-between",
            }}>
            <p>Discount Amount</p>
            <p>{dtotal}</p>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
              justifyContent: "space-between",
            }}>
            <p>Grand Total</p>
            <p>{gtotal}</p>
          </div>
          <button
            type='button'
            className='submit-button'
            onClick={handleSubmit}>
            Submit
          </button>
          <Toaster />
        </div>
      </form>
    </div>
  ) : (
    <h1>No Access {nav("/")}</h1>
  );
};

export default Form;
