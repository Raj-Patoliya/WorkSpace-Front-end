import React, { useEffect } from "react";

import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SplitscreenRoundedIcon from "@mui/icons-material/SplitscreenRounded";
import AccountTreeRoundedIcon from "@mui/icons-material/AccountTreeRounded";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddTaskRoundedIcon from "@mui/icons-material/AddTaskRounded";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, logout } from "../../redux/slice/authSlice";
import { Avatar, Menu, MenuItem, Tooltip } from "@mui/material";
import { useState } from "react";
import { DialogDemo } from "../ui/Project/CreateProjectModal";
import CreateIssueModal from "../ui/Issues/CreateIssueModal";
import BasicBreadcrumbs from "../ui/components/BreadCrumb";

const drawerWidth = 240;
const settings = ["Profile", "Dashboard", "Logout"];
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
const Layout = (props) => {
  const [displayBasic, setDisplayBasic] = useState(false);
  const [displayCreateIssueModal, setDisplayCreateIssueModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const { access } = useSelector((state) => state.auth.token);
  useEffect(() => {
    dispatch(getCurrentUser({ access }));
  }, [dispatch, access]);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

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
    <React.Fragment>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          style={{ backgroundColor: "#6366f1" }}
          position="fixed"
          open={open}
        >
          <Toolbar
            sx={{
              display: "flex",
              ...(!open && { justifyContent: "space-between" }),
              ...(open && { justifyContent: "end" }),
            }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
              <div className="mx-4">WorkSpace</div>
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                marginRight: 5,
                ...(open && { flex: "end" }),
              }}
            >
              <Box>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src={currentUser.profile} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem
                    key={settings[0]}
                    onClick={() => {
                      setAnchorElNav(null);
                      navigate("/profile");
                    }}
                  >
                    <Typography textAlign="center">{settings[0]}</Typography>
                  </MenuItem>
                  <MenuItem
                    key={settings[1]}
                    onClick={() => {
                      setAnchorElNav(null);
                      navigate("/");
                    }}
                  >
                    <Typography textAlign="center">{settings[1]}</Typography>
                  </MenuItem>
                  <MenuItem
                    key={settings[2]}
                    onClick={() => {
                      setAnchorElNav(null);
                      dispatch(logout());
                      navigate("/login", { replace: true });
                    }}
                  >
                    <Typography textAlign="center">{settings[2]}</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader
            style={{
              display: "flex",
              justifyContent: "start",
              // backgroundColor: "#6366f1",
              height: "15px",
              border: "#6366f1",
            }}
          >
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <h2>WorkSpace</h2>
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          {/* <img
                  src={
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Workspace_Group_logo.svg/1200px-Workspace_Group_logo.svg.png"
                  }
                  alt="Berry"
                  width={100}
                  sx={{ marginRight: "100px" }}
                /> */}
          <List>
            <ListItem disablePadding sx={{ display: "block" }}>
              <Tooltip title="dashboard">
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={"Dashboard"}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </Tooltip>
            </ListItem>

            <ListItem disablePadding sx={{ display: "block" }}>
              <Tooltip title="Create Project">
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  onClick={() => {
                    setDisplayBasic((prevState) => !prevState);
                    setDisplayCreateIssueModal(false);
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <AccountTreeRoundedIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={"Create Project"}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </Tooltip>
            </ListItem>

            <ListItem disablePadding sx={{ display: "block" }}>
              <Tooltip title="Create Issues">
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  onClick={() => {
                    setDisplayCreateIssueModal(true);
                    setDisplayBasic(false);
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <SplitscreenRoundedIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={"Create Issues"}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </Tooltip>
            </ListItem>

            <ListItem disablePadding sx={{ display: "block" }}>
              <Tooltip title="Your Work">
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  onClick={() => {
                    navigate("/projects");
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <AddTaskRoundedIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={"Your work"}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </Tooltip>
            </ListItem>

            <ListItem disablePadding sx={{ display: "block" }}>
              <Tooltip title="Profile">
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  onClick={() => {
                    navigate("/profile");
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={"Profile"}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </Tooltip>
            </ListItem>

            <ListItem disablePadding sx={{ display: "block" }}>
              <Tooltip title="Sign out">
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  onClick={() => {
                    dispatch(logout());
                    navigate("/login", { replace: true });
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={"Logout"}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </Tooltip>
            </ListItem>
          </List>
          <Divider />
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          {/* <BasicBreadcrumbs /> */}

          {props.children}
        </Box>
      </Box>
      {displayBasic && (
        <DialogDemo
          displayBasic={displayBasic}
          setDisplayBasic={setDisplayBasic}
        />
      )}
      {displayCreateIssueModal && (
        <CreateIssueModal
          displayCreateIssueModal={displayCreateIssueModal}
          setDisplayCreateIssueModal={setDisplayCreateIssueModal}
        />
      )}
    </React.Fragment>
  );
};

export default Layout;
