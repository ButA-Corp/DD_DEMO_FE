/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Layout, Button } from "antd";
import { ProTable } from "@ant-design/pro-components";
import { UserOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { employeeListColumns } from "../utils/tables/EmployeeListColumns.jsx";
import {
  useGetEmployeesQuery,
  useDeleteAccountMutation,
} from "../apis/index.js";
import ImportAccountModal from "../components/accounts/ImportAccountModal";
import AddEmployeeDrawer from "../components/employee/AddEmployeeDrawer.jsx";
import { hasPermission } from "../utils/role_helper";

const { Header, Content } = Layout;

const DEFAULT_QUERY = {
  PageNumber: 1,
  limit: 10,
};

const EmployeeListPage = () => {
  const [openImport, setOpenImport] = useState(false);
  const [query, setQuery] = useState(DEFAULT_QUERY);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) setRole(storedRole);
  }, []);

  const { data, isLoading } = useGetEmployeesQuery(query, {
    refetchOnMountOrArgChange: true,
    skip: !role, // ✅ avoid calling hook before role is loaded
  });


  const [deleteAccount] = useDeleteAccountMutation();

  const handleViewDetail = (id) => {
    console.log(id);
    setSelectedAccount(id);
    setOpenDetailModal(true);
  };

  const handleDelete = (id) => {
    console.log("Delete employee ID:", id);
    // optional: call delete mutation
  };

  const columns = employeeListColumns({
    onViewDetail: (id) => handleViewDetail(id),
    onDelete: handleDelete,
    currentPage: pagination.current,
    pageSize: pagination.pageSize,
    role,
  });

  const onSubmit = (value) => {
    const payload = {
      CodeEmployeeOrFullName: value?.maNhanVien || value?.hoTen,
    };
    setQuery({ ...DEFAULT_QUERY, ...payload });
  };
  if (!role) return null;

  const resetAll = () => {
    setOpenDetailModal(false);
    setSelectedAccount(null);
  };

  return (
    <Layout className="min-h-screen bg-gray-50 mt-16">
      {/* Header */}
      <Header className="bg-white shadow flex items-center justify-between px-6">
        <div className="flex items-center space-x-2">
          <UserOutlined className="text-xl text-blue-600" />
          <h1 className="text-lg font-semibold text-gray-800">
            Quản lý nhân viên
          </h1>
        </div>

        <div className="flex gap-2">
          {hasPermission(role, "AddEmployee") && (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setSelectedAccount(null);
                setOpenDetailModal(true);
              }}
            >
              Thêm nhân viên
            </Button>
          )}
        </div>
      </Header>

      {/* Content */}
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
              showTotal: false,
            }}
            headerTitle="Danh sách nhân viên"
            toolBarRender={false}
            loading={isLoading}
            search={{
              searchText: "Tìm kiếm",
              resetText: "Xoá tìm kiếm",
              labelWidth: 0,
              defaultCollapsed: true,
              optionRender: (formProps) => [
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
              ],
            }}
            onChange={(pg) => {
              const { current, pageSize } = pg;
              setPagination({ current, pageSize });
              setQuery((q) => ({
                ...q,
                PageNumber: current,
                limit: pageSize,
              }));
            }}
            onSubmit={onSubmit}
          />
        </div>
      </Content>

      {hasPermission(role, "ImportEmployee") && (
        <ImportAccountModal
          open={openImport}
          onCancel={() => setOpenImport(false)}
          onSubmit={(data) => {
            console.log("Danh sách import:", data);
            setOpenImport(false);
          }}
        />
      )}

      <AddEmployeeDrawer
        open={openDetailModal}
        onClose={resetAll}
        readOnly={!!selectedAccount}
        id={selectedAccount}
      />
    </Layout>
  );
};

export default EmployeeListPage;
