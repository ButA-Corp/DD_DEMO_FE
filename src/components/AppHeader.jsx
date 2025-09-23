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
      <div className="flex-1">
        <Tabs
          activeKey={activeKey}
          onChange={onChange}
          items={items}
          className="custom-tabs"
        />
      </div>
    </Header>
  );
};

export default AppHeader;
