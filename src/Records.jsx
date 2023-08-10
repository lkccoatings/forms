import React, { useState } from "react";
import { useEffect } from "react";
import "./Admin.css";
import { RiEyeFill } from "react-icons/ri"; // Import the desired icon from react-icons
import { getOrderData1 } from "./backend";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import Modal1 from "./Modal1";
import "./Modal1.css";
import "./search.css";
import { useUserContext } from "./services/Usercontext";

const Records = () => {
  const { state, dispatch } = useUserContext();
  const { ordersdata } = state;

  const [active, Setactive] = useState(true);
  const [data, SetData] = useState([]);
  const [m, Sm] = useState({});
  const [sl, Setsl] = useState({});
  const [modalIsOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    if (searchTerm.length > 0) {
      const filteredResults = data.filter((item) =>
        item["Sales person"]
          ? item["Sales person"]
          : "".toLowerCase().includes(searchTerm.toLowerCase()) ||
            item["Customer Name"]
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            item["date"].toLowerCase().includes(searchTerm.toLowerCase())
      );
      console.log(filteredResults);
      setSearchResults(filteredResults);
    } else {
      setSearchResults(data);
    }
  };

  const nav = useNavigate();
  // nav(0);

  function getKey() {
    const id = localStorage.getItem("key");
    const data = id ? JSON.parse(id) : "";
    Sm(data.con);
  }

  async function getorders() {
    var res = await getOrderData1();
    dispatch({
      type: "SET_ORDER_DATA",
      payload: res,
    });
    localStorage.setItem("ordersdata", btoa(JSON.stringify(res)));
    SetData(res);
    setSearchResults(res);
  }

  const fetchData = () => {
    if (!ordersdata) {
      const localdata = localStorage.getItem("ordersdata");
      if (localdata) {
        console.log("Local Data1");
        const decodedData = atob(localdata);
        SetData(JSON.parse(decodedData));
        setSearchResults(JSON.parse(decodedData));
        dispatch({
          type: "SET_ORDER_DATA",
          payload: JSON.parse(decodedData),
        });
      } else {
        console.log("API Data1");
        getorders();
      }
    }
  };

  useEffect(() => {
    getKey();
    fetchData();
  }, [dispatch, ordersdata]);

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

  const [itemsPerPage, setItemsPerPage] = useState(10); // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the indices for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const visibleResults = searchResults.slice(startIndex, endIndex);

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
        <div style={{ display: "flex", width: "30%" }}>
          <button
            style={{
              // backgroundColor: "orange",
              // marginRight: "2%",
              borderRadius: "10px 0px 0px 10px",
            }}
            className={active ? "add-button1" : "add-button"}
            onClick={() => nav("/admin", { replace: true })}>
            Daily Orders
          </button>
          <button
            style={{
              // backgroundColor: "orange",
              // marginRight: "2%",
              borderRadius: "0px 10px 10px 0px",
            }}
            className={active ? "add-button" : "add-button1"}
            onClick={() => nav("/rec")}>
            All Orders
          </button>
        </div>
        <div
          style={{
            width: "60%",
            display: "flex",
            alignItems: "baseline",
          }}>
          <input
            type='text'
            placeholder='Search...'
            className='search-input'
            value={searchTerm}
            onChange={handleSearch}
          />
          <button
            className='add-button'
            onClick={() => nav("/form")}
            style={{
              backgroundColor: "beige",
              color: "black",
              border: "0.5px solid black",
              borderRadius: "6px 0px 0px 6px",
            }}>
            Order +
          </button>
          <button
            style={{
              backgroundColor: "lightblue",
              color: "black",
              // marginRight: "2%",
              border: "0.5px solid black",
              borderRadius: "0px 6px 6px 0px",
            }}
            className='add-button'
            onClick={() => nav("/cust")}>
            Customer 👤 +
          </button>
        </div>
      </div>
      <div className='items-per-page'>
        <label>Show items per page: </label>
        <select
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(parseInt(e.target.value))}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
      <div className='r_main'>
        <table className='custom-table'>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Customer Name</th>
              <th>Total</th>
              <th>Grand Total</th>
              <th>Date</th>
              <th>Sales Person</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {visibleResults.map((row, index) => (
              <tr key={index}>
                <td>
                  {row["timestamp"] ? row["timestamp"].split("GMT")[0] : ""}
                </td>
                <td>{row["Customer Name"] ? row["Customer Name"] : ""}</td>
                <td>{row["Total"] ? row["Total"] : ""}</td>
                <td>{row["Grand Total"] ? row["Grand Total"] : ""}</td>
                <td>{row["date"] ? row["date"] : ""}</td>
                <td>{row["Sales person"] ? row["Sales person"] : ""}</td>
                <td>
                  <RiEyeFill
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
      <div className='pagination'>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}>
          Previous
        </button>
        <span>{currentPage}</span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={endIndex >= searchResults.length}>
          Next
        </button>
      </div>
    </div>
  ) : (
    <h1>No Access {nav("/")}</h1>
  );
};

export default Records;
