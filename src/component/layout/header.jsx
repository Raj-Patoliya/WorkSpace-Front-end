import { AppBar, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <AppBar sx={{ background: "#6610f2" }}>
        <Toolbar>
          {/* <AppsSharpIcon /> */}
          <Typography>WorkSpace</Typography>
          <Tabs textColor="inherit">
            <Link to="/" style={{ fontWeight: "bolder", color: "white" }}>
              <Tab label="Projects" />
            </Link>
            <Link
              to="/profile"
              style={{ fontWeight: "bolder", color: "white" }}
            >
              <Tab label="Profile" />
            </Link>
            <Link
              to="/create-issue"
              style={{ fontWeight: "bolder", color: "white" }}
            >
              <Tab label="Create Issues" />
            </Link>
            <Link
              to="/create-project"
              style={{ fontWeight: "bolder", color: "white" }}
            >
              <Tab label="Create Projects" />
            </Link>
          </Tabs>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
