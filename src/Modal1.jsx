import React from 'react';
import './Modal1.css';

const Modal1 = ({ data }) => {
  return (
    <div className='main-div'>
      {/* <div className='order-details-container'> */}
      <h2>Order Details</h2>
      <div className='order-details-row'>
        <p>
          <strong>Customer Name:</strong>
        </p>
        <p>{data["Customer Name"]}</p>
      </div>
      <div className='order-details-row'>
        <p>
          <strong>Address:</strong>
        </p>
        <p>{data["Address"]}</p>
      </div>
      <div className='order-details-row'>
        <p>
          <strong>Timestamp:</strong>
        </p>
        <p>{data["timestamp"]}</p>
      </div>
      <div className='order-details-row'>
        <p>
          <strong>Date:</strong>
        </p>
        <p>{data["date"]}</p>
      </div>
      <div className='order-details-row'>
        <p>
          <strong>Products:</strong>
        </p>
      </div>
      <div className='order-details-row'>
        <div className='order-table-container'>
          <table className='order-table'>
            <thead>
              <tr>
                <th className='table-heading'>Name</th>
                <th className='table-heading'>Qty</th>
                <th className='table-heading'>Amount</th>
              </tr>
            </thead>
            <tbody>
              {data["Products"].map((item, index) => (
                <tr key={index} className='table-row'>
                  <td>{item.name}</td>
                  <td>{item.qty}</td>
                  <td>{item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className='order-details-row'>
        <p>
          <strong>Total:</strong>
        </p>
        <p>{data["Total"]}</p>
      </div>
      <div className='order-details-row'>
        <p>
          <strong>Discount:</strong>
        </p>
        <p>{data["Discount"]}</p>
      </div>
      <div className='order-details-row'>
        <p>
          <strong>Discount Amount:</strong>
        </p>
        <p>{data["Discount Amount"]}</p>
      </div>
      <div className='order-details-row'>
        <h2>
          <strong>Grand Total:</strong>
        </h2>
        <h2>{data["Grand Total"]}</h2>
      </div>
    </div>
  );
}

export default Modal1