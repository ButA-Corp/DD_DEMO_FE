import { ProFormSelect } from "@ant-design/pro-components";
import { Button, Tag } from "antd";
import {
  EyeOutlined,
  EditOutlined,
  LockOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import ConfirmActionButton from "../../components/ConfirmAction";
import { hasPermission } from "../role_helper";

import {
  STATUS_OPTIONS,
  STATUS_STYLES,
  STATUS_TEXT,
  STATUS_ENUM,
} from "../../constants";

const valueEnum = {
  Admin: { text: "Admin" },
  Manager: { text: "Quản lý" },
  User: { text: "Người dùng" },
};

export const accountListColumns = ({
  onViewDetail,
  onDelete,
  onEdit,
  onLock,
  currentPage,
  pageSize,
  role,
}) => [
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
    copyable: true,
  },
  {
    title: "Họ tên",
    dataIndex: "fullname",
  },
  {
    title: "Quyền truy cập",
    dataIndex: "vaiTro",
    filters: true,
    onFilter: true,
    valueEnum,
    render: (_, record) => (
      <Tag
        color={
          record.vaiTro === "Admin"
            ? "red"
            : record.vaiTro === "Manager"
            ? "blue"
            : "green"
        }
      >
        {valueEnum[record.vaiTro]?.text || record.vaiTro}
      </Tag>
    ),
    hideInSearch: true,
  },
  {
    title: "Trạng thái",
    dataIndex: "trangThai",
    filters: true,
    onFilter: true,
    render: (_, record) => (
      <Tag className={STATUS_STYLES[record.trangThai]}>
        {STATUS_TEXT[record.trangThai]}
      </Tag>
    ),
    renderFormItem: (_, { type }) =>
      type === "form" ? null : <ProFormSelect options={STATUS_OPTIONS} />,
  },
  {
    title: "Lần cuối đăng nhập",
    dataIndex: "lanDangNhapCuoi",
    hideInSearch: true,
  },
  {
    title: "Hành động",
    key: "action",
    valueType: "option",
    render: (_, record) => {
      const actions = [];
      console.log("Loaded role from localStorage:", localStorage.getItem("role"));
      console.log("Normalized role:", role);
      console.log("Can view detail?", hasPermission(role, "ViewAccountDetails"));

      if (hasPermission(role, "ViewAccountDetails")) {
        actions.push(
          <Button
            key="view"
            type="link"
            icon={<EyeOutlined />}
            onClick={() => onViewDetail(record?.id)}
          >
            Chi tiết
          </Button>
        );
      }

      if (hasPermission(role, "EditAccount")) {
        actions.push(
          <Button
            key="edit"
            type="link"
            icon={<EditOutlined />}
            onClick={() => onEdit(record?.id)}
            disabled={record?.trangThai === STATUS_ENUM.INACTIVE}
          >
            Sửa
          </Button>
        );
      }

      if (hasPermission(role, "LockAccount")) {
        actions.push(
          <ConfirmActionButton
            key="lock"
            buttonText="Khóa"
            confirmTitle="Xác nhận khóa tài khoản"
            confirmContent="Bạn có chắc chắn muốn khóa tài khoản này?"
            onConfirm={() => onLock(record?.id)}
            type="link"
            danger
            icon={<LockOutlined />}
            disabled={[
              STATUS_ENUM.LOCKED,
              STATUS_ENUM.INACTIVE,
            ].includes(record?.trangThai)}
          />
        );
      }

      if (hasPermission(role, "DeleteAccount")) {
        actions.push(
          <ConfirmActionButton
            key="delete"
            buttonText="Xoá"
            confirmTitle="Xác nhận xoá tài khoản"
            confirmContent="Bạn có chắc chắn muốn xoá tài khoản này?"
            onConfirm={() => onDelete(record?.id)}
            type="link"
            danger
            icon={<DeleteOutlined />}
            disabled={record?.trangThai === STATUS_ENUM.INACTIVE}
          />
        );
      }

      return actions;
    },
    width: 400,
    align: "center",
    fixed: "right",
  },
];
