import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExploreIcon from "@mui/icons-material/Explore";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import {  FaHome,
  FaUser,
  FaCog,
 FaList, FaFileContract, FaChartPie, FaFileImport, FaFileCsv} from "react-icons/fa";
import "../style/Navbar.module.css";

const drawerWidth = 240;

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Set your desired primary color here
    },
  },
});

const Sidebar = () => {
  return (
    <ThemeProvider theme={theme} >
      <Drawer variant="permanent" >
        <List>
          <ListItem button>
            <ListItemIcon>
              <FaHome />
            </ListItemIcon>
            <a href="/" style={{ textDecoration: "none", color: "black" }}>
              <ListItemText primary="Trang chủ" />
            </a>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <FaUser />
            </ListItemIcon>
            <a
              href="/#/customer"
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItemText primary="Khách hàng" />
            </a>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <FaFileCsv />
            </ListItemIcon>
            <a
              href="/#/import"
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItemText primary="Nhập" />
            </a>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <FaChartPie />
            </ListItemIcon>
            <a
              href="/#/statistic"
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItemText primary="Thống kê" />
            </a>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <FaList />
            </ListItemIcon>
            <ListItemText primary="Công việc" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <FaFileContract />
            </ListItemIcon>
            <ListItemText primary="Hợp đồng" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Cài đặt" />
          </ListItem>
        </List>
      </Drawer>
    </ThemeProvider>
  );
};

export default Sidebar;