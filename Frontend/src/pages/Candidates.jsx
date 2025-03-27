import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import toast from "react-hot-toast";
// import axiosInstance from "../../ApiManager";
// import noResult from "../../../../images/no-results3.jpeg";
import noResult from "../../images/no-results3.jpeg";
import { useSelector } from "react-redux";
import axiosInstance from "../ApiManager";
import { useState } from "react";
import Modal from "./HelperPages/Modal";
import { Formik, ErrorMessage, Form } from "formik";
// import axiosInstance from "../ApiManager";
const dp_image = "/user.jpg";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
// import toast from "react-hot-toast";
import { addMember } from "../assets/FormSchema";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
import Pagination from "./HelperPages/Pagination";
// import { useNavigate } from "react-router-dom";
import {
  formatDateToDisplay,
  formatDateToInput,
} from ".././assets/FrontendCommonFunctions";
import ConfirmModal from "./HelperPages/ConfirmModal";
import moment from "moment";
import { Button } from "@mui/material";
import { useEffect } from "react";

export default function Candidates() {
  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const [allemployee, setAllEmployee] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [rowSize, setRowSize] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [editMember, setEditMember] = useState({});

  const [allMembers, setAllMembers] = useState([]);
  const [allTrainers, setAllTrainers] = useState([]);
  const navigate = useNavigate();
  const totalPages = Math.ceil(totalCount / rowSize);
  const user = useSelector((state) => state.cart);

  const fetchData = async () => {
    setLoading(true);
    const res = await axiosInstance.get("/api/employee", {
      params: { search, rowSize, currentPage, _id: user.id },
    });
    if (res.status == 200) {
      setAllEmployee(res.data.response);
      setTotalCount(res.data.totalCount);
    } else {
      setAllEmployee([]);
      setTotalCount(0);
    }
    setLoading(false);
  };

  const handleEdit = (id) => {
    navigate("/add-new-employee", { state: { id } });
  };

  const handleDelete = async (id) => {
    const res = await axiosInstance.delete(`/api/employee/${id}`);
    if (res.status == 200) {
      toast.success(res.data.message);
      setAllEmployee(allemployee.filter((data) => data._id != id));
    }
  };

  function convertFileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handleSubmit = async (values) => {
    // return console.log(values, "values");
    // setSubmitLoading(true);

    var data = {
      ...values,
    };

    if (values?.resume?.name) {
      const base64 = await convertFileToBase64(values?.resume);
      data.resume = base64;
    }

    return console.log(data, "data is");

    const res = await axiosInstance.post(`/api/gym/member`, data);

    setSubmitLoading(false);
    if (res.status == 200) {
      if (editMember._id) {
        if (res.data.memberResult.status == "active") {
          const updatedMember = allMembers.map((folder) => {
            if (folder._id == values._id) {
              return res.data.memberResult;
            }
            return folder;
          });
          setAllMembers(updatedMember);
        } else {
          const updatedMembers = allMembers.filter(
            (member) => member._id !== res.data.memberResult._id
          );
          setAllMembers(updatedMembers);
        }
      } else {
        if (
          allMembers.length < rowSize &&
          res.data.memberResult.status == "active"
        )
          allMembers.push(res.data.memberResult);
        else {
          const updatedMembers = allMembers.filter(
            (member) => member._id !== res.data.memberResult._id
          );
          setAllMembers(updatedMembers);
        }
      }
      toast.success(res.data.message);
      setEditMember({});
      setShowModal(false);
    }
  };

  const deleteMember = async (memberId) => {
    // console.log(memberId);
    const userResponse = await showConfirmationModal();
    if (userResponse != "yes") return;
    const res = await axiosInstance.delete(`/api/gym/member`, {
      data: { memberId },
    });
    if (res.status == 200) {
      toast.success(res.data.message);

      const updatedMembers = allMembers.filter(
        (member) => member._id !== memberId
      );
      setAllMembers(updatedMembers);
    } else toast.error(res.data.message);
  };

  useEffect(() => {
    fetchData();
  }, [search, rowSize, currentPage]);

  return (
    <div>
      <div className="d-flex justify-content-between mt-2 ">
        <div className="d-flex">
          <div className="filter-box">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={handleChange}
                className="filters"
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="filter-box mx-3">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Position</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={handleChange}
                className="filters"
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <div>
          <div className="d-flex">
            <input
              type="text"
              placeholder="Search"
              className="search-box px-3"
            />
            <div>
              <button
                className="add-btn mx-2"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                Add Candidate
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3">
        <TableContainer
          className="scrollable-container table-box"
          style={{ maxHeight: "76vh", minHeight: "76vh" }}
        >
          <Table aria-label="simple table">
            <TableHead
              sx={{
                backgroundColor: "#4D007D",
                color: "wheat",
                position: "sticky",
                top: 0,
              }}
            >
              <TableRow className="tableStyle">
                <TableCell sx={{ color: "white" }}>S.No.</TableCell>
                <TableCell sx={{ color: "white" }}>Candidate Name</TableCell>
                <TableCell sx={{ color: "white" }}>Email Address</TableCell>
                <TableCell sx={{ color: "white" }}>Phone Number</TableCell>
                <TableCell sx={{ color: "white" }}>Position</TableCell>
                <TableCell sx={{ color: "white" }}>Status</TableCell>
                <TableCell sx={{ color: "white" }}>Experience</TableCell>
                <TableCell sx={{ color: "white" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="tableBodyStyle">
              {loading ? (
                <TableCell colSpan={8}>
                  {" "}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "300px",
                      textAlign: "center",
                    }}
                  >
                    <div className="loader"></div>
                  </div>
                </TableCell>
              ) : allemployee.length > 0 ? (
                allemployee?.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell
                      style={{ boxShadow: "0px 2px 4px rgba(0 ,0 ,0 ,0.2)" }}
                    >
                      {(currentPage - 1) * rowSize + index + 1}
                    </TableCell>
                    <TableCell
                      style={{ boxShadow: "0px 2px 4px rgba(0 ,0 ,0 ,0.2)" }}
                    >
                      {row?.empName}
                    </TableCell>
                    <TableCell
                      style={{ boxShadow: "0px 2px 4px rgba(0 ,0 ,0 ,0.2)" }}
                    >
                      {row?.empEmail}
                    </TableCell>
                    <TableCell
                      style={{ boxShadow: "0px 2px 4px rgba(0 ,0 ,0 ,0.2)" }}
                    >
                      {row?.empPhone}
                    </TableCell>
                    <TableCell
                      style={{ boxShadow: "0px 2px 4px rgba(0 ,0 ,0 ,0.2)" }}
                    >
                      {row?.empPhone}
                    </TableCell>
                    <TableCell
                      style={{ boxShadow: "0px 2px 4px rgba(0 ,0 ,0 ,0.2)" }}
                    >
                      {row?.empDepartment}
                    </TableCell>
                    <TableCell
                      style={{ boxShadow: "0px 2px 4px rgba(0 ,0 ,0 ,0.2)" }}
                    >
                      {row?.empAddress}
                    </TableCell>
                    <TableCell
                      style={{ boxShadow: "0px 2px 4px rgba(0 ,0 ,0 ,0.2)" }}
                    >
                      <span className="dropdown ">
                        <button
                          className="btn "
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <h6>
                            <MoreVertIcon sx={{ fontSize: "19px" }} />
                          </h6>
                        </button>
                        <ul className="dropdown-menu">
                          <li>
                            <button
                              className="dropdown-item"
                              onClick={() => {
                                // setEditMember(member), setShowModal(true);
                              }}
                            >
                              Download Resume
                            </button>
                          </li>
                          <li>
                            <button
                              className="dropdown-item"
                              //   onClick={() => deleteMember(member._id)}
                            >
                              Delete Candidate
                            </button>
                          </li>
                        </ul>
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "300px",
                        textAlign: "center",
                      }}
                    >
                      <img
                        src={noResult}
                        alt="No Result Image"
                        height="250px"
                        width="300px"
                      />
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {showModal && (
        <Modal
          setShowModal={setShowModal}
          //   otherFunc={setEditMember}
          title={`${editMember._id ? "Edit" : "Add"} Candidate `}
          handleSubmit={handleSubmit}
        >
          <Formik
            initialValues={
              editMember._id
                ? {
                    ...editMember,
                    planRenew: editMember.lastPayment.planRenew,
                    paymentMode: editMember.lastPayment.paymentMode,
                    memberPlan: editMember.lastPayment.memberPlan,
                    assigned_trainer: editMember?.assigned_trainer?._id,
                  }
                : {
                    name: "",
                    address: "",
                    phone_number: "",
                    position: "",
                    experience: "",
                    information: false,
                  }
            }
            // validationSchema={addMember}
            enableReinitialize={true}
            onSubmit={(values) => handleSubmit(values)}
          >
            {(props) => (
              <Form onSubmit={props.handleSubmit}>
                <div className=" ">
                  <div className="container p-4">
                    <div className="row ">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Full Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder="Enter Name"
                            value={props.values.name}
                            name="name"
                            onChange={props.handleChange}
                          />

                          <ErrorMessage
                            name="name"
                            component="div"
                            style={{ color: "red" }}
                          />
                        </div>
                      </div>

                      <div className="col-md-6 ">
                        <div className="form-group">
                          <label htmlFor="address">Email Address</label>
                          <input
                            type="text"
                            className="form-control"
                            id="address"
                            placeholder="Email Address"
                            value={props.values.address}
                            name="address"
                            onChange={props.handleChange}
                          />
                        </div>
                        <ErrorMessage
                          name="address"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </div>

                      <div className="col-md-6 mt-3 ">
                        <div className="form-group">
                          <label htmlFor="phone-number">Phone Number</label>
                          <input
                            type="number"
                            className="form-control"
                            id="phone-number"
                            placeholder="Enter Phone Number"
                            value={props.values.phone_number}
                            name="phone_number"
                            // onChange={props.handleChange}
                            onChange={(e) => {
                              if (e.target.value.length < 11)
                                props.setFieldValue(
                                  "phone_number",
                                  e.target.value
                                );
                            }}
                          />
                        </div>
                        <ErrorMessage
                          name="phone_number"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </div>

                      <div className="col-md-6 mt-3 ">
                        <div className="form-group">
                          <label htmlFor="position">Position</label>
                          <input
                            type="text"
                            className="form-control"
                            id="position"
                            placeholder="Enter Position"
                            value={props.values.position}
                            name="position"
                            onChange={(e) => {
                              props.setFieldValue("position", e.target.value);
                            }}
                          />
                        </div>
                        <ErrorMessage
                          name="position"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </div>

                      <div className="col-md-6 mt-3 ">
                        <div className="form-group">
                          <label htmlFor="experience">Experience</label>
                          <input
                            type="number"
                            className="form-control"
                            id="experience"
                            placeholder="Enter Experience"
                            value={props.values.experience}
                            name="experience"
                            onChange={(e) => {
                              props.setFieldValue("experience", e.target.value);
                            }}
                          />
                        </div>
                        <ErrorMessage
                          name="experience"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </div>

                      <div className="col-md-6 mt-3">
                        <div className="form-group">
                          <label htmlFor="resume">Resume</label>
                          <br />

                          <input
                            type="file"
                            className="form-control "
                            id="pic"
                            name="resume"
                            onChange={(e) =>
                              props.setFieldValue("resume", e.target.files[0])
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <input
                      type="checkbox"
                      //   value={props.value.information}
                      checked={props.values.information}
                      onChange={(e) =>
                        props.setFieldValue("information", e.target.checked)
                      }
                    />{" "}
                    I hereby declare that above information is true to the best
                    of my knowledge and belief
                  </div>

                  <div className="d-flex justify-content-center mt-4">
                    <Button
                      variant="outlined"
                      type="submit"
                      sx={{
                        my: 1,
                        color: "#47478c",
                        backgroundColor: "white",
                        fontSize: "16px",
                      }}
                      disabled={submitLoading || !props.values.information}
                    >
                      {submitLoading ? (
                        <span className="spinner-border "></span>
                      ) : (
                        "Save"
                      )}{" "}
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </Modal>
      )}
    </div>
  );
}
