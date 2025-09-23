// import React, { useState } from "react";
import "./App.scss";
import AccountList from "./pages/AccountList";
import { Layout } from "antd";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";

const { Content } = Layout;

function App() {
  // const [activeTab, setActiveTab] = useState("accounts");
  return (
    <Layout className="min-h-screen overflow-hidden">
      {/* <AppHeader activeKey={activeTab} onChange={setActiveTab} /> */}
      <Content>
        <AccountList />
      </Content>
      <AppFooter />
    </Layout>
  );
}

export default App;
