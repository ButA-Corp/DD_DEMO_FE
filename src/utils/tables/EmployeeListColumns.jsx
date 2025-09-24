import React from "react";
import { Button, Space } from "antd";
import { hasPermission } from "../role_helper";

export const employeeListColumns = ({ onViewDetail, onDelete, role }) => [
  {
    title: "Mã nhân viên",
    dataIndex: "maNhanVien",
  },
  {
    title: "Họ tên",
    dataIndex: "hoTen",
  },
  {
    title: "Thao tác",
    render: (_, record) => (
      <Space>
        {hasPermission(role, "ViewEmployee") && (
          <Button onClick={() => onViewDetail(record.id)}>Xem</Button>
        )}
        {hasPermission(role, "DeleteEmployee") && (
          <Button danger onClick={() => onDelete(record.id)}>Xoá</Button>
        )}
      </Space>
    ),
  },
];
