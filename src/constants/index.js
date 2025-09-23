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
  { value: STATUS_ENUM.ACTIVE, label: STATUS_TEXT.ACTIVE },
  { value: STATUS_ENUM.INACTIVE, label: STATUS_TEXT.INACTIVE },
  { value: STATUS_ENUM.LOCKED, label: STATUS_TEXT.LOCKED },
];

export const ACCOUNT_LABELS = {
  username: "Tên",
  password: "Mật khẩu",
  role: "Vai trò",
  account_status: "Trạng thái",
  employee_code: "Mã nhân viên",
  full_name: "Họ và tên",
  email: "Email",
  department_code: "Phòng ban",
  position_name: "Vị trí",
  gender: "Giới tính",
  date_of_birth: "Ngày sinh",
  address: "Địa chỉ",
  phone_number: "Số điện thoại",
  join_date: "Ngày tham gia",
  level: "Cấp bậc",
  profile_image: "Ảnh",
};
