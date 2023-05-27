import React from "react";
import IssueItem from "./IssueItem";

const CreatedByYou = ({ data }) => {
  return (
    <>
      {data.length === 0 && <h1>No Issue Assigned To you</h1>}
      {data.map((data) => (
        <IssueItem data={data} key={data.id} />
      ))}
    </>
  );
};

export default CreatedByYou;
