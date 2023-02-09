import React from "react";
import Container from "@mui/material/Container";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BadgeIcon from '@mui/icons-material/Badge';


export default function Home() {
  return (
    <>
      <h1>Welcome to CMS!</h1>
      <Container>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <Card variant="outlined">
              <CardActionArea>
                <CardContent>
                  <h2><AdminPanelSettingsIcon /> Admin</h2>
                </CardContent>
                <CardActions>
                <Button variant="contained" component={Link} to="/admin" color="primary">Admin Login</Button>
                </CardActions>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item md={6}>
            <Card variant="outlined">
              <CardActionArea>
                <CardContent>
                  <h2><BadgeIcon/> Employee</h2>
                </CardContent>
                <CardActions>
                <Button variant="contained" component={Link} to="/employee" color="primary">Employee Login</Button>
                </CardActions>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
