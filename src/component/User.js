import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Form,
  Input,
  Button,
  Col,
  Upload,
  DatePicker,
  message,
  InputNumber,
  Divider,
  Table,
  Typography
} from "antd";
import moment from "moment";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import "../style/Navbar.module.css";
import InfoIcon from "@mui/icons-material/Info";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import Test from "./Test";
import MyContext from "./MyContext";
const drawerWidth = 240;
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Set your desired primary color here
    },
  },
});
const { Item } = Form;
function User() {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [debtData, setDebtData] = useState([]);
  useEffect(() => {
    async function getById() {
      try {
        const response = await axios.get(`/api/user/${id}`);
        const userData = response.data.payload;
        setData(userData);
        // setMst(userData.mst)
        form.setFieldsValue({
          mst: userData.mst,
          name: userData.name,
          foundatingDate: moment(userData.foundatingDate, "YYYY-MM-DD"),
          city: userData.city,
          district: userData.district,
          ward: userData.ward,
          address: userData.address,
          contactName: userData.contactName,
          contactTitle: userData.contactTitle,
          contactEmail: userData.contactEmail,
          contactNumber: userData.contactNumber,
        });
      } catch (error) {
        console.error(error);
      }
    }

    getById();
  }, [form, id]);

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

  const handleDelete = async (debtId) => {
    try {
      await axios.delete(`/api/debt/del/${debtId}`);
      alert("OKKK");
      setDebtData((prevData) => prevData.filter((debt) => debt.id !== debtId));
    } catch (error) {
      alert("KO OKKKK");
    }
  };
    useEffect(() => {
      async function getDebtByUserId() {
        const res = await axios.get("/api/debt/get/" + id);
        setDebtData(res.data);
      }
      getDebtByUserId();
    }, [id]);

  const totalPay = debtData.reduce((sum, debt) => sum + debt.pay, 0);
  const totalDebt = debtData.reduce((sum, debt) => sum + debt.debt, 0);
  const totalBalance = debtData.reduce((sum, debt) => sum + debt.balance, 0);

  const totalsRow = {
    key: "totals",
    date: "Tổng",
    note: "",
    debt: totalDebt,
    pay: totalPay,
    balance: totalBalance,
  };

  const columns = [
    {
      title: "Ngày",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Diễn giải",
      dataIndex: "note",
      key: "note",
    },
    {
      title: "Công nợ",
      dataIndex: "debt",
      key: "debt",
    },
    {
      title: "Đã trả",
      dataIndex: "pay",
      key: "pay",
    },
    {
      title: "Còn lại",
      dataIndex: "balance",
      key: "balance",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Button style={{ backgroundColor: "red", color: "white" }}  type="link" danger onClick={() => handleDelete(record.id)}>
          Xóa
        </Button>
      ),
    },
  ];
  const handleSave = async () => {
    try {
      await form.validateFields();
      const formData = {
        id: parseInt(id), // Append the ID to the formData
        ...form.getFieldsValue(),
      };
      await axios.put("/api/user/change", formData);
      message.success("OKKK");
      window.location.reload();
    } catch (error) {
      message.error("KO OKKK");
    }
  };
  const [openDebtTable, setOpenDebtTable] = useState(true);
  const handleOpenDebtTable = () => {
    setOpenDebtTable((prev) => !prev);
  };
  const [openPersonal, setOpenPersonal] = useState(true);

  const handleOpenPersonal = () => {
    setOpenPersonal((prev) => !prev);
  };

const [test, setTest] = useState(true);
const handleTest = () => {
  setTest((prev) => !prev);
};
  

  return (
    <>
      <div style={{ display: "flex" }}>
        <ThemeProvider
          theme={theme}
          style={{
            flex: "0 0 auto",
            position: "sticky",
            width: "178px",
            backgroundColor: "#293462",
            color: "#293462",
          }}
        >
          <Drawer
            variant="permanent"
            style={{ backgroundColor: "#293462", color: "#293462" }}
          >
            <List
              style={{
                background: "#455388",
                color: "#455388",
                height: "100%",
              }}
            >
              <ListItem button onClick={handleOpenPersonal}>
                <ListItemIcon>
                  <InfoIcon style={{ color: "white" }} />
                </ListItemIcon>

                <ListItemText primary="Thông tin" style={{ color: "white" }} />
              </ListItem>
              <ListItem button onClick={handleOpenDebtTable}>
                <ListItemIcon>
                  <CurrencyExchangeIcon style={{ color: "white" }} />
                </ListItemIcon>

                <ListItemText primary="Công nợ" style={{ color: "white" }} />
              </ListItem>
            </List>
          </Drawer>
        </ThemeProvider>
      </div>
      <div style={{ width: "88%", marginLeft: "auto", marginRight: 0 }}>
        <Typography.Title onClick={handleOpenPersonal} level={3}>
          Thông tin chung
        </Typography.Title>
        {openPersonal && (
          <Form form={form} className="debt-form">
            <div>
              <p style={{ marginLeft: "10px", fontWeight: "bold" }}>
                Thông tin cơ bản
              </p>
              <Item
                label="MST"
                name="mst"
                style={{ marginLeft: "20px", textAlign: "center" }}
                labelCol={{ span: 6 }}
                labelAlign="left"
                wrapperCol={{ span: 18 }}
                required
              >
                <Input
                  style={{ width: "300px", textAlign: "center" }}
                  placeholder={data.mst}
                />
              </Item>
              <Item
                label="Tên khách hàng"
                name="name"
                style={{ marginLeft: "20px", textAlign: "center" }}
                labelCol={{ span: 6 }}
                labelAlign="left"
                wrapperCol={{ span: 18 }}
                required
              >
                <Input style={{ width: "300px" }} placeholder={data.name} />
              </Item>
              <Item
                label="Ngày thành lập"
                name="foundatingDate"
                style={{ marginLeft: "20px", textAlign: "center" }}
                labelCol={{ span: 6 }}
                labelAlign="left"
                wrapperCol={{ span: 18 }}
                required
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
                name="city"
                style={{ marginLeft: "20px", textAlign: "center" }}
                labelCol={{ span: 6 }}
                labelAlign="left"
                wrapperCol={{ span: 18 }}
                required
              >
                <Input style={{ width: "300px" }} placeholder={data.city} />
              </Item>
              <Item
                label="Quận/Huyện"
                style={{ marginLeft: "20px", textAlign: "center" }}
                name="district"
                labelCol={{ span: 6 }}
                labelAlign="left"
                wrapperCol={{ span: 18 }}
                required
              >
                <Input style={{ width: "300px" }} placeholder={data.district} />
              </Item>
              <Item
                label="Phường/Xã"
                name="ward"
                style={{ marginLeft: "20px", textAlign: "center" }}
                labelCol={{ span: 6 }}
                labelAlign="left"
                wrapperCol={{ span: 18 }}
              >
                <Input style={{ width: "300px" }} placeholder={data.ward} />
              </Item>
              <Item
                label="Địa chỉ đầy đủ"
                name="address"
                style={{ marginLeft: "20px", textAlign: "center" }}
                labelCol={{ span: 6 }}
                labelAlign="left"
                wrapperCol={{ span: 18 }}
              >
                <Input style={{ width: "300px" }} placeholder={data.address} />
              </Item>
              <p style={{ marginLeft: "10px", fontWeight: "bold" }}>
                Thông tin người liên hệ
              </p>
              <Item
                label="Họ và tên"
                name="contactName"
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
                name="contactTitle"
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
                name="contactNumber"
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
                name="contactEmail"
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
            <Button
              style={{ backgroundColor: "green", color: "white" }}
              type="primary"
              onClick={handleSave}
            >
              Lưu
            </Button>
          </Form>
        )}
        <Divider />
        <Typography.Title onClick={handleOpenDebtTable} level={3}>
          Danh sách công nợ
        </Typography.Title>
        {openDebtTable && (
          <>
            <Table
              dataSource={[...debtData]}
              columns={columns}
              pagination={false}
              rowKey="id"
              summary={() => (
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0} colSpan={2}>
                    <strong>Tổng cộng</strong>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={1}>
                    <strong>{totalDebt}</strong>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={2}>
                    <strong>{totalPay}</strong>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={3}>
                    <strong>{totalBalance}</strong>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              )}
            />
            {/* <MyContext.Provider value={mst}>
              <Test></Test>
            </MyContext.Provider> */}
            <Test param={id}></Test>
          </>
        )}
      </div>
    </>
  );
}
export default User;

