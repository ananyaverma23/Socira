import { Routes, Route } from "react-router-dom";

// 🌍 Common Pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";

// 👤 User Dashboard Imports
import UserDashboardLayout from "./pages/dashboards/user/UserDashboardLayout";
import Overview from "./pages/dashboards/user/Overview";
import Societies from "./pages/dashboards/user/Societies";
import Saved from "./pages/dashboards/user/Saved";
import Settings from "./pages/dashboards/user/Settings";

// 🏛️ Society Dashboard Imports
import SocietyDashboardLayout from "./pages/dashboards/society/SocietyDashboardLayout";
import SocietyOverview from "./pages/dashboards/society/SocietyOverview";
import CreateEvent from "./pages/dashboards/society/CreateEvent";
import MyEvents from "./pages/dashboards/society/MyEvents";
import Chat from "./pages/dashboards/society/Chat";
import Members from "./pages/dashboards/society/Members";
import SocietySettings from "./pages/dashboards/society/Settings";

function App() {
  return (
    <Routes>
      {/* ========== PUBLIC ROUTES ========== */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ========== USER DASHBOARD ========== */}
      <Route path="/user/dashboard" element={<UserDashboardLayout />}>
        {/* Default route (when visiting /user/dashboard) */}
        <Route index element={<Overview />} />
        <Route path="overview" element={<Overview />} />
        <Route path="societies" element={<Societies />} />
        <Route path="saved" element={<Saved />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* ========== SOCIETY DASHBOARD ========== */}
      <Route path="/society/dashboard" element={<SocietyDashboardLayout />}>
        <Route index element={<SocietyOverview />} />
        <Route path="create-event" element={<CreateEvent />} />
        <Route path="create-event" element={<CreateEvent />} />
        <Route path="my-events" element={<MyEvents />} />
        <Route path="chat" element={<Chat />} />
        <Route path="members" element={<Members />} />
        <Route path="settings" element={<SocietySettings />} />
      </Route>

      {/* ✅ You can later add a 404 fallback route */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}

export default App;
