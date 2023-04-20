import { Button, CardActions, CardContent, Typography } from "@mui/material";
import React from "react";

const Items = () => {
  return (
    <>
      <CardContent>
        <Typography variant="h5" component="div">
          Workspace
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          7 Team Member
        </Typography>
        <Typography variant="body2">Workspace Project is Awsome</Typography>
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
