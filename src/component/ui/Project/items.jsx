import { Button, CardActions, CardContent, Typography } from "@mui/material";
import React from "react";

const Items = (props) => {
  return (
    <>
      <CardContent>
        <Typography variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {props.team} Team Member
        </Typography>
        <Typography variant="body2">{props.description}</Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          My Open Issues
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Done Issues
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </>
  );
};

export default Items;