// <Form form={form} onFinish={handleSubmit} className="debt-form">
//   <div style={{ borderBottom: "1px solid blue", display: "none" }}>
//     <h3>THÔNG TIN CHUNG</h3>
//     <p style={{ marginLeft: "10px", fontWeight: "bold" }}>Thông tin cơ bản</p>
//     <Item
//       label="MST"
//       name={["user", "mst"]}
//       rules={[{ required: true, message: "Please enter the user MST" }]}
//       style={{ marginLeft: "20px", textAlign: "center" }}
//       labelCol={{ span: 6 }}
//       labelAlign="left"
//       wrapperCol={{ span: 18 }}
//     >
//       <Input
//         // onChange={handleMstChange}
//         style={{ width: "300px", textAlign: "center" }}
//       />
//     </Item>
//     <Item
//       label="Tên khách hàng"
//       name={["user", "name"]}
//       rules={[{ required: true, message: "Please enter the user name" }]}
//       style={{ marginLeft: "20px", textAlign: "center" }}
//       labelCol={{ span: 6 }}
//       labelAlign="left"
//       wrapperCol={{ span: 18 }}
//     >
//       <Input style={{ width: "300px" }} />
//     </Item>
//     <Item
//       label="Ngày thành lập"
//       name={["user", "foundatingDate"]}
//       style={{ marginLeft: "20px", textAlign: "center" }}
//       labelCol={{ span: 6 }}
//       labelAlign="left"
//       wrapperCol={{ span: 18 }}
//     >
//       <DatePicker style={{ width: "300px" }} format="YYYY-MM-DD" />
//     </Item>
//     <p style={{ marginLeft: "10px", fontWeight: "bold" }}>Thông tin địa chỉ</p>
//     <Item
//       label="Tỉnh/Thành phố"
//       name={["user", "city"]}
//       rules={[{ required: true, message: "Please enter the City" }]}
//       style={{ marginLeft: "20px", textAlign: "center" }}
//       labelCol={{ span: 6 }}
//       labelAlign="left"
//       wrapperCol={{ span: 18 }}
//     >
//       <Input style={{ width: "300px" }} />
//     </Item>
//     <Item
//       label="Quận/Huyện"
//       style={{ marginLeft: "20px", textAlign: "center" }}
//       name={["user", "district"]}
//       rules={[{ required: true, message: "Please enter the District" }]}
//       labelCol={{ span: 6 }}
//       labelAlign="left"
//       wrapperCol={{ span: 18 }}
//     >
//       <Input style={{ width: "300px" }} />
//     </Item>
//     <Item
//       label="Phường/Xã"
//       name={["user", "ward"]}
//       style={{ marginLeft: "20px", textAlign: "center" }}
//       labelCol={{ span: 6 }}
//       labelAlign="left"
//       wrapperCol={{ span: 18 }}
//     >
//       <Input style={{ width: "300px" }} />
//     </Item>
//     <Item
//       label="Địa chỉ đầy đủ"
//       name={["user", "address"]}
//       style={{ marginLeft: "20px", textAlign: "center" }}
//       labelCol={{ span: 6 }}
//       labelAlign="left"
//       wrapperCol={{ span: 18 }}
//     >
//       <Input style={{ width: "300px" }} />
//     </Item>
//     <p style={{ marginLeft: "10px", fontWeight: "bold" }}>
//       Thông tin người liên hệ
//     </p>
//     <Item
//       label="Họ và tên"
//       name={["user", "contactName"]}
//       style={{ marginLeft: "20px", textAlign: "center" }}
//       labelCol={{ span: 6 }}
//       labelAlign="left"
//       wrapperCol={{ span: 18 }}
//     >
//       <Input style={{ width: "300px" }} />
//     </Item>
//     <Item
//       label="Chức danh"
//       name={["user", "contactTitle"]}
//       style={{ marginLeft: "20px", textAlign: "center" }}
//       labelCol={{ span: 6 }}
//       labelAlign="left"
//       wrapperCol={{ span: 18 }}
//     >
//       <Input style={{ width: "300px" }} />
//     </Item>
//     <Item
//       label="Số điện thoại"
//       name={["user", "contactNumber"]}
//       style={{ marginLeft: "20px", textAlign: "center" }}
//       labelCol={{ span: 6 }}
//       labelAlign="left"
//       wrapperCol={{ span: 18 }}
//     >
//       <Input style={{ width: "300px" }} />
//     </Item>
//     <Item
//       label="Email"
//       name={["user", "contactEmail"]}
//       labelCol={{ span: 6 }}
//       labelAlign="left"
//       wrapperCol={{ span: 18 }}
//       style={{ marginLeft: "20px", textAlign: "center" }}
//     >
//       <Input style={{ width: "300px" }} />
//     </Item>
//   </div>
//   <table
//     className="debt-table"
//     style={{ marginLeft: "0", marginRight: "auto" }}
//   >
//     <tbody>
//       <tr>
//         <th>Ngày</th>
//         <th>Chú thích</th>
//         <th>Công nợ</th>
//         <th>Thanh toán</th>
//         <th>Số dư</th>
//       </tr>
//       <tr>
//         <td>
//           <Form.Item
//             name="date"
//             rules={[{ required: true, message: "Please enter a date" }]}
//           >
//             <DatePicker style={{ width: "100%" }} />
//           </Form.Item>
//         </td>
//         <td>
//           <Form.Item
//             name="note"
//             rules={[{ required: true, message: "Please enter the Note" }]}
//           >
//             <Input
//               type="text"
//               onChange={handleNoteChange}
//               style={{ width: "100%", textAlign: "center" }}
//             />
//           </Form.Item>
//         </td>
//         <td>
//           <Form.Item
//             name="debt"
//             rules={[
//               {
//                 required: true,
//                 message: "Please enter the debt amount",
//               },
//             ]}
//           >
//             <Input
//               type="number"
//               onChange={handleDebtChange}
//               style={{ width: "100%", textAlign: "center" }}
//             />
//           </Form.Item>
//         </td>
//         <td>
//           <Form.Item
//             name="pay"
//             rules={[
//               {
//                 required: true,
//                 message: "Please enter the pay amount",
//               },
//             ]}
//           >
//             <Input
//               type="number"
//               onChange={handlePayChange}
//               style={{ width: "100%", textAlign: "center" }}
//             />
//           </Form.Item>
//         </td>
//         <td>
//           <Form.Item name="balance">
//             <Input
//               value={balance}
//               disabled
//               style={{ width: "100%", textAlign: "center" }}
//               placeholder={balance}
//             />
//           </Form.Item>
//         </td>
//       </tr>
//     </tbody>
//   </table>
//   <Item>
//     <Button style={{ backgroundColor: "green", color: "white" }}  type="primary" htmlType="submit">
//       Lưu
//     </Button>
//   </Item>
// </Form>;

// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { Form, Input, DatePicker } from "antd";
// import {
//   Button,
//   Typography,
//   Grid,
//   Collapse,
//   TextField,
//   Divider,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
// } from "@mui/material";
// import { styled } from "@mui/system";
// import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
// import moment from "moment";
// // import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// // import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// // import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import Drawer from "@mui/material/Drawer";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import "../style/Navbar.module.css";
// import InfoIcon from "@mui/icons-material/Info";
// import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
// const drawerWidth = 240;
// const { Item } = Form;
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#1976d2", // Set your desired primary color here
//     },
//   },
// });

// const CustomTextField = styled(TextField)`
//   & .MuiOutlinedInput-root {
//     border-radius: 8px;
//     background-color: #f0f5f3;
//     transition: box-shadow 0.3s;
//     width: 80%;
//     margin-bottom: 15px;

//     &:hover {
//       background-color: #e0e0e0;
//     }

//     &.Mui-focused {
//       background-color: #fff;
//       box-shadow: 0 0 0 4px rgba(0, 123, 255, 0.1);

//       & .MuiOutlinedInput-notchedOutline {
//         border-color: #007bff;
//       }
//     }
//   }

//   & .MuiOutlinedInput-input {
//     padding: 12px;
//   }
// `;

// function User() {
//   const { id } = useParams();
//   const [data, setData] = useState([]);
//   const [debtData, setDebtData] = useState([]);
//   const [openDebtTable, setOpenDebtTable] = useState(true);
//   const [form] = Form.useForm();
//   const [editMode, setEditMode] = useState(false);
//    const [loading, setLoading] = useState(false);
//   const [formValues, setFormValues] = useState({
//     date: "",
//     note: "",
//     debt: "",
//     pay: "",
//     balance: "",
//   });
//    const [balance, setBalance] = useState(0);

//    const [userData, setUserData] = useState(null);

//    useEffect(()=>{
//      const mst = data.mst

//      try {
//        setLoading(true);
//        const fetchData = async ()=>{
//          const response = await axios.get(`/api/debt/find?mst=${mst}`);
//          const debtData = response.data;

//          if (debtData.length > 0) {
//            const { user } = debtData[0];
//            setUserData(user); // Update user data state
//            form.setFieldsValue({
//              user: {
//                mst:user.mst,
//                name: user.name,
//                foundatingDate: moment(user.foundatingDate, "YYYY-MM-DD"),
//                city: user.city,
//                district: user.district,
//                ward: user.ward,
//                address: user.address,
//                contactName: user.contactName,
//                contactTitle: user.contactTitle,
//                contactEmail: user.contactEmail,
//                contactNumber: user.contactNumber,
//              },
//            });
//          }
//        }
//        fetchData();
//        console.log("dsdsaasd" + mst)
//      } catch (error) {
//        console.error(error);
//      } finally {
//        setLoading(false);
//      }
//    },[data.mst, form]);

