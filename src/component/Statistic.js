import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Space, Table } from "antd";
import { CheckCircleTwoTone } from "@ant-design/icons";

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
      <Table dataSource={data} columns={columns}>
      </Table>
    );
}