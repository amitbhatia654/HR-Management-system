import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Main_dashBoard from "./pages/dashboard/Main_dashBoard";
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

function App() {
  const isUserLogin = () => {
    return Boolean(localStorage.getItem("token"));
  };

  // eslint-disable-next-line react/prop-types
  const ProtectedLoginRoute = ({ children }) => {
    if (isUserLogin()) {
      return <Navigate to="/" replace></Navigate>;
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
          <Route index element={<Main_dashBoard></Main_dashBoard>}></Route>
          <Route path="users" element={<UserDetails />}></Route>
          <Route path="update-profile" element={<UpdateProfile />}></Route>
          <Route path="employees" element={<Employee />}></Route>

          <Route
            path="members-report"
            element={<MembersReport></MembersReport>}
          ></Route>
          <Route
            path="active-members"
            element={<JoinedMembers></JoinedMembers>}
          ></Route>

          <Route
            path="inactive-members"
            element={<InactiveMembers></InactiveMembers>}
          ></Route>

          <Route
            path="member-details"
            element={<MemberDetailsPage></MemberDetailsPage>}
          ></Route>

          <Route path="trainers" element={<Trainers />}></Route>

          <Route
            path="trainer-details"
            element={<TrainersDetailsPage />}
          ></Route>

          <Route
            path="membership-plans"
            element={<h5>Membership Plans</h5>}
          ></Route>

          <Route path="gym-profile" element={<MyProfile></MyProfile>}></Route>
          <Route
            path="/add-new-employee"
            element={<CreateEmployeeData />}
          ></Route>
        </Route>
        <Route path="/*" element={<ErrorPage />}></Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
