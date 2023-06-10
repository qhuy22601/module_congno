import React, { useState, useEffect } from "react";
import { Form, Input, Button, message, Card, Select } from "antd";
import axios from "axios";

const EmailForm = () => {
  const [form] = Form.useForm();
  const [attachment, setAttachment] = useState(null);
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [emailData, setEmailData] = useState([]);
  const [formData, setFormData] = useState({ msgBody: null });

  useEffect(() => {
    const fetchEmailData = async () => {
      try {
        const response = await axios.get("/api/debt/getAll");
        const emailData = response.data;
        setEmailData(emailData);
        const emailAddresses = emailData.map(
          (email) => email.user?.contactEmail
        );
        setEmails(emailAddresses);
      } catch (error) {
        message.error("Failed to fetch email data: " + error.message);
      }
    };

    fetchEmailData();
  }, []);

  useEffect(() => {
    const fetchSelectedEmailData = () => {
      const selectedEmailData = emailData.find(
        (email) => email.user?.contactEmail === selectedEmail
      );
      if (selectedEmailData) {
        form.setFieldsValue({
          msgBody: `Tên: ${selectedEmailData.user.name}\nMST: ${selectedEmailData.user.mst}\nNgày: ${selectedEmailData.date}\nCông nợ: ${selectedEmailData.debt}`,
        });
        setFormData(selectedEmailData);
      } else {
        form.setFieldsValue({ msgBody: null });
        setFormData({ msgBody: null });
      }
    };

    fetchSelectedEmailData();
  }, [selectedEmail, emailData, form]);

  const onFinish = async (values) => {
    const { recipient, msgBody, subject } = values;

    const formData = new FormData();
    formData.append("recipient", recipient);
    formData.append("msgBody", msgBody);
    formData.append("subject", subject);
    if (attachment) {
      formData.append("attachment", attachment, attachment.name);
    }

    try {
      await axios.post("/api/email/sendMailWithAttach", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      message.success("Email sent successfully.");
      form.resetFields();
    } catch (error) {
      message.error("Failed to send email: " + error.message);
    }
  };
  const handleEmailChange = (value) => {
    setSelectedEmail(value);
  };

  const onFileChange = (event) => {
    const file = event.target.files[0];
    setAttachment(file);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card style={{ width: 500 }}>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="recipient"
            label="Người nhận"
            rules={[{ required: true, message: "Điền vào chỗ trống" }]}
          >
            <Select
              showSearch
              placeholder="Chọn hoặc nhập địa chỉ email người nhận"
              optionFilterProp="children"
              onChange={handleEmailChange}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {emails.map((email) => (
                <Select.Option key={email} value={email}>
                  {email}
                </Select.Option>
              ))}
              <Select.Option value="manual">
                Nhập địa chỉ email khác
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="subject"
            label="CC"
            rules={[{ required: true, message: "Điền vào chỗ trống" }]}
          >
            <Input placeholder="CC" />
          </Form.Item>
          <Form.Item
            name="msgBody"
            label="Nội dung"
            rules={[{ required: true, message: "Điền vào chỗ trống" }]}
          >
            <Input.TextArea
              placeholder="Nội dung..."
              autoSize={{ minRows: 5, maxRows: 10 }}
              value={formData.msgBody}
              onChange={(e) =>
                setFormData({ ...formData, msgBody: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Tập tin">
            <input type="file" onChange={onFileChange} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Send Email
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default EmailForm;
