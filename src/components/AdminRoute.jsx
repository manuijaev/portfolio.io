import { Navigate } from "react-router-dom";
import { usePortfolio } from "../ context/PortfolioContext";

export default function AdminRoute({ children }) {
  const { adminSession } = usePortfolio();

  if (!adminSession.authenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
