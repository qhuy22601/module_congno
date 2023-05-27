import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Space, Table } from "antd";

export default function Statistic(){

    const columns=[{
      title: "Image",
      dataIndex: "logo",
      key: "logo",
      size: "small",
      render: (image) => (
        <img
          alt={image}
          src={image}
          style={{
            width: 50,
            height: 50,
            border: "1px solid #d9d9d9",
            borderRadius: "10%",
          }}
        />
      ),
    },
    {
      title: "MST",
      dataIndex: "mst",
      key: "mst",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "contactEmail",
      key: "contactEmail",
    },
    {
      title: "Number",
      dataIndex: "contactNumber",
      key: "contactNumber",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "District",
      dataIndex: "district",
      key: "district",
    },

   
  ];

    const [data, setData] = useState([])

    async function getAll(){
       const res = await axios.get("/api/debt/getAll")
       setData(res.data)
    }

  useEffect(() => {
    getAll();
  }, []);

    return (
      <Table dataSource={data}>
        <Table.Column title="MST" dataIndex={["user", "mst"]} key="mst" />
        <Table.Column title="Tên" dataIndex={["user", "name"]} key="name" />
        {/* <Table.Column title="ID" dataIndex="id" key="id" /> */}
        <Table.Column title="Ngày" dataIndex="date" key="date" />
        <Table.Column title="Công nợ" dataIndex="debt" key="debt" />
        <Table.Column title="Thanh toán" dataIndex="pay" key="pay" />
        <Table.Column title="Số dư" dataIndex="balance" key="balance" />
      </Table>
    );
}