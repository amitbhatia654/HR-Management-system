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
import Header from "../Components/Header";

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
      <div className="d-flex ">
        <div
          className={!isOpen ? "sidenav-full" : "sidenav-small"}
          style={{
            borderTop: "1px solid white",
            borderRight: "1px solid grey",
            // backgroundColor: "#1e1e75",
          }}
        >
          <div className="d-flex justify-content-end">
            {/* <button
              onClick={() => setIsOpen(!isOpen)}
              style={{
                // color: "white",
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
            </button> */}
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
            <Header></Header>
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </>
  );
}
