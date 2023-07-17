import React, { useState, useEffect } from 'react';
import './Form.css'; // Import the CSS file
import Select from 'react-select';
import { getCustomers, getProducts, saveFormData } from './backend.js';
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Form = () => {

    const nav = useNavigate();

    const [m, Sm] = useState({});
    const [name, Setname] = useState('');
    const [customer, setCustomer] = useState('');
    const [address, setAddress] = useState('');
    const [discount, setDiscount] = useState('');
    const [total, setTotal] = useState(0);
    const [dtotal, setDTotal] = useState(0);
    const [gtotal, setGTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoading1, setIsLoading1] = useState(true);
    const [products, setProducts] = useState([{ name: '', qty: 0, price:0, amount:0 }]);
    const [options, setOptions] = useState([{ value: "Select Customer", label: "Select Customer", }]);
    const [options1, setOptions1] = useState([{ value: "Select Product", label: "Select Product", }]);


    useEffect(() => {
        function getKey() {
          const id = localStorage.getItem("key");
            const data = id ? JSON.parse(id) : "";
            const id1 = localStorage.getItem("name");
            const data1 = id1 ? JSON.parse(id1) : "";
            Sm(data.id);
            Setname(data1.name);
        }
        async function fetchOptions() {
            setIsLoading(true);
            const res = await getCustomers();
            const optionsData = res.map((doc) => ({
                value: doc["Customer Name"],
                label: doc["Customer Name"],
            }));
            setOptions(optionsData);
            setIsLoading(false);
        }
        async function fetchOptions1() {
            setIsLoading1(true);
            const res = await getProducts();
            const optionsData1 = res.map((doc) => ({
                value: doc["Price"],
                label: doc["Product Name"],
            }));
            setOptions1(optionsData1);
            setIsLoading1(false);
        }
        getKey();
        fetchOptions();
        fetchOptions1();
    }, []);



    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };

    const handleDiscountChange = (event) => {
        setDiscount(event.target.value);
        var dt = total * (parseInt(event.target.value)/100);
        setDTotal(dt);
        var gt = total - dt;
        setGTotal(gt);
    };

    const handleCustomerChange = (event) => {
        var val;
        if (event == null) {
            val = "";
        }
        else {
            val = event.value;
        }
        setCustomer(val);
    };

    const handleProductChange = (index, field, e) => {
        var val, pr;
        if (e == null) {
            val = "";
            pr=0;
        }
        else {
            val = e.label;
            pr=e.value;
        }
        const updatedProducts = [...products];
        updatedProducts[index][field] = val;
        updatedProducts[index]["price"] = pr;
        updatedProducts[index]["amount"] = updatedProducts[index]["qty"] * updatedProducts[index]["price"];
        var total = 0;
        updatedProducts.forEach((p)=>{
            total += p.amount;
        })
        setTotal(total);
        setProducts(updatedProducts);
    };

    const handleQtyChange = (index, field, e) => {
        const updatedProducts = [...products];
        updatedProducts[index][field] = e;
        updatedProducts[index]["amount"] = updatedProducts[index][field] * updatedProducts[index]["price"];
        var total = 0;
        updatedProducts.forEach((p) => {
            total += p.amount;
        })
        setTotal(total);
        setProducts(updatedProducts);
        console.log(products);
    };

    const addProductField = () => {
        setProducts([...products, { name: '', qty: 0, price:0, amount:0 }]);
    };

    const removeProductField = (index) => {
        const updatedProducts = [...products];
        updatedProducts.splice(index, 1);
        setProducts(updatedProducts);
    };

    const handleSubmit = (event) => {
        saveFormData(customer, address, products, discount, total, dtotal, gtotal, name);
        setCustomer('');
        setAddress('');
        setProducts([{ name: "", qty: 0, price: 0, amount: 0 }]);
        setDiscount('');
        setDTotal('');
        setGTotal('');
        setTotal('');
        toast.success("Order created successfully!");
        // Handle form submission logic here
    };


    return m?(
        <div className="form-container">
            <h1>LKC COATINGS PVT LTD</h1>
            <h1 className="form-title">Sales Orders</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-section">
                    <label htmlFor="customerName" className="form-label">
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
                        <Select
                            isLoading={isLoading}
                            options={options}
                            isClearable={true}
                            isSearchable={true}
                            onChange={(event) => handleCustomerChange(event)}
                            placeholder='Select Customer'
                        />
                    )}
                </div>
                <div className="form-section">
                    <label htmlFor="address" className="form-label">
                        Address
                    </label>
                    <input
                        id="address"
                        type="text"
                        className="form-input"
                        value={address}
                        onChange={handleAddressChange}
                    />
                </div>
                <div className="form-section">
                    <label className="form-label">Products</label>
                    <div style={{ width: "100%", display: "flex", alignItems: "center", marginBottom: "10px", justifyContent: "space-between" }}>
                        <p style={{width:"200px"}}>Product Name</p>
                        <p>Qty</p>
                        <p>Amount</p>
                    </div>
                    {products.map((product, index) => (
                        <div key={index} className="product-field">

                            <div style={{width:"100%", display: "flex", alignItems: "center", justifyContent:"space-between",marginBottom: "10px" }}>
                                <div className='select'>
                                    <Select
                                        isLoading={isLoading1}
                                        options={options1}
                                        isClearable={true}
                                        isSearchable={true}
                                        defaultValue={options1[0].value}
                                        onChange={(event) => { handleProductChange(index, 'name', event) }}
                                        placeholder='Select Product'
                                    />
                                </div>
                                <input
                                    min={"0"}
                                    type="number"
                                    placeholder='Quantity'
                                    className="product-input1"
                                    value={product.qty}
                                    onChange={(event) =>
                                        handleQtyChange(index, 'qty', event.target.value)
                                    }
                                />
                                {index > 0 ? (
                                    <AiFillMinusCircle size={30} className="remove-product-button"
                                        onClick={() => removeProductField(index)} />
                                ) : <p style={{ paddingRight: "30px" }}></p>}
                                <p>{product.price*product.qty}</p>
                            </div>

                            <div style={{ height: "1px", width: "100%", backgroundColor: "grey", marginTop: "10px", marginBottom: "10px" }}></div>
                        </div>
                    ))}
                    <AiFillPlusCircle size={30} className="add-product-button"
                        onClick={addProductField} />
                </div>
                <div style={{ width: "100%", display: "flex", alignItems: "center", marginBottom: "10px", justifyContent: "space-between" }}>
                    <p>Total</p>
                    <p>{total}</p>
                </div>
                <div className="product-field">
                    <div style={{ width: "100%", display: "flex", alignItems: "center", marginBottom: "10px", justifyContent: "space-between" }}>
                        <p>Discount</p>
                        <input
                            type="number"
                            min="0"
                            className="product-input2"
                            placeholder='%'
                            value={discount}
                            onChange={handleDiscountChange}
                        />
                    </div>
                    <div style={{ width: "100%", display: "flex", alignItems: "center", marginBottom: "10px", justifyContent: "space-between" }}>
                        <p>Discount Amount</p>
                        <p>{dtotal}</p>
                    </div>
                    <div style={{ width: "100%", display: "flex", alignItems: "center", marginBottom: "10px", justifyContent: "space-between" }}>
                        <p>Grand Total</p>
                        <p>{gtotal}</p>
                    </div>
                    <button type="submit" className="submit-button">
                        Submit
                    </button>
                    <Toaster />
                </div>
            </form>
        </div>
    ) : <h1>No Access { nav('/') }</h1>;
};

export default Form;
