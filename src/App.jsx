import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Register from "./pages/Register";
import Home from "./pages/Home";
import AddCompany from "./pages/AddCompany";
import SearchEquipment from "./pages/SearchEquipment";
import UpdateCompany from "./pages/UpdateCompany";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-company" element={<AddCompany />} />
        <Route path="/search-equipment" element={<SearchEquipment />} />
        <Route path="/editCompany" element={<UpdateCompany />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
