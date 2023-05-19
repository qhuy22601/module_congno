import React from "react";
import {  Route, Routes, HashRouter } from 'react-router-dom';
import DisplayExcel from "./component/DisplayExcel";
import ImportExcel from "./component/ImportExcel";
import DisplayCustomers from "./component/DisplayCustomers";
import Customer from "./component/Customers";

function AppContainer(){
    return (
      <HashRouter>
        <Routes>
          <Route path="/" element={<DisplayExcel />} />
          <Route path="/import" element={<ImportExcel />} />
          <Route path="/customer" element={<DisplayCustomers />} />
          <Route path="/add-customer" element={<Customer />} />
        </Routes>
      </HashRouter>
    );
    }
export default AppContainer;