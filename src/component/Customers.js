import React, { useState } from "react";
import { Form, Input, Button, Col, Upload } from "antd";
import axios from "axios";
import style from "../style/Customer.module.css";
import {  CloudUploadOutlined} from "@ant-design/icons";

function Customer() {
   const [form] = Form.useForm();
   const [loading, setLoading] = useState(false);
   const [logo, setLogo] = useState("");

   const handleMstChange = async (e) => {
     const mst = e.target.value;

     try {
       setLoading(true);
       const response = await axios.get(`/api/user/find?mst=${mst}`);
       const userData = response.data;

       if (userData) {
         form.setFieldsValue({
           name: userData.name,
         });
       }
     } catch (error) {
       console.error(error);
     } finally {
       setLoading(false);
     }
   };
   //Fix lai lay file 
     const handleUploadChange = (info) => {
       if (info.file.status === "done") {
         // Lấy đường dẫn ảnh từ phản hồi sau khi tải lên thành công
         const imageUrl = info.file.response.imageUrl;
         setLogo(imageUrl);
       }
     };


  const handleSubmit = async (values) => {
    try {
      const response = await axios.post("/api/user/save", values);
      console.log(response.data);
      form.resetFields();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={style.container}>
      <h2>Add Customer</h2>
      <div className={style.info}>
        <div className={style.basic_info}>
          <Form form={form} onFinish={handleSubmit} layout="vertical">
            {/* <Col className={style.formRow}>
              <Form.Item label="Logo" name="logo">
                <label
                  style={{
                    display: "inline-block",
                    position: "relative",
                    cursor: "pointer",
                  }}
                >
                  {logo ? (
                    <img
                      src={logo}
                      alt="Profile"
                      name="logo"
                      style={{
                        width: 50,
                        height: 50,
                        border: "1px solid #d9d9d9",
                        borderRadius: "10%",
                      }}
                    />
                  ) : (
                    <img
                      src={
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlR3hMw_3daUL3Uhr5Y3uJh_kMaYzyqQhhPA&usqp=CAU"
                      }
                      alt="Profile"
                      style={{
                        width: 50,
                        height: 50,
                        border: "1px solid #d9d9d9",
                        borderRadius: "10%",
                      }}
                    />
                  )}
                  <Input
                    className="inside"
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    beforeUpload={handleUploadChange}
                    style={{ display: "none" }}
                  ></Input>
                  <CloudUploadOutlined
                    style={{ fontSize: 20, marginRight: 5, color: "#1890ff" }}
                  />
                </label>
              </Form.Item>
            </Col> */}
            <Col className={style.formRow}>
              <Form.Item
                label="MST"
                name="mst"
                rules={[{ required: true, message: "Please enter mst" }]}
              >
                <Input onChange={handleMstChange} />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please enter name" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Add User
                </Button>
              </Form.Item>
            </Col>
          </Form>
        </div>
        <div className={style.contact_info}></div>
      </div>
      <div className={style.debt}></div>
    </div>
  );
}

export default Customer;
