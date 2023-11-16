import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Register from "./pages/Register";
import Home from "./pages/Home";
import UpdateCompany from "./pages/UpdateCompany";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/editCompany" element={<UpdateCompany />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
