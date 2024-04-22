import { Button, Checkbox, Form, Input, message } from "antd";
import { useAuth } from "../../context/AuthProvider/userAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  type FieldType = {
    email?: string;
    password?: string;
    remember?: string;
  };

  async function onFinish(values: { email: string; password: string }) {
    try {
      await auth.authenticate(values.email, values.password);
      navigate("/profile");
    } catch (error) {
      console.log(error);

      message.error(
        "Credenciais inválidas. Por favor, verifique seu email e senha."
      );
    }
  }

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="E-mail"
        name="email"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item<FieldType>
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Entrar
        </Button>
      </Form.Item>
    </Form>
  );
};
export default Login;
