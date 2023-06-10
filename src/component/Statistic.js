import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Button, Form, Input, Modal, Space, Table } from "antd";
import {
  CheckCircleTwoTone,
  FilePdfOutlined,
  DownloadOutlined,
  FileWordOutlined,
  PictureOutlined,
} from "@ant-design/icons";

import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "jspdf-autotable";
import { saveAs } from "file-saver";
import Docxtemplater from "docxtemplater";
import JSZip from "jszip";


export default function Statistic(){

    const columns = [
      //   {
      //   title: "Image",
      //   dataIndex: "logo",
      //   key: "logo",
      //   size: "small",
      //   render: (image) => (
      //     <img
      //       alt={image}
      //       src={image}
      //       style={{
      //         width: 50,
      //         height: 50,
      //         border: "1px solid #d9d9d9",
      //         borderRadius: "10%",
      //       }}
      //     />
      //   ),
      // },
      {
        title: "MST",
        dataIndex: ["user", "mst"],
        key: "mst",
        render: (text) => <a>{text}</a>,
      },
      {
        title: "Tên",
        dataIndex: ["user", "name"],
        key: "name",
        render: (text) => <a>{text}</a>,
      },
      {
        title: "Email",
        dataIndex: ["user", "contactEmail"],
        key: "email",
        render: (text) => <a>{text}</a>,
      },
      {
        title: "Ngày",
        dataIndex: "date",
        key: "date",
      },
      {
        title: "Công nợ",
        dataIndex: "debt",
        key: "debt",
      },
      {
        title: "Thanh toán",
        dataIndex: "pay",
        key: "pay",
      },
      {
        title: "Số dư",
        dataIndex: "balance",
        key: "balance",
      },
      {
        title: "",
        key: "action",
        render: (_, record) => (
          <CheckCircleTwoTone
            style={{ color: "green", cursor: "pointer", fontSize: "20px" }}
            onClick={() => handleCheckClick(record.id)}
          />
        ),
      },
    ];

    const tableRef = useRef();

    const handleDownloadExcel = () => {
      const flattenedData = data.map((item) => ({
        ...item,
        mst: item.user && item.user.mst,
        name: item.user && item.user.name,
        email: item.user && item.user.contactEmail,
      }));

      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(flattenedData);
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, "table_data.xlsx");
    };

     const handleDownloadPDF = async () => {
       const table = tableRef.current;
       const canvas = await html2canvas(table, { useCORS: true });
       const imageData = canvas.toDataURL("image/png");

       const pdf = new jsPDF("p", "pt", "a4");
       const imgProps = pdf.getImageProperties(imageData);
       const pdfWidth = pdf.internal.pageSize.getWidth();
       const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

       pdf.addImage(imageData, "PNG", 0, 0, pdfWidth, pdfHeight);
       pdf.save("table.pdf");
     };


     const handleDownloadPNG = () => {
       html2canvas(tableRef.current).then((canvas) => {
         const image = canvas.toDataURL("image/png");
         const link = document.createElement("a");
         link.href = image;
         link.download = "table.png";
         link.click();
       });
     };

    const handleCheckClick = async (id) => {
      try {
        await axios.post(`/api/debt/save-to-excel/${id}`);
        // Handle success, e.g., display success message or update table data
        await getAll();
      } catch (error) {
        // Handle error, e.g., display error message
      }
    };

    const [data, setData] = useState([])

    async function getAll(){
       const res = await axios.get("/api/debt/getAll")
       setData(res.data)
    }

  useEffect(() => {
    getAll();
  }, []);

    return (
      <div>
        <div>
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            onClick={handleDownloadExcel}
          >
            Excel
          </Button>
          <Button
            type="primary"
            icon={<FilePdfOutlined />}
            onClick={handleDownloadPDF}
          >
            PDF
          </Button>
          <Button
            type="primary"
            icon={<PictureOutlined />}
            onClick={handleDownloadPNG}
          >
            PNG
          </Button>
        </div>
        <Table
          dataSource={data}
          columns={columns}
          tableLayout="fixed"
          ref={tableRef}
        />
      </div>
    );
}