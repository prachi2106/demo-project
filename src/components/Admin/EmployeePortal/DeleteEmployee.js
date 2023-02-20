import { Dialog, Button, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import React from "react";


const DeleteEmployee = ({openDelete, handleCancel, handleDelete}) => {
return(
    <Dialog open={openDelete}>
        <DialogTitle>Delete Employee Record?</DialogTitle>
        <DialogContent>
            <Typography>Are you sure you want to delete the Employee record?</Typography>
        </DialogContent>
        <DialogActions>
            <Button variant="contained" onClick={handleDelete}>Yes</Button>
            <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
        </DialogActions>
    </Dialog>
)

}

export default DeleteEmployee;