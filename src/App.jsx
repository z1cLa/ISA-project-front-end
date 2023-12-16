import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Register from "./pages/Register";
import Home from "./pages/Home";
import EditAccount from "./pages/EditAccount";
import AddCompany from "./pages/AddCompany";
import SearchEquipment from "./pages/SearchEquipment";
import CompanyOverview from "./pages/CompanyOverview";
import UpdateCompany from "./pages/UpdateCompany";
import SearchCompanies from "./pages/SearchCompanies";
import AddAppointment from "./pages/AddAppointment";
import UpdateEquipment from "./pages/UpdateEquipment";
import AddEquipment from "./pages/AddEquipment";
import SearchEquipmentOfCompany from "./pages/SearchEquipmentOfCompany";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/edit-account" element={<EditAccount />} />
        <Route path="/add-company" element={<AddCompany />} />
        <Route path="/search-equipment" element={<SearchEquipment />} />
        <Route path="/company" element={<CompanyOverview />} />
        <Route path="/edit-company" element={<UpdateCompany />} />
        <Route path="/search-companies" element={<SearchCompanies />} />
        <Route path="/add-appointment" element={<AddAppointment />} />
        <Route path="/edit-equipment/:id" element={<UpdateEquipment />} />
        <Route path="/add-equipment/:companyId" element={<AddEquipment />} />
        <Route path="/search-equipment/:companyId" element={<SearchEquipmentOfCompany />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
