import React, { useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Container,
  CardMedia,
} from "@mui/material";
import { Stack } from "@mui/system";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";


const Admin = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const[isLoggedIn, setLoggedIn] = useState(false);

  const validateInputs = (data) => {
    if (data.username.length === 0) {
      enqueueSnackbar("Name can't be empty!", { variant: "warning" });
      return false;
    } 
    else if(data.password.length === 0){
        enqueueSnackbar("Password can't be empty!", {variant : "warning"})
        return false;
    }
    else if(data.password.length < 8){
        enqueueSnackbar("Password length should not be less than 8 characters",{variant : "warning"})
        return false;
    }
    else {
      return true;
    }
  };

  const AdminCreds = () => {
    const adminCreds = {
        adminUser : data.username,
        adminpwd : data.password
    }
    localStorage.setItem("LOGGED IN",JSON.stringify({
        Role : "ADMIN",
        payload : adminCreds
    }))
  }

  const employeeLogin = (data) => {
    if (validateInputs(data)) {
      enqueueSnackbar("You have been logged in as an Admin", {
        variant: "success",
      });
      setData({
        username: "",
        password: "",
      });
      setLoggedIn(true);
      AdminCreds();
    }
  };

  return (
    <>
    {!isLoggedIn ?
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
          <Stack direction={"column"}>
            <CardContent>
              <h2>Welcome Admin</h2>
              <TextField
                required
                fullWidth
                margin="dense"
                onChange={(e) => setData({...data, username : e.target.value})}
                id="outlined-basic1"
                label="Name"
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
              <Button variant="outlined" onClick={() => employeeLogin(data)}>
                Log In
              </Button>
              <Button variant="outlined" component={Link} to="/employee">
                Login As Employee
              </Button>
            </CardActions>
          </Stack>
        </Card>
      </Container> 
      :
      <Stack direction="row" spacing={10} sx={{
        margin: "300px auto",
        width: "700px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Card sx={{ width: 400 }}>
        <CardMedia component={"img"} height="200" image="/images/EmployeePortal.jpg" alt="EmployeePortal"/>
        <CardActions>
          <Button color="secondary" component={Link} to="employeePortal">Employee Portal</Button>
        </CardActions>
      </Card>
      <Card sx={{ width: 400 }}>
        <CardMedia component={"img"} height="200" image="/images/ItemPortal.jpg" alt="ItemPortal" />
        <CardActions>
          <Button color="secondary" component={Link} to="ItemPortal">Item Portal</Button>
        </CardActions>
      </Card>
      </Stack> }

    </>
  );
};

export default Admin;
