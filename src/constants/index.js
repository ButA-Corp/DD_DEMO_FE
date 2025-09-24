export const mockUsers = [
  {
    id: 1,
    username: "admin01",
    fullname: "Nguyễn Văn A",
    role: "Admin",
    status: "ACTIVE",
    lastLogin: "2025-09-20 14:35",
  },
  {
    id: 2,
    username: "manager02",
    fullname: "Trần Thị B",
    role: "Quản lý",
    status: "INACTIVE",
    lastLogin: "2025-09-18 09:12",
  },
  {
    id: 3,
    username: "user03",
    fullname: "Lê Văn C",
    role: "Người dùng",
    status: "LOCKED",
    lastLogin: "2025-09-15 21:47",
  },
  {
    id: 4,
    username: "user04",
    fullname: "Phạm Thị D",
    role: "Người dùng",
    status: "ACTIVE",
    lastLogin: "2025-09-22 08:30",
  },
  {
    id: 5,
    username: "manager05",
    fullname: "Hoàng Văn E",
    role: "Quản lý",
    status: "INACTIVE",
    lastLogin: "2025-09-21 17:22",
  },
];

export const STATUS_ENUM = {
  ACTIVE: "Active",
  INACTIVE: "Inactive",
  LOCKED: "Locked",
  ALL: "ALL",
};

export const STATUS_TEXT = {
  [STATUS_ENUM.ACTIVE]: "Hoạt động",
  [STATUS_ENUM.INACTIVE]: "Không hoạt động",
  [STATUS_ENUM.LOCKED]: "Khóa",
  [STATUS_ENUM.ALL]: "Tất cả",
};

export const STATUS_STYLES = {
  [STATUS_ENUM.ACTIVE]: "text-green-600 bg-green-100",
  [STATUS_ENUM.INACTIVE]: "text-gray-600 bg-gray-100",
  [STATUS_ENUM.LOCKED]: "text-red-600 bg-red-100",
};

export const STATUS_OPTIONS = [
  { value: STATUS_ENUM.ALL, label: STATUS_TEXT.ALL },
  { value: STATUS_ENUM.ACTIVE, label: STATUS_TEXT.Active },
  { value: STATUS_ENUM.INACTIVE, label: STATUS_TEXT.Inactive },
  { value: STATUS_ENUM.LOCKED, label: STATUS_TEXT.Locked },
];

export const ACCOUNT_LABELS = {
  userName: "Tên đăng nhập", // tenDangNhap
  password: "Mật khẩu", // matKhau
  role: "Vai trò", // vaiTro
  status: "Trạng thái", // trangThai
  codeEmployee: "Mã nhân viên", // maNhanVien
  fullName: "Họ và tên", // hoTen
  email: "Email", // email
  department: "Phòng ban", // phongBan
  position: "Chức vụ", // chucVu
  gender: "Giới tính", // gioiTinh
  dateOfBirth: "Ngày sinh", // ngaySinh
  address: "Địa chỉ", // diaChi
  phoneNumber: "Số điện thoại", // soDienThoai
  startDate: "Ngày vào làm", // ngayVaoLam
  rank: "Cấp bậc", // capBac
  profileImage: "Ảnh đại diện", // anhDaiDien
  statusRow: "Nội dung lỗi"
};
