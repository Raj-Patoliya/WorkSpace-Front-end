import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import React from "react";

const IssueItem = () => {
  return (
    <>
      <ListItem>
        <ListItemAvatar>
          <Avatar>{/* <ImageIcon /> */}</Avatar>
        </ListItemAvatar>
        <ListItemText primary="Photos" secondary="Jan 9, 2014" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>{/* <WorkIcon /> */}</Avatar>
        </ListItemAvatar>
        <ListItemText primary="Work" secondary="Jan 7, 2014" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>{/* <BeachAccessIcon /> */}</Avatar>
        </ListItemAvatar>
        <ListItemText primary="Vacation" secondary="July 20, 2014" />
      </ListItem>
    </>
  );
};

export default IssueItem;
