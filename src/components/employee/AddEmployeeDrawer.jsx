import React, { useState, useEffect } from "react";
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
  notification,
  Spin,
} from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import {
  useCreateEmployeeMutation,
  useLazyGetAccountDetailQuery,
} from "../../apis";
import { formatPayload, normalizeInitialAccDetail } from "../../utils";

const AddEmployeeDrawer = ({ open, onClose, readOnly, id }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [form] = Form.useForm();
  const title = readOnly
    ? "Thông tin nhân viên"
    : id
    ? "Chỉnh sửa thông tin nhân viên"
    : "Thêm nhân viên mới";

  const [getAccountDetail, { data, isLoading, isFetching }] =
    useLazyGetAccountDetailQuery();
  const [createEmployee] = useCreateEmployeeMutation();
  const [accDetail, setAccDetail] = useState();

  const fetchAccDetail = async () => {
    try {
      const response = await getAccountDetail(id).unwrap();
      console.log(data, response);
      setAccDetail(response?.item);
    } catch (error) {
      notification.error({ message: "Error", description: error });
    }
  };

  const handleFinish = async (values) => {
    const payload = formatPayload(values);
    try {
      const response = await createEmployee(payload).unwrap();
      console.log(response);

      if (response?.item) {
        notification.success({
          message: "Success",
          description: ` thành công!`,
        });
      } else {
        notification.error({
          message: "Error",
          description: `${response?.data?.message}!`,
        });
      }
    } catch (err) {
      console.log("Error:", err);
      notification.error({
        message: "Error",
        description: "Thất bại",
      });
      return false;
    }

    form.resetFields();
    onClose();

    // call API...
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

  useEffect(() => {
    if (id) {
      fetchAccDetail();
    }
  }, [id]);

  return (
    <Drawer
      title={<h2>{title}</h2>}
      width={900}
      onClose={onClose}
      open={open}
      footer={
        !readOnly && (
          <div className="text-right">
            <Button onClick={onClose} className="mr-2">
              Hủy
            </Button>
            <Button type="primary" onClick={() => form.submit()}>
              Lưu
            </Button>
          </div>
        )
      }
    >
      <Spin spinning={isLoading || isFetching}>
        <Form
          layout="vertical"
          form={form}
          onFinish={handleFinish}
          disabled={readOnly}
          initialValues={normalizeInitialAccDetail(accDetail)} // <-- thêm ở bước 2
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

          <Divider orientation="left">Thông tin cơ bản</Divider>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="maNhanVien" // employee_code
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
                name="hoTen" // full_name
                label="Họ và tên"
                rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
              >
                <Input placeholder="VD: Nguyễn Văn A" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="email" // full_name
                label="Email"
                rules={[{ required: true, message: "Vui lòng nhập email" }]}
              >
                <Input placeholder="VD: thubui@gmail.com" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="gioiTinh"
                label="Giới tính"
                rules={[{ required: true, message: "Vui lòng nhập" }]}
              >
                <Select placeholder="Chọn giới tính">
                  <Select.Option value="Nam">Nam</Select.Option>
                  <Select.Option value="Nữ">Nữ</Select.Option>
                  <Select.Option value="Khác">Khác</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="ngaySinh"
                label="Ngày sinh"
                rules={[{ required: true, message: "Vui lòng nhập" }]}
              >
                <DatePicker className="w-full" format="YYYY-MM-DD" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="cccd"
                label="CMT/CCCD"
                rules={[{ required: true, message: "Vui lòng nhập" }]}
              >
                <Input placeholder="Số CMT/CCCD" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="soDienThoai"
                label="Số điện thoại"
                rules={[{ required: true, message: "Vui lòng nhập" }]}
              >
                <Input placeholder="VD: 0912345678" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="ngayVaoLam"
                label="Ngày vào làm"
                rules={[{ required: true, message: "Vui lòng nhập" }]}
              >
                <DatePicker className="w-full" format="YYYY-MM-DD" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="phongBan"
                label="Phòng ban"
                rules={[{ required: true, message: "Vui lòng nhập" }]}
              >
                <Input placeholder="VD: PB Kế Toán" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="chucVu"
                label="Chức vụ"
                rules={[{ required: true, message: "Vui lòng nhập" }]}
              >
                <Input placeholder="VD: Trưởng phòng" />
              </Form.Item>
            </Col>
          </Row>

          <Divider orientation="left">Thông tin bổ sung</Divider>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="luongCoBan" label="Lương cơ bản">
                <Input placeholder="VD: 15,000,000" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="phuCapSinhHoat" label="Phụ cấp sinh hoạt">
                <Input placeholder="VD: 2,000,000" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="nganHang" label="Ngân hàng">
                <Input placeholder="VD: Vietcombank" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="soTu" label="Người phụ thuộc">
                <Input placeholder="VD: 2" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="trangThaiBaoHiem" label="Trạng thái bảo hiểm">
                <Select placeholder="Chọn trạng thái">
                  <Select.Option value="active">Đang tham gia</Select.Option>
                  <Select.Option value="inactive">Chưa tham gia</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="chiNhanhCongDoan" label="Chi nhánh công đoàn">
                <Input placeholder="VD: Chi nhánh A" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Spin>
    </Drawer>
  );
};

export default AddEmployeeDrawer;
