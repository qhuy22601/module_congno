import React from "react";
import {  Route, Routes, HashRouter } from 'react-router-dom';
import DisplayExcel from "./component/DisplayExcel";
import ImportExcel from "./component/ImportExcel";

function AppContainer(){
    return (
      <HashRouter>
        <Routes>
            <Route path="/" element={<DisplayExcel />} />
            <Route path="/import" element={<ImportExcel />} />
        </Routes>
      </HashRouter>
    );
    }
export default AppContainer;