import React, { useState, useEffect } from "react";
import "./App.scss";
import AccountList from "./pages/AccountList";
import { Layout } from "antd";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import EmployeeListPage from "./pages/EmployeeList";
import Login from "./pages/Login";

const { Content } = Layout;

function App() {
  const [activeTab, setActiveTab] = useState("accounts");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [activeTab, setActiveTab] = useState("accounts");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

    const handleLogin = () => {
      setIsAuthenticated(true);
    };

  // const handleLogout = () => {
  //   localStorage.removeItem("access_token");
  //   setIsAuthenticated(false);
  // };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Layout className="min-h-screen overflow-hidden">
      <AppHeader activeKey={activeTab} onChange={setActiveTab} />
      <Content>
        {activeTab === "accounts" ? <AccountList /> : <EmployeeListPage />}
      </Content>
      <AppFooter />
    </Layout>
  );
}

export default App;
