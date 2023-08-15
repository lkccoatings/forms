import Admin from "./Admin";
import "./App.css";
import Form from "./Form";
import Login from "./Login";
import { Routes, Route, HashRouter } from "react-router-dom";
import Records from "./Records";
import Customer from "./Customer";
import { UserProvider } from "./services/Usercontext";
import Products from "./Products";

function App() {
  window.addEventListener("unload", () => {
    const id = localStorage.getItem("key");
    const data = id ? JSON.parse(id) : "";
    console.log(Date.now() - data.time);
    if (Date.now() - data.time > 3547924) {
      localStorage.clear();
    }
  });

  // basename={process.env.PUBLIC_URL}
  return (
    <UserProvider>
      <HashRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/form' element={<Form />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/rec' element={<Records />} />
          <Route path='/cust' element={<Customer />} />
          <Route path='/prod' element={<Products />} />
        </Routes>
      </HashRouter>
    </UserProvider>
  );
}

export default App;
