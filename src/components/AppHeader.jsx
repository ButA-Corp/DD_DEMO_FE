import React from "react";
import { Layout, Tabs } from "antd";

const { Header } = Layout;

const AppHeader = ({ activeKey, onChange }) => {
  const items = [
    {
      key: "accounts",
      label: "Quản lý tài khoản",
    },
    {
      key: "employees",
      label: "Quản lý nhân viên",
    },
  ];

  return (
    <Header className="bg-white shadow-sm px-6 flex items-center fixed top-0 w-full z-10">
      <div className="flex-1 flex items-center justify-between">
        <Tabs
          activeKey={activeKey}
          onChange={onChange}
          items={items}
          className="custom-tabs"
        />
        <button
          className="px-4 py-2  bg-red-600 text-white rounded-md hover:bg-red-700 border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition-colors duration-200
          "
          onClick={() => {
            localStorage.clear();         // Xóa token và dữ liệu user
            window.location.href = "/login"; // Redirect về login
          }}>Đăng xuất</button>
      </div>
    </Header>
  );
};

export default AppHeader;
