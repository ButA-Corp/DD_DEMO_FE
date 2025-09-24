/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Modal,
  Upload,
  Button,
  Table,
  message,
  Alert,
  Tooltip,
  notification,
} from "antd";
import {
  UploadOutlined,
  FileDoneOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import Papa from "papaparse";
import { generateTemplateCSV } from "../../utils";
import { ACCOUNT_LABELS } from "../../constants";
import {
  useCreateAccountMutation,
  useImportAccountsMutation,
} from "../../apis";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const requiredColumns = [
  "userName", // tên đăng nhập
  "password", // mật khẩu (CSV nhập plain; backend sẽ hash)
  "role", // vai trò
  "status", // trạng thái tài khoản
  "codeEmployee", // mã nhân viên
  "fullName", // họ và tên
  "email", // email nhân viên
  "department", // mã phòng ban
  "position", // chức vụ
];

const optionalColumns = [
  "gender", // giới tính
  "dateOfBirth", // ngày sinh
  "address", // địa chỉ
  "phoneNumber", // số điện thoại
  "startDate", // ngày vào làm
  "rank", // cấp bậc
];

export default function ImportAccountModal({ open, onCancel, onSubmit }) {
  const [parsedData, setParsedData] = useState([]);
  const [summary, setSummary] = useState(null);

  const handleFileUpload = (file) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      encoding: "UTF-8",
      complete: (result) => {
        const data = result.data;
        const headers = result.meta.fields;

        // check thiếu header bắt buộc
        const missingColumns = requiredColumns.filter(
          (col) => !headers.includes(col)
        );
        if (missingColumns.length > 0) {
          message.error(`Thiếu cột bắt buộc: ${missingColumns.join(", ")}`);
          return;
        }

        const seenUsernames = new Set();
        let totalErrors = 0;

        const cleanedData = data.map((row) => {
          const rowErrors = {};

          // check tenDangNhap trùng / trống
          if (seenUsernames.has(row.userName)) {
            rowErrors.userName = "Tên đăng nhập trùng";
          } else if (!row.userName) {
            rowErrors.userName = "Tên đăng nhập không được để trống";
          } else {
            seenUsernames.add(row.userName);
          }

          // check email
          if (!row.email || !emailRegex.test(row.email)) {
            rowErrors.email = "Email không hợp lệ";
          }

          totalErrors += Object.keys(rowErrors).length;

          return { ...row, _rowErrors: rowErrors };
        });

        setParsedData(cleanedData);
        setSummary({
          total: data.length,
          success:
            data.length -
            cleanedData.filter((r) => Object.keys(r._rowErrors).length > 0)
              .length,
          failed: cleanedData.filter(
            (r) => Object.keys(r._rowErrors).length > 0
          ).length,
        });

        if (totalErrors > 0) {
          message.warning("Có lỗi trong file, kiểm tra bảng preview");
        } else {
          message.success("File hợp lệ, sẵn sàng import");
        }
      },
    });
    return false;
  };

  const renderCell = (text, record, column) => {
    const hasError = record._rowErrors && record._rowErrors[column];
    return hasError ? (
      <Tooltip title={record._rowErrors[column]}>
        <div className="bg-red-100 text-red-600 px-2 py-1 rounded flex items-center gap-1">
          <ExclamationCircleOutlined />
          {text || "<trống>"}
        </div>
      </Tooltip>
    ) : (
      text
    );
  };

  const [importAccounts] = useImportAccountsMutation();

  const handleSubmit = async (data) => {
    try {
      const response = await importAccounts(data).unwrap();
      console.log(response);

      if (response?.status === 200) {
        notification.success({
          message: "Success",
          description: ` thành công!`,
        });
      } else {
        notification.error({
          message: "Error",
          description: `${response?.data?.message}!`,
        });
      }
    } catch (err) {
      console.log("Error:", err);
      notification.error({
        message: "Error",
        description: "Thất bại",
      });
      return false;
    }
    onSubmit();
  };

  const columns = [...requiredColumns, ...optionalColumns].map((col) => ({
    title: ACCOUNT_LABELS[col],
    dataIndex: col,
    key: col,
    width: 150,
    ellipsis: true,
    render: (text, record) => renderCell(text, record, col),
  }));

  useEffect(() => {
    if (!open && parsedData) {
      setParsedData([]);
      setSummary(null);
    }
  }, [open]); // giữ nguyên logic

  return (
    <Modal
      title="Import tài khoản hàng loạt"
      open={open}
      onCancel={onCancel}
      width={1100}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Hủy
        </Button>,
        <Button
          key="import"
          type="primary"
          disabled={parsedData.some(
            (row) => Object.keys(row._rowErrors).length > 0
          )}
          onClick={() => {
            const hasError = parsedData.some(
              (row) => Object.keys(row._rowErrors).length > 0
            );
            if (hasError) {
              message.error("Không thể import do có dữ liệu lỗi");
            } else {
              handleSubmit(parsedData.map(({ _rowErrors, ...rest }) => rest));
              // gửi dữ liệu đã map theo cột TV; bỏ trường _rowErrors khi submit
            }
          }}
        >
          Import
        </Button>,
      ]}
    >
      <div className="flex gap-2 mb-3">
        <Upload
          beforeUpload={handleFileUpload}
          accept=".csv"
          showUploadList={false}
        >
          <Button icon={<UploadOutlined />}>Chọn file CSV</Button>
        </Upload>
        <Button type="link" onClick={generateTemplateCSV}>
          Tải file mẫu CSV
        </Button>
      </div>

      {summary && (
        <Alert
          className="mb-4"
          icon={<FileDoneOutlined />}
          message={
            <div>
              <p>
                Tổng số bản ghi: <b>{summary.total}</b>
              </p>
              <p className="text-green-600">
                Thành công: <b>{summary.success}</b>
              </p>
              <p className="text-red-600">
                Thất bại: <b>{summary.failed}</b>
              </p>
            </div>
          }
          type={summary.failed > 0 ? "warning" : "success"}
          showIcon
        />
      )}

      {parsedData.length > 0 && (
        <div className="mt-4">
          <Table
            dataSource={parsedData}
            columns={columns}
            size="small"
            scroll={{
              x: 500,
            }}
            rowKey={(record, idx) => record.tenDangNhap || idx}
            pagination={{ pageSize: 5 }}
          />
        </div>
      )}
    </Modal>
  );
}
