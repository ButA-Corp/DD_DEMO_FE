import { Tag, Button } from "antd";
import { EyeOutlined } from "@ant-design/icons";

export const employeeListColumns = ({
  onViewDetail,
  currentPage,
  pageSize,
}) => {
  return [
    {
      title: "STT",
      dataIndex: "index",
      valueType: "index",
      width: 60,
      render: (_, __, rowIndex) => (currentPage - 1) * pageSize + rowIndex + 1,
      hideInSearch: true,
    },
    {
      title: "Mã nhân viên",
      dataIndex: "maNhanVien",
      key: "maNhanVien",
      sorter: true,
      copyable: true,
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      key: "hoTen",
      sorter: true,
    },
    {
      title: "Giới tính",
      dataIndex: "gioiTinh",
      key: "gioiTinh",
      filters: true,
      onFilter: true,
      render: (value) => {
        if (!value) return "-";
        const color = value === "Nam" ? "blue" : "pink";
        return <Tag color={color}>{value}</Tag>;
      },
      hideInSearch: true,
    },
    {
      title: "Ngày sinh",
      dataIndex: "ngaySinh",
      key: "ngaySinh",
      sorter: true,
      render: (value) => (value ? new Date(value).toLocaleDateString() : "-"),
      hideInSearch: true,
    },
    {
      title: "CMT/CCCD",
      dataIndex: "cccd",
      key: "cccd",
      copyable: true,
      hideInSearch: true,
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDienThoai",
      key: "soDienThoai",
      hideInSearch: true,
    },
    {
      title: "Ngày vào làm",
      dataIndex: "ngayVaoLam",
      key: "ngayVaoLam",
      sorter: true,
      render: (value) => (value ? new Date(value).toLocaleDateString() : "-"),
      hideInSearch: true,
    },
    {
      title: "Phòng ban",
      dataIndex: "phongBan",
      key: "phongBan",
      hideInSearch: true,
    },
    {
      title: "Chức vụ",
      dataIndex: "chucVu",
      key: "chucVu",
      hideInSearch: true,
    },
    {
      title: "Hành động",
      key: "action",
      valueType: "option",
      render: (_, record) => [
        <Button
          key="view"
          type="link"
          icon={<EyeOutlined />}
          onClick={() => onViewDetail(record?.id)}
        >
          Chi tiết
        </Button>,
      ],
      width: 120,
      align: "center",
      fixed: "right",
    },
  ];
};
