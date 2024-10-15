import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginDashboard from "./components/LoginDashboard";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";

/**
 * private route for the admin to navigate to it's dashboard
 * @param param0 the jsx element
 * @returns
 */
function PrivateRouteAdmin({ children }: { children: JSX.Element }) {
  const adminId = localStorage.getItem("adminId");
  return adminId ? children : <Navigate to={"/login"} />;
}

/**
 * private route for the user to navigate to it's dashboard
 * @param param0 the jsx element
 * @returns
 */
function PrivateRouteUser({ children }: { children: JSX.Element }) {
  const userId = localStorage.getItem("userId");
  return userId ? children : <Navigate to={"/login"} />;
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-custom-platinum">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginDashboard />} />
          <Route
            path="/admin-dashboard"
            element={
              <PrivateRouteAdmin>
                <AdminDashboard />
              </PrivateRouteAdmin>
            }
          />
          <Route
            path="/user-dashboard"
            element={
              <PrivateRouteUser>
                <UserDashboard />
              </PrivateRouteUser>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
