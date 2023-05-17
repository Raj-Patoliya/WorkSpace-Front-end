import { List } from "@mui/material";
import React from "react";
import IssueItem from "./IssueItem";

const AssignedToYou = ({ data }) => {
  console.log(data);
  return (
    <>
      {data.map((data) => (
        <IssueItem data={data} />
      ))}
    </>
  );
};

export default AssignedToYou;
