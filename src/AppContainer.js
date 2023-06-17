import React from "react";
import {  Route, Routes, HashRouter } from 'react-router-dom';
import DisplayExcel from "./component/DisplayExcel";
import ImportExcel from "./component/ImportExcel";
import DisplayCustomers from "./component/DisplayCustomers";
import Customer from "./component/Customers";
import Statistic from "./component/Statistic";
import User from "./component/User";
import EmailForm from "./component/EmailForm";
import Test from "./component/Test";
function AppContainer(){
    return (
      <HashRouter>
        <Routes>
          <Route path="/" element={<DisplayExcel />} />
          <Route path="/import" element={<ImportExcel />} />
          <Route path="/customer" element={<DisplayCustomers />} />
          <Route path="/add-customer" element={<Customer />} />
          <Route path="/statistic" element={<Statistic />} />
          <Route path="/user/:id" element={<User />} />
          <Route path="/mail" element={<EmailForm />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </HashRouter>
    );
    }
export default AppContainer;