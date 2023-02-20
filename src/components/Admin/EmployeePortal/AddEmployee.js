import { Container, Modal, Box, TextField, Button } from "@mui/material";
import React, { useState } from "react";

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

const AddEmployee = ({open, handleClose, createData}) => {

  const [postData, setPostData] = useState({
    firstName : "",
    lastName : "",
    balance : 0,
  })

    return(
        <Container>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <TextField sx={{display:"block",marginBottom:4}} id="firstName" label="First Name" variant="outlined" value={postData.firstName} onChange={(e) => setPostData({...postData, firstName : e.target.value})} />
        <TextField sx={{display:"block", marginBottom:4}} id="lastName" label="Last Name" variant="outlined" value={postData.lastName} onChange={(e) => setPostData({...postData, lastName : e.target.value})} />
        <TextField sx={{display:"block", marginBottom:4}} id="balance" label="Balance" variant="outlined" value={postData.balance} onChange={(e) => setPostData({...postData, balance : e.target.value})} />
        <Button sx={{display:"block"}} variant="contained" onClick={() => createData(postData)}>Save</Button>
        </Box>
      </Modal>
      </Container>

    )

}

export default AddEmployee;