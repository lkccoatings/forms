import React, { useEffect, useState } from "react";
import { getUsers, updateUserPrice } from "./backend";
import Select from "react-select";

const Modal3 = ({ closeModal }) => {
  const [users, Setusers] = useState();

  useEffect(() => {
    getUsers().then((response) => {
      console.log(response);
      Setusers(response);
    });
  }, []);

  const handlePriceList = (event, index) => {
    var data = [...users];
    data[index].Price = event;
    Setusers(data);
  };

  const options = [
    { value: "Price", label: "Price List 1" },
    { value: "Price 1", label: "Price List 2" },
    { value: "Price 2", label: "Price List 3" },
  ];
    
    const handleupdate = () => {
        updateUserPrice(users);
        closeModal();
    }

  return (
    <div className='main-div'>
      {/* <div className='order-details-container'> */}
      <h2>Assign Price List</h2>
      {users?.map((element, index) => {
        return (
          <div className='order-details-row'>
            <p>
              <strong style={{ fontSize: "1.2rem" }} className='form-label'>
                {element?.name[0]?.toUpperCase() + element?.name?.slice(1)}
              </strong>
            </p>
            <Select
              style={{ width: "30%" }}
              className='form-input1'
              onChange={(ele) => handlePriceList(ele, index)}
              value={element?.Price}
              options={options}
            />
          </div>
        );
      })}
      <div
        style={{ display: "flex", width: "100%", justifyContent: "flex-end" }}>
        <button
          onClick={() => {
            handleupdate();
          }}
          style={{ width: "20%" }}
          type='submit'
          className='submit-button'>
          Update
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

export default Modal3;
