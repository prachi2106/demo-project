import React, { useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Container,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const Employee = () => {

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState({
    name : "",
    email: "",
    password : ""
  })

  const validateInput = (data) => {
    if(data.name.length === 0){
        enqueueSnackbar("Name can't be empty!", { variant : "warning"});
        return false;
    }
    else if(data.email.length === 0){
        enqueueSnackbar("Email can't be empty!", { variant : "warning"});
        return false;
    }
    else if(data.password.length === 0){
        enqueueSnackbar("Password can't be empty!", { variant : "warning"});
        return false;
    }
    else{
        return true;
    }
  }

  const employeeLogin = (data) => {
    if(validateInput(data)){
        enqueueSnackbar("You have been logged in as an Employee", { variant : "success"})
        setData({
            name : "",
            email : "",
            password : ""
        })
        navigate("/EmployeePortal")
    }
  }


  return (
    <>
      <Container>
          <Card
            sx={{
              margin: "200px auto",
              width: "700px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Stack direction={"column"} className="form">
              <CardContent>
                <h2>Welcome Employee</h2>
                <TextField
                  name="name"
                  onChange={(e) => setData({...data, name : e.target.value})}
                  required
                  fullWidth
                  margin="dense"
                  id="outlined-basic1"
                  label="Name"
                  variant="outlined"
                />
                <TextField
                  type={"email"}
                  onChange={(e) => setData({...data, email : e.target.value})}
                  required
                  fullWidth
                  margin="dense"
                  id="outlined-basic2"
                  label="Email"
                  variant="outlined"
                />
                <TextField
                  type={"password"}
                  onChange={(e) => setData({...data, password : e.target.value})}
                  required
                  fullWidth
                  margin="dense"
                  id="outlined-basic3"
                  label="Password"
                  variant="outlined"
                />
              </CardContent>
              <CardActions>
                <Button
                  type="submit"
                  variant="contained"
                  onClick={() => employeeLogin(data)}
                >
                  Log In
                </Button>
                <Button variant="outlined">
                  Login As Admin
                </Button>
              </CardActions>
            </Stack>
          </Card>
      </Container>
    </>
  );
};

export default Employee;
