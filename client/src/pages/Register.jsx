import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:8000/api/user/register", data);
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left: Form */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-6 py-12">
        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
          <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">
            Create Your Account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-600 mb-1">Full Name</label>
              <input
                name="name"
                placeholder="Enter your name"
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">College Email</label>
              <input
                type="email"
                name="email"
                placeholder="example@igdtuw.ac.in"
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
                placeholder="Create a strong password"
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Register as</label>
              <select
                name="role"
                value={data.role}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="user">User</option>
                <option value="society">Society</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              {loading ? "Registering..." : "Sign Up"}
            </button>
          </form>

          <p className="text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-blue-600 hover:underline"
            >
              Login
            </button>
          </p>
        </div>
      </div>

      {/* Right: Illustration / Hero */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 to-blue-400 text-white items-center justify-center p-10">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold tracking-wide">Join SOCIRA 🚀</h1>
          <p className="text-lg text-blue-100">
            Empower your community and connect effortlessly with your society members.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-blue-50 transition"
          >
            Already Registered? Login
          </button>
        </div>
      </div>
    </div>
  );
}
