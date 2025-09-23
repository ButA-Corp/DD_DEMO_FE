import React from "react";
import { Modal, Button } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { confirm } = Modal;

/**
 * Hàm hiển thị confirm dialog
 * @param {string} title - Tiêu đề của confirm
 * @param {string} content - Nội dung mô tả
 * @param {function} onOk - Hàm callback khi xác nhận
 */
const showConfirm = ({ title, content, onOk }) => {
  confirm({
    title,
    icon: <ExclamationCircleOutlined />,
    content,
    okText: "Xác nhận",
    cancelText: "Hủy",
    centered: true,
    onOk,
  });
};

/**
 * Component wrapper dạng Button + Confirm
 */
const ConfirmActionButton = ({
  buttonText,
  buttonType = "primary",
  confirmTitle,
  confirmContent,
  onConfirm,
  ...props
}) => {
  const handleClick = () => {
    showConfirm({
      title: confirmTitle,
      content: confirmContent,
      onOk: onConfirm,
    });
  };

  return (
    <Button type={buttonType} onClick={handleClick} {...props}>
      {buttonText}
    </Button>
  );
};

export default ConfirmActionButton;
