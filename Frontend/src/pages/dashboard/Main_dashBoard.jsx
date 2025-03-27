import React from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import UpdateIcon from "@mui/icons-material/Update";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { useNavigate } from "react-router-dom";
import FirstChats from "./FirstChats";
import { PieChart } from "@mui/x-charts";

export default function Main_dashBoard() {
  const navigate = useNavigate();
  const date = new Date();
  const month = date.toLocaleString("default", { month: "long" });
  return <>Dashboard</>;
}
