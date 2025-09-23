import React, { useState } from "react";
import { Modal, Upload, Button, Table, message, Alert, Tooltip } from "antd";
import {
  UploadOutlined,
  FileDoneOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import Papa from "papaparse";
import { generateTemplateCSV } from "../../utils";
import { ACCOUNT_LABELS } from "../../constants";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const requiredColumns = [
  "username",
  "password",
  "role",
  "account_status",
  "employee_code",
  "full_name",
  "email",
  "department_code",
  "position_name",
];

const optionalColumns = [
  "gender",
  "date_of_birth",
  "address",
  "phone_number",
  "join_date",
  "level",
  "profile_image",
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

          // check username trùng
          if (seenUsernames.has(row.username)) {
            rowErrors.username = "Username trùng";
          } else if (!row.username) {
            rowErrors.username = "Username không được để trống";
          } else {
            seenUsernames.add(row.username);
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

  const columns = [...requiredColumns, ...optionalColumns].map((col) => ({
    title: ACCOUNT_LABELS[col],
    dataIndex: col,
    key: col,
    width: 150,
    ellipsis: true,
    render: (text, record) => renderCell(text, record, col),
  }));

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
              onSubmit(parsedData.map(({ ...rest }) => rest)); // bỏ lỗi khi submit
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

      {/* Preview bảng */}
      {parsedData.length > 0 && (
        <div className="mt-4">
          <Table
            dataSource={parsedData}
            columns={columns}
            size="small"
            scroll={{ x: "max-content" }}
            rowKey={(record, idx) => record.username || idx}
            pagination={{ pageSize: 5 }}
          />
        </div>
      )}
    </Modal>
  );
}
