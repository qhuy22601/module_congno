import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form, Input, Modal, Space, Table } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleTwoTone,
  CheckCircleTwoTone,
  SearchOutlined 
} from "@ant-design/icons";

import {Link} from "react-router-dom";

import style from "../style/DisplayCustomer.module.css"
import SearchInput from "./searchInput/Index";

export default function DisplayCustomers() {
  const columns = [
    // {
    // title: 'Id',
    //   dataIndex: 'id',
    //   key: 'id',
    //   render: (text) => <a>{text}</a>,
    // },
    {
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

  const [user, setUser] = useState([]);

  async function getAllEm() {
    const result = await axios({
      method: "get",
      url: "/api/user/get",
    });
   
      setUser(result.data);
    
  }

  useEffect(() => {
    getAllEm();
  }, []);


  return (
    <div className={style.container}>
      <div className={style.header}>
        {/* <Space className={style.search_container}>
          <Input placeholder="Search..." suffix={<SearchOutlined />} />
        </Space> */}
        <SearchInput />
        <Link to ="/add-customer">
          <Button className={style.addBtn}>Add Customer</Button>
        </Link>
      </div>
      <Table
        columns={columns}
        dataSource={user}
        rowKey={(record) => record.id}
        bordered
      />
    </div>
  );
}
