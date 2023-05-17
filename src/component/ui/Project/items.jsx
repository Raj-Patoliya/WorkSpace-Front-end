import React from "react";
import { Card } from "primereact/card";
const Items = (props) => {
  return (
    <>
      <div
        className="row "
        style={{
          minWidth: "15rem",
          backgroundImage: `linear-gradient(#6366f1,white)`,
          minHeight: "13rem",
          maxHeight: "15rem",
        }}
      >
        <div
          className="col ml-5 mt-3"
          style={{
            backgroundColor: "white",
            borderRadius: "8px 0",
            opacity: "0.8",
          }}
        >
          <div className="row -ml-2 mt-2">
            <p className="text-lg font-bold">{props.title}</p>
          </div>
          <div className="row -mt-3 -ml-2 w-10rem">
            <p className="text-sm">{props.description}</p>
          </div>
          <div className="row -ml-2">
            <p className="text-sm">{props.team} Team Member</p>
          </div>
          <div className="row -ml-2">
            <p className="text-sm">{props.issue} Total Issues</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Items;
