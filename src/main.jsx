import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ConfigProvider } from "antd";
import viVN from "antd/locale/vi_VN";
import "dayjs/locale/vi"; // để format ngày giờ theo tiếng Việt
import dayjs from "dayjs";

dayjs.locale("vi");

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ConfigProvider locale={viVN}>
      <App />
    </ConfigProvider>
  </StrictMode>
);
