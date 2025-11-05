import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Layout from "./Layout/Layout";

function App() {
  // return <h1>Hello</h1>
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Redirect root path to employee-dashboard */}
          <Route index element={<Navigate to="employee-dashboard" replace />} />

          {/* Dashboard route */}
          <Route path="employee-dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
