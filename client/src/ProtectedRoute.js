import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("chat-app-user");

    if (pathname === "/login" && user) return navigate("/");
    if (!user) return navigate("/login");
  }, [pathname]);

  return element;
};

export default ProtectedRoute;
