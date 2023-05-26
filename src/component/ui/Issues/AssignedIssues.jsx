import React from "react";
import IssueItem from "./IssueItem";

const AssignedToYou = ({ data }) => {
  return (
    <>
      {data.length === 0 && <h1>No Issue Assigned To you</h1>}
      {data.map((data) => (
        <IssueItem data={data} />
      ))}
    </>
  );
};

export default AssignedToYou;
