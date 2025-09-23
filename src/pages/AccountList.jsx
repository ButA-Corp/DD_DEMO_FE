/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Tag, Button, Space } from "antd";
import { ProFormSelect, ProTable } from "@ant-design/pro-components";
import { UserOutlined } from "@ant-design/icons";
import { mockUsers } from "../constants";
import { accountListColumns } from "../utils/tables/AccountListColumns";
import { paginationToOffsetLimit } from "../utils/tables/AccountListColumns";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { AddAccountsButton } from "../components/accounts/AddAccountsButton";
import AddAccountModal from "../components/accounts/AddAccountModal";
import ImportAccountModal from "../components/accounts/ImportAccountModal";

const { Header, Footer, Content } = Layout;

const DEFAULT_QUERY = {
  page: 0,
  limit: 10,
};

const AccountListPage = () => {
  // const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [openImport, setOpenImport] = useState(false);

  const [query, setQuery] = useState(DEFAULT_QUERY);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

  // const onSubmit = (value) => {
  //   const formatValue = formatAgentBUFilter(value);
  //   setQuery({ ...DEFAULT_QUERY, ...formatValue });
  // };

  const columns = accountListColumns({
    onViewDetail: (id) => console.log(id),
    onClone: (id) => console.log(id),
    currentPage: pagination.current,
    pageSize: pagination.pageSize,
  });
  return (
    <Layout className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header className="bg-white shadow flex items-center justify-between px-6">
        <div className="flex items-center space-x-2">
          <UserOutlined className="text-xl text-blue-600" />
          <h1 className="text-lg font-semibold text-gray-800">
            Quản lý tài khoản
          </h1>
        </div>
        <AddAccountsButton
          addAccount={() => setOpenModal(true)}
          importAccounts={() => setOpenImport(true)}
        />
      </Header>

      {/* Content */}
      <Content className="p-6">
        <div className="bg-white rounded-xl shadow p-4">
          <ProTable
            rowKey="id"
            columns={columns}
            dataSource={mockUsers}
            pagination={{ pageSize: 5 }}
            headerTitle="Danh sách tài khoản"
            toolBarRender={false}
            search={{
              searchText: "Tìm kiếm",
              resetText: "Xoá tìm kiếm",
              labelWidth: 0,
              defaultCollapsed: true,
              optionRender: (formProps) => {
                return [
                  <Button
                    key="reset"
                    onClick={() => {
                      formProps?.form?.resetFields();
                      setQuery(DEFAULT_QUERY);
                    }}
                  >
                    Xoá tìm kiếm
                  </Button>,
                  <Button
                    key="submit"
                    type="default"
                    style={{ borderColor: "#eb2f96", color: "#eb2f96" }}
                    onClick={() => formProps?.form?.submit()}
                  >
                    <SearchOutlined />
                    Tìm kiếm
                  </Button>,
                ];
              },
            }}
            onChange={(pagination) => {
              setQuery((c) => ({
                ...c,
                ...paginationToOffsetLimit(
                  pagination.current,
                  pagination.pageSize
                ),
              }));
            }}
          />
        </div>
      </Content>

      <AddAccountModal
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onSubmit={(values) => {
          console.log("Tài khoản mới:", values);
          setOpenModal(false);
        }}
      />
      <ImportAccountModal
        open={openImport}
        onCancel={() => setOpenImport(false)}
        onSubmit={(data) => {
          console.log("Danh sách import:", data);
          setOpenImport(false);
        }}
      />

      {/* Footer */}
      <Footer className="text-center bg-white border-t text-gray-500">
        © {new Date().getFullYear()} Account Management - Powered by Ant Design
        + Tailwind
      </Footer>
    </Layout>
  );
};

export default AccountListPage;
