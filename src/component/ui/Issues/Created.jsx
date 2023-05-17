import { List } from "@mui/material";
import React from "react";
import IssueItem from "./IssueItem";

const CreatedByYou = ({ data }) => {
  console.log(data);

  return (
    <>
      {data.map((data) => (
        <IssueItem data={data} />
      ))}
    </>
  );
};

export default CreatedByYou;
