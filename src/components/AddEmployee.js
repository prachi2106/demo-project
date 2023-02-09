import { Container, Modal, Box, TextField, Button } from "@mui/material";
import React from "react";

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

const AddEmployee = ({open, handleClose}) => {
    return(
        <Container>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <TextField sx={{display:"block",marginBottom:4}} id="outlined-basic" label="First Name" variant="outlined" />
        <TextField sx={{display:"block", marginBottom:4}} id="outlined-basic" label="Last Name" variant="outlined" />
        <TextField sx={{display:"block", marginBottom:4}} id="outlined-basic" label="Balance" variant="outlined" />
        <Button sx={{display:"block"}} variant="contained">Save</Button>
        </Box>
      </Modal>
      </Container>

    )

}

export default AddEmployee;