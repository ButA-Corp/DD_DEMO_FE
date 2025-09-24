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
      copyable: true,
    },
    {
      title: "Họ tên",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "Quyền truy cập",
      dataIndex: "vaiTro",
      key: "vaiTro",
      filters: true,
      onFilter: true,
      valueEnum,
      render: (_, record) => {
        const color =
          record.vaiTro === "Admin"
            ? "red"
            : record.vaiTro === "Manager"
            ? "blue"
            : "green";
        const text = valueEnum[record.vaiTro]?.text || record.vaiTro;
        return <Tag color={color}>{text}</Tag>;
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
          />
        );
      },
    },
    {
      title: "Lần cuối đăng nhập",
      dataIndex: "lanDangNhapCuoi",
      key: "lanDangNhapCuoi",
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
        <Button
          key="edit"
          type="link"
          icon={<EditOutlined />}
          onClick={() => onEdit(record?.id)}
          disabled={[STATUS_ENUM.INACTIVE]?.includes(
            record?.trangThai
          )}
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
              onLock(record?.id);
            }}
            icon={<LockOutlined />}
            type="link"
            danger
            disabled={[STATUS_ENUM.LOCKED, STATUS_ENUM.INACTIVE]?.includes(
              record?.trangThai
            )}
          />
        ),
        <ConfirmActionButton
          buttonText="Xoá"
          confirmTitle="Xác nhận xoá tài khoản"
          confirmContent="Bạn có chắc chắn muốn xoá tài khoản này?"
          onConfirm={() => {
            onDelete(record?.id);
          }}
          type="link"
          danger
          disabled={record?.trangThai === STATUS_ENUM.INACTIVE}
          icon={<DeleteOutlined />}
        />,
      ],
      width: 400,
      align: "center",
      fixed: "right",
    },
  ];
};

export const paginationToOffsetLimit = (current, pageSize) => ({
  PageNumber: current > 1 ? current - 1 : current,
  limit: pageSize,
});
