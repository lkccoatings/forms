import React, { useState } from "react";
import { useEffect } from "react";
import "./Admin.css";
import { RiEyeFill } from "react-icons/ri"; // Import the desired icon from react-icons
import { getOrderData1 } from "./backend";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import Modal1 from "./Modal1";
import './Modal1.css';

const Records = () => {
  const [data, SetData] = useState([]);
  const [m, Sm] = useState({});
  const [sl, Setsl] = useState({});
  const [modalIsOpen, setIsOpen] = useState(false);

  const nav = useNavigate();

  useEffect(() => {
    function getKey() {
      const id = localStorage.getItem("key");
      const data = id ? JSON.parse(id) : "";
      Sm(data.con);
    }

    async function getorders() {
      var res = await getOrderData1();
      SetData(res);
    }
    getorders();
    getKey();
  }, []);

  const sortedData = data.sort((a, b) => {
    const timestampA = new Date(a.timestamp).getTime();
    const timestampB = new Date(b.timestamp).getTime();
    return timestampA - timestampB;
  });

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

  return m ? (
    <div className='table'>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Example Modal'>
        <Modal1 data={sl} />
      </Modal>
      <h1>LKC COATINGS PVT LTD</h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "80%",
        }}>
        <h1 className='form-title'>All Orders</h1>
        <div
          style={{
            width: "30%",
            display: "flex",
            alignItems: "center",
          }}>
          <button
            style={{
              backgroundColor: "orange",
              marginRight: "2%",
            }}
            className='add-button'
            onClick={() => nav("/admin", { replace: true })}>
            Daily Records
          </button>
          <button className='add-button' onClick={() => nav("/form")}>
            Add
          </button>
        </div>
      </div>
      <div className='r_main'>
        <table className='custom-table'>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Customer Name</th>
              <th>Discount</th>
              <th>Total</th>
              <th>Discount Amount</th>
              <th>Grand Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>
                  {row["timestamp"] ? row["timestamp"].split("GMT")[0] : ""}
                </td>
                <td>{row["Customer Name"] ? row["Customer Name"] : ""}</td>
                <td>{row["Discount"] ? row["Discount"] : ""}</td>
                <td>{row["Total"] ? row["Total"] : ""}</td>
                <td>{row["Discount Amount"] ? row["Discount Amount"] : ""}</td>
                <td>{row["Grand Total"] ? row["Grand Total"] : ""}</td>
                <td>
                  <RiEyeFill size={25} className='delete-icon' onClick={()=>{openModal(row);}}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <h1>No Access</h1>
  );
}

export default Records