import React, { useState } from "react";
import {
  Drawer,
  Button,
  Descriptions,
  Avatar,
  Upload,
  message,
  Divider,
} from "antd";
import { UploadOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import ChangePasswordModal from "./ChangePasswordModal";

const AccountDetailDrawer = ({ open, onClose, account }) => {
  const [profileImage, setProfileImage] = useState(account?.profile_image);
  const [openChangePassword, setOpenChangePassword] = useState(false);

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
      title={<h2>Thông tin tài khoản</h2>}
      placement="right"
      width={840}
      onClose={onClose}
      open={open}
      extra={
        <Button
          type="primary"
          icon={<LockOutlined />}
          onClick={() => setOpenChangePassword(true)}
        >
          Thay đổi mật khẩu
        </Button>
      }
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
      <Descriptions column={2} bordered size="small">
        <Descriptions.Item label="Họ tên">
          {account?.full_name}
        </Descriptions.Item>
        <Descriptions.Item label="Email">{account?.email}</Descriptions.Item>
        <Descriptions.Item label="Giới tính">
          {account?.gender}
        </Descriptions.Item>
        <Descriptions.Item label="Mã nhân viên">
          {account?.employee_code}
        </Descriptions.Item>
        <Descriptions.Item label="Phòng ban">
          {account?.department_code}
        </Descriptions.Item>
        <Descriptions.Item label="Ngày sinh">
          {account?.date_of_birth}
        </Descriptions.Item>
        <Descriptions.Item label="Số điện thoại">
          {account?.phone_number}
        </Descriptions.Item>
        <Descriptions.Item label="Địa chỉ">
          {account?.address}
        </Descriptions.Item>
        <Descriptions.Item label="Ngày vào làm">
          {account?.join_date}
        </Descriptions.Item>
        <Descriptions.Item label="Chức vụ">
          {account?.position_name}
        </Descriptions.Item>
        <Descriptions.Item label="Trạng thái">
          {account?.account_status}
        </Descriptions.Item>
      </Descriptions>

      {/* Thông tin bổ sung */}
      <Divider orientation="left" className="mt-10">
        Thông tin bổ sung
      </Divider>
      <Descriptions column={2} bordered size="small">
        <Descriptions.Item label="Lương cơ bản">
          {account?.base_salary}
        </Descriptions.Item>
        <Descriptions.Item label="Phụ cấp">
          {account?.allowance}
        </Descriptions.Item>
        <Descriptions.Item label="Tiền thưởng">
          {account?.bonus}
        </Descriptions.Item>
        <Descriptions.Item label="Ngân hàng">
          {account?.bank_name}
        </Descriptions.Item>
        <Descriptions.Item label="Số tài khoản">
          {account?.bank_account}
        </Descriptions.Item>
        <Descriptions.Item label="Trạng thái bảo hiểm">
          {account?.insurance_status}
        </Descriptions.Item>
        <Descriptions.Item label="Người phụ thuộc">
          {account?.dependents}
        </Descriptions.Item>
        <Descriptions.Item label="Chi nhánh công đoàn">
          {account?.union_branch}
        </Descriptions.Item>
      </Descriptions>

      <ChangePasswordModal
        open={openChangePassword}
        onCancel={() => setOpenChangePassword(false)}
        onSubmit={(values) => {
          console.log("Đổi mật khẩu:", values);
          setOpenChangePassword(false);
        }}
      />
    </Drawer>
  );
};

export default AccountDetailDrawer;
