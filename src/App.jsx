// App.jsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Register from "./pages/Register";
import Home from "./pages/Home";
import AddCompany from "./pages/AddCompany";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-company" element={<AddCompany />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
