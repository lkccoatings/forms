import React, { useState } from "react";
import { useEffect } from "react";
import "./Admin.css";
import { RiEditFill } from "react-icons/ri"; // Import the desired icon from react-icons
import { createProduct, getProducts, updateProduct } from "./backend";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import Modal2 from "./Modal2";
import toast, { Toaster } from "react-hot-toast";

const Products = () => {
  const [data, SetData] = useState([]);
  const [m, Sm] = useState({});
  const [sl, Setsl] = useState({});
  const [modalIsOpen, setIsOpen] = useState(false);
  const [active, Setactive] = useState(false);

  const nav = useNavigate();

  useEffect(() => {
    function getKey() {
      const id = localStorage.getItem("key");
      const data = id ? JSON.parse(id) : "";
      Sm(data.con);
    }

    async function getproducts() {
      var res = await getProducts();
      SetData(res);
    }
    getproducts();
    getKey();
  }, []);

  const sortedWords = data.sort((a, b) =>
    a["Product Name"].localeCompare(b["Product Name"])
  );

  console.log(sortedWords);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  function openModal(row) {
    Setsl(row);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handlesubmit = (data) => {
    if (data.id === 0) {
      const d = {
        "Product Name": data["Product Name"],
        "KG": data["KG"],
        "Price": data["Price"],
        "Price 1": data["Price 1"],
        "Price 2": data["Price 2"],
      };
      const res = createProduct(d);
      toast.success("Product Created successfull!");
    } else {
      const res = updateProduct(data);
       toast.success("Product Updated successfull!");
    }
   
    setTimeout(() => {
      nav(0);
    }, 1000);
  };

  //fe

  return m ? (
    <div className='table'>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Example Modal'>
        <Modal2 data={sl} closeModal={closeModal} handlesubmit={handlesubmit} />
      </Modal>
      <h1>LKC COATINGS PVT LTD</h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "80%",
        }}>
        <div style={{ display: "flex", width: "30%" }}>
          <h2>Products</h2>
        </div>
        <div
          style={{
            // backgroundColor: "red",
            width: "30%",
            display: "flex",
            justifyContent: "end",
            // alignItems: "center",
          }}>
          <button
            style={{
              backgroundColor: "lightblue",
              color: "black",
              border: "0.5px solid black",
              //   borderRadius: "0px 6px 6px 0px",
              // marginRight: "2%",
            }}
            className='add-button'
            onClick={() => openModal({})}>
            Add Product
          </button>
        </div>
      </div>
      <div className='r_main'>
        <table className='custom-table'>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>KG</th>
              <th>Price List 1</th>
              <th>Price List 2</th>
              <th>Price List 3</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sortedWords.map((row, index) => (
              <tr key={index}>
                <td>{row["id"] ? row["id"] : ""}</td>
                <td>{row["Product Name"] ? row["Product Name"] : ""}</td>
                <td>{row["KG"] ? row["KG"] : ""}</td>
                <td>{row["Price"] ? row["Price"] : ""}</td>
                <td>{row["Price 1"] ? row["Price 1"] : "0"}</td>
                <td>{row["Price 2"] ? row["Price 2"] : "0"}</td>
                <td>
                  <RiEditFill
                    size={25}
                    className='delete-icon'
                    onClick={() => {
                      openModal(row);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Toaster />
    </div>
  ) : (
    <h1>No Access {nav("/")}</h1>
  );
};

export default Products;
