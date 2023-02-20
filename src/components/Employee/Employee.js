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
import axios from 'axios';
import { config } from "../../App";

const Employee = () => {

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState({
    firstName : "",
    lastName: "",
    password : ""
  })

  const validateInput = (data) => {
    if(data.firstName.length === 0){
        enqueueSnackbar("First Name can't be empty!", { variant : "warning"});
        return false;
    }
    else if(data.lastName.length === 0){
      enqueueSnackbar("Last Name can't be empty!", { variant : "warning"});
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

  const employeeLogin = async({firstName, lastName}) => {
    if(validateInput(data)){
        enqueueSnackbar("You have been logged in as an Employee", { variant : "success"})
        setData({
            firstName : "",
            lastName : "",
            password : ""
        })
        navigate("/EmployeePortal")

        try{
          const response = await axios.post(`${config.endpoint}/employees`, { firstName : firstName, lastName: lastName});
          return response;
        }
        catch(e){
          console.log("error", e);
        }
    
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
                  type={"text"}
                  name="firstName"
                  onChange={(e) => setData({...data, firstName : e.target.value})}
                  required
                  fullWidth
                  margin="dense"
                  id="outlined-basic1"
                  label="First Name"
                  variant="outlined"
                />
                  <TextField
                  type={"text"}
                  name="lastName"
                  onChange={(e) => setData({...data, lastName : e.target.value})}
                  required
                  fullWidth
                  margin="dense"
                  id="outlined-basic1"
                  label="Last Name"
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
