import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link, useParams } from "react-router-dom";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function BasicBreadcrumbs() {
  const { keys } = useParams();
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          underline="hover"
          color="inherit"
          to="/projects"
          style={{ textDecoration: "none", color: "black" }}
        >
          Projects
        </Link>
        <Typography color="text.primary">{keys}</Typography>
      </Breadcrumbs>
    </div>
  );
}
