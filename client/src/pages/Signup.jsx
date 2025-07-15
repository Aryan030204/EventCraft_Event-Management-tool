import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { PRODUCTION_URI } from "../utils/constants";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "attendee", // default role
  });
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send signup request here
    console.log("Signing up with:", formData);
    try {
      const res = await axios.post(PRODUCTION_URI + "/auth/signup", formData, {
        withCredentials: true,
      });
      console.log(res);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "attendee",
      });
      toast.success("Account created successfully!");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center px-4 m-10">
      <div className="bg-white shadow-xl rounded-3xl p-8 sm:p-12 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Create Your EventCraft Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Alex"
                className="w-full px-4 py-2 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Smith"
                className="w-full px-4 py-2 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="example@email.com"
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="••••••••"
            />
            <div
              className="absolute right-3 top-[38px] cursor-pointer text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash size={20} className="text-blue-600 rounded-full"/> : <FaEye size={20} className="text-blue-600 rounded-full"/>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="attendee">Attendee</option>
              <option value="organizer">Organizer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-3xl transition duration-300"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Login
          </a>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
