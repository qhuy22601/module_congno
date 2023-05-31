import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Col,
  Upload,
  DatePicker,
  InputNumber,
} from "antd";
import axios from "axios";
import style from "../style/Customer.module.css";
import {  CloudUploadOutlined} from "@ant-design/icons";

const { Item } = Form;

function Customer() {
  const [form] = Form.useForm();
   const [loading, setLoading] = useState(false);
   const [balance, setBalance] = useState(0);

  const handleMstChange = async (e) => {
    const mst = e.target.value;

    try {
      setLoading(true);
      const response = await axios.get(`/api/user/find?mst=${mst}`);
      const userData = response.data;

      if (userData) {
         form.setFieldsValue({
           user: {
             name: userData.name,
           },
         });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDebtChange = (e) => {
    const debt = e.target.value;
    const pay = form.getFieldValue("pay");
    const newBalance = debt - pay;
    setBalance(newBalance);
  };

  const handlePayChange = (e) => {
    const pay = e.target.value;
    const debt = form.getFieldValue("debt");
    const newBalance = debt - pay;
    setBalance(newBalance);
  };


  const handleSubmit = async (values) => {
    try {
      const response = await fetch("/api/debt/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      // if res
      form.resetFields();
      // ...
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <Form form={form} onFinish={handleSubmit} className="debt-form">
      <div style={{ borderBottom: "1px solid blue" }}>
        <h3>THÔNG TIN CHUNG</h3>
        <p style={{ marginLeft: "10px", fontWeight: "bold" }}>
          Thông tin cơ bản
        </p>
        <Item
          label="MST"
          name={["user", "mst"]}
          rules={[{ required: true, message: "Please enter the user MST" }]}
          style={{ marginLeft: "20px", textAlign: "center" }}
          labelCol={{ span: 6 }}
          labelAlign="left"
          wrapperCol={{ span: 18 }}
        >
          <Input
            onChange={handleMstChange}
            style={{ width: "300px", textAlign: "center" }}
          />
        </Item>
        <Item
          label="Tên khách hàng"
          name={["user", "name"]}
          rules={[{ required: true, message: "Please enter the user name" }]}
          style={{ marginLeft: "20px", textAlign: "center" }}
          labelCol={{ span: 6 }}
          labelAlign="left"
          wrapperCol={{ span: 18 }}
        >
          <Input style={{ width: "300px" }} />
        </Item>
        <Item
          label="Ngày thành lập"
          name={["user", "foundatingDate"]}
          style={{ marginLeft: "20px", textAlign: "center" }}
          labelCol={{ span: 6 }}
          labelAlign="left"
          wrapperCol={{ span: 18 }}
        >
          <DatePicker style={{ width: "300px" }} />
        </Item>
        <p style={{ marginLeft: "10px", fontWeight: "bold" }}>
          Thông tin địa chỉ
        </p>
        <Item
          label="Tỉnh/Thành phố"
          name={["user", "city"]}
          rules={[{ required: true, message: "Please enter the City" }]}
          style={{ marginLeft: "20px", textAlign: "center" }}
          labelCol={{ span: 6 }}
          labelAlign="left"
          wrapperCol={{ span: 18 }}
        >
          <Input style={{ width: "300px" }} />
        </Item>
        <Item
          label="Quận/Huyện"
          style={{ marginLeft: "20px", textAlign: "center" }}
          name={["user", "district"]}
          rules={[{ required: true, message: "Please enter the District" }]}
          labelCol={{ span: 6 }}
          labelAlign="left"
          wrapperCol={{ span: 18 }}
        >
          <Input style={{ width: "300px" }} />
        </Item>
        <Item
          label="Phường/Xã"
          name={["user", "ward"]}
          style={{ marginLeft: "20px", textAlign: "center" }}
          labelCol={{ span: 6 }}
          labelAlign="left"
          wrapperCol={{ span: 18 }}
        >
          <Input style={{ width: "300px" }} />
        </Item>
        <Item
          label="Địa chỉ đầy đủ"
          name={["user", "address"]}
          style={{ marginLeft: "20px", textAlign: "center" }}
          labelCol={{ span: 6 }}
          labelAlign="left"
          wrapperCol={{ span: 18 }}
        >
          <Input style={{ width: "300px" }} />
        </Item>
        <p style={{ marginLeft: "10px", fontWeight: "bold" }}>
          Thông tin người liên hệ
        </p>
        <Item
          label="Họ và tên"
          name={["user", "contactName"]}
          style={{ marginLeft: "20px", textAlign: "center" }}
          labelCol={{ span: 6 }}
          labelAlign="left"
          wrapperCol={{ span: 18 }}
        >
          <Input style={{ width: "300px" }} />
        </Item>
        <Item
          label="Chức danh"
          name={["user", "contactTitle"]}
          style={{ marginLeft: "20px", textAlign: "center" }}
          labelCol={{ span: 6 }}
          labelAlign="left"
          wrapperCol={{ span: 18 }}
        >
          <Input style={{ width: "300px" }} />
        </Item>
        <Item
          label="Số điện thoại"
          name={["user", "contactNumber"]}
          style={{ marginLeft: "20px", textAlign: "center" }}
          labelCol={{ span: 6 }}
          labelAlign="left"
          wrapperCol={{ span: 18 }}
        >
          <Input style={{ width: "300px" }} />
        </Item>
        <Item
          label="Email"
          name={["user", "contactEmail"]}
          labelCol={{ span: 6 }}
          labelAlign="left"
          wrapperCol={{ span: 18 }}
          style={{ marginLeft: "20px", textAlign: "center" }}
        >
          <Input style={{ width: "300px" }} />
        </Item>
      </div>
      <h3>CÔNG NỢ</h3>
      <table className="debt-table" style={{marginLeft:"auto", marginRight:"auto"}}>
        <tbody>
          <tr>
            <th>Date</th>
            <th>Debt</th>
            <th>Pay</th>
            <th>Balance</th>
          </tr>
          <tr>
            <td>
              <Form.Item
                name="date"
                rules={[{ required: true, message: "Please enter a date" }]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </td>
            <td>
              <Form.Item
                name="debt"
                rules={[
                  { required: true, message: "Please enter the debt amount" },
                ]}
              >
                <Input
                  type="number"
                  onChange={handleDebtChange}
                  style={{ width: "100%", textAlign: "center" }}
                />
              </Form.Item>
            </td>
            <td>
              <Form.Item
                name="pay"
                rules={[
                  { required: true, message: "Please enter the pay amount" },
                ]}
              >
                <Input
                  type="number"
                  onChange={handlePayChange}
                  style={{ width: "100%", textAlign: "center" }}
                />
              </Form.Item>
            </td>
            <td>
              <Form.Item name="balance">
                <Input
                  value={balance}
                  disabled
                  style={{ width: "100%", textAlign: "center" }}
                  placeholder={balance}
                />
              </Form.Item>
            </td>
          </tr>
        </tbody>
      </table>
      <Item>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Item>
    </Form>
  );
}

export default Customer;
