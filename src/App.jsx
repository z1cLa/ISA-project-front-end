import { Route, Routes } from "react-router-dom";
import "./App.css";

import Register from "./pages/Register";
import Home from "./pages/Home";
import EditAccount from "./pages/EditAccount";
import AddCompany from "./pages/AddCompany";
import SearchEquipment from "./pages/SearchEquipment";
import CompanyOverview from "./pages/CompanyOverview";
import UpdateCompany from "./pages/UpdateCompany";
import SearchCompanies from "./pages/SearchCompanies";
import EquipmentForCompany from "./pages/EquipmentForCompany";
import AddAppointment from "./pages/AddAppointment";
import UpdateEquipment from "./pages/UpdateEquipment";
import AddEquipment from "./pages/AddEquipment";
import SearchEquipmentOfCompany from "./pages/SearchEquipmentOfCompany";
import Login from "./pages/Login";
import Layout from "./utils/Layout";
import { AuthProvider } from "./context/AuthProvider";
import RequireAuth from "./ui/RequireAuth";
import Unauthorized from "./pages/Unauthorized";
import Navbar from "./ui/Navbar";
import useAuth from "./hooks/useAuth";
import ReservationDetails from "./pages/ReservationDetails";
import UserReservations from "./pages/UserReservations";

function App() {
  const { loggedUser, setLoggedUser } = useAuth();
  return (
    <>
      <Navbar loggedUser={loggedUser} />
      <AuthProvider loggedUserParam={loggedUser}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home loggedUser={loggedUser} />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/login"
              element={<Login setLoggedUser={setLoggedUser} />}
            />
            <Route path="/reservation/:id" element={<ReservationDetails />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/edit-account" element={<EditAccount />} />
            <Route path="/search-companies" element={<SearchCompanies />} />

            {/* FOR USER */}
            <Route
              element={
                <RequireAuth
                  loggedUser={loggedUser}
                  allowedRoles={["ROLE_USER"]}
                />
              }
            >
              <Route
                path="/company/:companyId"
                element={<EquipmentForCompany loggedUser={loggedUser} />}
              />

              <Route
                path="/user-reservations"
                element={<UserReservations loggedUser={loggedUser} />}
              />
            </Route>
            {/* FOR ADMIN */}
            <Route
              element={
                <RequireAuth
                  loggedUser={loggedUser}
                  allowedRoles={["ROLE_ADMIN"]}
                />
              }
            >
              <Route path="/add-company" element={<AddCompany />} />
              <Route path="/edit-company" element={<UpdateCompany />} />
              <Route
                path="/add-appointment"
                element={<AddAppointment loggedUser={loggedUser} />}
              />
              <Route path="/company"  element={<CompanyOverview loggedUser={loggedUser}/>} />
              <Route path="/search-equipment" element={<SearchEquipment />} />
              <Route path="/edit-equipment/:id" element={<UpdateEquipment />} />
              <Route
                path="/add-equipment/:companyId"
                element={<AddEquipment />}
              />
              <Route
                path="/search-equipment/:companyId"
                element={<SearchEquipmentOfCompany />}
              />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
