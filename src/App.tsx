import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import ProtectRoute from "./context/ProtectRoute";
import OtpProtect from "./context/OtpProtect";
import Dashboard from "./pages/Dashboard";
import Layout from "./Layout/Layout";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import OtpPage from "./pages/OtpPage";
import DetailProfile from "./pages/DetailProfile";
import LeaveApplication from "./pages/LeaveApplication";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route redirects to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Login page */}
        <Route path="/login" element={<Login />} />
        <Route path="/otp" element={<OtpProtect><OtpPage /></OtpProtect>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected pages with layout */}
        <Route
          path="/"
          element={
            // <ProtectRoute>
            <Layout />
            // </ProtectRoute>
          }
        >
          <Route path="/employee-dashboard" element={<Dashboard />} />
          <Route path="/detail-profile" element={<DetailProfile />} />
          <Route path="/leave-application" element={<LeaveApplication />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
