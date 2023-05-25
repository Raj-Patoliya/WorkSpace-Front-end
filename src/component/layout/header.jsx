import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link, useNavigate } from "react-router-dom";

const pages = ["Projects", "Create Issues", "Create Projects"];
const settings = ["Profile", "Dashboard", "Logout"];

function Header() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

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
