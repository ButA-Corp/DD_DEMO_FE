import { ProFormSelect } from "@ant-design/pro-components";
import { Button, Tag } from "antd";
import {
  EyeOutlined,
  EditOutlined,
  LockOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import {
  STATUS_OPTIONS,
  STATUS_STYLES,
  STATUS_TEXT,
  STATUS_ENUM,
} from "../../constants";

export const accountListColumns = ({
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
      dataIndex: "username",
      key: "username",
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
      dataIndex: "role",
      key: "role",
      filters: true,
      onFilter: true,
      valueEnum: {
        Admin: { text: "Admin" },
        "Quản lý": { text: "Quản lý" },
        "Người dùng": { text: "Người dùng" },
      },
      render: (_, record) => {
        const color =
          record.role === "Admin"
            ? "red"
            : record.role === "Quản lý"
            ? "blue"
            : "green";
        return <Tag color={color}>{record.role}</Tag>;
      },
      hideInSearch: true,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      filters: true,
      onFilter: true,
      render: (_, record) => {
        return (
          <Tag className={STATUS_STYLES[record.status]}>
            {STATUS_TEXT[record.status]}
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
      dataIndex: "lastLogin",
      key: "lastLogin",
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
          <Button key="lock" type="link" danger icon={<LockOutlined />}>
            Khóa
          </Button>
        ),
        <Button key="delete" type="link" danger icon={<DeleteOutlined />}>
          Xóa
        </Button>,
      ],
      width: 400,
      align: "center",
      fixed: "right",
    },
  ];
};

export const paginationToOffsetLimit = (current, pageSize) => ({
  page: current - 1,
  limit: pageSize,
});
