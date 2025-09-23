import { Modal, Form, Input, Select, Button } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons";

const { Option } = Select;

const AddAccountModal = ({ open, onCancel, onSubmit }) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      console.log("Form data:", values);
      if (onSubmit) onSubmit(values);
      form.resetFields();
    } catch (err) {
      console.log("Validation failed:", err);
    }
  };

  return (
    <Modal
      title={
        <span className="font-semibold text-gray-700">Thêm tài khoản</span>
      }
      open={open}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Hủy
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Lưu
        </Button>,
      ]}
      className="rounded-xl w-[800px]"
    >
      <Form form={form} layout="vertical" className="mt-4">
        {/* Username */}
        <Form.Item
          name="username"
          label="Tên người dùng"
          rules={[
            { required: true, message: "Vui lòng nhập tên người dùng" },
            { min: 4, message: "Tên người dùng tối thiểu 4 ký tự" },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Nhập tên người dùng" />
        </Form.Item>

        {/* Password */}
        <Form.Item
          name="password"
          label="Mật khẩu"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu" },
            { min: 6, message: "Mật khẩu tối thiểu 6 ký tự" },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Nhập mật khẩu"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>

        {/* Role */}
        <Form.Item
          name="role"
          label="Quyền truy cập"
          rules={[{ required: true, message: "Vui lòng chọn quyền truy cập" }]}
        >
          <Select placeholder="Chọn quyền">
            <Option value="Admin">Admin</Option>
            <Option value="Manager">Manager</Option>
            <Option value="User">User</Option>
          </Select>
        </Form.Item>

        {/* Status */}
        <Form.Item
          name="status"
          label="Trạng thái"
          rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
        >
          <Select placeholder="Chọn trạng thái">
            <Option value="Active">Active</Option>
            <Option value="Inactive">Inactive</Option>
            <Option value="Locked">Locked</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddAccountModal;
