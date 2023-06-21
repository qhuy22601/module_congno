import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form, Input, Modal, Space, Table } from "antd";
import Sidebar from "./SideBar";

import {Link} from "react-router-dom";

import style from "../style/DisplayCustomer.module.css"
import SearchInput from "./searchInput/Index";
import { DeleteOutlined } from "@ant-design/icons";
export default function DisplayCustomers() {
  const columns = [
    // {
    // title: 'Id',
    //   dataIndex: 'id',
    //   key: 'id',
    //   render: (text) => <a>{text}</a>,
    // },
    // {
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
      dataIndex: "mst",
      key: "mst",
      render: (text, record) => <Link to={`/user/${record.id}`}>{text}</Link>,
    },
    {
      title: "Tên Công Ty",
      dataIndex: "name",
      key: "name",
      render: (text, record) => <Link to={`/user/${record.id}`}>{text}</Link>,
    },
    {
      title: "Email",
      dataIndex: "contactEmail",
      key: "contactEmail",
    },
    {
      title: "SDT",
      dataIndex: "contactNumber",
      key: "contactNumber",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Địa Chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <DeleteOutlined
            style={{ color: "red" }}
            onClick={() => del(record.id)}
          />
        </Space>
      ),
    },
  ];

  const [user, setUser] = useState([]);

 

async function del(id){
    await axios.delete("/api/user/del/"+id)
}

  useEffect(() => {
     async function getAllEm() {
       const result = await axios({
         method: "get",
         url: "/api/user/get",
       });

       setUser(result.data);
     }
    getAllEm();
  }, [user]);


  return (
    <div className={style.container}>
      <div style={{ display: "flex" }}>
        <Sidebar
          style={{ flex: "0 0 auto", position: "sticky", width: "178px" }}
        />
        <div style={{ width: "88%", marginLeft: "auto", marginRight: 0 }}>
          <div className={style.header}>
            {/* <Space className={style.search_container}>
          <Input placeholder="Search..." suffix={<SearchOutlined />} />
        </Space> */}
            <SearchInput />
            <Link to="/add-customer">
              <Button style={{ backgroundColor: "green", color: "white" }}  className={style.addBtn}>Thêm Khách Hàng</Button>
            </Link>
          </div>
          <Table
            columns={columns}
            dataSource={user}
            rowKey={(record) => record.id}
            bordered
          />
        </div>
      </div>
    </div>
  );
}
