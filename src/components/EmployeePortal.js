import React, { useEffect, useState } from 'react';
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
import axios from 'axios';

import AddEmployee from './AddEmployee';
import DeleteEmployee from '../DeleteEmployee';
import { config } from '../App';

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
  const [data, setData] = useState({
    firstName : "",
    lastName : "",
    balance : 0,
  })
  const [doDelete, setDelete] = useState(false);
  const [addingMoney, setAddingMoney] = useState(false);
  const [addedMoney, setAddedMoney] = useState(0);
  const [employeesData, setEmployeesData] = useState();

  const handleCloseEdit = async (id) => {
    setAddingMoney(false);
    setOpenEdit(false);

    try{
      const newBalance = Number(data.balance) + Number(addedMoney);
      const response = await axios.put(`${config.endpoint}/employees/${id}`, { balance : newBalance});
      console.log("put data",response.data.json);
      return response;
    }
    catch(e){
      console.log("error",e);
    }
  };

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

  useEffect(() => {
    setData({...data, firstName : selectedRow && selectedRow.firstName, lastName : selectedRow && selectedRow.lastName, balance : selectedRow && selectedRow.balance})
  },[selectedRow])

  const addMoney = () => {
    setAddingMoney(true);
  }

  const getEmployeesData = async () => {

    try{
      const response =  await axios.get(`${config.endpoint}/employees`)
      console.log(response);
      setEmployeesData(response.data)
      return response;
    }
    catch (e){
      if(e.response && e.response.status === 400){
        console.log("error")
      }
      else{
        console.log("error2")
      }

    }
  }

  useEffect(() => {
    getEmployeesData()
  },[])

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
          {employeesData && employeesData.map((employee) => (
            <StyledTableRow key={employee.id}>
              <StyledTableCell component="th" scope="row">
                {employee.id}
              </StyledTableCell>
              <StyledTableCell align="right">{employee.firstName}</StyledTableCell>
              <StyledTableCell align="right">{employee.lastName}</StyledTableCell>
              <StyledTableCell align="right">{employee.balance}</StyledTableCell>
              <StyledTableCell align="right"><Button onClick={(e) => handleClickEdit(employee.id)} variant="contained">Edit</Button></StyledTableCell>
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
        <TextField sx={{display:"block",marginBottom:4}} id="firstName" label="First Name" variant="outlined" value={data.firstName} onChange={(e) => setData({...data, firstName : e.target.value})}/>
        <TextField sx={{display:"block", marginBottom:4}} id="lastName" label="Last Name" variant="outlined" value={data.lastName} onChange={(e) => setData({...data, lastName : e.target.value})}  />
        <TextField sx={{display:"block", marginBottom:4}} id="balance" label="Balance" variant="outlined" value={data.balance} onChange={(e) => setData({...data, balance : e.target.value})}  />
        <Box textAlign='center'>
        <Button sx={{margin:2}} variant='contained' onClick={addMoney}>Add Money</Button>
        {addingMoney && <TextField type={"number"} onChange={(e) => setAddedMoney(e.target.value)} />}
        <Button variant="contained" onClick={() => handleCloseEdit(selectedRow.id)}>Save</Button>
        </Box>
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