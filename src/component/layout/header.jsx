import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  return (
    <AppBar position="sticky" sx={{ background: "#6366f1", height: "60px" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <div sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <span className="text-2xl">WorkSpace</span>
          </div>

          <div
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            onClick={() => {
              navigate("/login");
            }}
          >
            <Link className="text-xl mx-4 text-white text-decoration-none">
              Login
            </Link>
          </div>

          <div
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            onClick={() => {
              navigate("/register");
            }}
          >
            <Link className="text-xl mx-4 text-white text-decoration-none">
              Register
            </Link>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
