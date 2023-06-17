import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { Table, Upload, Button, Input} from 'antd';
import styles from "../style/DisplayExcel.module.css";
import Icon, { UploadOutlined } from '@ant-design/icons';
import { read, utils } from 'xlsx';
import axios from "axios";
import Sidebar from './SideBar';
const DisplayExcel = () => {
const [excelData, setExcelData] = useState(null);
const [selectedFile, setSelectedFile] = useState(null);

const handleFileChange = (event) => {
  setSelectedFile(event.target.files[0]);
};


const handleFileUpload = (file) => {
  const reader = new FileReader();

  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = read(data, { type: 'array' });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = utils.sheet_to_json(worksheet, { header: 1 });
    setExcelData(jsonData);
  };

  reader.readAsArrayBuffer(file);
};

let columns = [];
let dataSource = [];

if (excelData && excelData.length > 1) {
  const headerRow = excelData[0];
  const dataRows = excelData.slice(1);

  // Find the maximum number of columns in any row
  const maxColumns = Math.max(...dataRows.map((row) => row.length));

  // Create columns array
  columns = Array.from({ length: maxColumns }, (_, columnIndex) => ({
    title: headerRow[columnIndex] || '',
    dataIndex: `${columnIndex}`,
    key: `${columnIndex}`,
  }));

  // Create dataSource array
  dataSource = dataRows.map((row) => {
    const rowData = {};

    // Fill rowData object with cell values
    for (let i = 0; i < maxColumns; i++) {
      const cellValue = row[i] || '';

      // Handle merged cells by checking for missing cells
      if (typeof cellValue === 'object' && cellValue.t === 'z') {
        const colSpan = cellValue.w.split(':').length;

        for (let j = 0; j < colSpan; j++) {
          rowData[`${i + j}`] = cellValue.w;
        }

        i += colSpan - 1;
      } else {
        rowData[`${i}`] = cellValue;
      }
    }

    return rowData;
  });
}
const handleImport = () => {
  if (selectedFile) {
    const formData = new FormData();
    formData.append("file", selectedFile);

    axios
      .post("/api/user/import", formData)
      .then((response) => {
        console.log("File imported successfully");
      })
      .catch((error) => {
        console.error("Error importing file:", error);
      });
  }
};

return (
  <div>
    <div style={{ display: "flex" }}>
      <Sidebar
        style={{ flex: "0 0 auto", position: "sticky", width: "178px" }}
      />
      <div style={{ width: "88%", marginLeft: "auto", marginRight: 0 }}>
        <div style={{ display: "flex" }}>
          <div style={{ width: "75%" }}>
            <Upload beforeUpload={handleFileUpload} showUploadList={false}>
              <Button style={{ backgroundColor: "green", color: "white" }} >Chọn file excel</Button>
            </Upload>
          </div>
          <div style={{ float: "right" }}>
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileChange}
            />
            <Button style={{ backgroundColor: "green", color: "white" }}  onClick={handleImport}>Import</Button>
          </div>
        </div>
        {excelData && excelData.length > 1 && (
          <Table dataSource={dataSource} columns={columns} />
        )}
      </div>
    </div>
  </div>
);
};
export default DisplayExcel;
