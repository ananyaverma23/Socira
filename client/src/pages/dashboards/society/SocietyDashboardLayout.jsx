import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export default function SocietyDashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userInfo, setUserInfo] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Check login
  useEffect(() => {
    const stored = localStorage.getItem("userInfo");
    if (!stored) {
      navigate("/login");
    } else {
      setUserInfo(JSON.parse(stored));
    }
  }, [navigate]);

  if (!userInfo) return null;

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  const menuItems = [
    { label: "🏠 Overview", path: "/society/dashboard" },
    { label: "🗓️ Create Event", path: "/society/dashboard/create-event" },
    { label: "📋 My Events", path: "/society/dashboard/my-events" },
    { label: "💬 Chat Room", path: "/society/dashboard/chat" },
    { label: "👥 Members", path: "/society/dashboard/members" },
    { label: "⚙️ Settings", path: "/society/dashboard/settings" },
  ];


  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-indigo-50 to-blue-100 font-sans text-gray-800">
      {/* ===== HEADER ===== */}
      <header className="bg-white shadow-md flex justify-between items-center px-4 py-3 sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <button
            className="md:hidden text-indigo-600 hover:text-indigo-800"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={26} /> : <Menu size={26} />}
          </button>

          <h1
            onClick={() => navigate("/")}
            className="text-2xl font-bold text-indigo-600 cursor-pointer"
          >
            SOCIRA Society Panel
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden md:block font-medium text-gray-700">
            Hello, <span className="text-indigo-600">{userInfo.name}</span>
          </span>
          <button
            onClick={handleLogout}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
          >
            Logout
          </button>
        </div>
      </header>

      {/* ===== BODY ===== */}
      <div className="flex flex-1 w-full">
        {/* Sidebar (desktop) */}
        <aside className="hidden md:flex flex-col w-64 bg-white shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-6">Manage Society</h2>
          <ul className="space-y-3 text-gray-600 font-medium">
            {menuItems.map((item) => (
              <li
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`cursor-pointer px-3 py-2 rounded-lg transition-all duration-200 ${location.pathname.includes(item.path.split("/").pop())
                    ? "bg-indigo-100 text-indigo-700 font-semibold shadow-sm"
                    : "hover:bg-indigo-50 hover:text-indigo-600"
                  }`}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </aside>

        {/* Sidebar (mobile overlay) */}
        <div
          className={`fixed inset-0 bg-black/40 z-30 transition-opacity duration-300 ${sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
            } md:hidden`}
          onClick={() => setSidebarOpen(false)}
        ></div>

        <aside
          className={`fixed top-0 left-0 h-full bg-white shadow-lg w-64 p-6 z-40 transform transition-transform duration-300 md:hidden ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          <h2 className="text-lg font-semibold text-gray-700 mb-6">Manage Society</h2>
          <ul className="space-y-3 text-gray-600 font-medium">
            {menuItems.map((item) => (
              <li
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setSidebarOpen(false);
                }}
                className={`cursor-pointer px-3 py-2 rounded-lg transition-all duration-200 ${location.pathname.includes(item.path.split("/").pop())
                    ? "bg-indigo-100 text-indigo-700 font-semibold shadow-sm"
                    : "hover:bg-indigo-50 hover:text-indigo-600"
                  }`}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 bg-gradient-to-br from-indigo-50 to-blue-100 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* ===== FOOTER ===== */}
      <footer className="bg-indigo-600 text-white text-center py-4 mt-auto">
        <p className="text-sm">
          © {new Date().getFullYear()} SOCIRA — Empowering communities to lead 💜
        </p>
      </footer>
    </div>
  );
}
