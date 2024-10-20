import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginDashboard from "./components/LoginDashboard";
import UserDashboard from "./components/UserDashboard";

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
      <div
        className="min-h-screen"
        style={{
          background:
            "linear-gradient(135deg,#0000 20.5%,#e0e0e0 0 29.5%,#0000 0) 0 31px, linear-gradient(45deg,#0000 8%,#e0e0e0 0 17%, #0000 0 58%) 62px 0, linear-gradient(135deg,#0000 8%,#e0e0e0 0 17%, #0000 0 58%,#e0e0e0 0 67%,#0000 0), linear-gradient(45deg,#0000 8%,#e0e0e0 0 17%, #0000 0 58%,#e0e0e0 0 67%,#0000 0 83%,#e0e0e0 0 92%,#0000 0), #f0f0f0",
          backgroundSize: "124px 124px",
        }}
      >
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginDashboard />} />
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
