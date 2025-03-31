import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Toaster } from "react-hot-toast";
import Employee from "./pages/EmployeeManagement/Employee";
import CreateEmployeeData from "./pages/EmployeeManagement/CreateEmployeeData";
import PrivateRoute from "./pages/PrivateRoute";
import MyProfile from "./pages/MyProfile";
import ErrorPage from "./pages/ErrorPage";
import UserDetails from "./pages/Users/UsersDetails";
import UpdateProfile from "./pages/UpdateProfile";
import LoginRegister from "./Components/LoginRegister";
import JoinedMembers from "./pages/JoinedMembers";
import MemberDetailsPage from "./pages/MemberDetailsPage";
import InactiveMembers from "./pages/InactiveMembers";
import MemberShipPlans from "./pages/MemberShipPlans";
import Trainers from "./pages/Trainers";
import MembersReport from "./pages/dashboard/MembersReport";
import TrainersDetailsPage from "./pages/Trainers/TrainersDetails";
import Candidates from "./pages/Candidates";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";
import Leaves from "./pages/Leaves";

function App() {
  const isUserLogin = () => {
    return Boolean(localStorage.getItem("token"));
  };

  // eslint-disable-next-line react/prop-types
  const ProtectedLoginRoute = ({ children }) => {
    if (isUserLogin()) {
      return <Navigate to="/candidates" replace></Navigate>;
    }
    return children;
  };

  return (
    <>
      <Routes>
        {" "}
        <Route
          path="/login"
          element={
            <ChakraProvider>
              <ProtectedLoginRoute>
                <LoginRegister />
              </ProtectedLoginRoute>
            </ChakraProvider>
          }
        ></Route>
        <Route
          path="/register"
          element={
            <ChakraProvider>
              <ProtectedLoginRoute>
                <LoginRegister />
              </ProtectedLoginRoute>
            </ChakraProvider>
          }
        ></Route>
        <Route path="/" element={<PrivateRoute />}>
          <Route index element={<Candidates />} />
          <Route path="employees" element={<Employees />} />

          <Route path="attendance" element={<Attendance />} />

          <Route path="leaves" element={<Leaves />} />
        </Route>
        <Route path="/*" element={<ErrorPage />}></Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
