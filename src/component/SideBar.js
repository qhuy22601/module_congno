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
import {
  FaHome,
  FaUser,
  FaCog,
  FaList,
  FaFileContract,
  FaChartPie,
  FaFileImport,
  FaFileCsv,
  FaMailBulk,
  FaSkype,
} from "react-icons/fa";
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
    <ThemeProvider
      theme={theme}
      style={{ backgroundColor: "#293462", color: "#293462" }}
    >
      <Drawer
        variant="permanent"
        style={{ background: "#293462", color: "#293462" }}
      >
        <List
          style={{ background: "#455388", color: "#455388", height: "100%" }}
        >
          <ListItem button>
            <ListItemIcon>
              <FaHome style={{ color: "white" }} />
            </ListItemIcon>
            <a href="/#/" style={{ textDecoration: "none", color: "white" }}>
              <ListItemText primary="Trang chủ" />
            </a>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <FaUser style={{ color: "white" }} />
            </ListItemIcon>
            <a
              href="/#/customer"
              style={{ textDecoration: "none", color: "white" }}
            >
              <ListItemText primary="Khách hàng" />
            </a>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <FaFileCsv style={{ color: "white" }} />
            </ListItemIcon>
            <a
              href="/#/import"
              style={{ textDecoration: "none", color: "white" }}
            >
              <ListItemText primary="Nhập" />
            </a>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <FaChartPie style={{ color: "white" }} />
            </ListItemIcon>
            <a
              href="/#/statistic"
              style={{ textDecoration: "none", color: "white" }}
            >
              <ListItemText primary="Thống kê" />
            </a>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <FaMailBulk style={{ color: "white" }} />
            </ListItemIcon>
            <a
              href="/#/mail"
              style={{ textDecoration: "none", color: "white" }}
            >
              <ListItemText primary="Email" />
            </a>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <FaSkype style={{ color: "white" }} />
            </ListItemIcon>
            <a
              href="https://oa.zalo.me/home/resources/guides/-quan-ly-admin-tai-khoan-zalo-cloud-account-zca_8584225574368857503?fbclid=IwAR2u1-y0IFhCAsIVg-cPAbn6ldk9rsfwVouqo5c-zwDx25OwPWd_s1vWahQ"
              style={{ textDecoration: "none", color: "white" }}
            >
              <ListItemText primary="Zalo" />
            </a>
          </ListItem>
        </List>
      </Drawer>
    </ThemeProvider>
  );
};

export default Sidebar;
