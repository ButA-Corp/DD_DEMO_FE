/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Layout, Button } from "antd";
import { ProTable } from "@ant-design/pro-components";
import { UserOutlined, SearchOutlined } from "@ant-design/icons";
import { accountListColumns } from "../utils/tables/AccountListColumns";
import { AddAccountsButton } from "../components/accounts/AddAccountsButton";
import AddAccountModal from "../components/accounts/AddAccountModal";
import ImportAccountModal from "../components/accounts/ImportAccountModal";
import AccountDetailDrawer from "../components/accounts/AccountDetail.jsx";
import {
  useGetAccountsQuery,
  useDeleteAccountMutation,
} from "../apis/index.js";
import { handleApiOperation } from "../utils/index.js";
import { hasPermission } from "../utils/role_helper";

const { Header, Content } = Layout;
const DEFAULT_QUERY = { PageNumber: 1, limit: 10 };
const role = localStorage.getItem("role");

const AccountListPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openImport, setOpenImport] = useState(false);
  const [query, setQuery] = useState(DEFAULT_QUERY);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [readOnly, setReadOnly] = useState(false);

  const { data, isLoading } = useGetAccountsQuery(query, {
    refetchOnMountOrArgChange: true,
  });

  const [deleteAccount] = useDeleteAccountMutation();

  const handleDelete = (id) => {
    handleApiOperation({
      asyncResult: deleteAccount({ id, mode: "delete" }).unwrap(),
      alertMessage: "Xoá tài khoản",
    });
  };

  const handleLock = (id) => {
    handleApiOperation({
      asyncResult: deleteAccount({ id, mode: "lock" }).unwrap(),
      alertMessage: "Khoá tài khoản",
    });
  };

  const handleViewDetail = (id) => {
    setSelectedAccount(id);
    setOpenDetailModal(true);
    setReadOnly(true);
  };

  const handleEdit = (id) => {
    setSelectedAccount(id);
    setOpenDetailModal(true);
    setReadOnly(false);
  };

  const columns = accountListColumns({
    onViewDetail: handleViewDetail,
    onEdit: handleEdit,
    onDelete: handleDelete,
    onLock: handleLock,
    currentPage: pagination.current,
    pageSize: pagination.pageSize,
    role, // important!
  });

  const onSubmit = (value) => {
    setQuery({
      ...DEFAULT_QUERY,
      UserNameOrFullName: value?.tenDangNhap || value?.fullname,
      Status: value?.trangThai,
    });
  };

  return (
    <Layout className="min-h-screen bg-gray-50 mt-16">
      <Header className="bg-white shadow flex items-center justify-between px-6">
        <div className="flex items-center space-x-2">
          <UserOutlined className="text-xl text-blue-600" />
          <h1 className="text-lg font-semibold text-gray-800">Quản lý tài khoản</h1>
        </div>
        <div className="flex gap-2">
          {(hasPermission(role, "AddAccount") || hasPermission(role, "ImportAccount")) && (
            <AddAccountsButton
              addAccount={() => setOpenModal(true)}
              importAccounts={() => setOpenImport(true)}
            />
          )}
        </div>
      </Header>

      <Content className="p-6">
        <div className="bg-white rounded-xl shadow p-4">
          <ProTable
            rowKey="id"
            columns={columns}
            dataSource={data?.items?.$values || []}
            pagination={{
              total: data?.total || 0,
              current: pagination.current,
              pageSize: pagination.pageSize,
            }}
            headerTitle="Danh sách tài khoản"
            toolBarRender={false}
            loading={isLoading}
            search={{
              searchText: "Tìm kiếm",
              resetText: "Xoá tìm kiếm",
              labelWidth: 0,
              defaultCollapsed: false,
              optionRender: (formProps) => [
                <Button key="reset" onClick={() => {
                  formProps?.form?.resetFields();
                  setQuery(DEFAULT_QUERY);
                }}>
                  Xoá tìm kiếm
                </Button>,
                <Button key="submit" type="default" style={{ borderColor: "#eb2f96", color: "#eb2f96" }}
                        onClick={() => formProps?.form?.submit()}>
                  <SearchOutlined /> Tìm kiếm
                </Button>
              ],
            }}
            onChange={({ current, pageSize }) => {
              setPagination({ current, pageSize });
              setQuery((q) => ({ ...q, PageNumber: current, limit: pageSize }));
            }}
            onSubmit={onSubmit}
          />
        </div>
      </Content>

      <AddAccountModal open={openModal} onCancel={() => setOpenModal(false)} />
      {hasPermission(role, "ImportAccount") && (
        <ImportAccountModal
          open={openImport}
          onCancel={() => setOpenImport(false)}
          onSubmit={(data) => {
            console.log("Imported:", data);
            setOpenImport(false);
          }}
        />
      )}
      <AccountDetailDrawer
        open={openDetailModal}
        onClose={() => setOpenDetailModal(false)}
        readOnly={readOnly}
        id={selectedAccount}
      />
    </Layout>
  );
};

export default AccountListPage;
