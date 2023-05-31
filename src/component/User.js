import React,{useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Form,
  Input,
  Button,
  Col,
  Upload,
  DatePicker,
  InputNumber,
} from "antd";

const { Item } = Form;

function User(){

    const {id} = useParams();
    const [form] = Form.useForm();
    const [data, setData] = useState([])

    useEffect(() =>{
        async function getById(){
            const res =await axios.get("/api/user/"+id)
            setData(res.data.payload)
        }
        getById();
    },[])

    return (
      <>
        <Form form={form} className="debt-form">
          <div style={{ borderBottom: "1px solid blue" }}>
            <h3>THÔNG TIN CHUNG</h3>
            <p style={{ marginLeft: "10px", fontWeight: "bold" }}>
              Thông tin cơ bản
            </p>
            <Item
              label="MST"
              name={["user", "mst"]}
              style={{ marginLeft: "20px", textAlign: "center" }}
              labelCol={{ span: 6 }}
              labelAlign="left"
              wrapperCol={{ span: 18 }}
            >
              <Input
                style={{ width: "300px", textAlign: "center" }}
                placeholder={data.mst}
              />
            </Item>
            <Item
              label="Tên khách hàng"
              name={["user", "name"]}
              style={{ marginLeft: "20px", textAlign: "center" }}
              labelCol={{ span: 6 }}
              labelAlign="left"
              wrapperCol={{ span: 18 }}
            >
              <Input style={{ width: "300px" }} placeholder={data.name} />
            </Item>
            <Item
              label="Ngày thành lập"
              name={["user", "foundatingDate"]}
              style={{ marginLeft: "20px", textAlign: "center" }}
              labelCol={{ span: 6 }}
              labelAlign="left"
              wrapperCol={{ span: 18 }}
            >
              <DatePicker
                style={{ width: "300px" }}
                placeholder={data.foundatingDate}
              />
            </Item>
            <p style={{ marginLeft: "10px", fontWeight: "bold" }}>
              Thông tin địa chỉ
            </p>
            <Item
              label="Tỉnh/Thành phố"
              name={["user", "city"]}
              style={{ marginLeft: "20px", textAlign: "center" }}
              labelCol={{ span: 6 }}
              labelAlign="left"
              wrapperCol={{ span: 18 }}
            >
              <Input style={{ width: "300px" }} placeholder={data.city} />
            </Item>
            <Item
              label="Quận/Huyện"
              style={{ marginLeft: "20px", textAlign: "center" }}
              name={["user", "district"]}
              labelCol={{ span: 6 }}
              labelAlign="left"
              wrapperCol={{ span: 18 }}
            >
              <Input style={{ width: "300px" }} placeholder={data.district} />
            </Item>
            <Item
              label="Phường/Xã"
              name={["user", "ward"]}
              style={{ marginLeft: "20px", textAlign: "center" }}
              labelCol={{ span: 6 }}
              labelAlign="left"
              wrapperCol={{ span: 18 }}
            >
              <Input style={{ width: "300px" }} placeholder={data.ward} />
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
            <p
              style={{ marginLeft: "10px", fontWeight: "bold" }}
              placeholder={data.address}
            >
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
              <Input
                style={{ width: "300px" }}
                placeholder={data.contactName}
              />
            </Item>
            <Item
              label="Chức danh"
              name={["user", "contactTitle"]}
              style={{ marginLeft: "20px", textAlign: "center" }}
              labelCol={{ span: 6 }}
              labelAlign="left"
              wrapperCol={{ span: 18 }}
            >
              <Input
                style={{ width: "300px" }}
                placeholder={data.contactTitle}
              />
            </Item>
            <Item
              label="Số điện thoại"
              name={["user", "contactNumber"]}
              style={{ marginLeft: "20px", textAlign: "center" }}
              labelCol={{ span: 6 }}
              labelAlign="left"
              wrapperCol={{ span: 18 }}
            >
              <Input
                style={{ width: "300px" }}
                placeholder={data.contactNumber}
              />
            </Item>
            <Item
              label="Email"
              name={["user", "contactEmail"]}
              labelCol={{ span: 6 }}
              labelAlign="left"
              wrapperCol={{ span: 18 }}
              style={{ marginLeft: "20px", textAlign: "center" }}
            >
              <Input
                style={{ width: "300px" }}
                placeholder={data.contactEmail}
              />
            </Item>
          </div>
         
        </Form>
      </>
    );
}
export default User;