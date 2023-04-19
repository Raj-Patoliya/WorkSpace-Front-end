import { AppBar, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import React from "react";

const Header = () => {
  return (
    <>
      <AppBar sx={{ background: "#6610f2" }}>
        <Toolbar>
          {/* <AppsSharpIcon /> */}
          <Typography>WorkSpace</Typography>
          <Tabs textColor="inherit">
            <Tab label="Projects" />
            <Tab label="Issues" />
            <Tab label="Profile" />
          </Tabs>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
