import { Link, useLocation, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import WidgetsIcon from "@mui/icons-material/Widgets";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import GradingIcon from "@mui/icons-material/Grading";
import { useDispatch, useSelector } from "react-redux";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import GroupIcon from "@mui/icons-material/Group";
import LogoutIcon from "@mui/icons-material/Logout";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import { remove } from "../reduxStore/UserSlice";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import NotesIcon from "@mui/icons-material/Notes";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";
import Crop75Icon from "@mui/icons-material/Crop75";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
export default function SideNav({ isOpen }) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.cart);

  return (
    <>
      <div
        className="d-flex flex-column justify-content-between p-2"
        style={{ minHeight: "96.5vh" }}
      >
        <div>
          <div
            style={{
              fontSize: "28px",
              fontFamily: "serif",
              fontWeight: "bold",
            }}
            className="text-violet"
          >
            <CheckBoxOutlineBlankIcon className="fs-1" /> LOGO
          </div>
          <input
            type="text"
            placeholder="Search"
            className="search-box px-3 mt-4"
          />
          <div>
            <h6 className="fw-light my-4">Recruitment</h6>
            <Link
              to={"/"}
              style={{
                textDecoration: "none",
                textTransform: "capitalize",
                fontSize: "16px",
                color: `${location.pathname == "/" ? "blue" : "black"}`,
              }}
            >
              <Box
                sx={{
                  mx: 0.5,
                  my: 0.5,
                  p: 1,
                }}
              >
                <PersonAddIcon />
                <Box
                  component={"span"}
                  sx={{ display: `${isOpen && "none"}`, mx: 1 }}
                >
                  Candidates
                </Box>
              </Box>
            </Link>
          </div>

          <div>
            <h6 className="fw-light  my-4">Organization</h6>
            <Link
              to={"/employees"}
              style={{
                textDecoration: "none",
                textTransform: "capitalize",
                fontSize: "16px",
                color: `${
                  location.pathname == "/employees" ? "blue" : "black"
                }`,
              }}
            >
              <Box
                sx={{
                  mx: 0.5,
                  my: 0.5,
                  p: 1,
                }}
              >
                <GroupIcon />
                <Box
                  component={"span"}
                  sx={{ display: `${isOpen && "none"}`, mx: 1 }}
                >
                  Employees
                </Box>
              </Box>
            </Link>

            <Link
              to={"/attendance"}
              style={{
                textDecoration: "none",
                textTransform: "capitalize",
                fontSize: "16px",
                color: `${
                  location.pathname == "/attendance" ? "blue" : "black"
                }`,
              }}
            >
              <Box
                sx={{
                  mx: 0.5,
                  my: 0.5,
                  p: 1,
                }}
              >
                <NotesIcon />
                <Box
                  component={"span"}
                  sx={{ display: `${isOpen && "none"}`, mx: 1 }}
                >
                  Attendance
                </Box>
              </Box>
            </Link>

            <Link
              to={"/leaves"}
              style={{
                textDecoration: "none",
                textTransform: "capitalize",
                fontSize: "16px",
                color: `${location.pathname == "/leaves" ? "blue" : "black"}`,
              }}
            >
              <Box
                sx={{
                  mx: 0.5,
                  my: 0.5,
                  p: 1,
                }}
              >
                <GroupRemoveIcon />
                <Box
                  component={"span"}
                  sx={{ display: `${isOpen && "none"}`, mx: 1 }}
                >
                  Leaves
                </Box>
              </Box>
            </Link>
          </div>

          <div>
            <h6 className="fw-light  my-4">Others</h6>
            <div
              onClick={async () => {
                navigate("/login");
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                dispatch(remove());
              }}
              className="logout-btn"
            >
              <Box
                sx={{
                  mx: 1,
                  my: 0.5,
                  p: 1,
                }}
              >
                <LogoutIcon />
                <Box
                  component={"span"}
                  sx={{ display: `${isOpen && "none"}`, mx: 1 }}
                >
                  Logout
                </Box>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
