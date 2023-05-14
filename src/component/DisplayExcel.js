import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { Table, Upload, Button } from 'antd';
import styles from "../style/DisplayExcel.module.css";
import Icon, { UploadOutlined } from '@ant-design/icons';
import { read, utils } from 'xlsx';


const DisplayExcel = () => {
//   const [excelData, setExcelData] = useState([]);
//   const [fileList, setFileList] = useState([]);

//   const handleFileUpload = async (file) => {
//     const reader = new FileReader();

//     reader.onload = (e) => {
//       const contents = e.target.result;
//       displayExcelData(contents);
//     };

//     reader.readAsBinaryString(file);
//   };

//   const displayExcelData = (fileContents) => {
//     const workbook = XLSX.read(fileContents, { type: 'binary' });
//     const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
//     const data = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

//     setExcelData(data);
//   };

//   const handleUpload = ({ file, fileList }) => {
//     setFileList([file]);
//     handleFileUpload(file);
//   };

//   const columns = excelData.length > 0 ? excelData[0].map((cell, index) => ({ title: cell, dataIndex: index.toString(), key: index })) : [];

//   const dataSource = excelData.length > 1 ? excelData.slice(1).map((row, rowIndex) => {
//     const rowData = {};
//     row.forEach((cell, cellIndex) => {
//       rowData[cellIndex.toString()] = cell;
//     });
//     return { key: rowIndex, ...rowData };
//   }) : [];

//   return (
//     <div className={styles.container}>
//       <Upload
//         className={styles.upload}
//         fileList={fileList}
//         beforeUpload={() => false}
//         onChange={handleUpload}
//       >
//         <Button className={styles.uploadButton}>Upload Excel File <UploadOutlined style={{ fontSize: '20px' }}/></Button>
//       </Upload>

//       {excelData.length > 0 && (
//         <Table className={styles.table} dataSource={dataSource} columns={columns} />
//       )}
//     </div>
//   );
// };

const [excelData, setExcelData] = useState(null);

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

return (
  <div>
    <Upload beforeUpload={handleFileUpload} showUploadList={false}>
      <Button>Select Excel File</Button>
    </Upload>

    {excelData && excelData.length > 1 && (
      <Table dataSource={dataSource} columns={columns} />
    )}
  </div>
);
};
export default DisplayExcel;
