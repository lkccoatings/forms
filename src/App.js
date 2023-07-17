import Admin from "./Admin";
import "./App.css";
import Form from "./Form";
import Login from "./Login";
import { Routes, Route, HashRouter } from "react-router-dom";
import Records from "./Records";
import Customer from "./Customer";

function App() {

  window.addEventListener('unload',()=>{
    const id = localStorage.getItem("key");
    const data = id ? JSON.parse(id) : "";
    console.log(Date.now() - data.time);
    if (Date.now() - data.time > 1773962){
        localStorage.clear();
    }
  });

  // basename={process.env.PUBLIC_URL}
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/form' element={<Form />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/rec' element={<Records />} />
        <Route path='/cust' element={<Customer />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
