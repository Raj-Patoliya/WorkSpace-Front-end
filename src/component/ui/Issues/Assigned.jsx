import { List } from "@mui/material";
import React from "react";
import IssueItem from "./IssueItem";

const AssignedToYou = () => {
  return (
    <>
      <List sx={{ width: "100vw", bgcolor: "background.paper" }}>
        <IssueItem />
      </List>
    </>
  );
};

export default AssignedToYou;
