import { Button, Dropdown } from "antd";
import {
  PlusOutlined,
  UploadOutlined,
  UserAddOutlined,
  DownOutlined,
} from "@ant-design/icons";

export const AddAccountsButton = ({ addAccount, importAccounts }) => {
  const items = [
    {
      key: "new",
      icon: <UserAddOutlined />,
      label: "Tạo tài khoản mới",
      handleClick: addAccount,
    },
    {
      key: "import",
      icon: <UploadOutlined />,
      label: "Nhập tài khoản hàng loạt",
      handleClick: importAccounts,
    },
  ];

  return (
    <Dropdown
      menu={{
        items: items.map((item) => ({
          key: item.key,
          icon: item.icon,
          label: (
            <span
              onClick={(e) => {
                e.stopPropagation();
                item.handleClick();
              }}
            >
              {item.label}
            </span>
          ),
        })),
      }}
      placement="bottomRight"
    >
      <Button type="primary" icon={<PlusOutlined />}>
        Thêm tài khoản <DownOutlined />
      </Button>
    </Dropdown>
  );
};
