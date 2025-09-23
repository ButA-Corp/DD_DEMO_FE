export const generateTemplateCSV = () => {
  const headers = [
    "tenDangNhap", // username
    "matKhau", // password (server sẽ hash)
    "vaiTro", // role
    "trangThai", // account_status
    "maNhanVien", // employee_code
    "hoTen", // full_name
    "email", // email
    "phongBan", // department_code
    "chucVu", // position_name
    "gioiTinh", // gender
    "ngaySinh", // date_of_birth (YYYY-MM-DD)
    "diaChi", // address
    "soDienThoai", // phone_number
    "ngayVaoLam", // join_date (YYYY-MM-DD)
    "capBac", // level
    "anhDaiDien", // profile_image (URL)
  ];

  // ví dụ mẫu (cùng thứ tự với headers)
  const sampleRow = [
    "johndoe", // tenDangNhap
    "Password123!", // matKhau
    "Admin", // vaiTro
    "Active", // trangThai
    "E001", // maNhanVien
    "John Doe", // hoTen
    "john.doe@example.com", // email
    "PB001", // phongBan
    "Truong Phong", // chucVu
    "Nam", // gioiTinh
    "1990-01-01", // ngaySinh
    "123 Đường Chính, Quận 1", // diaChi
    "0123456789", // soDienThoai
    "2022-05-01", // ngayVaoLam
    "Senior", // capBac
    "https://example.com/avt.jpg", // anhDaiDien
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
