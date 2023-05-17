import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import React from "react";

const IssueItem = ({ data }) => {
  return (
    <>
      <div className="w-full mb-3 d-flex p-1 border-round transition-colors transition-duration-500 bg-white-300 hover:bg-gray-100 text-white hover:text-gray-900">
        <div className="w-fit">
          <img
            src={data.issue_type.icon}
            alt={data.issue_type.icon}
            width={"25px"}
          />
        </div>
        <div className="ml-2">
          <p className="text-sm font-bold h-1rem text-700">
            {data.issue_summary}
            <br />
            <span className="text-xs text-500 font-light mt-0">
              {data.project.key} - {data.id}
            </span>
          </p>
        </div>
        <span
          className="text-500"
          style={{
            position: "absolute",
            marginLeft: "90%",
            fontSize: "12px",
            marginTop: "5px",
          }}
        >
          {data.status.name}
        </span>
      </div>
    </>
  );
};

export default IssueItem;
