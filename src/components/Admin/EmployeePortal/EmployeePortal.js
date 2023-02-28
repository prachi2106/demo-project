import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Container, Box, TextField } from "@mui/material";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

import AddEmployee from "./AddEmployee";
import DeleteEmployee from "./DeleteEmployee";
import { config } from "../../../App";
import { db } from "../../../firebaseConfig";
import { onValue, ref, get, child, update } from "firebase/database";
import { async } from "@firebase/util";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "400px",
  textAlign: "center",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function CustomizedTables() {
  const [selectedRow, setSelectedRow] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    balance: 0,
  });
  const [doDelete, setDelete] = useState({
    show: false,
    id: null,
  });
  const [addingMoney, setAddingMoney] = useState(false);
  const [addedMoney, setAddedMoney] = useState(0);
  const [employeesData, setEmployeesData] = useState();
  const [employees, setEmployees] = useState();

  const handleCloseEdit = async (id) => {
    setAddingMoney(false);
    setOpenEdit(false);

    try {
      const newBalance = Number(data.balance) + Number(addedMoney);
      const response = await axios.put(`${config.endpoint}/employees/${id}`, {
        firstName: data.firstName,
        lastName: data.lastName,
        balance: newBalance,
      });
      console.log("put data", response.data);
      getEmployeesData();
      setData(response.data);
      setAddedMoney(0);
      return response;
    } catch (e) {
      console.log("error", e);
    }
  };

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const handleClickEdit = (id) => {
    console.log(id);
    const [employee] = employees.filter((employee) => employee.key === id);
    setSelectedRow(employee);
    setOpenEdit(true);
  };

  const confirmDelete = (id) => {
    setDelete({ show: true, id });
  };

  const handleDelete = async () => {
    console.log("delete id", doDelete);

    try {
      const response = await axios.delete(
        `${config.endpoint}/employees/${doDelete.id}`
      );
      getEmployeesData();
      setData(response.data);
      setDelete({ show: false, id: null });
      return response;
    } catch (e) {
      console.log("error", e);
    }
  };

  const handleCancel = () => {
    setDelete({ show: false, id: null });
  };

  useEffect(() => {
    setData({
      ...data,
      firstName: selectedRow && selectedRow.firstName,
      lastName: selectedRow && selectedRow.lastName,
      balance: selectedRow && selectedRow.balance,
    });
  }, [selectedRow]);

  const addMoney = () => {
    setAddingMoney(true);
  };

  const getEmployeesData = async () => {
    try {
      debugger
      const response = await axios.get("https://canteenmanagement-12c53-default-rtdb.firebaseio.com/employees.json")
      console.log(response);
      setEmployees(response.data);
      return response;
    } catch (e) {
      if (e.response && e.response.status === 400) {
        console.log("error");
      } else {
        console.log("error2");
      }
    }
  };

  const createData = ({ firstName, lastName, balance }) => {
    const postEmployee = async (body) => {
      const response = await fetch(
        "https://canteenmanagement-12c53-default-rtdb.firebaseio.com/employees.json",{ method : "POST", body }
      );
      if(!response.ok) throw new Error("Failed to post employee")
      const data = response.json();
      console.log("data", data);
    };

    setData({
      firstName: firstName,
      lastName: lastName,
      balance: balance,
    });
    // const record = getData();
    // get(child(db, "employees")).then((snapshot) => {
    //   if (snapshot.exists()) {
    //     update(ref(db, "employees"), record.data);
    //   } else {
    //     alert("Cannot be done. User does not exists");
    //   }
    // });
    postEmployee(JSON.stringify(data)).then();
    
  };

  useEffect(() => {
    getEmployeesData();
  }, []);

  return (
    <Container>
      <Button
        sx={{ display: "flex", justifyContent: "end", margin: 3 }}
        variant="contained"
        onClick={handleOpenAdd}
      >
        <AddIcon /> Add Employee
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Employee ID</StyledTableCell>
              <StyledTableCell align="right">
                Employee First Name
              </StyledTableCell>
              <StyledTableCell align="right">
                Employee Last Name
              </StyledTableCell>
              <StyledTableCell align="right">Balance</StyledTableCell>
              <StyledTableCell align="right">Edit</StyledTableCell>
              <StyledTableCell align="right">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees &&
              employees.map((employee) => (
                <StyledTableRow key={employee.key}>
                  <StyledTableCell component="th" scope="row">
                    {Number(employee.key) + 1}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {employee.data.firstName}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {employee.data.lastName}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {employee.data.balance}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Button
                      onClick={() => handleClickEdit(employee.key)}
                      variant="contained"
                    >
                      Edit
                    </Button>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Button
                      variant="contained"
                      onClick={() => confirmDelete(employee.key)}
                    >
                      Delete
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            sx={{ display: "block", marginBottom: 4 }}
            id="firstName"
            label="First Name"
            variant="outlined"
            value={data.firstName}
            onChange={(e) => setData({ ...data, firstName: e.target.value })}
          />
          <TextField
            sx={{ display: "block", marginBottom: 4 }}
            id="lastName"
            label="Last Name"
            variant="outlined"
            value={data.lastName}
            onChange={(e) => setData({ ...data, lastName: e.target.value })}
          />
          <TextField
            sx={{ display: "block", marginBottom: 4 }}
            id="balance"
            label="Balance"
            variant="outlined"
            value={data.balance}
            onChange={(e) => setData({ ...data, balance: e.target.value })}
          />
          <Box textAlign="center">
            <Button sx={{ margin: 2 }} variant="contained" onClick={addMoney}>
              Add Money
            </Button>
            {addingMoney && (
              <TextField
                type={"number"}
                onChange={(e) => setAddedMoney(e.target.value)}
              />
            )}
            <Button
              variant="contained"
              onClick={() => handleCloseEdit(selectedRow.id)}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Modal>

      {openAdd && (
        <AddEmployee
          open={openAdd}
          handleClose={handleCloseAdd}
          createData={createData}
        />
      )}

      {doDelete.show && (
        <DeleteEmployee
          openDelete={doDelete}
          handleCancel={handleCancel}
          handleDelete={handleDelete}
        />
      )}
    </Container>
  );
}



// export function Help() {
//   const emailInput = useRef();
//   const passwordInput = useRef();
//   return (
//     <>
//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           console.log({
//             emailInput: emailInput.current.value,
//             passwordInput: passwordInput.current.value
//           });
//         }}
//       >
//         <input type="email" ref={emailInput} />
//         <input type="password" ref={passwordInput} />
//         <button>Submit</button>
//       </form>
//     </>
//   );