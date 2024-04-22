import { useEffect } from "react";
import { useAuth } from "../../context/AuthProvider/userAuth";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

export const ProtectedLayout = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth();
  const navigate = useNavigate();

  // Lógica para redirecionar o usuário para página de login
  useEffect(() => {
    if (!auth.email) {
      message.error("Faça o login para acessar essa página.");
      navigate("/login");
    }
  }, [auth.email, navigate]);

  if (!auth.email) {
    return <h1>Você não tem acesso</h1>;
  }

  return children;
};
