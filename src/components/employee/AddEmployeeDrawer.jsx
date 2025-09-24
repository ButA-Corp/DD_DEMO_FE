import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
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
import ReadOnlyField from "../ReadOnlyField";

const AddEmployeeDrawer = ({ open, onClose, readOnly, id }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [form] = Form.useForm();
  const title = "Thông tin nhân viên";

  const [getAccountDetail, { data, isLoading, isFetching }] =
    useLazyGetAccountDetailQuery();
  const [createEmployee] = useCreateEmployeeMutation();
  const [accDetail, setAccDetail] = useState();

  // Format date for read-only display (accepts dayjs or string)

  const fetchAccDetail = async () => {
    if (!id) return;
    try {
      const response = await getAccountDetail(id).unwrap();
      const item = response?.item ?? response;
      setAccDetail(item);

      // normalize initial (your helper)
      let initial = normalizeInitialAccDetail(item, readOnly) || {};

      // convert date fields to dayjs objects if they are not already
      ["ngaySinh", "ngayVaoLam"].forEach((k) => {
        if (initial[k]) {
          // only convert when not a dayjs already
          if (!(dayjs.isDayjs && dayjs.isDayjs(initial[k]))) {
            initial[k] = dayjs(initial[k]);
            // if invalid date, set null to avoid DatePicker crash
            if (!initial[k].isValid()) initial[k] = null;
          }
        } else {
          initial[k] = null;
        }
      });

      // set profile image if exists
      if (item?.profileImage || item?.profile_image) {
        setProfileImage(item.profileImage || item.profile_image);
      }

      form.setFieldsValue(initial);
      console.log("Set form values:", initial);
    } catch (error) {
      console.error("fetchAccDetail error:", error);
      notification.error({ message: "Error", description: String(error) });
    }
  };

  useEffect(() => {
    if (id && open) {
      fetchAccDetail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, open]);

  // reset when closing to avoid stale values (and avoid DatePicker complaining later)
  useEffect(() => {
    if (!open) {
      form.resetFields();
      setProfileImage(null);
      setAccDetail(undefined);
    }
  }, [open, form]);

  const handleFinish = async (values) => {
    // ensure date fields are converted to string YYYY-MM-DD before submit
    const payloadValues = {
      ...values,
      ngaySinh: values.ngaySinh
        ? dayjs(values.ngaySinh).format("YYYY-MM-DD")
        : null,
      ngayVaoLam: values.ngayVaoLam
        ? dayjs(values.ngayVaoLam).format("YYYY-MM-DD")
        : null,
    };

    const payload = formatPayload(payloadValues);
    try {
      const response = await createEmployee(payload).unwrap();
      console.log(response);

      if (response?.item) {
        notification.success({
          message: "Success",
          description: `Thao tác thành công!`,
        });
      } else {
        notification.error({
          message: "Error",
          description: `${response?.data?.message || "Không xác định"}!`,
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
  };

  const RO = (name, editable, fmt) =>
    readOnly ? (
      <ReadOnlyField
        value={fmt ? fmt(form.getFieldValue(name)) : form.getFieldValue(name)}
      />
    ) : (
      editable
    );

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
        >
          {/* Avatar + Upload */}
          <div className="flex items-center gap-4 mb-6">
            <Avatar
              size={96}
              src={profileImage}
              icon={!profileImage && <UserOutlined />}
            />
            {!readOnly && (
              <Upload
                beforeUpload={handleUpload}
                showUploadList={false}
                accept="image/*"
              >
                <Button icon={<UploadOutlined />}>Đổi ảnh đại diện</Button>
              </Upload>
            )}
          </div>

          <Divider orientation="left">Thông tin cơ bản</Divider>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="maNhanVien"
                label="Mã nhân viên"
                rules={[
                  { required: true, message: "Vui lòng nhập mã nhân viên" },
                ]}
              >
                {RO("maNhanVien", <Input placeholder="VD: E001" />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="hoTen"
                label="Họ và tên"
                rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
              >
                {RO("hoTen", <Input placeholder="VD: Nguyễn Văn A" />)}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, message: "Vui lòng nhập email" }]}
              >
                {RO("email", <Input placeholder="VD: thubui@gmail.com" />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="gioiTinh"
                label="Giới tính"
                rules={[{ required: true, message: "Vui lòng nhập" }]}
              >
                {RO(
                  "gioiTinh",
                  <Select placeholder="Chọn giới tính">
                    <Select.Option value="Nam">Nam</Select.Option>
                    <Select.Option value="Nữ">Nữ</Select.Option>
                    <Select.Option value="Khác">Khác</Select.Option>
                  </Select>
                )}
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
                <DatePicker
                  className="w-full"
                  format="YYYY-MM-DD"
                  placeholder="YYYY-MM-DD"
                  disabled={readOnly}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="cccd"
                label="CMT/CCCD"
                rules={[{ required: true, message: "Vui lòng nhập" }]}
              >
                {RO("cccd", <Input placeholder="Số CMT/CCCD" />)}
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
                {RO("soDienThoai", <Input placeholder="VD: 0912345678" />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="ngayVaoLam"
                label="Ngày vào làm"
                rules={[{ required: true, message: "Vui lòng nhập" }]}
              >
                <DatePicker
                  className="w-full"
                  format="YYYY-MM-DD"
                  placeholder="YYYY-MM-DD"
                  disabled={readOnly}
                />
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
                {RO("phongBan", <Input placeholder="VD: PB Kế Toán" />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="chucVu"
                label="Chức vụ"
                rules={[{ required: true, message: "Vui lòng nhập" }]}
              >
                {RO("chucVu", <Input placeholder="VD: Trưởng phòng" />)}
              </Form.Item>
            </Col>
          </Row>

          <Divider orientation="left">Thông tin bổ sung</Divider>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="luongCoBan" label="Lương cơ bản">
                {RO("luongCoBan", <Input placeholder="VD: 15,000,000" />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="phuCapSinhHoat" label="Phụ cấp sinh hoạt">
                {RO("phuCapSinhHoat", <Input placeholder="VD: 2,000,000" />)}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="nganHang" label="Ngân hàng">
                {RO("nganHang", <Input placeholder="VD: Vietcombank" />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="soTu" label="Người phụ thuộc">
                {RO("soTu", <Input placeholder="VD: 2" />)}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="trangThaiBaoHiem" label="Trạng thái bảo hiểm">
                {RO(
                  "trangThaiBaoHiem",
                  <Select placeholder="Chọn trạng thái">
                    <Select.Option value="active">Đang tham gia</Select.Option>
                    <Select.Option value="inactive">
                      Chưa tham gia
                    </Select.Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="chiNhanhCongDoan" label="Chi nhánh công đoàn">
                {RO(
                  "chiNhanhCongDoan",
                  <Input placeholder="VD: Chi nhánh A" />
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Spin>
    </Drawer>
  );
};

export default AddEmployeeDrawer;
