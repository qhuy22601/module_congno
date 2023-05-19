import React from "react";
import {  FaHome,
  FaUser,
  FaCog,
 FaList, FaFileContract, FaChartPie, FaFileImport, FaFileCsv} from "react-icons/fa";
import styles from "../style/Navbar.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";




function Header({ onLoginRedirect }) {


 

  return (
    <div className={styles.navbar}>
      <div className={styles.navbar_container}>
        <div className={styles.navbar_options}>
          <div className={styles.options_container}>
            <ul className={styles.sidebar_nav}>
              <li className={styles.sidebar_nav_item}>
                <a href="/" className={styles.sidebar_nav_link}>
                  <FaHome className={styles.sidebar_icon} />
                  <span className={styles.sidebar_text}>Home</span>
                </a>
              </li>
              <li className={styles.sidebar_nav_item}>
                <a href="/#/customer" className={styles.sidebar_nav_link}>
                  <FaUser className={styles.sidebar_icon} />
                  <span className={styles.sidebar_text}>Customers</span>
                </a>
              </li>
              <li className={styles.sidebar_nav_item}>
                <a href ="/#/import"className={styles.sidebar_nav_link}>
                  <FaFileCsv className={styles.sidebar_icon} />
                  <span className={styles.sidebar_text}>Import</span>
                </a>
              </li>
              <li className={styles.sidebar_nav_item}>
                <span className={styles.sidebar_nav_link}>
                  <FaList className={styles.sidebar_icon} />
                  <span className={styles.sidebar_text}>Tasks</span>
                </span>
              </li>
              <li className={styles.sidebar_nav_item}>
                <span className={styles.sidebar_nav_link}>
                  <FaFileContract className={styles.sidebar_icon} />
                  <span className={styles.sidebar_text}>Contracts</span>
                </span>
              </li>
              <li className={styles.sidebar_nav_item}>
                <span className={styles.sidebar_nav_link}>
                  <FaChartPie className={styles.sidebar_icon} />
                  <span className={styles.sidebar_text}>Statistics</span>
                </span>
              </li>

              <li className={styles.sidebar_nav_item}>
                <span className={styles.sidebar_nav_link}>
                  <FaCog className={styles.sidebar_icon} />
                  <span className={styles.sidebar_text}>Settings</span>
                </span>
              </li>
              {/* <li className={styles.sidebar_nav_item} onClick={""}>
                <span className={styles.sidebar_nav_link}>
                  <BiLogOut className={styles.sidebar_icon} />
                  <span className={styles.sidebar_text}>Log Out</span>
                </span>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;