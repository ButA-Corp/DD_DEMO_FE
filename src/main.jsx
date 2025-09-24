import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import viVN from "antd/locale/vi_VN";
import "dayjs/locale/vi"; // để format ngày giờ theo tiếng Việt
import dayjs from "dayjs";
import { store } from "./store";
import { App as AntdApp } from "antd";
import "@ant-design/v5-patch-for-react-19";

dayjs.locale("vi");

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ConfigProvider locale={viVN}>
        <AntdApp>
          <App />
        </AntdApp>
      </ConfigProvider>
    </Provider>
  </StrictMode>
);