//   const handleDebtChange = (e) => {
//     const debt = e.target.value;
//     const pay = form.getFieldValue("pay");
//     const newBalance = debt - pay;
//     setBalance(newBalance);
//   };

//   const handlePayChange = (e) => {
//     const pay = e.target.value;
//     const debt = form.getFieldValue("debt");
//     const newBalance = debt - pay;
//     setBalance(newBalance);
//   };

//   const [note, setNote] = useState("");

//   const handleNoteChange = (e) => {
//     setNote(e.target.value);
//   };

//   const handleSubmit = async (values) => {
//     try {
//       const response = await fetch("/api/debt/save", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(values),
//       });
//       // if res
//       form.resetFields();
//       // ...
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const toggleEditMode = () => {
//     setEditMode((prevEditMode) => !prevEditMode);
//   };

//   const handleFormValuesChange = (e) => {
//     setFormValues((prevValues) => ({
//       ...prevValues,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleOpenDebtTable = () => {
//     setOpenDebtTable((prev) => !prev);
//   };

//   const handleDelete = async (debtId) => {
//     try {
//       await axios.delete(`/api/debt/del/${debtId}`);
//       alert("Debt deleted successfully!");
//       setDebtData((prevData) => prevData.filter((debt) => debt.id !== debtId));
//     } catch (error) {
//       alert("Failed to delete debt.");
//     }
//   };

//   const totalPay = debtData.reduce((sum, debt) => sum + debt.pay, 0);
//   const totalDebt = debtData.reduce((sum, debt) => sum + debt.debt, 0);
//   const totalBalance = debtData.reduce((sum, debt) => sum + debt.balance, 0);

//   const totalsRow = {
//     id: "totals",
//     date: "Tổng",
//     note: "",
//     debt: totalDebt,
//     pay: totalPay,
//     balance: totalBalance,
//   };
//   const dataWithTotals = [...debtData, totalsRow];

//   useEffect(() => {
//     async function getById() {
//       const res = await axios.get("/api/user/" + id);
//       const userData = res.data.payload;
//       userData.foundatingDate = moment(userData.foundatingDate, "YYYY-MM-DD");
//       setData(userData);
//     }
//     getById();
//   }, [id]);

//   async function changeInfo() {
//     try {
//       const requestData = { ...data, id: id };
//       await axios.put("/api/user/change", requestData);
//       alert("OKKK");
//     } catch (error) {
//       alert("KO OKKK: " + error.message);
//     }
//   }

//   const handleFormChange = (e) => {
//     setData((prevData) => ({
//       ...prevData,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   useEffect(() => {
//     async function getDebtByUserId() {
//       const res = await axios.get("/api/debt/get/" + id);
//       setDebtData(res.data);
//     }
//     getDebtByUserId();
//   }, [id]);

//   const [openPersonal, setOpenPersonal] = useState(true);

//   const handleOpenPersonal = () => {
//     setOpenPersonal((prev) => !prev);
//   };

//   const columns = [
//     {
//       field: "date",
//       headerName: "Ngày",
//       width: 150,
//     },
//     {
//       field: "note",
//       headerName: "Diễn giải",
//       width: 200,
//     },
//     {
//       field: "debt",
//       headerName: "Công nợ",
//       width: 150,
//     },
//     {
//       field: "pay",
//       headerName: "Thanh toán",
//       width: 150,
//     },
//     {
//       field: "balance",
//       headerName: "Số dư",
//       width: 150,
//     },
//     {
//       field: "action",
//       headerName: "",
//       width: 150,
//       renderCell: (params) => {
//         const record = params.row;
//         if (record.id !== "totals") {
//           return (
//             <Button style={{ backgroundColor: "green", color: "white" }} 
//               variant="outlined"
//               color="error"
//               onClick={() => handleDelete(record.id)}
//             >
//               Xóa
//             </Button>
//           );
//         }
//         return null;
//       },
//     },
//   ];

//   return (
//     <>
//       <div style={{ display: "flex" }}>
//         <ThemeProvider
//           theme={theme}
//           style={{ flex: "0 0 auto", position: "sticky", width: "178px" }}
//         >
//           <Drawer variant="permanent">
//             <List>
//               <ListItem button onClick={handleOpenPersonal}>
//                 <ListItemIcon>
//                   <InfoIcon />
//                 </ListItemIcon>

//                 <ListItemText primary="Thông tin" />
//               </ListItem>
//               <ListItem button onClick={handleOpenDebtTable}>
//                 <ListItemIcon>
//                   <CurrencyExchangeIcon />
//                 </ListItemIcon>

//                 <ListItemText primary="Công nợ" />
//               </ListItem>
//             </List>
//           </Drawer>
//         </ThemeProvider>
//       </div>
//       <div style={{ width: "88%", marginLeft: "auto", marginRight: 0 }}>
//         <form onSubmit={changeInfo}>
//           <Grid item>
//             <Button style={{ backgroundColor: "green", color: "white" }} 
//               sx={{ mt: 2 }}
//               variant="standard"
//               endIcon={
//                 openPersonal ? (
//                   <KeyboardArrowDownIcon />
//                 ) : (
//                   <KeyboardArrowUpIcon />
//                 )
//               }
//               onClick={handleOpenPersonal}
//             >
//               <Typography variant="overline">Thông tin chung</Typography>
//             </Button>
//           </Grid>
//           <Collapse in={openPersonal} timeout="auto" unmountOnExit>
//             <p style={{ marginLeft: "10px", fontWeight: "bold" }}>
//               Thông tin cơ bản
//             </p>
//             <CustomTextField
//               label="MST"
//               name="mst"
//               value={data.mst}
//               onChange={handleFormChange}
//               style={{ marginLeft: "20px", textAlign: "center" }}
//               fullWidth
//             />
//             <CustomTextField
//               label="Tên khách hàng"
//               name="name"
//               value={data.name}
//               onChange={handleFormChange}
//               style={{ marginLeft: "20px", textAlign: "center" }}
//               fullWidth
//             />
//               <DatePicker
//                 label="Ngày thành lập"
//                 name="foundatingDate"
//                 inputFormat="dd/MM/yyyy"
//                 value={data.foundatingDate ?? " "}
//                 onChange={(date) =>
//                   setData((prevData) => ({ ...prevData, foundatingDate: date }))
//                 }
//                 renderInput={(date) => (
//                   <CustomTextField {...date} style={{ marginLeft: "50px" }} />
//                 )}
//                 style={{ marginLeft: "50px", textAlign: "center" }}
//                 fullWidth
//               />

//             <p style={{ marginLeft: "10px", fontWeight: "bold" }}>
//               Thông tin địa chỉ
//             </p>
//             <CustomTextField
//               label="Tỉnh/Thành phố"
//               name="city"
//               value={data.city}
//               onChange={handleFormChange}
//               style={{ marginLeft: "20px", textAlign: "center" }}
//               fullWidth
//             />
//             <CustomTextField
//               label="Quận/Huyện"
//               name="district"
//               value={data.district}
//               onChange={handleFormChange}
//               style={{ marginLeft: "20px", textAlign: "center" }}
//               fullWidth
//             />
//             <CustomTextField
//               label="Phường/Xã"
//               name="ward"
//               value={data.ward}
//               onChange={handleFormChange}
//               style={{ marginLeft: "20px", textAlign: "center" }}
//               fullWidth
//             />
//             <CustomTextField
//               label="Địa chỉ đầy đủ"
//               name="address"
//               value={data.address}
//               onChange={handleFormChange}
//               style={{ marginLeft: "20px", textAlign: "center" }}
//               fullWidth
//             />
//             <p
//               style={{ marginLeft: "10px", fontWeight: "bold" }}
//               placeholder={data.address}
//             >
//               Thông tin người liên hệ
//             </p>
//             <CustomTextField
//               label="Họ và tên"
//               name="contactName"
//               value={data.contactName}
//               onChange={handleFormChange}
//               style={{ marginLeft: "20px", textAlign: "center" }}
//               fullWidth
//             />
//             <CustomTextField
//               label="Chức danh"
//               name="contactTitle"
//               value={data.contactTitle}
//               onChange={handleFormChange}
//               style={{ marginLeft: "20px", textAlign: "center" }}
//               fullWidth
//             />
//             <CustomTextField
//               label="Số điện thoại"
//               name="contactNumber"
//               value={data.contactNumber}
//               onChange={handleFormChange}
//               style={{ marginLeft: "20px", textAlign: "center" }}
//               fullWidth
//             />
//             <CustomTextField
//               label="Email"
//               name="contactEmail"
//               value={data.contactEmail}
//               onChange={handleFormChange}
//               style={{ marginLeft: "20px", textAlign: "center" }}
//               fullWidth
//             />
//             <div style={{ width: "80%" }}>
//               <Button style={{ backgroundColor: "green", color: "white" }}  variant="contained" type="submit">
//                 Lưu
//               </Button>
//             </div>
//           </Collapse>
//         </form>
//         <Divider style={{ width: "80%" }} />
//         <Button style={{ backgroundColor: "green", color: "white" }} 
//           sx={{ mt: 2 }}
//           variant="standard"
//           endIcon={
//             openDebtTable ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />
//           }
//           onClick={handleOpenDebtTable}
//         >
//           <Typography variant="overline">Công nợ</Typography>
//         </Button>

//         {/* Debt table */}
//         {openDebtTable && (
//           <>
//             <DataGrid
//               style={{ width: "90%" }}
//               rows={dataWithTotals}
//               columns={columns}
//               className="debt-table"
//               components={{
//                 Toolbar: GridToolbar,
//               }}
//               componentsProps={{
//                 toolbar: {
//                   styles: {
//                     "--toolbar-background": "none",
//                   },
//                 },
//               }}
//               disableColumnMenu
//               disableColumnSelector
//               disableSelectionOnClick
//               autoHeight
//               density="standard"
//               rowClassName={(params) =>
//                 params.row.id === "totals" ? "totals-row" : ""
//               }
//             />
//             <Form form={form} onFinish={handleSubmit} className="debt-form">
//               <div style={{ borderBottom: "1px solid blue", display: "none" }}>
//                 <h3>THÔNG TIN CHUNG</h3>
//                 <p style={{ marginLeft: "10px", fontWeight: "bold" }}>
//                   Thông tin cơ bản
//                 </p>
//                 <Item
//                   label="MST"
//                   name={["user", "mst"]}
//                   rules={[
//                     { required: true, message: "Please enter the user MST" },
//                   ]}
//                   style={{ marginLeft: "20px", textAlign: "center" }}
//                   labelCol={{ span: 6 }}
//                   labelAlign="left"
//                   wrapperCol={{ span: 18 }}
//                 >
//                   <Input
//                     // onChange={handleMstChange}
//                     style={{ width: "300px", textAlign: "center" }}
//                   />
//                 </Item>
//                 <Item
//                   label="Tên khách hàng"
//                   name={["user", "name"]}
//                   rules={[
//                     { required: true, message: "Please enter the user name" },
//                   ]}
//                   style={{ marginLeft: "20px", textAlign: "center" }}
//                   labelCol={{ span: 6 }}
//                   labelAlign="left"
//                   wrapperCol={{ span: 18 }}
//                 >
//                   <Input style={{ width: "300px" }} />
//                 </Item>
//                 <Item
//                   label="Ngày thành lập"
//                   name={["user", "foundatingDate"]}
//                   style={{ marginLeft: "20px", textAlign: "center" }}
//                   labelCol={{ span: 6 }}
//                   labelAlign="left"
//                   wrapperCol={{ span: 18 }}
//                 >
//                   <DatePicker style={{ width: "300px" }} format="YYYY-MM-DD" />
//                 </Item>
//                 <p style={{ marginLeft: "10px", fontWeight: "bold" }}>
//                   Thông tin địa chỉ
//                 </p>
//                 <Item
//                   label="Tỉnh/Thành phố"
//                   name={["user", "city"]}
//                   rules={[{ required: true, message: "Please enter the City" }]}
//                   style={{ marginLeft: "20px", textAlign: "center" }}
//                   labelCol={{ span: 6 }}
//                   labelAlign="left"
//                   wrapperCol={{ span: 18 }}
//                 >
//                   <Input style={{ width: "300px" }} />
//                 </Item>
//                 <Item
//                   label="Quận/Huyện"
//                   style={{ marginLeft: "20px", textAlign: "center" }}
//                   name={["user", "district"]}
//                   rules={[
//                     { required: true, message: "Please enter the District" },
//                   ]}
//                   labelCol={{ span: 6 }}
//                   labelAlign="left"
//                   wrapperCol={{ span: 18 }}
//                 >
//                   <Input style={{ width: "300px" }} />
//                 </Item>
//                 <Item
//                   label="Phường/Xã"
//                   name={["user", "ward"]}
//                   style={{ marginLeft: "20px", textAlign: "center" }}
//                   labelCol={{ span: 6 }}
//                   labelAlign="left"
//                   wrapperCol={{ span: 18 }}
//                 >
//                   <Input style={{ width: "300px" }} />
//                 </Item>
//                 <Item
//                   label="Địa chỉ đầy đủ"
//                   name={["user", "address"]}
//                   style={{ marginLeft: "20px", textAlign: "center" }}
//                   labelCol={{ span: 6 }}
//                   labelAlign="left"
//                   wrapperCol={{ span: 18 }}
//                 >
//                   <Input style={{ width: "300px" }} />
//                 </Item>
//                 <p style={{ marginLeft: "10px", fontWeight: "bold" }}>
//                   Thông tin người liên hệ
//                 </p>
//                 <Item
//                   label="Họ và tên"
//                   name={["user", "contactName"]}
//                   style={{ marginLeft: "20px", textAlign: "center" }}
//                   labelCol={{ span: 6 }}
//                   labelAlign="left"
//                   wrapperCol={{ span: 18 }}
//                 >
//                   <Input style={{ width: "300px" }} />
//                 </Item>
//                 <Item
//                   label="Chức danh"
//                   name={["user", "contactTitle"]}
//                   style={{ marginLeft: "20px", textAlign: "center" }}
//                   labelCol={{ span: 6 }}
//                   labelAlign="left"
//                   wrapperCol={{ span: 18 }}
//                 >
//                   <Input style={{ width: "300px" }} />
//                 </Item>
//                 <Item
//                   label="Số điện thoại"
//                   name={["user", "contactNumber"]}
//                   style={{ marginLeft: "20px", textAlign: "center" }}
//                   labelCol={{ span: 6 }}
//                   labelAlign="left"
//                   wrapperCol={{ span: 18 }}
//                 >
//                   <Input style={{ width: "300px" }} />
//                 </Item>
//                 <Item
//                   label="Email"
//                   name={["user", "contactEmail"]}
//                   labelCol={{ span: 6 }}
//                   labelAlign="left"
//                   wrapperCol={{ span: 18 }}
//                   style={{ marginLeft: "20px", textAlign: "center" }}
//                 >
//                   <Input style={{ width: "300px" }} />
//                 </Item>
//               </div>
//               <table
//                 className="debt-table"
//                 style={{ marginLeft: "0", marginRight: "auto" }}
//               >
//                 <tbody>
//                   <tr>
//                     <th>Ngày</th>
//                     <th>Chú thích</th>
//                     <th>Công nợ</th>
//                     <th>Thanh toán</th>
//                     <th>Số dư</th>
//                   </tr>
//                   <tr>
//                     <td>
//                       <Form.Item
//                         name="date"
//                         rules={[
//                           { required: true, message: "Please enter a date" },
//                         ]}
//                       >
//                           <DatePicker />

//                       </Form.Item>
//                     </td>
//                     <td>
//                       <Form.Item
//                         name="note"
//                         rules={[
//                           { required: true, message: "Please enter the Note" },
//                         ]}
//                       >
//                         <Input
//                           type="text"
//                           onChange={handleNoteChange}
//                           style={{ width: "100%", textAlign: "center" }}
//                         />
//                       </Form.Item>
//                     </td>
//                     <td>
//                       <Form.Item
//                         name="debt"
//                         rules={[
//                           {
//                             required: true,
//                             message: "Please enter the debt amount",
//                           },
//                         ]}
//                       >
//                         <Input
//                           type="number"
//                           onChange={handleDebtChange}
//                           style={{ width: "100%", textAlign: "center" }}
//                         />
//                       </Form.Item>
//                     </td>
//                     <td>
//                       <Form.Item
//                         name="pay"
//                         rules={[
//                           {
//                             required: true,
//                             message: "Please enter the pay amount",
//                           },
//                         ]}
//                       >
//                         <Input
//                           type="number"
//                           onChange={handlePayChange}
//                           style={{ width: "100%", textAlign: "center" }}
//                         />
//                       </Form.Item>
//                     </td>
//                     <td>
//                       <Form.Item name="balance">
//                         <Input
//                           value={balance}
//                           disabled
//                           style={{ width: "100%", textAlign: "center" }}
//                           placeholder={balance}
//                         />
//                       </Form.Item>
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//               <Item>
//                 <Button style={{ backgroundColor: "green", color: "white" }}  type="primary" htmlType="submit">
//                   Lưu
//                 </Button>
//               </Item>
//             </Form>
//             ;
//           </>
//         )}
//       </div>
//       <style>
//         {`
//             .totals-row {
//               background-color: lightgray;
//               color: black;
//               font-weight: bold;
//             }
//           `}
//       </style>
//     </>
//   );
// }

// export default User;

// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import {
//   Form,
//   Input,
//   Button,
//   Typography,
//   Collapse,
//   DatePicker,
//   Divider,
//   message,
//   Table,
// } from "antd";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import Drawer from "@mui/material/Drawer";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import { styled } from "@mui/system";
// import moment from "moment";
// // import "antd/dist/antd.css";
// import Sidebar from "./SideBar";
// import "../style/Navbar.module.css";
// import { InfoCircleOutlined, MoneyCollectOutlined } from "@ant-design/icons";
// import InfoIcon from "@mui/icons-material/Info";
// import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#1976d2", // Set your desired primary color here
//     },
//   },
// });
// const { Panel } = Collapse;

// function User() {
//   const { id } = useParams();
//   const [data, setData] = useState({});
//   const [debtData, setDebtData] = useState([]);
//   const [form] = Form.useForm();
//   const [Loading, setLoading] = useState(true);
//   const [balance, setBalance] = useState(0);
//   const [userData, setUserData] = useState({});
//    const [openDebtTable, setOpenDebtTable] = useState(true);

//   useEffect(() => {
//     async function getById() {
//       try {
//         const res = await axios.get("/api/user/" + id);
//         const userData = res.data.payload;
//         userData.foundatingDate = moment(userData.foundatingDate, "YYYY-MM-DD");
//         setData(userData);
//         form.setFieldsValue({
//           mst: userData.mst,
//           name: userData.name,
//           foundatingDate: moment(userData.foundatingDate, "YYYY-MM-DD"),
//           city: userData.city,
//           district: userData.district,
//           ward: userData.ward,
//           address: userData.address,
//           contactName: userData.contactName,
//           contactTitle: userData.contactTitle,
//           contactEmail: userData.contactEmail,
//           contactNumber: userData.contactNumber,
//         });
//       } catch (error) {
//         console.error(error);
//         message.error("Failed to fetch user data.");
//       } finally {
//         setLoading(false);
//       }
//     }
//     getById();
//   }, [id, form]);

//     useEffect(() => {
//       async function getById() {
//         const res = await axios.get("/api/user/" + id);
//         const userData = res.data.payload;
//         userData.foundatingDate = moment(userData.foundatingDate, "YYYY-MM-DD");
//         setData(userData);
//       }
//       getById();
//     }, [id]);

//     async function changeInfo() {
//       try {
//         const requestData = { ...data, id: id };
//         await axios.put("/api/user/change", requestData);
//         alert("OKKK");
//       } catch (error) {
//         alert("KO OKKK: " + error.message);
//       }
//     }

//     const handleFormChange = (e) => {
//       setData((prevData) => ({
//         ...prevData,
//         [e.target.name]: e.target.value,
//       }));
//     };

//   const handleSubmit = async (values) => {
//     try {
//       const response = await fetch("/api/debt/save", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(values),
//       });
//       // if res
//       form.resetFields();
//       // ...
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleDelete = async (debtId) => {
//     try {
//       await axios.delete(`/api/debt/del/${debtId}`);
//       alert("Debt deleted successfully!");
//       setDebtData((prevData) => prevData.filter((debt) => debt.id !== debtId));
//     } catch (error) {
//       alert("Failed to delete debt.");
//     }
//   };

//   const totalPay = debtData.reduce((sum, debt) => sum + debt.pay, 0);
//   const totalDebt = debtData.reduce((sum, debt) => sum + debt.debt, 0);
//   const totalBalance = debtData.reduce((sum, debt) => sum + debt.balance, 0);

//   const totalsRow = {
//     key: "totals",
//     date: "Tổng",
//     note: "",
//     debt: totalDebt,
//     pay: totalPay,
//     balance: totalBalance,
//   };

//   const columns = [
//     {
//       title: "Ngày",
//       dataIndex: "date",
//       key: "date",
//     },
//     {
//       title: "Diễn giải",
//       dataIndex: "note",
//       key: "note",
//     },
//     {
//       title: "Công nợ",
//       dataIndex: "debt",
//       key: "debt",
//     },
//     {
//       title: "Đã trả",
//       dataIndex: "pay",
//       key: "pay",
//     },
//     {
//       title: "Còn lại",
//       dataIndex: "balance",
//       key: "balance",
//     },
//     {
//       title: "Hành động",
//       key: "action",
//       render: (_, record) => (
//         <Button style={{ backgroundColor: "green", color: "white" }}  type="link" danger onClick={() => handleDelete(record.id)}>
//           Xóa
//         </Button>
//       ),
//     },
//   ];
//    const handleOpenDebtTable = () => {
//      setOpenDebtTable((prev) => !prev);
//    };
//      const [openPersonal, setOpenPersonal] = useState(true);

//      const handleOpenPersonal = () => {
//        setOpenPersonal((prev) => !prev);
//      };
//     async function changeInfo() {
//       try {
//         const requestData = { ...data, id: id };
//         await axios.put("/api/user/change", requestData);
//         setData(requestData); // Update the data state with the new values
//         alert("OKKK");
//       } catch (error) {
//         alert("KO OKKK: " + error.message);
//       }
//     }
//   return (
//     <>
//       <div style={{ display: "flex" }}>
//         <ThemeProvider
//           theme={theme}
//           style={{ flex: "0 0 auto", position: "sticky", width: "178px" }}
//         >
//           <Drawer variant="permanent">
//             <List>
//               <ListItem button onClick={handleOpenPersonal}>
//                 <ListItemIcon>
//                   <InfoIcon />
//                 </ListItemIcon>

//                 <ListItemText primary="Thông tin" />
//               </ListItem>
//               <ListItem button onClick={handleOpenDebtTable}>
//                 <ListItemIcon>
//                   <CurrencyExchangeIcon />
//                 </ListItemIcon>

//                 <ListItemText primary="Công nợ" />
//               </ListItem>
//             </List>
//           </Drawer>
//         </ThemeProvider>
//       </div>
//       <div style={{ width: "88%", marginLeft: "auto", marginRight: 0 }}>
//         <Typography.Title onClick={handleOpenPersonal} level={3}>
//           Thông tin người dùng
//         </Typography.Title>
//         {openPersonal && (
//           <Form
//             form={form}
//             onValuesChange={handleFormChange}
//             initialValues={data}
//             onFinish={changeInfo}
//           >
//             <Form.Item
//               label="Mã số thuế"
//               name="mst"
//               style={{ marginLeft: "20px", textAlign: "center" }}
//               labelCol={{ span: 6 }}
//               labelAlign="left"
//               wrapperCol={{ span: 18 }}
//               rules={[{ required: true, message: "Vui lòng nhập Mã số thuế!" }]}
//             >
//               <Input style={{ width: "300px", textAlign: "center" }} />
//             </Form.Item>
//             <Form.Item
//               label="Tên đơn vị"
//               name="name"
//               style={{ marginLeft: "20px", textAlign: "center" }}
//               labelCol={{ span: 6 }}
//               labelAlign="left"
//               wrapperCol={{ span: 18 }}
//               rules={[{ required: true, message: "Vui lòng nhập Tên đơn vị!" }]}
//             >
//               <Input style={{ width: "300px", textAlign: "center" }} />
//             </Form.Item>
//             <Form.Item
//               label="Ngày thành lập"
//               name="foundatingDate"
//               style={{ marginLeft: "20px", textAlign: "center" }}
//               labelCol={{ span: 6 }}
//               labelAlign="left"
//               wrapperCol={{ span: 18 }}
//               rules={[
//                 { required: true, message: "Vui lòng chọn Ngày thành lập!" },
//               ]}
//             >
//               <DatePicker
//                 format="YYYY-MM-DD"
//                 style={{ width: "300px", textAlign: "center" }}
//               />
//             </Form.Item>
//             <Form.Item
//               label="Thành phố"
//               style={{ marginLeft: "20px", textAlign: "center" }}
//               labelCol={{ span: 6 }}
//               labelAlign="left"
//               wrapperCol={{ span: 18 }}
//               name="city"
//               rules={[{ required: true, message: "Vui lòng nhập Thành phố!" }]}
//             >
//               <Input style={{ width: "300px", textAlign: "center" }} />
//             </Form.Item>
//             <Form.Item
//               label="Quận"
//               style={{ marginLeft: "20px", textAlign: "center" }}
//               labelCol={{ span: 6 }}
//               labelAlign="left"
//               wrapperCol={{ span: 18 }}
//               name="district"
//               rules={[{ required: true, message: "Vui lòng nhập Quận!" }]}
//             >
//               <Input style={{ width: "300px", textAlign: "center" }} />
//             </Form.Item>
//             <Form.Item
//               label="Phường"
//               name="ward"
//               style={{ marginLeft: "20px", textAlign: "center" }}
//               labelCol={{ span: 6 }}
//               labelAlign="left"
//               wrapperCol={{ span: 18 }}
//               rules={[{ required: true, message: "Vui lòng nhập Phường!" }]}
//             >
//               <Input style={{ width: "300px", textAlign: "center" }} />
//             </Form.Item>
//             <Form.Item
//               label="Địa chỉ"
//               name="address"
//               style={{ marginLeft: "20px", textAlign: "center" }}
//               labelCol={{ span: 6 }}
//               labelAlign="left"
//               wrapperCol={{ span: 18 }}
//               rules={[{ required: true, message: "Vui lòng nhập Địa chỉ!" }]}
//             >
//               <Input style={{ width: "300px", textAlign: "center" }} />
//             </Form.Item>
//             <Form.Item
//               label="Tên người liên hệ"
//               style={{ marginLeft: "20px", textAlign: "center" }}
//               labelCol={{ span: 6 }}
//               labelAlign="left"
//               wrapperCol={{ span: 18 }}
//               name="contactName"
//               rules={[
//                 { required: true, message: "Vui lòng nhập Tên người liên hệ!" },
//               ]}
//             >
//               <Input style={{ width: "300px", textAlign: "center" }} />
//             </Form.Item>
//             <Form.Item
//               label="Chức vụ người liên hệ"
//               style={{ marginLeft: "20px", textAlign: "center" }}
//               labelCol={{ span: 6 }}
//               labelAlign="left"
//               wrapperCol={{ span: 18 }}
//               name="contactTitle"
//               rules={[
//                 {
//                   required: true,
//                   message: "Vui lòng nhập Chức vụ người liên hệ!",
//                 },
//               ]}
//             >
//               <Input style={{ width: "300px", textAlign: "center" }} />
//             </Form.Item>
//             <Form.Item
//               label="Email người liên hệ"
//               style={{ marginLeft: "20px", textAlign: "center" }}
//               labelCol={{ span: 6 }}
//               labelAlign="left"
//               wrapperCol={{ span: 18 }}
//               name="contactEmail"
//               rules={[
//                 {
//                   required: true,
//                   message: "Vui lòng nhập Email người liên hệ!",
//                 },
//               ]}
//             >
//               <Input style={{ width: "300px", textAlign: "center" }} />
//             </Form.Item>
//             <Form.Item
//               label="Số điện thoại người liên hệ"
//               name="contactNumber"
//               style={{ marginLeft: "20px", textAlign: "center" }}
//               labelCol={{ span: 6 }}
//               labelAlign="left"
//               wrapperCol={{ span: 18 }}
//               rules={[
//                 {
//                   required: true,
//                   message: "Vui lòng nhập Số điện thoại người liên hệ!",
//                 },
//               ]}
//             >
//               <Input style={{ width: "300px", textAlign: "center" }} />
//             </Form.Item>
//             <Form.Item>
//               <Button style={{ backgroundColor: "green", color: "white" }}  type="primary" htmlType="submit">
//                 Lưu
//               </Button>
//             </Form.Item>
//           </Form>
//         )}
//         <Divider />
//         <Typography.Title onClick={handleOpenDebtTable} level={3}>
//           Danh sách công nợ
//         </Typography.Title>
//         {openDebtTable && (
//           <Table
//             dataSource={[...debtData]}
//             columns={columns}
//             pagination={false}
//             rowKey="id"
//             summary={() => (
//               <Table.Summary.Row>
//                 <Table.Summary.Cell index={0} colSpan={2}>
//                   <strong>Tổng cộng</strong>
//                 </Table.Summary.Cell>
//                 <Table.Summary.Cell index={1}>
//                   <strong>{totalDebt}</strong>
//                 </Table.Summary.Cell>
//                 <Table.Summary.Cell index={2}>
//                   <strong>{totalPay}</strong>
//                 </Table.Summary.Cell>
//                 <Table.Summary.Cell index={3}>
//                   <strong>{totalBalance}</strong>
//                 </Table.Summary.Cell>
//               </Table.Summary.Row>
//             )}
//           />
//         )}
//       </div>
//     </>
//   );
// }

// export default User;
