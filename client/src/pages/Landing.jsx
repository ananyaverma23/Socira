import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  // Check if user already exists (based on localStorage)
  const userInfo = localStorage.getItem("userInfo");
  const isLoggedIn = !!userInfo;

  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-800">
      {/* ===== HEADER ===== */}
      <header className="flex justify-between items-center p-6 bg-white shadow-md sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-blue-600 cursor-pointer" onClick={() => navigate("/")}>
          SOCIRA
        </h1>
        <nav className="hidden md:flex gap-6 text-gray-600">
          <button onClick={() => navigate("/")} className="hover:text-blue-600">Home</button>
          <button onClick={() => navigate("/login")} className="hover:text-blue-600">Login</button>
          <button onClick={() => navigate("/register")} className="hover:text-blue-600">Sign Up</button>
        </nav>
        <button
          onClick={() => navigate(isLoggedIn ? "/user/dashboard" : "/login")}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition duration-200 md:hidden"
        >
          {isLoggedIn ? "Dashboard" : "Login"}
        </button>
      </header>

      {/* ===== HERO SECTION ===== */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-16 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="md:w-1/2 space-y-6 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-700 leading-snug">
            Connect. Collaborate. Celebrate with SOCIRA.
          </h2>
          <p className="text-gray-600 text-lg md:text-xl">
            SOCIRA helps societies organize events, connect with members, and manage communities — all in one place.
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-6">
            <button
              onClick={() => navigate("/register")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Get Started
            </button>
            {isLoggedIn ? (
              <button
                onClick={() => navigate("/user/dashboard")}
                className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition duration-300"
              >
                Go to Dashboard
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition duration-300"
              >
                Login
              </button>
            )}
          </div>
        </div>
        <div className="md:w-1/2 mt-10 md:mt-0">
          <img
            src="https://illustrations.popsy.co/gray/community.svg"
            alt="Community illustration"
            className="w-full max-w-md mx-auto"
          />
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section className="px-8 md:px-20 py-16 bg-white text-center">
        <h3 className="text-3xl font-semibold text-gray-800 mb-10">
          Why Choose SOCIRA?
        </h3>
        <div className="grid gap-10 md:grid-cols-3">
          <div className="p-6 bg-blue-50 rounded-2xl shadow hover:shadow-lg transition duration-300">
            <h4 className="text-xl font-semibold text-blue-700 mb-2">📅 Event Management</h4>
            <p className="text-gray-600">
              Create, manage, and track all society events effortlessly in one place.
            </p>
          </div>
          <div className="p-6 bg-blue-50 rounded-2xl shadow hover:shadow-lg transition duration-300">
            <h4 className="text-xl font-semibold text-blue-700 mb-2">💬 Member Engagement</h4>
            <p className="text-gray-600">
              Keep members updated and engaged with in-app posts, groups, and notifications.
            </p>
          </div>
          <div className="p-6 bg-blue-50 rounded-2xl shadow hover:shadow-lg transition duration-300">
            <h4 className="text-xl font-semibold text-blue-700 mb-2">⚙️ Simplified Management</h4>
            <p className="text-gray-600">
              No more messy WhatsApp groups or Excel sheets — SOCIRA automates your workflow.
            </p>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="mt-auto bg-blue-600 text-white text-center py-6">
        <p className="text-sm">&copy; {new Date().getFullYear()} SOCIRA — All rights reserved.</p>
        <p className="text-sm mt-1">Made with 💙 by Ananya Verma</p>
      </footer>
    </div>
  );
}
