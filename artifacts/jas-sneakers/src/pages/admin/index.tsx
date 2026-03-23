import { useAuth } from "@/lib/auth";
import AdminLogin from "./login";
import AdminDashboard from "./dashboard";

export default function AdminRouter() {
  const { token } = useAuth();
  
  if (!token) {
    return <AdminLogin />;
  }

  return <AdminDashboard />;
}
