/* eslint-disable no-unused-vars */
import {
  Avatar,
  Badge,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";

import React, { useState } from "react";
// import SideNav from "../components/SideNav";
import { Outlet, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { remove } from "../reduxStore/UserSlice";
import SideNav from "../Components/SideNav";

export default function Index() {
  const [isOpen, setIsOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.cart);

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  return (
    <>
      <div
        className="d-flex"
        style={{ backgroundColor: "#1e1e75", color: "white" }}
      >
        <div
          style={{
            color: "white",
            fontSize: "28px",
            fontFamily: "serif",
            fontWeight: "bold",
            margin: "7px",
            marginLeft: "15px",
            width: "600px",
          }}
        >
          {userData?.name?.toUpperCase() ?? "user"}
        </div>

        <div className="d-flex justify-content-end w-100">
          <div className=" my-1 ">
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={0} color="error">
                <MailIcon />
              </Badge>
            </IconButton>

            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={0} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </div>

          <div className="">
            <Tooltip title="Gym Profile" placement="bottom-end">
              <IconButton onClick={handleOpenUserMenu}>
                <img
                  alt="User Image"
                  src={userData.profilePic}
                  className=""
                  style={{ height: "40px", width: "40px", borderRadius: "50%" }}
                />
                {/* <Avatar></Avatar> */}
              </IconButton>
            </Tooltip>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography
                  textAlign="center"
                  onClick={() => {
                    navigate("/gym-profile");
                  }}
                >
                  <AccountBoxIcon className="mx-2" />
                  Profile
                </Typography>
              </MenuItem>

              <MenuItem>
                <Typography
                  textAlign="center"
                  onClick={async () => {
                    navigate("/login");
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    dispatch(remove());
                  }}
                >
                  <LogoutIcon className="mx-2" /> Logout
                </Typography>
              </MenuItem>
            </Menu>
          </div>
        </div>
      </div>

      <div className="d-flex ">
        <div
          className={!isOpen ? "sidenav-full" : "sidenav-small"}
          style={{
            borderTop: "1px solid white",
            // borderRight: "2px solid grey",
            backgroundColor: "#1e1e75",
          }}
        >
          <div className="d-flex justify-content-end">
            <button
              onClick={() => setIsOpen(!isOpen)}
              style={{
                color: "white",
                backgroundColor: "#47478C",
                // border: "1px solid white",
                fontSize: "14x",
              }}
            >
              {isOpen ? (
                <MenuIcon fontSize="small" />
              ) : (
                <CloseIcon fontSize="small" />
              )}
            </button>
          </div>
          <SideNav isOpen={isOpen}></SideNav>
        </div>

        <div
          className="scrollable-container"
          style={{
            width: "100%",
            borderTop: "2px solid white",
          }}
        >
          <div
            className="scrollable-container "
            style={{
              minHeight: "91.7vh",
              maxHeight: "91.7vh",
              paddingLeft: "14px",
              paddingRight: "14px",
            }}
          >
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </>
  );
}
