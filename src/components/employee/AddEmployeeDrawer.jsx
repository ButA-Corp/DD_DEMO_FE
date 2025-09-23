import React, { useState } from "react";
import {
  Drawer,
  Form,
  Input,
  Button,
  Avatar,
  DatePicker,
  Select,
  message,
  Divider,
  Upload,
  Row,
  Col,
} from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";

const AddEmployeeDrawer = ({ open, onClose, onSubmit, readOnly }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    console.log("New employee:", values);
    if (onSubmit) onSubmit(values);
    form.resetFields();
    onClose();
  };

  const handleUpload = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setProfileImage(reader.result);
      message.success("Ảnh đại diện đã được cập nhật!");
    };
    reader.readAsDataURL(file);
    return false;
  };

  return (
    <Drawer
      title={<h2>Thêm nhân viên mới</h2>}
      width={900}
      onClose={onClose}
      open={open}
      footer={
        <div className="text-right">
          <Button onClick={onClose} className="mr-2">
            Hủy
          </Button>
          <Button type="primary" onClick={() => form.submit()}>
            Lưu
          </Button>
        </div>
      }
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleFinish}
        disabled={readOnly}
      >
        {/* Avatar + Upload */}
        <div className="flex items-center gap-4 mb-6">
          <Avatar
            size={96}
            src={profileImage}
            icon={!profileImage && <UserOutlined />}
          />
          <Upload
            beforeUpload={handleUpload}
            showUploadList={false}
            accept="image/*"
          >
            <Button icon={<UploadOutlined />}>Đổi ảnh đại diện</Button>
          </Upload>
        </div>

        {/* Thông tin cơ bản */}
        <Divider orientation="left">Thông tin cơ bản</Divider>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="employee_code"
              label="Mã nhân viên"
              rules={[
                { required: true, message: "Vui lòng nhập mã nhân viên" },
              ]}
            >
              <Input placeholder="VD: E001" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="full_name"
              label="Họ và tên"
              rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
            >
              <Input placeholder="VD: Nguyễn Văn A" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="gender" label="Giới tính">
              <Select placeholder="Chọn giới tính">
                <Select.Option value="Male">Nam</Select.Option>
                <Select.Option value="Female">Nữ</Select.Option>
                <Select.Option value="Other">Khác</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="date_of_birth" label="Ngày sinh">
              <DatePicker className="w-full" format="YYYY-MM-DD" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="identity_number" label="CMT/CCCD">
              <Input placeholder="Số CMT/CCCD" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="phone_number" label="Số điện thoại">
              <Input placeholder="VD: 0912345678" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="join_date" label="Ngày vào làm">
              <DatePicker className="w-full" format="YYYY-MM-DD" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="department_code" label="Phòng ban">
              <Input placeholder="VD: Phòng Kế Toán" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="position_name" label="Chức vụ">
              <Input placeholder="VD: Trưởng phòng" />
            </Form.Item>
          </Col>
        </Row>

        {/* Thông tin bổ sung */}
        <Divider orientation="left">Thông tin bổ sung</Divider>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="salary" label="Lương cơ bản">
              <Input placeholder="VD: 15,000,000" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="allowance" label="Phụ cấp">
              <Input placeholder="VD: 2,000,000" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="bank_name" label="Ngân hàng">
              <Input placeholder="VD: Vietcombank" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="dependents" label="Người phụ thuộc">
              <Input placeholder="VD: 2" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="insurance_status" label="Trạng thái bảo hiểm">
              <Select placeholder="Chọn trạng thái">
                <Select.Option value="active">Đang tham gia</Select.Option>
                <Select.Option value="inactive">Chưa tham gia</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="union_branch" label="Chi nhánh công đoàn">
              <Input placeholder="VD: Chi nhánh A" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default AddEmployeeDrawer;
