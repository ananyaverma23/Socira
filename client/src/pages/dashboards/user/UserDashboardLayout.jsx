import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react"; // ✅ lightweight icons

export default function UserDashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userInfo, setUserInfo] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Load user info
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
    { label: "🏠 Overview", path: "/user/dashboard/overview" },
    { label: "💬 Societies Joined", path: "/user/dashboard/societies" },
    { label: "⭐ Saved", path: "/user/dashboard/saved" },
    { label: "⚙️ Settings", path: "/user/dashboard/settings" },
  ];

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-blue-50 to-blue-100 font-sans text-gray-800">
      {/* ===== HEADER ===== */}
      <header className="bg-white shadow-md flex justify-between items-center px-4 py-3 sticky top-0 z-20">
        <div className="flex items-center gap-3">
          {/* Hamburger Menu (only visible on mobile) */}
          <button
            className="md:hidden text-blue-600 hover:text-blue-800"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={26} /> : <Menu size={26} />}
          </button>

          <h1
            onClick={() => navigate("/")}
            className="text-2xl font-bold text-blue-600 cursor-pointer"
          >
            SOCIRA
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden md:block font-medium text-gray-700">
            Hi, <span className="text-blue-600">{userInfo.name}</span>
          </span>
          <button
            onClick={handleLogout}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Logout
          </button>
        </div>
      </header>

      {/* ===== MAIN CONTENT ===== */}
      <div className="flex flex-1 w-full">
        {/* Sidebar (desktop) */}
        <aside className="hidden md:flex flex-col w-64 bg-white shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-6">Dashboard Menu</h2>
          <ul className="space-y-3 text-gray-600 font-medium">
            {menuItems.map((item) => (
              <li
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`cursor-pointer px-3 py-2 rounded-lg transition-all duration-200 ${
                  location.pathname.includes(item.path.split("/").pop())
                    ? "bg-blue-100 text-blue-700 font-semibold shadow-sm"
                    : "hover:bg-blue-50 hover:text-blue-600"
                }`}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </aside>

        {/* Sidebar (mobile overlay) */}
        <div
          className={`fixed inset-0 bg-black/40 z-30 transition-opacity duration-300 ${
            sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
          } md:hidden`}
          onClick={() => setSidebarOpen(false)}
        ></div>

        <aside
          className={`fixed top-0 left-0 h-full bg-white shadow-lg w-64 p-6 z-40 transform transition-transform duration-300 md:hidden ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <h2 className="text-lg font-semibold text-gray-700 mb-6">Dashboard Menu</h2>
          <ul className="space-y-3 text-gray-600 font-medium">
            {menuItems.map((item) => (
              <li
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setSidebarOpen(false); // close sidebar on mobile click
                }}
                className={`cursor-pointer px-3 py-2 rounded-lg transition-all duration-200 ${
                  location.pathname.includes(item.path.split("/").pop())
                    ? "bg-blue-100 text-blue-700 font-semibold shadow-sm"
                    : "hover:bg-blue-50 hover:text-blue-600"
                }`}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </aside>

        {/* Outlet (main area) */}
        <main className="flex-1 p-6 md:ml-0">
          <Outlet />
        </main>
      </div>

      {/* ===== FOOTER ===== */}
      <footer className="bg-blue-600 text-white text-center py-4 mt-auto">
        <p className="text-sm">
          © {new Date().getFullYear()} SOCIRA — Building connections beyond classrooms 💙
        </p>
      </footer>
    </div>
  );
}
