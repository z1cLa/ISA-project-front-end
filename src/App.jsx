import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Register from "./pages/Register";
import Home from "./pages/Home";
import EditAccount from "./pages/EditAccount";
import AddCompany from "./pages/AddCompany";
import SearchEquipment from "./pages/SearchEquipment";
import UpdateCompany from "./pages/UpdateCompany";
import SearchCompanies from "./pages/SearchCompanies";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/edit-account" element={<EditAccount />} />
        <Route path="/add-company" element={<AddCompany />} />
        <Route path="/search-equipment" element={<SearchEquipment />} />
        <Route path="/editCompany" element={<UpdateCompany />} />
        <Route path="/search-companies" element={<SearchCompanies />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
