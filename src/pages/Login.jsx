import React, { useState } from "react";
import { Form, Input, Button, Card, message } from "antd";
import {
  useLoginMutation,
} from "../apis/index.js";

function Login({ onLogin }) {
  const [loading, setLoading] = useState(false);
  const [login] = useLoginMutation();
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (values) => {
    try {
      setLoading(true);
      setErrorMsg("");
      // Gọi API backend để login
      const res = await login({
        username: values.username,
        password: values.password,
      });
      if(res.error?.status === 401) {
        setErrorMsg("Sai tài khoản hoặc mật khẩu");
        return;
      }
      if (res.data?.accessToken) {
        localStorage.setItem("token", res.data.accessToken);
        localStorage.setItem("role", res.data.role);
        message.success("Login thành công!");
        onLogin(); // callback để redirect sang main app
      } else {
        setErrorMsg("Sai tài khoản hoặc mật khẩu");
      }
    } catch (error) {
      setErrorMsg("Đăng nhập thất bại", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-96 shadow-xl rounded-xl">
        <h2 className="text-center text-xl font-bold mb-6">Login</h2>
        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Vui lòng nhập username" }]}
          >
            <Input placeholder="Nhập username" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập password" }]}
            validateStatus={errorMsg ? "error" : ""}
            help={errorMsg}
          >
            <Input.Password placeholder="Nhập password" />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            block
            loading={loading}
          >
            Login
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default Login;
