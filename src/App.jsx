import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Layout } from "antd";
import Login from "./pages/Login";
import AccountList from "./pages/AccountList";
import EmployeeListPage from "./pages/EmployeeList";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import "./App.scss";

const { Content } = Layout;

function HomePage() {
  const [activeTab, setActiveTab] = useState("accounts");
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

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/home" />
            ) : (
              <Login onLogin={() => setIsAuthenticated(true)} />
            )
          }
        />

        <Route
          path="/home"
          element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />}
        />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
