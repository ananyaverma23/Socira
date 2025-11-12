import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/api/user/login", data);
      localStorage.setItem("userInfo", JSON.stringify(res.data));
      alert("Login successful!");

      // Redirect based on role
      if (res.data.role === "society") navigate("/society/dashboard");
      else navigate("/user/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left: Illustration / Hero */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 to-blue-400 text-white items-center justify-center p-10">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold tracking-wide">Welcome Back 👋</h1>
          <p className="text-lg text-blue-100">
            Continue organizing, connecting, and celebrating your society journey with SOCIRA.
          </p>
          <button
            onClick={() => navigate("/register")}
            className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-blue-50 transition"
          >
            New here? Sign Up
          </button>
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-6 py-12">
        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
          <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">Login to SOCIRA</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-600 mb-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center text-gray-600 mt-4">
            New to SOCIRA?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-blue-600 hover:underline"
            >
              Create Account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
