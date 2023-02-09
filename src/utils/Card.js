import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';

const CardContainer = ({title}) => {
    return(
    <React.Fragment>
    <Card variant="outlined">
    <CardActionArea>
      <CardContent>
          <h2>{title}</h2>
      </CardContent>
      <CardActions>
      </CardActions>
      </CardActionArea>
      </Card>
    </React.Fragment>
    )
    };

    export default CardContainer;

