import { List } from "@mui/material";
import React from "react";
import IssueItem from "./IssueItem";

const AssignedToYou = ({ data }) => {
  return (
    <>
      <List sx={{ width: "100vw", bgcolor: "background.paper" }}>
        {data.map((data) => (
          <IssueItem />
        ))}
      </List>
    </>
  );
};

export default AssignedToYou;
