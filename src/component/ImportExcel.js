import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Table, Button, Input } from 'antd';
import Sidebar from './SideBar';
const ImportExcel = () => {
    const [columns, setColumns] = useState([]);
    const [dataSource, setDataSource] = useState([]);
    const [rowIndex, setRowIndex] = useState(0);
  
    const handleAddRow = () => {
      const newRow = {};
      columns.forEach((column) => {
        newRow[column.dataIndex] = '';
      });
      setDataSource((prevDataSource) => [
        ...prevDataSource,
        { ...newRow, key: rowIndex },
      ]);
      setRowIndex((prevRowIndex) => prevRowIndex + 1);
    };
  
    const handleAddColumn = () => {
      const columnName = prompt('Enter column name:');
      if (columnName) {
        const newColumn = {
          title: columnName,
          dataIndex: columnName,
          key: columnName,
          render: (text, record) => (
            <Input
              value={record[columnName] || ''}
              onChange={(e) => handleInputChange(e, columnName, record)}
            />
          ),
        };
        setColumns((prevColumns) => [...prevColumns, newColumn]);
        setDataSource((prevDataSource) => {
          const updatedDataSource = prevDataSource.map((row) => {
            row[columnName] = '';
            return row;
          });
          return updatedDataSource;
        });
      }
    };
  
    const handleInputChange = (e, columnName, record) => {
      const { key } = record;
      setDataSource((prevDataSource) => {
        const updatedDataSource = prevDataSource.map((row) => {
          if (row.key === key) {
            row[columnName] = e.target.value;
          }
          return row;
        });
        return updatedDataSource;
      });
    };
  
    const handleSaveExcel = () => {
        const dataWithoutKey = dataSource.map(({ key, ...rest }) => rest);
        const worksheet = XLSX.utils.json_to_sheet(dataWithoutKey);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        XLSX.writeFile(workbook, 'excel.xlsx');
      };
  
    return (
      <div>
        <div style={{ display: "flex" }}>
          <Sidebar
            style={{ flex: "0 0 auto", position: "sticky", width: "178px" }}
          />
          <div style={{ width: "88%", marginLeft: "auto", marginRight: 0 }}>
            <Button style={{ backgroundColor: "green", color: "white" }}  onClick={handleAddRow}>Thêm hàng</Button>
            <Button style={{ backgroundColor: "green", color: "white" }}  onClick={handleAddColumn}>Thêm cột</Button>
            <Button style={{ backgroundColor: "green", color: "white" }}  onClick={handleSaveExcel}>Lưu excel</Button>

            {columns.length > 0 && (
              <Table
                dataSource={dataSource}
                columns={columns}
                pagination={false}
                rowKey="key"
              />
            )}
          </div>
        </div>
      </div>
    );
};
  
  

export default ImportExcel;