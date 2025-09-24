import { notification } from "antd";
import dayjs from "dayjs";

export const generateTemplateCSV = () => {
  const headers = [
    "userName", // tên đăng nhập
    "password", // mật khẩu
    "role", // vai trò
    "status", // trạng thái
    "codeEmployee", // mã nhân viên
    "fullName", // họ tên
    "email", // email
    "department", // phòng ban
    "position", // chức vụ
    "gender", // giới tính
    "dateOfBirth", // ngày sinh (YYYY-MM-DD)
    "address", // địa chỉ
    "phoneNumber", // số điện thoại
    "startDate", // ngày vào làm (YYYY-MM-DD)
    "rank", // cấp bậc
  ];
  // ví dụ mẫu (cùng thứ tự với headers)
  const sampleRow = [
    "johndoe", // userName
    "Password123!", // password
    "Admin", // role
    "Active", // status
    "E001", // codeEmployee
    "John Doe", // fullName
    "john.doe@example.com", // email
    "PB001", // department
    "Truong Phong", // position
    "Nam", // gender
    "1990-01-01", // dateOfBirth
    "123 Đường Chính Quận 1", // address
    "0123456789", // phoneNumber
    "2022-05-01", // startDate
    "Senior", // rank
  ];
  const csvContent = [headers.join(","), sampleRow.join(",")].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "account_template.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const handleApiOperation = async ({
  asyncResult,
  alertMessage,
  handleSuccess,
  handleError,
}) => {
  try {
    console.log(asyncResult);
    const response = await asyncResult;
    if (response?.message?.includes("successfully")) {
      notification.success({
        message: "Success",
        description: `${alertMessage} thành công!`,
      });
      handleSuccess?.();
    } else {
      notification.error({
        message: "Error",
        description: `${response?.message}!`,
      });
    }
  } catch (err) {
    console.log(err);
    notification.error({
      message: "Error",
      description: `${alertMessage} thất bại!`,
    });
    handleError?.();
    return false;
  }
};

export const normalizeInitialAccDetail = (apiAccount, readOnly) => {
  const nv = apiAccount?.nhanVien || {};
  const safeDate = (d) => (d ? dayjs(d) : null);

  return {
    // ảnh nếu có
    anhDaiDien: nv.anhDaiDien ?? null,

    // nhóm cơ bản
    maNhanVien: nv.maNhanVien ?? "",
    hoTen: nv.hoTen ?? "",
    email: nv.email ?? "",
    gioiTinh: nv.gioiTinh ?? undefined, // Select
    ngaySinh: readOnly ? nv.ngaySinh ? (safeDate(nv.ngaySinh))?.format('YYYY-MM-DD') : (safeDate(nv.ngaySinh)) : undefined, // DatePicker
    cccd: nv.cccd ?? "",
    soDienThoai: nv.soDienThoai ?? "",
    ngayVaoLam: readOnly ? nv.ngayVaoLam ? (safeDate(nv.ngayVaoLam))?.format('YYYY-MM-DD') : (safeDate(nv.ngayVaoLam)) : undefined, // DatePicker
    phongBan: nv.phongBan ?? "",
    chucVu: nv.chucVu ?? "",

    // nhóm bổ sung
    luongCoBan: nv.luongCoBan ?? "",
    phuCapSinhHoat: nv.phuCapSinhHoat ?? "",
    nganHang: nv.nganHang ?? "",
    soTu: nv.soTu ?? "",
    trangThaiBaoHiem: nv.trangThaiBaoHiem ?? undefined, // Select
    chiNhanhCongDoan: nv.chiNhanhCongDoan ?? "",
  };
};

/**
 * Format form values -> API payload create employee
 * @param {object} values - dữ liệu từ form (antd form)
 */
export const formatPayload = (values) => {
  const toStr = (d) => (d ? dayjs(d).format("YYYY-MM-DD") : null);

  return {
    codeEmployee: values.maNhanVien || "",

    fullName: values.hoTen || "",
    gender: values.gioiTinh || "",
    dateOfBirth: toStr(values.ngaySinh),

    citizenId: values.cccd || "",
    issueDate: toStr(values.ngayCap),
    placeOfIssue: values.noiCap || "",

    phoneNumber: values.soDienThoai || "",
    email: values.email || "",
    address: values.diaChi || "",
    district: values.quan || "",
    ward: values.phuong || "",
    province: values.tinh || "",
    country: values.quocGia || "",

    startDate: toStr(values.ngayVaoLam),
    position: values.chucVu || "",
    department: values.phongBan || "",
    rank: values.capBac || "",

    profilePicture: values.anhDaiDien || "",

    baseSalary: values.luongCoBan ? Number(values.luongCoBan) : 0,
    phoneAllowance: values.phuCapDienThoai ? Number(values.phuCapDienThoai) : 0,
    transportAllowance: values.phuCapXangXe ? Number(values.phuCapXangXe) : 0,
    livingAllowance: values.phuCapSinhHoat ? Number(values.phuCapSinhHoat) : 0,

    attendanceBonus: values.thuongChuyenCan
      ? Number(values.thuongChuyenCan)
      : 0,
    kpiBonus: values.thuongKpi ? Number(values.thuongKpi) : 0,
    seniorityBonus: values.thuongThamNien ? Number(values.thuongThamNien) : 0,
    otherBonus: values.thuongKhac ? Number(values.thuongKhac) : 0,

    bankName: values.nganHang || "",
    accountNumber: values.soTaiKhoan || "",
    cardNumber: values.soTheAtm || "",
    paymentMethod: values.phuongThucThanhToan || "",

    unionBranch: values.chiNhanhCongDoan || "",
    insuranceStatus: values.trangThaiBaoHiem || "",
    insuranceNumber: values.soBaoHiem || "",
    insuranceStartDate: toStr(values.ngayThamGiaBaoHiem),

    employeeStatus: values.trangThaiNv || "",
    promotionDate: toStr(values.ngayThangChuc),

    zaloVerified: values.xacMinhZalo ? Number(values.xacMinhZalo) : 0,
    temporaryResidence: values.tamTru ? Number(values.tamTru) : 0,
    roomNumber: values.soTu || "",
  };
};
