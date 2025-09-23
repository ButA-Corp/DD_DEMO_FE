export const generateTemplateCSV = () => {
  const headers = [
    "username",
    "password",
    "role",
    "account_status",
    "employee_code",
    "full_name",
    "email",
    "department_code",
    "position_name",
    "gender",
    "date_of_birth",
    "address",
    "phone_number",
    "join_date",
    "level",
    "profile_image",
  ];

  // ví dụ mẫu
  const sampleRow = [
    "johndoe",
    "Password123!",
    "Admin",
    "Active",
    "E001",
    "John Doe",
    "john.doe@example.com",
    "D001",
    "Manager",
    "Male",
    "1990-01-01",
    "123 Main St",
    "0123456789",
    "2022-05-01",
    "Senior",
    "https://example.com/profile.jpg",
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
