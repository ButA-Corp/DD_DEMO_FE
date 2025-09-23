/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Tag, Button, Space, Spin } from "antd";
import { ProFormSelect, ProTable } from "@ant-design/pro-components";
import { UserOutlined } from "@ant-design/icons";
import { mockUsers } from "../constants";
import { accountListColumns } from "../utils/tables/AccountListColumns";
import { paginationToOffsetLimit } from "../utils/tables/AccountListColumns";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { AddAccountsButton } from "../components/accounts/AddAccountsButton";
import AddAccountModal from "../components/accounts/AddAccountModal";
import ImportAccountModal from "../components/accounts/ImportAccountModal";
import AccountDetailDrawer from "../components/accounts/AccountDetail.jsx";
import AddEmployeeDrawer from "../components/employee/AddEmployeeDrawer.jsx";
import {
  useGetAccountsQuery,
  useDeleteAccountMutation,
} from "../apis/index.js";

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
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [openDetailModal, setOpenDetailModal] = useState(false);

  const { data, error, isLoading } = useGetAccountsQuery();
  const [deleteAccount] = useDeleteAccountMutation();

  const columns = accountListColumns({
    onViewDetail: (id) => setSelectedAccount(id),
    onClone: (id) => console.log(id),
    currentPage: pagination.current,
    pageSize: pagination.pageSize,
  });

  if (isLoading) return <Spin />;
  // if (error) return <p>Error loading accounts</p>;

  return (
    <Layout className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header className="bg-white shadow flex items-center justify-between px-6">
        <div className="flex items-center space-x-2">
          <UserOutlined className="text-xl text-blue-600" />
          <h1 className="text-lg font-semibold text-gray-800">
            Quản lý tài khoản nhân viên
          </h1>
        </div>

        <div className="flex gap-2">
          <AddAccountsButton
            addAccount={() => setOpenModal(true)}
            importAccounts={() => setOpenImport(true)}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setOpenDetailModal(true)}
          >
            Thêm nhân viên
          </Button>
        </div>
      </Header>

      {/* Content */}
      <Content className="p-6">
        <div className="bg-white rounded-xl shadow p-4">
          <ProTable
            rowKey="id"
            columns={columns}
            dataSource={data?.items?.$values || mockUsers}
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

      <AddAccountModal open={openModal} onCancel={() => setOpenModal(false)} />
      <ImportAccountModal
        open={openImport}
        onCancel={() => setOpenImport(false)}
        onSubmit={(data) => {
          console.log("Danh sách import:", data);
          setOpenImport(false);
        }}
      />
      {/* <AccountDetailDrawer
        open={!!selectedAccount}
        account={selectedAccount}
        onClose={() => setSelectedAccount(null)}
      /> */}
      <AddEmployeeDrawer
        open={openDetailModal}
        onClose={() => setOpenDetailModal(false)}
        onSubmit={(data) => {
          console.log("Employee data:", data);
        }}
        readOnly={selectedAccount}
      />
    </Layout>
  );
};

export default AccountListPage;
