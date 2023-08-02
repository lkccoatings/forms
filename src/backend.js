import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  collection,
  getFirestore,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
} from "@firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCZLICM5R6zUqcR6ki7-1qH-WCySI32Vfc",
  authDomain: "forms-a3868.firebaseapp.com",
  projectId: "forms-a3868",
  storageBucket: "forms-a3868.appspot.com",
  messagingSenderId: "575959514687",
  appId: "1:575959514687:web:c294c733b00a97ee2a828a",
  measurementId: "G-G2PLRKMW1T",
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app);

export const getCustomers = async () => {
  const ref = collection(firestore, "Customers");
  const docs = await getDocs(ref);
  var arr = [];
  docs.forEach((doc) => {
    arr.push(doc.data());
  });
  return arr;
};
export const getProducts = async () => {
  const ref = collection(firestore, "Products");
  const docs = await getDocs(ref);
  var arr = [];
  docs.forEach((doc) => {
    arr.push(doc.data());
  });
  return arr;
};

export const getOrderData = async () => {
  const currentDate = new Date().toLocaleDateString("en-GB");
  const modifiedDate = currentDate.replace(/\//g, "-");
  const ref = collection(firestore, "Orders");
  const dataQuery = query(ref, where("date", "==", modifiedDate));
  const docs = await getDocs(dataQuery);
  var arr = [];
  docs.forEach((doc) => {
    arr.push(doc.data());
  });
  // console.log(arr);
  return arr;
};

export const getOrderData1 = async () => {
  // const currentDate = new Date().toLocaleDateString("en-GB");
  // const modifiedDate = currentDate.replace(/\//g, "-");
  const ref = collection(firestore, "Orders");
  const queryRef = query(ref, orderBy("timestamp", "desc"));
  // const dataQuery = query(ref, where("date", "==", modifiedDate));
  const docs = await getDocs(queryRef);
  var arr = [];
  docs.forEach((doc) => {
    arr.push(doc.data());
  });
  // console.log(arr);
  return arr;
};

export const saveFormData = (
  customerName,
  address,
  products,
  discount,
  total,
  dtotal,
  gtotal,
  name
) => {
  const ref = collection(firestore, "Orders");
  const currentDate = new Date().toLocaleDateString("en-GB");
  const modifiedDate = currentDate.replace(/\//g, "-");
  // console.log(customerName);
  // console.log(address);
  // console.log(products);
  addDoc(ref, {
    "Customer Name": customerName,
    Discount: discount,
    Total: total,
    "Discount Amount": dtotal,
    "Grand Total": gtotal,
    Address: address?address:"",
    Products: products,
    timestamp: Date(),
    date: modifiedDate,
    "Sales person": name,
  })
    .then(() => {
      console.error("Form data saved successfully");
      return 1;
    })
    .catch((error) => {
      console.error("Error saving form data:", error);
      return 0;
    });
};

export const saveFormData1 = (customerName, address, keyword, id) => {
  const ref = collection(firestore, "Customers");
  addDoc(ref, {
    "Customer Name": id + " - " + customerName + " - " + keyword,
    Address: address,
    keyword: keyword,
    "Customer ID": id,
    timestamp: Date(),
  })
    .then(() => {
      console.error("Customer saved successfully");
      return 1;
    })
    .catch((error) => {
      console.error("Error saving customer data:", error);
      return 0;
    });
};
