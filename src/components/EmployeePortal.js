import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Button, Container, Box, TextField} from '@mui/material';
import Modal from '@mui/material/Modal';
import AddIcon from '@mui/icons-material/Add';

import {employeesData} from  "../data";
import AddEmployee from './AddEmployee';
import DeleteEmployee from '../DeleteEmployee';

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
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "400px",
  textAlign:"center",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function CustomizedTables() {

  const [selectedRow, setSelectedRow] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [firstName, setFirstName] = useState(selectedRow ? selectedRow.firstName : "");
  const [lastName, setlastName] = useState(selectedRow ? selectedRow.lastName : "");
  const [balance, setBalance] = useState(selectedRow && selectedRow.salary);
  const [doDelete, setDelete] = useState(false);

  const handleCloseEdit = () => setOpenEdit(false);

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);


  const handleClickEdit = (id) => {
    console.log(id)
    const [employee] = employeesData.filter((employee) => employee.id === id);
    setSelectedRow(employee);
    setOpenEdit(true);
  }

  const handleDelete = () => {
    setDelete(true);
  }

  const handleCancel = () => {
    setDelete(false);
  }

  return (
    <Container>
    <Button sx={{display:"flex", justifyContent:"end", margin : 3}} variant="contained" onClick={handleOpenAdd}><AddIcon/> Add Employee</Button>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Employee ID</StyledTableCell>
            <StyledTableCell align="right">Employee First Name</StyledTableCell>
            <StyledTableCell align="right">Employee Last Name</StyledTableCell>
            <StyledTableCell align="right">Balance</StyledTableCell>
            <StyledTableCell align="right">Edit</StyledTableCell>
            <StyledTableCell align="right">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employeesData.map((employee) => (
            <StyledTableRow key={employee.id}>
              <StyledTableCell component="th" scope="row">
                {employee.id}
              </StyledTableCell>
              <StyledTableCell align="right">{employee.firstName}</StyledTableCell>
              <StyledTableCell align="right">{employee.lastName}</StyledTableCell>
              <StyledTableCell align="right">{employee.salary}</StyledTableCell>
              <StyledTableCell align="right"><Button onClick={() => handleClickEdit(employee.id)} variant="contained">Edit</Button></StyledTableCell>
              <StyledTableCell align="right"><Button variant="contained" onClick={handleDelete}>Delete</Button></StyledTableCell>
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
        <TextField sx={{display:"block",marginBottom:4}} id="firstName" label="First Name" variant="outlined" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
        <TextField sx={{display:"block", marginBottom:4}} id="lastName" label="Last Name" variant="outlined" value={lastName}  />
        <TextField sx={{display:"block", marginBottom:4}} id="balance" label="Balance" variant="outlined" value={balance}  />

        <Button sx={{display:"block"}} variant="contained">Save</Button>
        </Box>
      </Modal>

      {openAdd &&
      <AddEmployee open={openAdd} handleClose={handleCloseAdd}/>
      }

      {doDelete && 
      <DeleteEmployee openDelete={doDelete} handleCancel={handleCancel} />
      }
    </Container>
  );
}