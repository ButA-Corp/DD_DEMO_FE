import React from "react";
import { Layout } from "antd";

const { Footer } = Layout;
const AppFooter = () => {
  return (
    <Footer className="text-center bg-white border-t text-gray-500 fixed bottom-0 w-full">
      © {new Date().getFullYear()} TamyBui-AnhTruong
    </Footer>
  );
};

export default AppFooter;
