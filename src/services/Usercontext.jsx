// UserContext.js
import React, { createContext, useContext, useReducer } from "react";

// Define initial state and reducer function
const initialState = {
  customersdata: null,
  productsdata: null,
  ordersdata: null,
};

const userReducer = (state, action) => {
  debugger;
  switch (action.type) {
    case "SET_CUSTOMER_DATA":
      return { ...state, customersdata: action.payload };
    case "SET_PRODUCT_DATA":
      return { ...state, productsdata: action.payload };
    case "SET_ORDER_DATA":
      return { ...state, ordersdata: action.payload };
    // case "UPDATE_ORDER_DATA":
    //   return {
    //     ...state,
    //     ordersdata: { ...state.ordersdata, ...action.payload },
    //   };
    default:
      return state;
  }
};

const UserContext = createContext();

// Create a custom hook to provide access to context values
export const useUserContext = () => useContext(UserContext);

// Provide the context to components
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
