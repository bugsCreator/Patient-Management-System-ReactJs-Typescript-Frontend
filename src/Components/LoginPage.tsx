
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { LoginRequest } from '../Requests';


interface IUser {
  username: string;
  password: string;
}
const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const movePage = useNavigate();


  const onFinish = (values: IUser) => {
    setError("")
    setLoading(true);
    LoginRequest(values.username, values.password).then((response) => {
      if (response.data.error) { throw new Error(response.data.errMsg) }
      localStorage.setItem('token', response.data.data.token);
      movePage('/')
      setLoading(false);
    }).catch((error) => {
      setError(error?.response?.data?.errMsg);
      setLoading(false);
    })
  };



  return (
    <LoginPageContainer>
      <LoginFormContainer>
        <LoginFormHeader>
          <LoginFormHeaderTitle>Login</LoginFormHeaderTitle>
        </LoginFormHeader>
        <LoginFormContent>
          <Form
            name="login"
            onFinish={onFinish}
            onChange={() => { setError("") }}
          >
            <Form.Item
              name="username"

              rules={[
                { required: true, message: 'Please input your username!' },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            {error && (
              <div className='ant-form-item-explain-error'>{error}</div>
            )}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </LoginFormContent>
      </LoginFormContainer>
    </LoginPageContainer>
  );
};

export default LoginPage;

const LoginPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const LoginFormContainer = styled.div`
  width: 400px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

const LoginFormHeader = styled.div`
  padding: 24px;
  background-color: #fff;
  text-align: center;
`;

const LoginFormHeaderTitle = styled.h1`
  margin: 0;
  font-size: 24px;
`;

const LoginFormContent = styled.div`
  padding: 24px;
  background-color: #fff;
`;