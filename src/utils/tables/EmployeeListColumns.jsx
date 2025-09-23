import { ProFormSelect } from "@ant-design/pro-components";
import { Button, Tag } from "antd";
import {
  EyeOutlined,
  EditOutlined,
  LockOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import ConfirmActionButton from "../../components/ConfirmAction";

import {
  STATUS_OPTIONS,
  STATUS_STYLES,
  STATUS_TEXT,
  STATUS_ENUM,
} from "../../constants";

export const employeeListColumns = ({
  onViewDetail,
  onEdit,
  currentPage,
  pageSize,
}) => {
  return [
    {
      title: "STT",
      dataIndex: "index",
      valueType: "index",
      width: 48,
      render: (_, __, rowIndex) => (currentPage - 1) * pageSize + rowIndex + 1,
      hideInSearch: true,
    },
    {
      title: "Tên đăng nhập",
      dataIndex: "tenDangNhap",
      key: "tenDangNhap",
      sorter: true,
      copyable: true,
    },
    {
      title: "Họ tên",
      dataIndex: "fullname",
      key: "fullname",
      sorter: true,
    },
    {
      title: "Quyền truy cập",
      dataIndex: "vaiTro",
      key: "vaiTro",
      filters: true,
      onFilter: true,
      valueEnum: {
        Admin: { text: "Admin" },
        "Quản lý": { text: "Quản lý" },
        "Người dùng": { text: "Người dùng" },
      },
      render: (_, record) => {
        const color =
          record.vaiTro === "Admin"
            ? "red"
            : record.vaiTro === "Quản lý"
            ? "blue"
            : "green";
        return <Tag color={color}>{record.vaiTro}</Tag>;
      },
      hideInSearch: true,
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      key: "trangThai",
      filters: true,
      onFilter: true,
      render: (_, record) => {
        return (
          <Tag className={STATUS_STYLES[record.trangThai]}>
            {STATUS_TEXT[record.trangThai]}
          </Tag>
        );
      },
      renderFormItem: (_, { type }) => {
        if (type === "form") return null;
        return (
          <ProFormSelect
            options={STATUS_OPTIONS}
            fieldProps={{
              defaultValue: STATUS_ENUM.ALL,
            }}
            mode="multiple"
          />
        );
      },
    },
    {
      title: "Lần cuối đăng nhập",
      dataIndex: "lanDangNhapCuoi",
      key: "lanDangNhapCuoi",
      sorter: true,
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
          onClick={() => onViewDetail(record)}
        >
          Chi tiết
        </Button>,
        <Button
          key="edit"
          type="link"
          icon={<EditOutlined />}
          onClick={() => onEdit(record)}
        >
          Sửa
        </Button>,
        record.status === "Locked" ? (
          <Button key="unlock" type="link" icon={<LockOutlined />}>
            Mở khóa
          </Button>
        ) : (
          <ConfirmActionButton
            buttonText="Khóa"
            buttonType="default"
            confirmTitle="Xác nhận khóa tài khoản"
            confirmContent="Bạn có chắc chắn muốn khóa tài khoản này?"
            onConfirm={() => {
              console.log("Đã xác nhận khóa!");
            }}
            icon={<LockOutlined />}
            type="link"
            danger
          />
        ),
        <ConfirmActionButton
          buttonText="Xoá"
          confirmTitle="Xác nhận xoá tài khoản"
          confirmContent="Bạn có chắc chắn muốn xoá tài khoản này?"
          onConfirm={() => {
            console.log("Đã xác nhận xoá!");
          }}
          type="link"
          danger
          icon={<DeleteOutlined />}
        />,
      ],
      width: 400,
      align: "center",
      fixed: "right",
    },
  ];
};
