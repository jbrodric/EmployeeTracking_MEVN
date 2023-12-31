import { Outlet, useNavigation, NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import InfoIcon from "@mui/icons-material/Info";
import GroupIcon from "@mui/icons-material/Group";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(0),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const DrawerFooter = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 0),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "center",
  position: "fixed",
  bottom: 0,
  width: drawerWidth,
  borderTop: "1px solid rgba(0, 0, 0, 0.12)",
}));

export default function Root() {
  const navigation = useNavigation();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box
        id="app-container"
        sx={{
          display: "flex",
          flexFlow: "column",
          height: "100%",
        }}
      >
        <Box id="content" sx={{ backgroundColor: "#E7EBF0", flex: "1 1 auto" }}>
          <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="end"
                  onClick={handleDrawerOpen}
                  sx={{ mr: 2, ...(open && { display: "none" }) }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                  Employee Tracking System
                </Typography>
              </Toolbar>
            </AppBar>
            <Drawer
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                  width: drawerWidth,
                  boxSizing: "border-box",
                },
              }}
              variant="persistent"
              anchor="left"
              open={open}
              id="sidebar"
            >
              <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === "ltr" ? (
                    <ChevronLeftIcon />
                  ) : (
                    <ChevronRightIcon />
                  )}
                </IconButton>
              </DrawerHeader>
              <Divider />
              <List>
                <ListItem key={"Home"} disablePadding>
                  <ListItemButton component={NavLink} to={`/`}>
                    <ListItemIcon>
                      <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Home"} />
                  </ListItemButton>
                </ListItem>
                <ListItem key={"Jobs"} disablePadding>
                  <ListItemButton component={NavLink} to={`/Jobs`}>
                    <ListItemIcon>
                      <WorkIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Jobs"} />
                  </ListItemButton>
                </ListItem>
                <ListItem key={"Applications"} disablePadding>
                  <ListItemButton component={NavLink} to={`/JobApplications`}>
                    <ListItemIcon>
                      <DriveFileRenameOutlineIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Applications"} />
                  </ListItemButton>
                </ListItem>
                <ListItem key={"Candidates"} disablePadding>
                  <ListItemButton component={NavLink} to={`/Candidates`}>
                    <ListItemIcon>
                      <GroupIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Candidates"} />
                  </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem key={"About"} disablePadding>
                  <ListItemButton component={NavLink} to={`/About`}>
                    <ListItemIcon>
                      <InfoIcon />
                    </ListItemIcon>
                    <ListItemText primary={"About"} />
                  </ListItemButton>
                </ListItem>
              </List>
              <DrawerFooter>
                <Typography
                  align="center"
                  variant="subtitle1"
                  noWrap
                  component="div"
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  Employee Tracking System
                </Typography>
              </DrawerFooter>
            </Drawer>
            <Main
              id="main"
              open={open}
              className={navigation.state === "loading" ? "loading" : ""}
            >
              <DrawerHeader />
              <Outlet />
            </Main>
          </Box>
        </Box>
        <Box id="footer" className="center-content" sx={{ flex: "0 0 100px" }}>
          <Typography variant="body1" component="div">
            <i>Employee Tracking System ©2023</i>
          </Typography>
        </Box>
      </Box>
    </>
  );
}
