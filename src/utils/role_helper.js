// utils/role.js
export const Role = {
  Admin: "Admin",
  Manager: "Manager",
  User: "User",
};

export const hasPermission = (role, action) => {
  const roleMatrix = {
    AddAccount: [Role.Admin],
    EditAccount: [Role.Admin],
    DeleteAccount: [Role.Admin],
    LockAccount: [Role.Admin],
    ViewAccountDetails: [Role.Admin, Role.Manager],
    ImportAccount: [Role.Admin],
    AddEmployee: [Role.Admin],
    ViewEmployee: [Role.Admin, Role.Manager, Role.User],
    ImportEmployee: [Role.Admin],
    AccessChat: [Role.Admin, Role.Manager, Role.User],
  };

  return roleMatrix[action]?.includes(role);
};